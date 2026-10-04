import { useMemo } from "react";
import { mulberry32 } from "../../lib/terrain";

/* A band of cloud made of soft radial puffs. Two identical halves slide
   left forever, so the loop never shows a seam. Colour follows the realm:
   white cumulus by day, slate mist by night. */
function makeBand(seed, count) {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const cx = ((i + 0.15 + rand() * 0.7) / count) * 100;
    const cy = 30 + rand() * 40;
    const w = 9 + rand() * 12;
    const puffs = Array.from({ length: 4 + Math.floor(rand() * 3) }, () => ({
      dx: (rand() - 0.5) * w * 1.1,
      dy: (rand() - 0.6) * 22,
      rx: w * (0.35 + rand() * 0.35),
      ry: 18 + rand() * 26,
      a: 0.55 + rand() * 0.45,
    }));
    return { cx, cy, puffs };
  });
}

function Half({ band, density }) {
  return (
    <div className="relative h-full w-[max(100vw,1500px)] shrink-0">
      {band.map((cloud, i) =>
        cloud.puffs.map((p, j) => (
          <span
            key={`${i}-${j}`}
            className="absolute block"
            style={{
              left: `${cloud.cx + p.dx}%`,
              top: `${cloud.cy + p.dy}%`,
              width: `${p.rx * 2}%`,
              height: `${p.ry * 2}%`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(closest-side, rgb(var(--cloud) / calc(var(--cloud-alpha) * ${(p.a * density).toFixed(2)})), rgb(var(--cloud) / 0))`,
            }}
          />
        ))
      )}
    </div>
  );
}

export default function Clouds({ seed = 1, count = 7, density = 1, drift = 140, className = "" }) {
  const band = useMemo(() => makeBand(seed, count), [seed, count]);
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div className="cloud-drift flex h-full w-max will-change-transform" style={{ "--drift": `${drift}s` }}>
        <Half band={band} density={density} />
        <Half band={band} density={density} />
      </div>
    </div>
  );
}
