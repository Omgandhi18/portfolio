/* Poseidon's company, for the flood. Each is drawn with its waterline at
   the bottom of its view box (anything below it is under the sea), and
   moves by itself with SMIL so the flood only has to carry it. */

const loop = (dur, begin = 0) => ({ dur: `${dur}s`, begin: `${-begin}s`, repeatCount: "indefinite" });

/* A sea serpent, three coils and a crested head, swimming right. */
export function Serpent({ body, rim, eye }) {
  const coils = [
    { d: "M20 158 C20 118 82 118 82 158", rise: 4, begin: 0 },
    { d: "M120 158 C120 98 212 98 212 158", rise: 6, begin: 0.35 },
    { d: "M250 158 C250 88 352 88 352 158", rise: 7, begin: 0.7 },
  ];
  return (
    <svg viewBox="0 0 520 160" className="h-full w-auto overflow-visible">
      {coils.map(({ d, rise, begin }) => (
        <g key={d}>
          <animateTransform attributeName="transform" type="translate" values={`0 0;0 ${-rise};0 0`} {...loop(1.6, begin)} />
          <path d={d} fill="none" stroke={body} strokeWidth="20" strokeLinecap="round" />
          <path d={d} transform="translate(0 -9)" fill="none" stroke={rim} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>
      ))}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" {...loop(1.6, 1.05)} />
        <path d="M392 166 C386 116 410 76 446 64" fill="none" stroke={body} strokeWidth="22" strokeLinecap="round" />
        <path d="M384 120 L366 112 L388 104 M392 96 L378 82 L400 86 M408 80 L400 62 L420 72" fill={body} stroke={body} strokeWidth="3" strokeLinejoin="round" />
        <g transform="translate(446 64) rotate(-10)">
          <path d="M4 -16 L-4 -38 L12 -21 Z M16 -20 L12 -42 L26 -22 Z" fill={body} />
          <path d="M-8 -6 C2 -20 26 -24 46 -14 L64 -6 C66 -3 63 0 58 0 L36 0 L56 10 C52 14 36 14 22 12 C8 10 -6 8 -10 2 Z" fill={body} stroke={rim} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="34" cy="-11" r="3.4" fill={eye} />
        </g>
      </g>
    </svg>
  );
}

/* A kraken's arm, thick at the water and curling at the tip, swaying. */
export function Tentacle({ body, rim, sway = 6, begin = 0 }) {
  return (
    <svg viewBox="0 0 120 260" className="h-full w-auto overflow-visible">
      <g>
        <animateTransform attributeName="transform" type="rotate" values={`${-sway} 60 262;${sway} 60 262;${-sway} 60 262`} {...loop(2.4, begin)} />
        <g fill="none" stroke={body} strokeLinecap="round">
          <path d="M60 262 C52 220 40 190 46 160" strokeWidth="26" />
          <path d="M46 160 C52 130 76 118 78 92" strokeWidth="17" />
          <path d="M78 92 C80 66 62 50 50 56 C40 62 46 76 56 72" strokeWidth="9" />
        </g>
        <g fill={rim} opacity="0.75">
          {[[37, 214, 4], [36, 194, 3.8], [39, 174, 3.4], [47, 150, 3], [58, 132, 2.6], [69, 116, 2.2], [72, 98, 1.8]].map(([cx, cy, r]) => (
            <circle key={cy} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* Poseidon's trident, risen from the deep. */
export function Trident({ metal, glow }) {
  return (
    <svg
      viewBox="0 0 80 300"
      className="h-full w-auto overflow-visible"
      style={{ filter: `drop-shadow(0 0 8px ${glow}) drop-shadow(0 0 22px ${glow})` }}
    >
      <g fill={metal}>
        <rect x="37" y="84" width="6" height="216" rx="2" />
        <circle cx="40" cy="104" r="6" />
        <path d="M13 86 H67 V93 H13 Z" />
        <path d="M14 92 V44 H20 V92 Z M60 92 V44 H66 V92 Z M37 86 V24 H43 V86 Z" />
        <path d="M8 50 L17 22 L26 50 Z M54 50 L63 22 L72 50 Z M31 30 L40 0 L49 30 Z" />
      </g>
    </svg>
  );
}
