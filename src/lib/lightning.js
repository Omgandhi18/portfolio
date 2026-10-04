/* Lightning as polylines, by midpoint displacement: the line between two
   points is bent at its middle, then each half is bent again with half
   the spread, and so on, which gives the jagged-but-going-somewhere look
   of a real leader. Units are the caller's. */

function displace(a, b, spread, depth, rand, out) {
  if (depth === 0) {
    out.push(b);
    return;
  }
  const mid = [(a[0] + b[0]) / 2 + (rand() - 0.5) * spread, (a[1] + b[1]) / 2 + (rand() - 0.5) * spread * 0.3];
  displace(a, mid, spread / 2, depth - 1, rand, out);
  displace(mid, b, spread / 2, depth - 1, rand, out);
}

export function jagged(from, to, { roughness = 0.35, depth = 5, rand = Math.random } = {}) {
  const spread = Math.hypot(to[0] - from[0], to[1] - from[1]) * roughness;
  const points = [from];
  displace(from, to, spread, depth, rand, points);
  return points;
}

/* A trunk from `from` to `to`, and `forks` thinner branches thrown off
   its upper reaches, angling down and away. */
export function bolt(from, to, { forks = 3, rand = Math.random } = {}) {
  const trunk = jagged(from, to, { rand });
  const length = Math.hypot(to[0] - from[0], to[1] - from[1]);
  const branches = Array.from({ length: forks }, () => {
    const start = trunk[Math.floor(trunk.length * (0.15 + rand() * 0.5))];
    const side = rand() < 0.5 ? -1 : 1;
    const reach = length * (0.14 + rand() * 0.2);
    const end = [start[0] + side * reach * 0.7, start[1] + reach];
    return jagged(start, end, { roughness: 0.45, depth: 4, rand });
  });
  return { trunk, branches };
}

export const toPath = (points) => `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`;
