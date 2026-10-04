import { useState } from "react";
import { motion } from "framer-motion";
import { toPath } from "../../lib/lightning";

/* Zeus's weather, drawn in screen pixels. */

/* How a bolt shows: [values, times] of its opacity once it lands. */
export const STRIKE = { duration: 0.5, values: [0, 1, 0.15, 1, 0.6, 0], times: [0, 0.06, 0.2, 0.32, 0.6, 1] };
export const CLIMAX = { duration: 0.95, values: [0, 1, 0.1, 1, 0.2, 1, 0.5, 0], times: [0, 0.04, 0.12, 0.22, 0.32, 0.44, 0.7, 1] };
const DRAW_IN = 0.08; // seconds for a leader to reach the ground

/* Two rows of cloud puffs along the bottom of a dark bank, sized to it. */
function puffs(width, depth) {
  const size = Math.max(0.6, Math.min(1.4, depth / 160));
  const out = [];
  for (const [row, drop, scale] of [[0, 0.75, 1.1], [1, 1, 0.9]]) {
    for (let x = -60; x < width + 60; ) {
      const r = (40 + Math.random() * 46) * scale * size;
      out.push({ row, cx: x, cy: depth * drop - r * 0.35, r });
      x += r * (0.9 + Math.random() * 0.5);
    }
  }
  return out;
}

/* A thunderhead bank across the top of the screen, its billows softened.
   A lighter copy over it flickers to `flicker` (a keyframe track over
   `duration`), as if lit from inside. */
const BILLOW_ID = "thunderhead-billow";
export function Thunderhead({ width, depth, fill, back, lit, flicker, duration }) {
  const [shapes] = useState(() => puffs(width, depth));
  const bank = (colors) => (
    <g filter={`url(#${BILLOW_ID})`}>
      <rect x="-20" y="-20" width={width + 40} height={depth * 0.6 + 20} fill={colors[1]} />
      {shapes.map(({ row, cx, cy, r }) => (
        <circle key={`${row}-${cx}`} cx={cx} cy={cy} r={r} fill={colors[row]} />
      ))}
    </g>
  );
  return (
    <svg className="h-full w-full overflow-visible" viewBox={`0 0 ${width} ${depth + 80}`} preserveAspectRatio="none">
      <defs>
        <filter id={BILLOW_ID} x="-5%" y="-20%" width="110%" height="140%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {bank([back, fill])}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: flicker.values }} transition={{ duration, times: flicker.times }}>
        {bank([lit, lit])}
      </motion.g>
    </svg>
  );
}

/* Slanting rain that loops seamlessly: the tile drifts one tile down and
   one tile left (a lattice step), matching the streaks' slant. */
export function Rain({ id, color, tile, speed, weight }) {
  const [w, h] = tile;
  const dx = -w * 0.14;
  const streaks = `M${w * 0.7} ${h * 0.02} l${dx} ${h * 0.14} M${w * 0.25} ${h * 0.52} l${dx} ${h * 0.14}`;
  return (
    <svg className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          <animateTransform attributeName="patternTransform" type="translate" values={`0 0;${-w} ${h}`} dur={`${speed}s`} repeatCount="indefinite" />
          <path d={streaks} stroke={color} strokeWidth={weight} strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/* One bolt: drawn in from the cloud in an instant, then flickering per
   `flicker`; a blurred halo under a white core, forks thinner. */
export function Lightning({ shape, at, flicker, width, core, glow, halo }) {
  const draw = { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { delay: at, duration: DRAW_IN, ease: "easeIn" } };
  return (
    <motion.g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: flicker.values }}
      transition={{ delay: at, duration: flicker.duration, times: flicker.times }}
    >
      {[shape.trunk, ...shape.branches].map((points, i) => {
        const d = toPath(points);
        const w = i === 0 ? width : width * 0.45;
        return (
          <g key={d}>
            <motion.path d={d} stroke={glow} strokeWidth={w * 7} filter={`url(#${halo})`} {...draw} />
            <motion.path d={d} stroke={glow} strokeWidth={w * 2.4} opacity="0.85" {...draw} />
            <motion.path d={d} stroke={core} strokeWidth={w} {...draw} />
          </g>
        );
      })}
    </motion.g>
  );
}

/* Where the last bolt lands: a white-hot bloom, a shock ring, sparks. */
export function Burst({ x, y, at, core, glow }) {
  const centred = { x: "-50%", y: "-50%" };
  const rays = Array.from({ length: 10 }, (_, i) => (i * 360) / 10);
  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <motion.div
        className="absolute h-44 w-44 rounded-full"
        style={{ ...centred, background: `radial-gradient(circle, ${core} 0%, ${glow} 22%, transparent 68%)` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 0.9, 1.2, 0.5], opacity: [0, 1, 0.7, 0.9, 0] }}
        transition={{ delay: at, duration: 1.2, times: [0, 0.08, 0.25, 0.4, 1] }}
      />
      {/* keyframes start hidden: motion shows the first one during the delay */}
      <motion.div
        className="absolute h-10 w-10 rounded-full border-2"
        style={{ ...centred, borderColor: core }}
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 0.2, 6], opacity: [0, 0.9, 0] }}
        transition={{ delay: at + 0.04, duration: 0.8, times: [0, 0.02, 1], ease: "easeOut" }}
      />
      <motion.svg
        viewBox="-40 -40 80 80"
        className="absolute h-28 w-28 overflow-visible"
        style={centred}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 0.3, 1.6], opacity: [0, 1, 0] }}
        transition={{ delay: at + 0.02, duration: 0.6, times: [0, 0.02, 1], ease: "easeOut" }}
      >
        {rays.map((a) => (
          <path key={a} d="M0 -12 L0 -26" transform={`rotate(${a})`} stroke={core} strokeWidth="2" strokeLinecap="round" />
        ))}
      </motion.svg>
    </div>
  );
}
