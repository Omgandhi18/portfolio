const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/* One laurel sprig, leaves alternating up the stem. */
export function Laurel({ className = "" }) {
  return (
    <svg viewBox="0 0 80 42" {...stroke} className={`h-auto w-full ${className}`} aria-hidden="true">
      <path d="M78 38 C60 36 30 28 6 8" />
      {[
        [66, 35.5],
        [54, 32.4],
        [42, 27.6],
        [31, 21.6],
        [21, 15],
        [12.5, 9.5],
      ].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} q-6 -9 -14 -8 q4 8 14 8`} fill="currentColor" fillOpacity="0.18" />
          <path d={`M${x} ${y} q-3 8 -12 11 q1 -9 12 -11`} fill="currentColor" fillOpacity="0.18" />
        </g>
      ))}
    </svg>
  );
}

/* Greek key, sliding slowly along the bottom of the page. */
export function Meander({ className = "" }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden ${className}`}>
      <svg className="meander-slide block h-6 w-[calc(100%+24px)]" role="presentation">
        <defs>
          <pattern id="meander" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M0 22.5 H24 M20 22.5 V2 H4 V18 H16 V6 H8 V14 H12" fill="none" stroke="currentColor" strokeWidth="1.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#meander)" />
      </svg>
    </div>
  );
}
