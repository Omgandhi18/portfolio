/* The land behind the page — a distant ridgeline with a temple on the
   summit, stele rules framing the wide margins, and over Othrys, stars.
   Everything here is felt before it is seen. */

const STARS = [
  { x: 110, y: 150, s: 1.0 },
  { x: 280, y: 64, s: 0.6, twinkle: true, delay: "0s" },
  { x: 455, y: 188, s: 0.5 },
  { x: 640, y: 96, s: 0.8 },
  { x: 905, y: 170, s: 0.55, twinkle: true, delay: "1.7s" },
  { x: 1095, y: 70, s: 1.1 },
  { x: 1260, y: 190, s: 0.6 },
  { x: 1420, y: 100, s: 0.85, twinkle: true, delay: "3.1s" },
  { x: 1545, y: 210, s: 0.5 },
];

const BIRDS = [
  { x: 300, y: 104, s: 1.1 },
  { x: 520, y: 174, s: 0.8 },
  { x: 578, y: 152, s: 0.6 },
  { x: 985, y: 128, s: 1.0, glide: true, delay: "0s" },
  { x: 1048, y: 100, s: 0.8, glide: true, delay: "2.4s" },
  { x: 1096, y: 136, s: 0.65, glide: true, delay: "5.2s" },
];

function Bird({ x, y, s, glide, delay }) {
  return (
    <path
      d="M-8 0 Q-4 -5 0 -1 Q4 -5 8 0"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      className={glide ? "bird-glide" : undefined}
      style={glide ? { animationDelay: delay } : undefined}
    />
  );
}

function Star({ x, y, s, twinkle, delay }) {
  return (
    <path
      d="M0 -7 L1.3 -1.3 L7 0 L1.3 1.3 L0 7 L-1.3 1.3 L-7 0 L-1.3 -1.3 Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="currentColor"
      className={twinkle ? "star-twinkle" : undefined}
      style={twinkle ? { animationDelay: delay } : { opacity: 0.4 }}
    />
  );
}

export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* stele rules at the margins */}
      <div className="absolute inset-y-0 left-6 hidden w-px bg-ink/[0.08] xl:block">
        <span className="absolute -left-[3px] top-[34vh] block h-[7px] w-[7px] rotate-45 border border-bronze/40 bg-marble" />
      </div>
      <div className="absolute inset-y-0 right-6 hidden w-px bg-ink/[0.08] xl:block">
        <span className="absolute -left-[3px] top-[34vh] block h-[7px] w-[7px] rotate-45 border border-bronze/40 bg-marble" />
      </div>

      {/* the day over Olympus — a sun above the temple, birds on the wing */}
      <svg
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-x-0 top-0 block h-[36vh] w-full text-bronze/40 dark:hidden"
      >
        <circle cx="1180" cy="84" r="26" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
        <circle cx="1180" cy="84" r="34" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
        {BIRDS.map((bird) => (
          <Bird key={`${bird.x}-${bird.y}`} {...bird} />
        ))}
      </svg>

      {/* stars over Othrys */}
      <svg
        viewBox="0 0 1600 320"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-x-0 top-0 hidden h-[36vh] w-full text-gold/40 dark:block"
      >
        {STARS.map((star) => (
          <Star key={`${star.x}-${star.y}`} {...star} />
        ))}
      </svg>

      {/* the distant range */}
      <svg
        viewBox="0 0 1600 240"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 h-[22vh] w-full text-ink/[0.08] dark:text-ink/[0.1]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      >
        {/* far ridge */}
        <path
          opacity="0.5"
          d="M-20 200 L120 158 L240 180 L380 130 L500 168 L640 142 L760 170 L900 126 L1030 160 L1180 138 L1320 168 L1460 148 L1620 178"
        />
        {/* high ridge — the summit carries a temple */}
        <path
          opacity="0.75"
          d="M-20 226 L140 192 L280 206 L430 162 L560 190 L700 150 L840 184 L1000 120 L1126 78 L1174 78 L1290 140 L1430 180 L1620 160"
        />
        <g opacity="0.75">
          <path d="M1129 62 L1171 62" />
          <path d="M1127 62 L1150 50 L1173 62" />
          <path d="M1133 62 V76 M1142 62 V77 M1151 62 V78 M1160 62 V77 M1169 62 V76" />
        </g>
        {/* foothills */}
        <path d="M-20 240 L180 214 L340 228 L520 196 L700 222 L880 200 L1060 224 L1240 206 L1420 226 L1620 210" />
      </svg>
    </div>
  );
}
