/* Deterministic terrain. Every ridge is grown from a seed by midpoint
   displacement, so the range looks hand-drawn by nature but renders
   identically on every visit. */

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Returns [[x, y], ...] across `width`. `lift(x)` raises the profile
   (a peak envelope); larger `amp` means wilder relief. */
export function ridgePoints({ seed, width = 1600, base, amp, rough = 0.52, depth = 8, lift }) {
  const rand = mulberry32(seed);
  let ys = [base + (rand() - 0.5) * amp, base + (rand() - 0.5) * amp];
  let disp = amp;
  for (let i = 0; i < depth; i++) {
    const next = [];
    for (let j = 0; j < ys.length - 1; j++) {
      next.push(ys[j], (ys[j] + ys[j + 1]) / 2 + (rand() * 2 - 1) * disp);
    }
    next.push(ys[ys.length - 1]);
    ys = next;
    disp *= rough;
  }
  const n = ys.length - 1;
  return ys.map((y, i) => {
    const x = (i / n) * width;
    return [x, y - (lift ? lift(x) : 0)];
  });
}

const r1 = (v) => Math.round(v * 10) / 10;

export function lineThrough(points) {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${r1(x)} ${r1(y)}`).join("");
}

/* Closed silhouette: the ridge line, then down to `floor`. */
export function silhouette(points, floor) {
  const last = points[points.length - 1];
  return `${lineThrough(points)}L${r1(last[0])} ${floor}L${r1(points[0][0])} ${floor}Z`;
}

/* Smooth value noise in [0, 1]: a few random knots, cosine-blended. */
export function smoothNoise(seed, knots = 14, width = 1600) {
  const rand = mulberry32(seed);
  const v = Array.from({ length: knots + 1 }, () => rand());
  return (x) => {
    const f = (Math.max(0, Math.min(width, x)) / width) * knots;
    const i = Math.min(knots - 1, Math.floor(f));
    const t = (1 - Math.cos((f - i) * Math.PI)) / 2;
    return v[i] * (1 - t) + v[i + 1] * t;
  };
}

/* Snow: every contiguous stretch of ridge above `line`, each closed by a
   lower edge that wanders smoothly (drifts, gullies), tapering to nothing
   where the ridge meets the snowline. */
export function snowcap(points, line, seed, reach = 1.1, keep = () => true) {
  const fine = smoothNoise(seed, 34);
  const broad = smoothNoise(seed + 7, 9);
  const runs = [];
  let run = [];
  for (const p of points) {
    if (p[1] < line) run.push(p);
    else if (run.length) {
      runs.push(run);
      run = [];
    }
  }
  if (run.length) runs.push(run);
  return runs
    .filter((r) => r.length > 2 && keep(r))
    .map((r) => {
      const lower = r
        .slice()
        .reverse()
        .map(([x, y]) => {
          const k = 0.35 + broad(x) * 0.55 + fine(x) * 0.45;
          return `L${r1(x)} ${r1(y + (line - y) * k * reach)}`;
        })
        .join("");
      return `${lineThrough(r)}${lower}Z`;
    })
    .join("");
}

/* A cone: straight-ish flanks and a sharp top, unlike a gaussian dome. */
export function cone(center, spread, height, sharpness = 1.35) {
  return (x) => {
    const t = Math.max(0, 1 - Math.abs(x - center) / spread);
    return height * Math.pow(t, sharpness);
  };
}

/* A jagged line between two points, displaced sideways. */
export function spur(from, to, seed, amp = 40, depth = 6) {
  const rand = mulberry32(seed);
  let pts = [from, to];
  let disp = amp;
  for (let i = 0; i < depth; i++) {
    const next = [];
    for (let j = 0; j < pts.length - 1; j++) {
      const [ax, ay] = pts[j];
      const [bx, by] = pts[j + 1];
      next.push(pts[j], [(ax + bx) / 2 + (rand() * 2 - 1) * disp, (ay + by) / 2]);
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    disp *= 0.55;
  }
  return pts;
}

export function gaussian(center, spread, height) {
  return (x) => height * Math.exp(-((x - center) ** 2) / (2 * spread * spread));
}

export function peakOf(points, from = 0, to = Infinity) {
  let best = null;
  for (const p of points) {
    if (p[0] < from || p[0] > to) continue;
    if (!best || p[1] < best[1]) best = p;
  }
  return best;
}
