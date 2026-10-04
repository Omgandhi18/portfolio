import {
  cone,
  gaussian,
  lineThrough,
  peakOf,
  ridgePoints,
  silhouette,
  snowcap,
  spur,
} from "../../lib/terrain";

/* The range behind the hero, in a 1600 x 900 world. Computed once.
   Light comes from the upper right (the sun and moon hang over the
   summit), so the western faces fall into shade. */

export const WORLD = { w: 1600, h: 900 };
export const FOCUS_X = 1260; // Olympus. Narrow screens keep it in frame.

const sum = (...fns) => (x) => fns.reduce((acc, f) => acc + f(x), 0);
const r1 = (v) => Math.round(v * 10) / 10;

/* A level top for the temple, and shoulders filled out beneath it so the
   summit reads as a mountain rather than a spire. */
function flattenSummit(points, cx, half) {
  const top = peakOf(points, cx - 50, cx + 50);
  return {
    points: points.map(([x, y]) => {
      const dx = Math.abs(x - top[0]);
      if (dx <= half) return [x, top[1]];
      // a gentle lip first, then the flanks steepen
      const shoulder = top[1] + Math.pow(dx - half, 1.32) * 0.34;
      return [x, Math.min(y, shoulder)];
    }),
    summit: top,
  };
}

const farPts = ridgePoints({
  seed: 11,
  base: 560,
  amp: 120,
  rough: 0.56,
  lift: sum(cone(300, 360, 95), cone(820, 260, 60), cone(1530, 300, 70)),
});

const { points: massifPts, summit } = flattenSummit(
  ridgePoints({
    seed: 29,
    base: 660,
    amp: 120,
    rough: 0.6,
    depth: 9,
    lift: sum(
      cone(FOCUS_X, 420, 330, 1.25),
      cone(FOCUS_X - 230, 170, 70, 1.6),
      cone(960, 240, 150),
      cone(1560, 200, 90)
    ),
  }),
  FOCUS_X,
  66
);

const nearPts = ridgePoints({
  seed: 47,
  base: 722,
  amp: 64,
  rough: 0.52,
  lift: sum(gaussian(250, 220, 80), gaussian(1520, 190, 50), gaussian(840, 130, 26)),
});

const groundPts = ridgePoints({
  seed: 83,
  base: 795,
  amp: 24,
  rough: 0.45,
  depth: 7,
  lift: sum(gaussian(250, 340, 118), gaussian(1580, 170, 64)),
});

/* Shade on the western face: bounded by a jagged spur running down
   from the summit, so the light edge reads as a real ridge. */
function shadowFace(points, top) {
  const [sx, sy] = top;
  const line = spur([sx - 4, sy + 2], [sx - 260, 900], 17, 40);
  const left = points.filter(([x]) => x <= sx - 4);
  const down = line.map(([x, y]) => `L${r1(x)} ${r1(y)}`).join("");
  return `${lineThrough(left)}${down}L0 900Z`;
}

/* Lit flank gullies: a few faint strokes falling from the snow. */
function gullies(top) {
  const [sx, sy] = top;
  return [
    spur([sx + 40, sy + 70], [sx + 120, sy + 300], 31, 18, 5),
    spur([sx + 100, sy + 110], [sx + 220, sy + 330], 37, 16, 5),
    spur([sx - 130, sy + 120], [sx - 190, sy + 330], 41, 16, 5),
  ].map(lineThrough);
}

export const terrain = {
  far: {
    fill: silhouette(farPts, 900),
    rim: lineThrough(farPts),
    snow: snowcap(farPts, 448, 13, 0.7),
  },
  massif: {
    fill: silhouette(massifPts, 900),
    rim: lineThrough(massifPts),
    snow: snowcap(massifPts, summit[1] + 125, 5, 0.85, (run) =>
      run.some(([x]) => Math.abs(x - summit[0]) < 30)
    ),
    shadow: shadowFace(massifPts, summit),
    gullies: gullies(summit),
    summit,
  },
  near: { fill: silhouette(nearPts, 900), rim: lineThrough(nearPts), points: nearPts },
  ground: { fill: silhouette(groundPts, 900), rim: lineThrough(groundPts) },
  groundAt(x) {
    let best = groundPts[0];
    for (const p of groundPts) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
    return best[1];
  },
  nearAt(x) {
    let best = nearPts[0];
    for (const p of nearPts) if (Math.abs(p[0] - x) < Math.abs(best[0] - x)) best = p;
    return best[1];
  },
};

/* The visible window into the world for a given box aspect: keep the
   full height, crop width so Olympus sits right of centre; when the box
   is wider than the world, show it all and let the SVG slice the sky. */
export function windowFor(aspect) {
  // Portrait screens get extra sky above the world, pushing the range
  // down so the name has room over the summit.
  const lift = aspect < 0.9 ? 220 : aspect < 1.25 ? 120 : 0;
  const h = WORLD.h + lift;
  const w = Math.min(WORLD.w, h * aspect);
  const x0 = Math.max(0, Math.min(WORLD.w - w, FOCUS_X - w * 0.74));
  return `${Math.round(x0)} ${-lift} ${Math.round(w)} ${h}`;
}
