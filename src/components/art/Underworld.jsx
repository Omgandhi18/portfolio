/* Hades' company, for the march of the dead. Both walk right with their
   feet on y = 0; legs swing from the hip with SMIL, so a whole army costs
   no script per frame. `phase` (seconds) staggers the step. */

const BONE = "#d9d0bd";
const BRONZE = "#33261c";
const CREST = "#7d2a1a";
const SHAFT = "#5b4a3a";
const HIDE = "#1a1311";
const EMBER = "#ff8a57";
const RIM = "rgb(230 120 80 / 0.6)";

const loop = (dur, begin) => ({ dur: `${dur}s`, begin: `${-begin}s`, repeatCount: "indefinite" });

/* Swings its children about the local origin (the hip), `reach` degrees
   each way. */
function Swing({ reach, step, phase, children }) {
  return (
    <g>
      <animateTransform attributeName="transform" type="rotate" values={`${-reach} 0 0;${reach} 0 0;${-reach} 0 0`} {...loop(step, phase)} />
      {children}
    </g>
  );
}

/* The march's bob: down on each footfall, twice a step. */
function Bob({ depth, step, phase, children }) {
  return (
    <g>
      <animateTransform attributeName="transform" type="translate" values={`0 0;0 ${-depth};0 0`} {...loop(step / 2, phase)} />
      {children}
    </g>
  );
}

