import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, DownloadSimple } from "@phosphor-icons/react";
import { profile } from "../../data/profile";
import { EASE } from "../../lib/motion";
import { HERO_DELAY } from "../../lib/intro";
import { scrollToId } from "../../lib/lenis";
import { skyOverSummit, terrain, windowFor } from "../scene/terrain";
import { Cypress, Portico, SceneDefs, StonePine, SummitTemple, TEMPLE_HALF_WIDTH, VillageLights } from "../scene/Props";
import Colossi from "../scene/Colossi";
import Clouds from "../scene/Clouds";
import Starfield from "../scene/Starfield";
import Birds from "../scene/Birds";
import { Moon, Sun } from "../scene/Celestial";
import Magnetic from "../ui/Magnetic";

/* Pointer parallax: one spring-smoothed pair shared by every layer. */
function usePointer() {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 40, damping: 18 });
  const sy = useSpring(py, { stiffness: 40, damping: 18 });
  useEffect(() => {
    if (reduced || matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e) => {
      px.set((e.clientX / innerWidth) * 2 - 1);
      py.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, px, py]);
  return { sx, sy };
}

const NAV_CLEAR_PX = 80; // the nav bar (h-16) and a little air under it
const TEMPLE_SCALE = 1.55;

/* Every layer of the world shares one view box, chosen so Olympus stays
   in frame on any screen; `sky` is how much of it the colossi may rise
   into without passing under the nav. */
function frameFor(width, height) {
  const aspect = (width * 1.08) / height;
  return { viewBox: windowFor(aspect), sky: skyOverSummit(aspect, height, NAV_CLEAR_PX) };
}

