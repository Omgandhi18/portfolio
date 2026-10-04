/* The Ω mark as an outline, so it reads the same on every platform: Cormorant
   has no Greek, and the text fallback for U+03A9 varies by OS. The outline is
   Georgia's Ω, the glyph the text mark rendered in, and is the same path as
   public/favicon.svg. */
const OMEGA_PATH =
  "M27 20.85 26.01 26.41H17.56V25.43Q18.43 24.19 19.29 22.93Q20.14 21.66 20.67 20.53Q21.27 19.26 21.57 18.08Q21.87 16.91 21.87 15.22Q21.87 14.03 21.62 12.46Q21.37 10.89 20.78 9.75Q19.98 8.23 18.78 7.55Q17.58 6.87 16.01 6.87Q14.45 6.87 13.24 7.59Q12.02 8.3 11.27 9.76Q10.69 10.89 10.43 12.36Q10.17 13.83 10.17 15.22Q10.17 16.79 10.49 18.08Q10.8 19.36 11.39 20.56Q11.95 21.75 12.81 23.03Q13.68 24.3 14.48 25.43V26.41H5.99L5 20.85H5.99Q6.22 21.41 6.41 21.87Q6.6 22.34 6.93 22.84Q7.23 23.31 7.61 23.6Q7.98 23.88 8.55 23.88H11.85V23.41Q10.92 22.37 9.84 21.07Q8.77 19.77 8.18 18.81Q7.51 17.73 7.11 16.42Q6.72 15.1 6.72 13.62Q6.72 11.97 7.39 10.56Q8.07 9.15 9.33 8Q10.53 6.91 12.27 6.25Q14.01 5.59 16.01 5.59Q18.11 5.59 19.83 6.26Q21.56 6.93 22.77 8.03Q23.99 9.15 24.66 10.59Q25.32 12.03 25.32 13.62Q25.32 15.1 24.95 16.39Q24.58 17.67 23.88 18.83Q23.16 19.99 22.17 21.16Q21.17 22.34 20.2 23.41V23.88H23.45Q23.98 23.88 24.38 23.59Q24.78 23.3 25.07 22.84Q25.4 22.32 25.6 21.85Q25.8 21.38 26.01 20.85Z";

/* Tight box around the glyph's ink within the favicon's 32-unit canvas. */
const VIEW_BOX = "5 5.59 22 20.82";

/* Sized in em of the parent's font-size: Georgia's Ω ink is 0.75em wide and
   0.71em tall, so a parent that set the old text mark's size keeps it. */
export default function OmegaMark({ className = "" }) {
  return (
    <svg viewBox={VIEW_BOX} aria-hidden="true" fill="currentColor" className={`block h-[0.71em] w-[0.75em] ${className}`}>
      <path d={OMEGA_PATH} />
    </svg>
  );
}
