/* The Big Three as colossi on the summit, in the temple's marble: Zeus
   behind it with the thunderbolt raised, Poseidon (trident) and Hades
   (bident, crowned and cloaked) at its flanks. Each figure is drawn 100
   units tall, feet at the origin, in currentColor so one shape serves as
   both the marble and the shade on its western edge (light comes from
   the upper right, as on the mountain). */

const LIMB = 5.6;
const SHAFT = 2.2;
const SHADE_DEPTH = 2.4;
const PLINTH = 4;
const PLINTH_HALF = 18;

function Arm({ points, hand }) {
  return (
    <>
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth={LIMB} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={hand[0]} cy={hand[1]} r="2.9" />
    </>
  );
}

/* Bearded, bare-chested, a himation wrapped from the hips to the feet. */
function Figure({ children }) {
  return (
    <>
      <ellipse cx="0" cy="-90.5" rx="5" ry="6" />
      <path d="M-4.6 -89 C-4.8 -84 -2.5 -80.5 0 -79.8 C2.5 -80.5 4.8 -84 4.6 -89 Z" />
      <rect x="-2.4" y="-85" width="4.8" height="6" />
      <path d="M-12.5 -73 C-13.5 -77.5 -11 -79.5 -7 -79.5 H7 C11 -79.5 13.5 -77.5 12.5 -73 L9.5 -56 H-9.5 Z" />
      <path d="M-10.5 -58 C-12.5 -42 -14 -22 -14.5 -1.5 Q0 1 14.5 -1.5 C14 -22 12.5 -42 10.5 -58 Z" />
      {children}
    </>
  );
}

/* Drapery folds and the himation's edge, scored into the marble. */
function Folds() {
  return (
    <g fill="none" stroke="var(--marble-shade)" strokeWidth="0.9" strokeLinecap="round" opacity="0.55">
      <path d="M-10.5 -58 Q0 -61.5 10.5 -58" />
      <path d="M-5.5 -54 C-6.5 -38 -7.5 -20 -8 -3" />
      <path d="M1 -55 C1.4 -38 1.8 -20 2.2 -3" />
      <path d="M7 -53 C7.6 -38 8.6 -20 9.2 -3" />
      <path d="M-11.5 -78 C-6 -72 2 -64 9.5 -58" />
    </g>
  );
}

function Zeus() {
  return (
    <Figure>
      {/* hair and a wreath */}
      <path d="M-5.6 -91.5 C-6.8 -98.5 -2.4 -100.6 0 -100.4 C2.4 -100.6 6.8 -98.5 5.6 -91.5 C3.5 -94.5 -3.5 -94.5 -5.6 -91.5 Z" />
      {[[-5.4, -95.2], [-3, -98.6], [0.4, -100.2], [3.6, -98.4], [5.8, -95]].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="1.6" />
      ))}
      {/* the thunderbolt, raised to strike on the moon's side, away from the name */}
      <Arm points="11,-76 20.5,-87 22,-103.5" hand={[22, -104]} />
      <path transform="translate(22 -106) rotate(-165)" d="M-2 -18 H-9 L-3 -5 H-9 L5 18 L1 2 H7 Z" />
      <Arm points="-11,-76 -17,-63 -18.5,-50" hand={[-18.6, -49]} />
    </Figure>
  );
}

function Poseidon() {
  return (
    <Figure>
      <path d="M-5.6 -91 C-7.6 -97 -3 -100.6 0 -100.2 C3 -100.6 7.6 -97 5.6 -91 C4 -94 -4 -94 -5.6 -91 Z" />
      {/* the trident, gripped at head height */}
      <path d="M-21 -1 V-108" stroke="currentColor" strokeWidth={SHAFT} />
      <path d="M-21 -106 V-121 M-27 -116 C-27 -109 -24.5 -107 -21 -107 C-17.5 -107 -15 -109 -15 -116" fill="none" stroke="currentColor" strokeWidth={SHAFT} />
      <path d="M-22.6 -120 L-21 -125.5 L-19.4 -120 Z M-28.6 -115 L-27 -120.5 L-25.4 -115 Z M-16.6 -115 L-15 -120.5 L-13.4 -115 Z" />
      <Arm points="-11,-76 -19,-70 -21,-86" hand={[-21, -87]} />
      {/* a hand on the hip */}
      <Arm points="11,-76 17.5,-66 11.5,-57" hand={[11, -56.5]} />
    </Figure>
  );
}