function useWorldWindow(ref) {
  const [frame, setFrame] = useState(() => frameFor(innerWidth, innerHeight));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (height) setFrame(frameFor(width, height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return frame;
}

function Layer({ depth, sink, progress, pointer, className = "", children }) {
  const x = useTransform(pointer.sx, (v) => v * depth * -42);
  const yPointer = useTransform(pointer.sy, (v) => v * depth * -14);
  const yScroll = useTransform(progress, [0, 1], ["0vh", `${sink}vh`]);
  return (
    <motion.div aria-hidden="true" style={{ x, y: yScroll }} className={`absolute inset-0 will-change-transform ${className}`}>
      <motion.div style={{ y: yPointer }} className="absolute inset-0">
        {children}
      </motion.div>
    </motion.div>
  );
}

function World({ viewBox, children }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-y-0 -left-[4%] h-full w-[108%]"
    >
      <SceneDefs />
      {children}
    </svg>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const pointer = usePointer();
  const { viewBox, sky } = useWorldWindow(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Under reduced motion the scene holds still: every layer reads a
  // progress that never moves.
  const still = useMotionValue(0);
  const progress = reduced ? still : scrollYProgress;

  const titleSink = useTransform(progress, [0, 1], ["0vh", "62vh"]);
  const titleFade = useTransform(progress, [0, 0.55, 0.8], [1, 1, 0]);
  const copyFade = useTransform(progress, [0, 0.25], [1, 0]);
  const copyLift = useTransform(progress, [0, 0.25], ["0vh", "-4vh"]);
  const mistRise = useTransform(progress, [0, 1], ["35%", "-5%"]);
  const mistFade = useTransform(progress, [0, 0.12, 0.6], [0, 0.85, 1]);

  const skySink = useTransform(progress, [0, 1], ["0vh", "80vh"]);
  const { summit } = terrain.massif;
  const d = HERO_DELAY;

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative h-[100dvh] min-h-[600px] overflow-hidden bg-[var(--sky-mid)]"
    >
      {/* sky */}
      <motion.div
        style={{ y: skySink }}
        className="absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 46%, var(--sky-low) 74%, var(--sky-low) 100%)",
          }}
        />
        <Starfield className="hidden dark:block" />
      </motion.div>

      <Layer depth={0.05} sink={70} progress={progress} pointer={pointer}>
        {/* on wide screens the summit sits high and right, so they move out over the colossi's shoulders */}
        <Sun className="right-[17%] top-[9%] sm:right-[12%] sm:top-[8%] lg:right-[5%]" />
        <Moon className="right-[18%] top-[9%] sm:right-[13%] sm:top-[8%] lg:right-[6%]" />
      </Layer>

      <Birds />

      <Layer depth={0.1} sink={58} progress={progress} pointer={pointer}>
        <World viewBox={viewBox}>
          <path d={terrain.far.fill} fill="var(--ridge-1)" />
          <path d={terrain.far.snow} fill="var(--snow)" opacity="0.55" />
          <path d={terrain.far.fill} fill="url(#haze-down)" />
          <path d={terrain.far.rim} fill="none" stroke="var(--rim)" strokeWidth="1.2" opacity="0.5" vectorEffect="non-scaling-stroke" />
        </World>
      </Layer>

      <Layer depth={0.18} sink={42} progress={progress} pointer={pointer}>
        <World viewBox={viewBox}>
          <clipPath id="massif-clip">
            <path d={terrain.massif.fill} />
          </clipPath>
          <path d={terrain.massif.fill} fill="var(--ridge-2)" />
          <path d={terrain.massif.snow} fill="var(--snow)" />
          <g fill="none" stroke="var(--ridge-3)" strokeWidth="1.2" opacity="0.28" vectorEffect="non-scaling-stroke">
            {terrain.massif.gullies.map((g) => (
              <path key={g} d={g} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <path d={terrain.massif.shadow} fill="var(--ridge-3)" opacity="0.38" clipPath="url(#massif-clip)" />
          <path d={terrain.massif.fill} fill="url(#haze-down)" />
          <path d={terrain.massif.rim} fill="none" stroke="var(--rim)" strokeWidth="1.4" opacity="0.7" vectorEffect="non-scaling-stroke" />
          <Colossi summit={summit} groundAt={terrain.massifAt} sky={sky} aside={TEMPLE_HALF_WIDTH * TEMPLE_SCALE} />
          <SummitTemple x={summit[0]} y={summit[1]} scale={TEMPLE_SCALE} />
        </World>
        <Clouds seed={8} count={5} density={0.8} drift={170} className="inset-x-0 top-[49%] h-[17%]" />
      </Layer>

      {/* the name rises from behind the near hills, and sinks back on scroll */}
      <motion.div style={{ y: titleSink, opacity: titleFade }} className="absolute inset-x-0 top-[17%] sm:top-[19%]">
        <div className="mx-auto max-w-site px-5 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: d + 0.9, ease: EASE }}
            className="label flex items-center gap-3 text-ink/80"
          >
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {profile.epithet}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: "48vh" }}
            animate={{ opacity: 1, y: "0vh" }}
            transition={{ duration: 2.1, delay: d, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-display text-[clamp(4.5rem,22vw,9rem)] font-normal leading-[0.86] tracking-[-0.02em] text-ink sm:text-[clamp(5rem,12.6vw,12rem)]"
          >
            Om <span className="block sm:inline">Gandhi</span>
          </motion.h1>
        </div>
      </motion.div>

      <Layer depth={0.3} sink={14} progress={progress} pointer={pointer}>
        <World viewBox={viewBox}>
          <path d={terrain.near.fill} fill="var(--ridge-3)" />
          <path d={terrain.near.fill} fill="url(#haze-down)" opacity="0.5" />
          <path d={terrain.near.rim} fill="none" stroke="var(--rim)" strokeWidth="1.2" opacity="0.45" vectorEffect="non-scaling-stroke" />
          <VillageLights
            points={[
              [700, terrain.nearAt(700) + 26, 0],
              [736, terrain.nearAt(736) + 38, 0.8],
              [1090, terrain.nearAt(1090) + 30, 1.6],
              [1124, terrain.nearAt(1124) + 44, 0.4],
              [420, terrain.nearAt(420) + 34, 1.1],
            ]}
          />
        </World>
      </Layer>

      <Layer depth={0.45} sink={0} progress={progress} pointer={pointer} className="-bottom-[2%]">
        <World viewBox={viewBox}>
          <path d={terrain.ground.fill} fill="var(--ridge-4)" />
          <path d={terrain.ground.rim} fill="none" stroke="var(--rim)" strokeWidth="1.2" opacity="0.35" vectorEffect="non-scaling-stroke" />
          <Portico x={760} y={terrain.groundAt(800) + 6} scale={0.62} />
          <Cypress x={1452} y={terrain.groundAt(1452) + 4} h={250} w={26} />
          <Cypress x={1484} y={terrain.groundAt(1484) + 4} h={200} w={22} />
          <Cypress x={1512} y={terrain.groundAt(1512) + 4} h={160} w={19} />
          <StonePine x={1190} y={terrain.groundAt(1190) + 4} scale={0.75} />
        </World>
      </Layer>

      {/* shade of the terrace, so the copy always sits on solid ground */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
        style={{ background: "linear-gradient(to top, rgb(var(--c-ground) / 0.92), rgb(var(--c-ground) / 0.55) 45%, transparent)" }}
      />

      <motion.div
        style={{ opacity: copyFade, y: copyLift }}
        className="absolute inset-x-0 bottom-[7vh] sm:bottom-[9vh]"
      >
        <div className="mx-auto max-w-site px-5 sm:px-10">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: d + 1.2, ease: EASE }}
            className="max-w-[26rem] text-[1.05rem] leading-relaxed text-on-ground/85 sm:text-lg"
          >
            {profile.hero}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: d + 1.4, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#erga"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("erga");
                }}
                className="btn btn-solid group"
              >
                See the work
                <ArrowDownRight size={16} weight="bold" className="transition-transform duration-500 ease-myth group-hover:rotate-[-45deg]" />
              </a>
            </Magnetic>
            <a href={profile.resume} download className="btn btn-ghost text-on-ground/90 hover:bg-on-ground hover:text-ground">
              Résumé
              <DownloadSimple size={16} weight="bold" />
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* climbing into the clouds: the mist that hands over to the page */}
      <motion.div
        aria-hidden="true"
        style={{ y: mistRise, opacity: mistFade }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
      >
        <Clouds seed={21} count={6} density={1.2} drift={120} className="inset-x-0 top-0 h-[60%]" />
        <div className="absolute inset-x-0 bottom-0 h-[70%]" style={{ background: "linear-gradient(to top, rgb(var(--c-bg)) 35%, rgb(var(--c-bg) / 0))" }} />
      </motion.div>
    </section>
  );
}
