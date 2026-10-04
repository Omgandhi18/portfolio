import { useEffect, useRef } from "react";
import { mulberry32 } from "../../lib/terrain";
import { isDark, prefersReducedMotion } from "../../theme";

/* Stars over Othrys. A canvas, so a few hundred of them cost nothing;
   it sleeps by day, offscreen, and under reduced motion draws once. */
export default function Starfield({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const rand = mulberry32(1987);
    const stars = Array.from({ length: 260 }, () => ({
      x: rand(),
      y: Math.pow(rand(), 1.6) * 0.72,
      r: rand() < 0.08 ? 1.3 + rand() * 0.8 : 0.35 + rand() * 0.75,
      phase: rand() * Math.PI * 2,
      speed: 0.4 + rand() * 1.4,
      tint: rand() < 0.12 ? "255, 214, 190" : "226, 234, 255",
    }));
    let w = 0;
    let h = 0;
    let dpr = 1;
    let frame = 0;
    let visible = true;
    let shooting = null;
    let nextShot = performance.now() + 4000;
    const still = prefersReducedMotion();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = still ? 0.75 : 0.45 + 0.55 * Math.sin(t * 0.001 * s.speed + s.phase) ** 2;
        ctx.fillStyle = `rgba(${s.tint}, ${a})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.3) {
          ctx.fillStyle = `rgba(${s.tint}, ${a * 0.12})`;
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (still) return;
      if (!shooting && t > nextShot) {
        shooting = { x: 0.15 + Math.random() * 0.6, y: Math.random() * 0.25, t0: t };
      }
      if (shooting) {
        const p = (t - shooting.t0) / 900;
        if (p >= 1) {
          shooting = null;
          nextShot = t + 7000 + Math.random() * 9000;
        } else {
          const sx = shooting.x * w + p * 260;
          const sy = shooting.y * h + p * 120;
          const g = ctx.createLinearGradient(sx, sy, sx - 120, sy - 55);
          g.addColorStop(0, `rgba(255,240,225,${0.9 * (1 - p)})`);
          g.addColorStop(1, "rgba(255,240,225,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(sx - 120, sy - 55);
          ctx.stroke();
        }
      }
    };

    const loop = (t) => {
      if (visible && isDark()) draw(t);
      frame = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    if (still) {
      const once = () => isDark() && draw(0);
      once();
      window.addEventListener("themechange", once);
      return () => {
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("themechange", once);
      };
    }
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