function Hades() {
  return (
    <>
      {/* the cloak, falling wide behind him */}
      <path d="M-12 -79 C-17 -60 -19 -30 -19.5 -1.5 Q0 0.5 19.5 -1.5 C19 -30 17 -60 12 -79 Z" />
      <Figure>
        {/* a crown of iron points */}
        <path d="M-5.5 -93.5 L-5.9 -100 L-3.2 -96.6 L-1.3 -102.4 L0.8 -96.6 L3 -101.2 L4.5 -96.2 L6 -99.8 L5.5 -93.5 Z" />
        {/* the bident, gripped at head height */}
        <path d="M21 -1 V-108" stroke="currentColor" strokeWidth={SHAFT} />
        <path d="M15.5 -117 C15.5 -110 18 -107.5 21 -107.5 C24 -107.5 26.5 -110 26.5 -117" fill="none" stroke="currentColor" strokeWidth={SHAFT} />
        <path d="M13.9 -116 L15.5 -121.5 L17.1 -116 Z M24.9 -116 L26.5 -121.5 L28.1 -116 Z" />
        <Arm points="11,-76 19,-70 21,-86" hand={[21, -87]} />
        <Arm points="-11,-76 -15.5,-64 -14,-52" hand={[-14, -51.5]} />
      </Figure>
    </>
  );
}

/* A plinth on the plateau, carried down to the slope by a pedestal. */
function Plinth({ drop }) {
  return (
    <>
      <rect x={-PLINTH_HALF} y={-PLINTH} width={PLINTH_HALF * 2} height={PLINTH} />
      <rect x="-15.5" y="0" width="31" height={Math.max(drop, 0) + 2} />
    </>
  );
}

const GODS = { zeus: Zeus, poseidon: Poseidon, hades: Hades };

/* Zeus stands behind the temple, tallest; his brothers flank it, their
   plinths level with his and tucked just behind its lowest step. Where a
   screen has less sky over the summit than Zeus needs at full size, all
   three shrink together to fit under the nav. */
const ZEUS_SCALE = 1.55;
const BROTHER_SCALE = 1.15;
const BOLT_TIP = 125; // figure units from Zeus's feet to the bolt's tip
const TUCK = 3; // world units the brothers' plinths sit behind the temple
const MIN_FIT = 0.4; // below this they would read as ornaments, not gods

function Defs() {
  return (
    <defs>
      {Object.entries(GODS).map(([name, God]) => (
        <g key={name}>
          <g id={`colossus-${name}`} fill="currentColor">
            <God />
          </g>
          <mask id={`colossus-${name}-shade`}>
            <use href={`#colossus-${name}`} color="white" />
            <use href={`#colossus-${name}`} color="black" transform={`translate(${SHADE_DEPTH} 0)`} />
          </mask>
        </g>
      ))}
    </defs>
  );
}

function Colossus({ god, x, y, scale, drop }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g fill="var(--marble)">
        <Plinth drop={drop / scale} />
      </g>
      <g transform={`translate(0 ${-PLINTH})`}>
        <use href={`#colossus-${god}`} color="var(--marble)" />
        <use href={`#colossus-${god}`} color="var(--marble-shade)" mask={`url(#colossus-${god}-shade)`} opacity="0.75" />
        <Folds />
      </g>
    </g>
  );
}

/* Draw before the temple, so it stands in front of Zeus. `groundAt(x)`
   gives the slope's height under each pedestal, `sky` the world units
   free over the summit, `aside` the temple's half-width in world units. */
export default function Colossi({ summit, groundAt, sky, aside }) {
  const [sx, sy] = summit;
  const fit = Math.max(MIN_FIT, Math.min(1, sky / ((PLINTH + BOLT_TIP) * ZEUS_SCALE)));
  const brother = BROTHER_SCALE * fit;
  const flank = aside + PLINTH_HALF * brother - TUCK;
  const stations = [
    { god: "zeus", dx: 0, scale: ZEUS_SCALE * fit },
    { god: "poseidon", dx: -flank, scale: brother },
    { god: "hades", dx: flank, scale: brother },
  ];
  return (
    <g>
      <Defs />
      {stations.map(({ god, dx, scale }) => {
        const x = sx + dx;
        const half = PLINTH_HALF * scale;
        const ground = Math.max(groundAt(x - half), groundAt(x + half));
        return <Colossus key={god} god={god} x={x} y={sy} scale={scale} drop={ground - sy} />;
      })}
    </g>
  );
}
