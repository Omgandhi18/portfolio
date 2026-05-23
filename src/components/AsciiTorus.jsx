import { useEffect, useRef } from "react";

const CHARS   = "  ..::--==++SWIFT#RN@";
const OR1 = 1.0, OR2 = 2.2;
const IR1 = 0.45, IR2 = 1.15;
const K2      = 5.0;
const Y_SCALE = 0.46;
const FONT_PX = 11.5;
const LINE_H  = FONT_PX * 1.38;

// Depth colour palette — same as before but as hex/rgba strings
function getColor(tid, t) {
  if (tid === 1) {
    if (t > 0.55) return "#FF5F1F";
    if (t > 0.2)  return "rgba(255,140,80,0.65)";
    return "rgba(255,255,255,0.18)";
  }
  if (t > 0.55) return "#E040FB";
  if (t > 0.2)  return "rgba(200,80,220,0.6)";
  return "rgba(255,255,255,0.18)";
}

export default function AsciiTorus({ cols = 60, rows = 30 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // Measure Courier New character width at our font size
    ctx.font = `${FONT_PX}px 'Courier New', Courier, monospace`;
    const charW = ctx.measureText("M").width * 1.07; // +7% for letter-spacing feel

    const cssW = cols * charW;
    const cssH = rows * LINE_H;

    canvas.width  = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    canvas.style.width  = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.scale(dpr, dpr);
    ctx.font = `${FONT_PX}px 'Courier New', Courier, monospace`;
    ctx.textBaseline = "top";

    const K1 = (cols / 2) * K2 / (OR2 + OR1) * 0.9;

    let A1 = 0.3, B1 = 0.0;
    let A2 = 0.8, B2 = 2.1;
    let mouseX = 0, mouseY = 0;
    let rafId;

    function renderTorus(A, B, R1, R2, zbuf, charBuf, oozBuf, tBuf, tid, tStep, pStep) {
      const sinA = Math.sin(A + mouseY * 0.5), cosA = Math.cos(A + mouseY * 0.5);
      const sinB = Math.sin(B + mouseX * 0.25), cosB = Math.cos(B + mouseX * 0.25);

      for (let theta = 0; theta < 2 * Math.PI; theta += tStep) {
        const sinT = Math.sin(theta), cosT = Math.cos(theta);
        for (let phi = 0; phi < 2 * Math.PI; phi += pStep) {
          const sinP = Math.sin(phi), cosP = Math.cos(phi);
          const cx = R2 + R1 * cosT, cy = R1 * sinT;
          const x  = cx * (cosB * cosP + sinA * sinB * sinP) - cy * cosA * sinB;
          const y  = cx * (sinB * cosP - sinA * cosB * sinP) + cy * cosA * cosB;
          const z  = K2 + cosA * cx * sinP + cy * sinA;
          const ooz = 1 / z;
          const xp = Math.round(cols / 2 + K1 * ooz * x);
          const yp = Math.round(rows / 2 - K1 * Y_SCALE * ooz * y);
          if (xp < 0 || xp >= cols || yp < 0 || yp >= rows) continue;
          const L =
            cosP * cosT * sinB - cosA * cosT * sinP +
            sinA * sinT - sinB * (cosA * sinT - cosT * sinA * sinP);
          const idx = yp * cols + xp;
          if (ooz > zbuf[idx]) {
            zbuf[idx]    = ooz;
            oozBuf[idx]  = ooz;
            tBuf[idx]    = tid;
            charBuf[idx] = Math.min(CHARS.length - 1, Math.max(0, Math.floor(Math.max(0, L) * (CHARS.length - 1))));
          }
        }
      }
    }

    function frame() {
      A1 += 0.006; B1 += 0.0025;
      A2 -= 0.004; B2 += 0.007;

      const total   = cols * rows;
      const zbuf    = new Float32Array(total);
      const charBuf = new Uint8Array(total);
      const oozBuf  = new Float32Array(total);
      const tBuf    = new Uint8Array(total);

      renderTorus(A1, B1, OR1, OR2, zbuf, charBuf, oozBuf, tBuf, 1, 0.05, 0.016);
      renderTorus(A2, B2, IR1, IR2, zbuf, charBuf, oozBuf, tBuf, 2, 0.07, 0.022);

      let lo1 = Infinity, hi1 = 0, lo2 = Infinity, hi2 = 0;
      for (let i = 0; i < total; i++) {
        if (!zbuf[i]) continue;
        const v = oozBuf[i];
        if (tBuf[i] === 1) { if (v < lo1) lo1 = v; if (v > hi1) hi1 = v; }
        else               { if (v < lo2) lo2 = v; if (v > hi2) hi2 = v; }
      }
      const r1 = hi1 - lo1 || 1, r2 = hi2 - lo2 || 1;

      ctx.clearRect(0, 0, cssW, cssH);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          if (!zbuf[idx]) continue;
          const ch = CHARS[charBuf[idx]];
          if (ch === " ") continue;
          const tid = tBuf[idx];
          const t   = tid === 1 ? (oozBuf[idx] - lo1) / r1 : (oozBuf[idx] - lo2) / r2;
          ctx.fillStyle = getColor(tid, t);
          ctx.fillText(ch, col * charW, row * LINE_H);
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
      mouseY = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, [cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ display: "block", background: "transparent" }}
    />
  );
}
