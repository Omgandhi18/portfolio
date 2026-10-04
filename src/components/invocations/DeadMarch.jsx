import { useState } from "react";
import { motion } from "framer-motion";
import { useEndsAfter } from "./useEndsAfter";
import { Cerberus, EmberGlow, Hoplite } from "../art/Underworld";

/* Hades answers with the dead. The underworld's shadow climbs the screen
   and a column of dead hoplites marches across it toward Olympus, with
   Cerberus at their head, before the dark lifts. */
const DEAD_MARCH_MS = 7200;

const SECONDS = DEAD_MARCH_MS / 1000;
const MARCH = { delay: 0.5, duration: 6.2 }; // seconds
const VIEW = { w: 1100, h: 190, ground: 182 };
const GLOW_ID = "underworld-ember";
const BACK_RANK = Array.from({ length: 10 }, (_, i) => ({ x: 34 + i * 86, phase: i * 0.11 }));
const FRONT_RANK = Array.from({ length: 9 }, (_, i) => ({ x: 70 + i * 92, phase: 0.3 + i * 0.13 }));
const CERBERUS_X = 962;

const SHADOW =
  "linear-gradient(to top, rgb(4 5 9 / 0.94) 0%, rgb(4 5 9 / 0.72) 32%, rgb(4 5 9 / 0.3) 68%, rgb(4 5 9 / 0.12) 100%)";
const EMBERS = "radial-gradient(ellipse 70% 100% at 50% 100%, rgb(230 120 80 / 0.24), transparent 70%)";
const MIST = "linear-gradient(to top, rgb(150 165 160 / 0.3), transparent)";

function Column() {
  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="h-full w-full overflow-visible">
      <defs>
        <EmberGlow id={GLOW_ID} />
      </defs>
      <g opacity="0.55">
        {BACK_RANK.map(({ x, phase }) => (
          <g key={x} transform={`translate(${x} ${VIEW.ground - 22}) scale(0.74)`}>
            <Hoplite phase={phase} glow={GLOW_ID} />
          </g>
        ))}
      </g>
      {FRONT_RANK.map(({ x, phase }) => (
        <g key={x} transform={`translate(${x} ${VIEW.ground}) scale(0.95)`}>
          <Hoplite phase={phase} glow={GLOW_ID} />
        </g>
      ))}
      <g transform={`translate(${CERBERUS_X} ${VIEW.ground})`}>
        <Cerberus glow={GLOW_ID} />
      </g>
    </svg>
  );
}

export default function DeadMarch({ onDone }) {
  useEndsAfter(DEAD_MARCH_MS, onDone);
  const [{ height, width }] = useState(() => {
    const height = Math.max(150, Math.min(innerHeight * 0.26, 260));
    return { height, width: (height * VIEW.w) / VIEW.h };
  });
  const veil = { initial: { opacity: 0 }, animate: { opacity: [0, 1, 1, 0] }, transition: { duration: SECONDS, times: [0, 0.1, 0.88, 1] } };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-storm overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: SHADOW }} {...veil} />
      <motion.div className="absolute inset-x-0 bottom-0 h-[34vh]" style={{ background: EMBERS }} {...veil} />
      <motion.div
        className="absolute bottom-[3vh] left-0"
        style={{ height, width }}
        initial={{ x: -width }}
        animate={{ x: innerWidth }}
        transition={{ delay: MARCH.delay, duration: MARCH.duration, ease: "linear" }}
      >
        <Column />
      </motion.div>
      <motion.div className="absolute inset-x-0 bottom-0 h-[9vh]" style={{ background: MIST }} {...veil} />
    </div>
  );
}
