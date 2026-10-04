/* Things that stand in the landscape: the temple on the summit, the
   ruin on the terrace, olive trees. All in world units (1600 x 900). */

export function SummitTemple({ x, y, scale = 1.5 }) {
  const cols = [-21, -12.6, -4.2, 4.2, 12.6, 21];
  return (
    <g transform={`translate(${x} ${y + 1}) scale(${scale})`}>
      {/* the hearth of the gods: only visible by night */}
      <g className="hidden dark:inline">
        <circle cx="0" cy="-18" r="46" fill="url(#ember-glow)" className="ember-flicker" />
      </g>
      <g fill="var(--marble)">
        <rect x="-30" y="-4" width="60" height="4" />
        <rect x="-27" y="-7" width="54" height="3" />
        <rect x="-24.5" y="-9.5" width="49" height="2.5" />
        {cols.map((cx) => (
          <rect key={cx} x={cx - 1.6} y="-25" width="3.2" height="15.5" />
        ))}
        <rect x="-24.5" y="-28.5" width="49" height="3.5" />
        <rect x="-25.5" y="-31" width="51" height="2.5" />
        <path d="M-27 -31 L0 -41 L27 -31 Z" />
      </g>
      {/* shade on the far side of every column and under the cornice */}
      <g fill="var(--marble-shade)" opacity="0.7">
        {cols.map((cx) => (
          <rect key={cx} x={cx + 0.4} y="-25" width="1.2" height="15.5" />
        ))}
        <rect x="-24.5" y="-25.6" width="49" height="0.9" />
        <path d="M-21 -31.6 L0 -39 L21 -31.6 Z" opacity="0.45" />
      </g>
      {/* acroteria */}
      <g fill="var(--marble)">
        <circle cx="0" cy="-42.5" r="1.4" />
        <circle cx="-27" cy="-32" r="1" />
        <circle cx="27" cy="-32" r="1" />
      </g>
    </g>
  );
}

/* A fragment of a portico on the terrace: two columns still carrying a
   length of architrave, a third broken off, a drum in the grass. */
export function Portico({ x, y, scale = 1 }) {
  const column = (cx, top) => (
    <g key={cx}>
      <rect x={cx - 15} y={top - 8} width="30" height="8" />
      <path d={`M${cx - 11} ${top} L${cx - 12.5} -14 L${cx + 12.5} -14 L${cx + 11} ${top} Z`} />
      <rect x={cx - 15} y="-14" width="30" height="6" />
    </g>
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g fill="var(--ridge-4)">
        <rect x="-70" y="-8" width="200" height="12" />
        {column(-40, -150)}
        {column(16, -150)}
        <rect x="-60" y="-174" width="96" height="16" />
        <rect x="-62" y="-180" width="70" height="6" />
        {/* the broken one */}
        <path d="M60 -8 L61 -84 L67 -92 L72 -83 L78 -97 L83 -88 L86 -90 L87 -8 Z" />
        <rect x="56" y="-14" width="34" height="6" />
        <ellipse cx="128" cy="-12" rx="7" ry="11" />
        <rect x="100" y="-23" width="28" height="22" />
      </g>
      <g stroke="var(--rim)" fill="none" strokeWidth="1" opacity="0.4">
        {[-44, -38, -32, 12, 18, 24].map((fx) => (
          <path key={fx} d={`M${fx} -18 V-146`} />
        ))}
        {[66, 72, 78].map((fx) => (
          <path key={fx} d={`M${fx} -18 V-84`} />
        ))}
        <path d="M-60 -174 H36" />
        <path d="M-62 -180 H8" />
      </g>
    </g>
  );
}

/* Mediterranean cypress: a dark flame against the sky. */
export function Cypress({ x, y, h = 190, w = 22 }) {
  const k = h / 190;
  const sx = w / 22;
  return (
    <g transform={`translate(${x} ${y}) scale(${sx} ${k})`}>
      <path
        fill="var(--ridge-4)"
        d="M-2 2 L-3 -8 C-10 -16 -12 -40 -11 -66 C-12 -88 -9 -112 -7 -132 C-6 -150 -3 -170 0 -190 C3 -170 6 -150 7 -132 C10 -112 12 -88 11 -66 C12 -40 10 -16 3 -8 L2 2 Z"
      />
      <path
        fill="none"
        stroke="var(--rim)"
        strokeWidth="1"
        opacity="0.45"
        vectorEffect="non-scaling-stroke"
        d="M7 -132 C10 -112 12 -88 11 -66 C12 -40 10 -16 3 -8"
      />
    </g>
  );
}

/* Umbrella pine: a crooked trunk and a flat, lumpy crown. */
export function StonePine({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="var(--ridge-4)">
      <path d="M-6 2 C-4 -30 -14 -60 -6 -96 C-2 -112 -12 -128 -18 -140 L-13 -142 C-6 -130 2 -116 0 -98 C-4 -62 8 -30 6 2 Z" />
      <path d="M-3 -104 C10 -116 26 -124 40 -128" stroke="var(--ridge-4)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M-104 -146 C-96 -162 -70 -170 -52 -168 C-40 -184 -12 -188 6 -180 C22 -192 52 -190 66 -176 C86 -178 104 -168 108 -154 C112 -144 100 -138 86 -140 C70 -132 44 -134 30 -140 C14 -132 -14 -132 -30 -140 C-48 -132 -76 -134 -88 -140 C-100 -136 -110 -140 -104 -146 Z" />
      <path
        fill="none"
        stroke="var(--rim)"
        strokeWidth="1"
        opacity="0.4"
        d="M-52 -168 C-40 -184 -12 -188 6 -180 C22 -192 52 -190 66 -176 C86 -178 104 -168 108 -154"
      />
    </g>
  );
}

/* Lamps in the hill villages. Night only. */
export function VillageLights({ points }) {
  return (
    <g className="hidden dark:inline">
      {points.map(([x, y, d], i) => (
        <g key={i} className="ember-flicker" style={{ animationDelay: `${d}s` }}>
          <circle cx={x} cy={y} r="7" fill="url(#ember-glow)" />
          <circle cx={x} cy={y} r="1.3" fill="rgb(255 196 150)" />
        </g>
      ))}
    </g>
  );
}

/* Shared gradient defs for the scene. */
export function SceneDefs() {
  return (
    <defs>
      <radialGradient id="ember-glow">
        <stop offset="0" stopColor="rgb(230 120 80)" stopOpacity="0.85" />
        <stop offset="0.35" stopColor="rgb(230 120 80)" stopOpacity="0.28" />
        <stop offset="1" stopColor="rgb(230 120 80)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="haze-down" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.35" stopColor="var(--haze)" stopOpacity="0" />
        <stop offset="1" stopColor="var(--haze)" stopOpacity="1" />
      </linearGradient>
    </defs>
  );
}
