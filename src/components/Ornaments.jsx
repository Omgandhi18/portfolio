import Reveal from "./Reveal";

/* Section-closing ornaments — stroke line-art matching Wings.jsx (1.4px, bronze).
   All are decorative and aria-hidden. */

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/* Hestia's hearth — calm flame on Olympus, wild flame on Othrys */
export function Brazier() {
  return (
    <svg viewBox="0 0 60 64" {...strokeProps} className="h-auto w-full" aria-hidden="true">
      <path d="M14 30 H46" />
      <path d="M16 30 C20 40 40 40 44 30" />
      <path d="M14 30 C10 26 12 22 16 24" />
      <path d="M46 30 C50 26 48 22 44 24" />
      <path d="M30 39 V46" />
      <path d="M30 46 L23 51 M30 46 L37 51" />
      <path d="M21 53 H39" />
      <g className="flame-flicker dark:hidden">
        <path d="M30 27 C38 20 34 11 30 4 C26 11 22 20 30 27" />
        <path d="M30 23 C33 20 32 16 30 12 C28 16 27 20 30 23" />
      </g>
      <g className="flame-flicker hidden dark:block">
        <path d="M23 26 L26 14 L29 19 L30 4 L33 17 L36 11 L37 26" />
        <path d="M28 25 L30 19 L32 25" />
      </g>
    </svg>
  );
}

/* Temple front — for the works */
export function Temple() {
  return (
    <svg viewBox="0 0 80 64" {...strokeProps} className="h-auto w-full" aria-hidden="true">
      <path d="M14 20 L40 6 L66 20" />
      <path d="M16 20 H64" />
      <path d="M18 24 H62" />
      {[26, 40, 54].map((cx) => (
        <g key={cx}>
          <path d={`M${cx - 5} 27 H${cx + 5}`} />
          <path d={`M${cx - 3} 27 V47 M${cx + 3} 27 V47`} />
          <path d={`M${cx - 5} 49 H${cx + 5}`} />
        </g>
      ))}
      <path d="M12 53 H68" />
      <path d="M16 58 H64" />
    </svg>
  );
}

/* Trireme under sail — for the journey */
export function Trireme() {
  return (
    <svg viewBox="0 0 120 68" {...strokeProps} className="h-auto w-full" aria-hidden="true">
      <g className="ship-rock">
        {/* hull: deck sheer, bottom, bow ram (right), curled stern (left) */}
        <path d="M12 42 C32 48 82 48 104 38 L114 42" />
        <path d="M18 48 C38 54 80 54 100 46 L114 42" />
        <path d="M12 42 C5 35 7 26 15 24" />
        {/* mast above and below the sail, with pennant */}
        <path d="M58 12 V7 M58 7 L65 9 L58 11" />
        <path d="M58 32 V42" />
        {/* full square sail — yard, billowed sides and foot */}
        <path d="M40 12 H76" />
        <path d="M40 12 C37 19 37 25 41 31" />
        <path d="M76 12 C79 19 79 25 75 31" />
        <path d="M41 31 C52 36 64 36 75 31" />
        {/* oars */}
        <path d="M32 51 L26 62 M50 53 L45 64 M68 53 L63 64 M86 50 L81 61" />
      </g>
      {/* waves */}
      <path className="waves-drift" d="M36 65 Q42 61 48 65 M58 65 Q64 61 70 65 M80 64 Q86 60 92 64" />
    </svg>
  );
}

/* Crossed laurel sprigs — for the numbers */
export function Laurel() {
  const sprig = (
    <g>
      <path d="M40 36 C26 33 13 24 10 6" />
      <path d="M32.6 33.8 Q31.9 29.4 28.8 27.3 M32.6 33.8 Q29.1 36.5 25.4 35.9" />
      <path d="M23.6 28.8 Q24.0 24.4 21.6 21.6 M23.6 28.8 Q19.5 30.5 16.1 29.0" />
      <path d="M16.2 21.4 Q17.9 17.3 16.5 13.9 M16.2 21.4 Q11.8 21.7 9.0 19.2" />
      <path d="M11.5 12.1 Q14.4 8.7 14.0 5.0 M11.5 12.1 Q7.2 11.1 5.3 7.9" />
    </g>
  );
  return (
    <svg viewBox="0 0 80 42" {...strokeProps} className="h-auto w-full" aria-hidden="true">
      {sprig}
      <g transform="translate(80,0) scale(-1,1)">{sprig}</g>
    </svg>
  );
}

/* Centered section-closing ornament wrapper */
export function Fleuron({ children, className = "", size = "w-14" }) {
  return (
    <Reveal className={`flex justify-center ${className}`}>
      <span className={`block text-bronze ${size}`} aria-hidden="true">
        {children}
      </span>
    </Reveal>
  );
}
