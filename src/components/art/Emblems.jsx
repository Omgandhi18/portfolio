import { motion, useReducedMotion } from "framer-motion";

/* Patron emblems, drawn as if by a stylus on a coin: a medallion ring,
   then the symbol, stroke by stroke, when the panel comes into view. */

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.6, delay: 0.25 + i * 0.12, ease: [0.65, 0, 0.35, 1] },
      opacity: { duration: 0.2, delay: 0.25 + i * 0.12 },
    },
  }),
};
const glow = {
  hidden: { opacity: 0, scale: 0.6 },
  shown: { opacity: 1, scale: 1, transition: { duration: 1.4, delay: 1.6, ease: [0.16, 1, 0.3, 1] } },
};

function P({ d, i, ...rest }) {
  return <motion.path d={d} variants={draw} custom={i} {...rest} />;
}
function C({ cx, cy, r, i, ...rest }) {
  return <motion.circle cx={cx} cy={cy} r={r} variants={draw} custom={i} {...rest} />;
}

function Medallion() {
  return (
    <g>
      <C cx="120" cy="120" r="114" i={0} strokeWidth="1.2" />
      <C cx="120" cy="120" r="104" i={1} strokeWidth="0.7" opacity="0.6" />
      <motion.circle
        cx="120"
        cy="120"
        r="109"
        variants={glow}
        strokeWidth="1.6"
        strokeDasharray="0 8.5"
        opacity="0.55"
      />
    </g>
  );
}

function Stalk({ angle, scale = 1, leaf = false, i }) {
  const kernels = [0, 1, 2, 3, 4, 5].map((k) => -112 - k * 11);
  return (
    <g transform={`translate(120 184) rotate(${angle}) scale(${0.74 * scale})`}>
      <P d="M0 40 C1 -10 -1 -70 0 -112" i={i} />
      {kernels.map((y, k) => (
        <g key={k}>
          <P d={`M0 ${y} Q-12 ${y - 3} -10 ${y - 16} Q-2 ${y - 13} 0 ${y}`} i={i + 1 + k * 0.3} fill="currentColor" fillOpacity="0.12" />
          <P d={`M0 ${y} Q12 ${y - 3} 10 ${y - 16} Q2 ${y - 13} 0 ${y}`} i={i + 1.15 + k * 0.3} fill="currentColor" fillOpacity="0.12" />
          {k > 0 && <P d={`M-10 ${y - 16} L-19 ${y - 42}`} i={i + 2 + k * 0.3} strokeWidth="0.9" opacity="0.7" />}
          {k > 0 && <P d={`M10 ${y - 16} L19 ${y - 42}`} i={i + 2.1 + k * 0.3} strokeWidth="0.9" opacity="0.7" />}
        </g>
      ))}
      <P d="M0 -176 Q-6 -186 0 -196 Q6 -186 0 -176" i={i + 3} fill="currentColor" fillOpacity="0.12" />
      <P d="M0 -196 L0 -222" i={i + 3.5} strokeWidth="0.9" opacity="0.7" />
      {leaf && <P d="M0 -20 C-16 -42 -34 -54 -46 -88 C-30 -70 -12 -56 0 -36" i={i + 1} />}
    </g>
  );
}

function Wheat() {
  return (
    <g>
      <Stalk angle={-17} scale={0.92} i={2} />
      <Stalk angle={17} scale={0.92} i={2.4} />
      <Stalk angle={0} leaf i={2.8} />
      {/* the binding */}
      <P d="M101 178 C110 186 130 186 139 178" i={6} strokeWidth="1.6" />
      <P d="M102 188 C111 196 129 196 138 188" i={6.2} strokeWidth="1.6" />
      <P d="M134 190 C142 194 150 200 160 204 L154 210 L163 213" i={6.6} />
      <P d="M106 190 C98 196 90 204 82 212 L90 214 L84 221" i={6.8} />
    </g>
  );
}

