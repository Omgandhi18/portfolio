/* The harbours of the voyage, in line: an island on a strip of sea, and
   on each one the thing it is remembered for. */

const ink = "rgb(var(--c-ink) / 0.72)";
const line = { fill: "none", stroke: ink, strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" };
const land = { fill: "rgb(var(--c-surface))", stroke: ink, strokeWidth: 1.3, strokeLinejoin: "round" };

function Sea() {
  return (
    <g fill="none" stroke="rgb(var(--c-accent) / 0.5)" strokeWidth="1.1" strokeLinecap="round">
      <path d="M8 132 Q16 127 24 132 T40 132" />
      <path d="M172 136 Q180 131 188 136 T204 136" />
      <path d="M150 146 Q156 142 162 146" />
      <path d="M46 146 Q52 142 58 146" />
    </g>
  );
}

function Harbour() {
  return (
    <g>
      <path d="M30 130 C44 108 70 96 98 94 C130 92 160 104 182 130 Z" {...land} />
      {/* the temple of Artemis on the headland */}
      <g transform="translate(108 94)">
        <path d="M-20 0 H20 M-18 -3 H18" {...line} />
        <path d="M-15 -3 V-18 M-7.5 -3 V-18 M0 -3 V-18 M7.5 -3 V-18 M15 -3 V-18" {...line} />
        <path d="M-18 -18 H18 L0 -28 Z" {...land} />
      </g>
      {/* the fleet gathering */}
      {[
        [52, 126, 0.75],
        [70, 132, 0.6],
        [156, 128, 0.7],
      ].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-14 0 C-6 4 6 4 14 0 L10 6 H-10 Z" {...land} />
          <path d="M0 0 V-20" {...line} />
          <path d="M-8 -18 C-9 -12 -8 -7 -6 -4 H7 C9 -8 9 -13 8 -18 Z" fill="rgb(var(--c-accent) / 0.25)" stroke={ink} strokeWidth="1.2" />
        </g>
      ))}
      <Sea />
    </g>
  );
}

function Orchard() {
  return (
    <g>
      <path d="M34 130 C50 112 72 104 100 104 C132 104 156 114 176 130 Z" {...land} />
      {/* the tree of golden apples */}
      <path d="M104 106 C102 92 106 80 100 66 M101 84 C92 78 86 72 84 64 M103 78 C112 72 118 66 120 58" {...line} />
      <path
        d="M70 62 C66 46 82 34 96 38 C102 26 124 26 130 40 C144 40 150 56 142 66 C146 76 134 84 122 80 C114 88 96 88 88 80 C76 84 64 74 70 62 Z"
        {...land}
      />
      {[
        [86, 58],
        [104, 50],
        [122, 56],
        [112, 70],
        [94, 72],
        [132, 68],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.2" fill="rgb(var(--c-accent))" opacity="0.85" />
      ))}
      {/* Ladon, coiled at the root */}
      <path d="M84 104 C88 96 96 98 100 102 C104 106 112 104 114 98 C116 94 122 94 124 98" {...line} />
      <Sea />
    </g>
  );
}

function Castle() {
  return (
    <g>
      {/* aurora: the far north */}
      <g fill="none" stroke="rgb(var(--c-accent) / 0.35)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M24 30 C54 14 84 40 116 22 C146 6 170 26 196 16" />
        <path d="M30 40 C60 26 88 48 120 32 C148 18 172 36 194 28" opacity="0.6" />
      </g>
      {/* the castle rock */}
      <path d="M26 130 L44 104 L58 98 L66 84 L82 78 L98 80 L118 76 L132 86 L146 92 L160 108 L184 130 Z" {...land} />
      <path d="M58 98 L70 110 M118 76 L112 96 M146 92 L140 108" {...line} opacity="0.6" />
      {/* the keep and walls */}
      <g transform="translate(0 0)">
        <path d="M74 80 V60 H80 V64 H86 V60 H92 V64 H98 V60 H104 V80" {...land} />
        <path d="M100 78 V48 H106 V52 H112 V48 H118 V78" {...land} />
        <path d="M86 70 V74 M110 60 V66" {...line} />
        <path d="M118 78 V66 H130 V86" {...land} />
        <path d="M109 48 V38 L114 41 L109 44" {...line} />
      </g>
      <Sea />
    </g>
  );
}

function Home() {
  return (
    <g>
      {/* kites over the city: Uttarayan, Ahmedabad's January sky */}
      <g className="kite-sway">
        <path d="M150 20 L160 32 L150 46 L140 32 Z" fill="rgb(var(--c-accent) / 0.3)" stroke={ink} strokeWidth="1.2" />
        <path d="M150 46 C146 60 156 74 140 92" {...line} strokeWidth="0.8" />
      </g>
      <g className="kite-sway" style={{ animationDelay: "-2s" }}>
        <path d="M62 34 L70 43 L62 54 L54 43 Z" fill="rgb(var(--c-surface))" stroke={ink} strokeWidth="1.2" />
        <path d="M62 54 C66 68 58 80 72 96" {...line} strokeWidth="0.8" />
      </g>
      <path d="M30 130 C48 110 76 100 104 100 C136 100 160 112 180 130 Z" {...land} />
      {/* the house, the olive by its door */}
      <g transform="translate(96 102)">
        <path d="M-22 0 V-22 H22 V0" {...land} />
        <path d="M-26 -22 L0 -38 L26 -22 Z" {...land} />
        <path d="M-5 0 V-12 H5 V0" {...line} />
        <path d="M10 -16 H16 V-10 H10 Z" fill="rgb(var(--c-accent) / 0.7)" stroke={ink} strokeWidth="1" />
      </g>
      <path d="M140 108 C140 98 136 92 138 84" {...line} />
      <path d="M124 82 C122 72 134 66 142 70 C150 64 162 72 158 80 C162 88 150 92 142 88 C134 92 124 90 124 82 Z" {...land} />
      <Sea />
    </g>
  );
}

const KINDS = { harbour: Harbour, orchard: Orchard, castle: Castle, home: Home };

export default function Island({ kind, className = "" }) {
  const Art = KINDS[kind];
  return (
    <svg viewBox="0 0 210 150" className={className} aria-hidden="true">
      <Art />
    </svg>
  );
}