/* Shared glow for burning eyes and mouths. */
export function EmberGlow({ id }) {
  return (
    <filter id={id} x="-200%" y="-200%" width="500%" height="500%">
      <feGaussianBlur stdDeviation="1.8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

function BoneLeg() {
  return (
    <>
      <path d="M0 0 L3 21 L0 42 L8 43" fill="none" stroke={BONE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="3" cy="21" r="2.3" fill={BONE} />
    </>
  );
}

/* A dead hoplite, as the vase painters drew the living: in profile, round
   shield to the front, spear raised, a red crest on a Corinthian helmet. */
export function Hoplite({ phase = 0, step = 0.6, glow }) {
  const half = step / 2;
  return (
    <Bob depth={2.5} step={step} phase={phase}>
      <g transform="translate(0 -44)">
        <Swing reach={20} step={step} phase={phase + half}>
          <g opacity="0.7">
            <BoneLeg />
          </g>
        </Swing>
      </g>
      <path d="M-18 -48 L42 -128" stroke={SHAFT} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M39.6 -129.8 L49.4 -138 L44.4 -126.2 Z" fill={BONE} />
      <g fill="none" stroke={BONE} strokeLinecap="round" strokeLinejoin="round">
        <path d="M-5 -45 Q0 -50 5 -45" strokeWidth="3" />
        <path d="M-1 -46 L-3 -77" strokeWidth="3" />
        <path d="M-3 -72 Q-12 -70 -11 -64 M-3 -66 Q-12 -64 -11 -58 M-3 -60 Q-11 -58 -10 -53" strokeWidth="2" />
        <path d="M-3 -75 L-13 -66 L-9 -60" strokeWidth="2.6" />
      </g>
      <g transform="translate(0 -44)">
        <Swing reach={20} step={step} phase={phase}>
          <BoneLeg />
        </Swing>
      </g>
      <circle cx="9" cy="-62" r="17" fill={BRONZE} stroke={RIM} strokeWidth="1.6" />
      <circle cx="9" cy="-62" r="11.5" fill="none" stroke={RIM} strokeWidth="1" opacity="0.6" />
      <circle cx="9" cy="-62" r="3.2" fill={RIM} />
      <circle cx="3" cy="-87" r="7.5" fill={BONE} />
      <path d="M6 -84 L12.5 -83 L11.5 -78 L4 -78 Z" fill={BONE} />
      <path d="M5.5 -80.5 H11" stroke={HIDE} strokeWidth="0.8" />
      <path d="M-12 -89 C-10 -105 6 -111 15 -98 C8 -101 -2 -101 -6 -93 Z" fill={CREST} />
      <path
        d="M-7 -79 C-10 -92 -4 -99 4 -98 C11 -97 14 -92 12.5 -86 L9.5 -86 C9.5 -90 7 -92 3.5 -91.5 L3 -84 C4 -81 2 -79 -1 -78 Z"
        fill={BRONZE}
        stroke={RIM}
        strokeWidth="1"
      />
      <circle cx="7.5" cy="-88" r="2.4" fill={HIDE} />
      <circle cx="7.6" cy="-88" r="1.3" fill={EMBER} filter={`url(#${glow})`} />
    </Bob>
  );
}

function PawLeg({ hind }) {
  const d = hind ? "M0 0 L9 26 L-2 46 L4 60 L14 61" : "M0 0 L2 30 L-2 58 L9 60";
  return (
    <>
      <path d={d} fill="none" stroke={RIM} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={HIDE} strokeWidth="8.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/* One of the three heads: a hound's domed skull and muzzle, ear up, jaws
   open on a low fire, fangs and a burning eye. */
function Head({ at, tilt, nod, phase, glow }) {
  return (
    <g transform={`translate(${at}) rotate(${tilt})`}>
      <Swing reach={nod} step={1.3} phase={phase}>
        <path d="M4 -19 L0 -37 L14 -21 Z" fill={HIDE} stroke={RIM} strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M45 -4 L24 -2 L40 5 Z" fill={EMBER} opacity="0.4" filter={`url(#${glow})`} />
        <path
          d="M-10 -6 C-8 -16 0 -22 10 -21 C16 -21 19 -18 22 -15 L38 -12 C43 -11 46 -9 45 -6 L44 -4 L24 -2 L40 5 C38 9 30 10 22 9 C10 8 -2 6 -10 2 Z"
          fill={HIDE}
          stroke={RIM}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M40 -4 L38.5 0.5 L37 -4 Z M33 -3.4 L31.8 0.6 L30.4 -3.2 Z M31 3 L32 -0.6 L33.6 3.6 Z" fill={BONE} />
        <circle cx="18" cy="-14" r="2.5" fill={EMBER} filter={`url(#${glow})`} />
      </Swing>
    </g>
  );
}

/* Sparks from the middle jaw, in the head's own frame. */
function Breath({ glow }) {
  return (
    <g fill={EMBER} filter={`url(#${glow})`}>
      {[0, 0.3, 0.6].map((begin) => (
        <circle key={begin} cx="44" cy="0" r="2">
          <animate attributeName="cx" values="44;78" {...loop(0.9, begin)} />
          <animate attributeName="cy" values="0;-8" {...loop(0.9, begin)} />
          <animate attributeName="r" values="2;5" {...loop(0.9, begin)} />
          <animate attributeName="opacity" values="0.9;0" {...loop(0.9, begin)} />
        </circle>
      ))}
    </g>
  );
}

/* Cerberus, hound of the gate, leading from the front: three heads, a
   serpent for a tail, and a gait on the diagonals. */
export function Cerberus({ step = 0.7, glow }) {
  const half = step / 2;
  return (
    <Bob depth={3} step={step} phase={0}>
      <g transform="translate(-52 -62)">
        <Swing reach={18} step={step} phase={half}>
          <g opacity="0.75">
            <PawLeg hind />
          </g>
        </Swing>
      </g>
      <g transform="translate(36 -60)">
        <Swing reach={18} step={step} phase={0}>
          <g opacity="0.75">
            <PawLeg />
          </g>
        </Swing>
      </g>
      <path d="M-68 -84 C-92 -90 -104 -116 -92 -134 C-84 -146 -70 -146 -66 -136" fill="none" stroke={RIM} strokeWidth="9" strokeLinecap="round" />
      <path d="M-68 -84 C-92 -90 -104 -116 -92 -134 C-84 -146 -70 -146 -66 -136" fill="none" stroke={HIDE} strokeWidth="6.6" strokeLinecap="round" />
      <path d="M-66 -136 L-56 -132 L-62 -126 Z" fill={HIDE} stroke={RIM} strokeWidth="1" />
      <path
        d="M-70 -88 C-72 -108 -30 -114 10 -108 C40 -104 60 -92 58 -72 C56 -56 36 -50 14 -54 C-10 -58 -40 -52 -58 -58 C-70 -62 -70 -76 -70 -88 Z"
        fill={HIDE}
        stroke={RIM}
        strokeWidth="1.4"
      />
      <g fill="none" strokeLinecap="round">
        {[
          "M36 -96 C44 -120 52 -134 64 -146",
          "M44 -90 C60 -104 74 -112 88 -118",
          "M50 -80 C66 -84 80 -84 94 -84",
        ].map((d) => (
          <g key={d}>
            <path d={d} stroke={RIM} strokeWidth="18.4" />
            <path d={d} stroke={HIDE} strokeWidth="16" />
          </g>
        ))}
      </g>
      <Head at="64 -146" tilt={-28} nod={7} phase={0} glow={glow} />
      <g transform="translate(88 -118) rotate(-12)">
        <Breath glow={glow} />
      </g>
      <Head at="88 -118" tilt={-12} nod={5} phase={0.45} glow={glow} />
      <Head at="94 -84" tilt={4} nod={6} phase={0.9} glow={glow} />
      <g transform="translate(-58 -60)">
        <Swing reach={18} step={step} phase={0}>
          <PawLeg hind />
        </Swing>
      </g>
      <g transform="translate(30 -58)">
        <Swing reach={18} step={step} phase={half}>
          <PawLeg />
        </Swing>
      </g>
    </Bob>
  );
}
