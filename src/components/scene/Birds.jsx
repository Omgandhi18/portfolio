const FLOCK = [
  { top: "13%", size: 15, cross: 58, delay: -36, beat: 0.85 },
  { top: "15%", size: 11, cross: 58, delay: -37.2, beat: 0.7 },
  { top: "11.5%", size: 12, cross: 58, delay: -38.1, beat: 0.78 },
  { top: "16%", size: 12, cross: 80, delay: -20, beat: 0.95 },
  { top: "14%", size: 11, cross: 80, delay: -21.3, beat: 0.8 },
];

/* A few birds riding the day across the sky. Gone by night. */
export default function Birds() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden dark:hidden">
      {FLOCK.map((b, i) => (
        <div
          key={i}
          className="bird-cross absolute left-0"
          style={{ top: b.top, "--cross": `${b.cross}s`, animationDelay: `${b.delay}s` }}
        >
          <svg width={b.size * 2} height={b.size} viewBox="-10 -6 20 10" className="text-ink/45">
            <path
              className="wing-beat"
              style={{ "--beat": `${b.beat}s` }}
              d="M-9 -1 Q-4.5 -5.5 0 0 Q4.5 -5.5 9 -1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