function Torch() {
  return (
    <g>
      <motion.ellipse cx="121" cy="78" rx="48" ry="58" fill="url(#emblem-fire)" stroke="none" variants={glow} className="ember-flicker" />
      <P d="M112 222 L106 134" i={2} />
      <P d="M128 222 L134 134" i={2.2} />
      <P d="M112 222 Q120 229 128 222" i={2.4} />
      <P d="M108 162 Q120 168 132 162" i={3} />
      <P d="M107 150 Q120 156 133 150" i={3.2} />
      <P d="M106 196 Q120 200 130 196" i={3.4} opacity="0.6" />
      <P d="M96 134 Q120 142 144 134" i={4} />
      <P d="M96 134 L101 117 M144 134 L139 117" i={4.2} />
      <P d="M99 117 Q120 108 141 117 Q120 124 99 117" i={4.4} />
      <motion.g variants={glow}>
        <g className="flame">
          <path
            d="M120 112 C92 100 96 70 112 56 C112 70 118 74 122 66 C126 52 120 40 128 26 C132 44 150 58 146 82 C144 100 132 110 120 112 Z"
            fill="rgb(var(--c-accent) / 0.22)"
          />
          <path d="M121 108 C108 102 108 86 116 76 C118 86 124 88 126 80 C132 88 136 98 121 108 Z" fill="rgb(var(--c-accent) / 0.55)" stroke="none" />
        </g>
      </motion.g>
      <P
        d="M120 112 C92 100 96 70 112 56 C112 70 118 74 122 66 C126 52 120 40 128 26 C132 44 150 58 146 82 C144 100 132 110 120 112 Z"
        i={5}
      />
      <motion.g variants={glow} fill="currentColor" stroke="none">
        <circle cx="142" cy="38" r="1.6" />
        <circle cx="101" cy="48" r="1.3" />
        <circle cx="136" cy="16" r="1.1" />
      </motion.g>
    </g>
  );
}

function Cornucopia() {
  return (
    <g>
      {/* the horn: two walls meeting at a curled tip, widening to the mouth */}
      <P d="M40 196 C30 130 96 72 176 80" i={2} />
      <P d="M40 196 C66 150 112 120 184 124" i={2.3} />
      <P d="M40 196 C34 206 44 214 52 206 C56 200 50 196 46 200" i={2.6} />
      <P d="M55 132 C66 138 72 146 75 154" i={3.3} />
      <P d="M91 98 C102 108 108 120 110 134" i={3.5} />
      <P d="M135 82 C146 96 150 110 148 125" i={3.7} />
      <P d="M176 80 C194 84 198 118 184 124" i={3} />
      <P d="M176 80 C166 90 170 116 184 124" i={3.2} opacity="0.55" />
      {/* plenty */}
      <C cx="190" cy="94" r="11" i={4.4} fill="rgb(var(--c-accent) / 0.12)" />
      <P d="M185 84 L189 77 L193 84" i={4.6} />
      <P d="M178 80 C186 62 206 58 216 64 C206 73 192 78 178 80" i={4.8} fill="currentColor" fillOpacity="0.1" />
      {[
        [206, 134],
        [196, 160],
        [220, 168],
        [204, 190],
      ].map(([cx, cy], k) => (
        <g key={k}>
          <C cx={cx} cy={cy} r="10" i={5.2 + k * 0.35} fill="rgb(var(--c-accent) / 0.1)" />
          <C cx={cx} cy={cy} r="5.5" i={5.4 + k * 0.35} strokeWidth="0.9" opacity="0.7" />
        </g>
      ))}
    </g>
  );
}

function Caduceus() {
  const wing = (
    <g>
      <P d="M114 64 C96 48 70 42 44 50 C64 55 80 62 90 70 C76 70 64 75 54 86 C74 81 90 79 104 79" i={3} />
      <P d="M104 60 C88 52 72 50 58 52" i={3.4} strokeWidth="0.9" opacity="0.7" />
      <P d="M100 70 C88 66 76 66 66 70" i={3.6} strokeWidth="0.9" opacity="0.7" />
    </g>
  );
  return (
    <g>
      <P d="M120 52 L120 226" i={2} strokeWidth="1.8" />
      <C cx="120" cy="43" r="7" i={2.2} fill="rgb(var(--c-accent) / 0.15)" />
      {wing}
      <g transform="translate(240 0) scale(-1 1)">{wing}</g>
      <P d="M120 214 C148 206 150 186 120 178 C92 170 92 150 120 142 C148 134 150 114 124 104 C116 100 110 96 106 90" i={4.2} />
      <P d="M120 214 C92 206 90 186 120 178 C148 170 148 150 120 142 C92 134 90 114 116 104 C124 100 130 96 134 90" i={4.5} />
      <P d="M100 86 C100 80 110 80 110 87 C108 92 102 92 100 86 Z" i={5.2} fill="rgb(var(--c-accent) / 0.2)" />
      <P d="M140 86 C140 80 130 80 130 87 C132 92 138 92 140 86 Z" i={5.3} fill="rgb(var(--c-accent) / 0.2)" />
      <P d="M120 214 C112 219 114 228 123 225" i={5.6} />
    </g>
  );
}

const ART = { wheat: Wheat, torch: Torch, cornucopia: Cornucopia, caduceus: Caduceus };

export default function Emblem({ kind, className = "" }) {
  const Art = ART[kind];
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 240 240"
      initial={reduced ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="emblem-fire">
          <stop offset="0" stopColor="rgb(var(--c-accent))" stopOpacity="0.32" />
          <stop offset="1" stopColor="rgb(var(--c-accent))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <Medallion />
      <Art />
    </motion.svg>
  );
}
