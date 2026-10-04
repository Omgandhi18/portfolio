import { useState } from "react";
import { motion } from "framer-motion";
import { useEndsAfter } from "./useEndsAfter";
import { isDark } from "../../theme";
import { Serpent, Tentacle, Trident } from "../art/Leviathans";

/* Poseidon answers with the sea. It floods up the screen to the foot of
   the summit temple when Olympus is in view (most of the way up when it
   isn't), the kraken and the serpent break the surface, the trident
   rises, and the water drains away. */
const FLOOD_MS = 5600;

const SECONDS = FLOOD_MS / 1000;
const CREST = 36; // px of swell above the water's body
const SURFACE = CREST - 4; // where things break the water, inside the flood
const OFF_OLYMPUS = 0.3; // waterline as a fraction of the screen, away from the hero
/* How tall each rises: [vmin, share of the sky above the water], whichever
   is smaller, so nothing breaks out of the top of a screen where the
   summit (and so the water) sits high. */
const REACH = {
  kraken: [34, 0.7],
  krakenSmall: [26, 0.55],
  trident: [46, 0.85],
  serpent: [20, 0.45],
};

const SEAS = {
  night: {
    tint: "rgb(6 24 38 / 0.38)",
    swell: "#245a74",
    body: "#0e3047",
    deep: "#06141f",
    foam: "rgb(190 226 236 / 0.55)",
    creature: "#0a2333",
    rim: "rgb(132 206 224 / 0.6)",
    eye: "#9ef0ff",
    metal: "#f3e4b8",
    glow: "rgb(120 230 255 / 0.85)",
  },
  day: {
    tint: "rgb(40 110 150 / 0.22)",
    swell: "#5aa6c6",
    body: "#2f7aa0",
    deep: "#123f5c",
    foam: "rgb(255 255 255 / 0.75)",
    creature: "#1c4f6b",
    rim: "rgb(200 238 248 / 0.8)",
    eye: "#e8fcff",
    metal: "#f6e7b8",
    glow: "rgb(255 236 180 / 0.9)",
  },
};

/* The foot of the summit temple, if Olympus is on screen. */
function waterline() {
  const step = document.querySelector("[data-summit]")?.getBoundingClientRect();
  const inView = step && step.bottom > innerHeight * 0.1 && step.bottom < innerHeight * 0.9;
  return inView ? step.bottom : innerHeight * OFF_OLYMPUS;
}

/* A seamless band of swell: two lengths of the same wave train, scrolled
   one length sideways forever. */
const SWELL_LENGTH = 1200;
function Swell({ fill, foam, amp, period, base, dur, reverse = false }) {
  let d = `M0 ${base} Q${period / 4} ${base - amp} ${period / 2} ${base}`;
  for (let x = period; x <= SWELL_LENGTH * 2; x += period / 2) d += ` T${x} ${base}`;
  const from = reverse ? -SWELL_LENGTH : 0;
  return (
    <svg viewBox={`0 0 ${SWELL_LENGTH} ${CREST}`} preserveAspectRatio="none" className="absolute inset-x-0 top-0 w-full" style={{ height: CREST }}>
      <g>
        <animateTransform attributeName="transform" type="translate" values={`${from} 0;${-SWELL_LENGTH - from} 0`} dur={`${dur}s`} repeatCount="indefinite" />
        <path d={`${d} V${CREST} H0 Z`} fill={fill} />
        {foam && <path d={d} fill="none" stroke={foam} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />}
      </g>
    </svg>
  );
}

/* Something that breaks the surface during `times` ([submerged, rising,
   up, sinking, gone] as fractions of the flood), optionally drifting. */
function Surfacing({ h, left, times, drift, children }) {
  return (
    <motion.div
      className="absolute"
      style={{ height: h, left, top: SURFACE - h }}
      initial={{ y: h }}
      animate={{ y: [h, h, 0, 0, h], ...(drift && { x: drift.x }) }}
      transition={{
        y: { duration: SECONDS, times, ease: "easeInOut" },
        ...(drift && { x: { duration: SECONDS, times: drift.times, ease: "linear" } }),
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Flood({ onDone }) {
  useEndsAfter(FLOOD_MS, onDone);
  const [{ sea, line, size }] = useState(() => {
    const line = waterline();
    const vmin = Math.min(innerWidth, innerHeight) / 100;
    const size = Object.fromEntries(Object.entries(REACH).map(([k, [v, share]]) => [k, Math.min(v * vmin, share * line)]));
    return { sea: isDark() ? SEAS.night : SEAS.day, line, size };
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-storm overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ background: sea.tint }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: SECONDS, times: [0, 0.2, 0.8, 1] }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ top: line - CREST }}
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "100%"] }}
        transition={{ duration: SECONDS, times: [0, 0.36, 0.74, 1], ease: ["easeOut", "linear", "easeIn"] }}
      >
        <Swell fill={sea.swell} amp={9} period={300} base={12} dur={5.5} />

        <Surfacing h={size.kraken} left="4%" times={[0, 0.3, 0.4, 0.64, 0.72]}>
          <Tentacle body={sea.creature} rim={sea.rim} />
        </Surfacing>
        <Surfacing h={size.krakenSmall} left="13%" times={[0, 0.34, 0.44, 0.62, 0.7]}>
          <Tentacle body={sea.creature} rim={sea.rim} sway={9} begin={0.8} />
        </Surfacing>
        <Surfacing h={size.trident} left={`calc(36% - ${(size.trident * 80) / 300 / 2}px)`} times={[0, 0.4, 0.52, 0.64, 0.72]}>
          <Trident metal={sea.metal} glow={sea.glow} />
        </Surfacing>
        <Surfacing
          h={size.serpent}
          left="0%"
          times={[0, 0.22, 0.3, 0.66, 0.74]}
          drift={{ x: ["-60vw", "-60vw", "80vw"], times: [0, 0.2, 0.8] }}
        >
          <Serpent body={sea.creature} rim={sea.rim} eye={sea.eye} />
        </Surfacing>

        <Swell fill={sea.body} foam={sea.foam} amp={7} period={240} base={20} dur={3.8} reverse />
        <div className="absolute inset-x-0 bottom-0" style={{ top: CREST - 1, background: `linear-gradient(${sea.body}, ${sea.deep})` }} />
      </motion.div>
    </div>
  );
}
