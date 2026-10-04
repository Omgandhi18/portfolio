import { useState } from "react";
import { motion } from "framer-motion";
import { useEndsAfter } from "./useEndsAfter";
import { isDark } from "../../theme";
import { bolt } from "../../lib/lightning";
import { zeusBoltOnScreen } from "../scene/Colossi";
import { Burst, CLIMAX, Lightning, Rain, STRIKE, Thunderhead } from "../art/Tempest";

/* Zeus answers with a storm. Thunderheads roll over the top of the
   screen, rain sets in, sheet lightning flickers in the clouds and two
   bolts come down; then the last and brightest finds the thunderbolt in
   his colossus's raised hand (when Olympus is in view) and bursts there,
   before the sky clears. */
const STORM_MS = 4800;

const SECONDS = STORM_MS / 1000;
const AT = { strikes: [1.35, 2.15], climax: 2.9 }; // seconds
const HALO_ID = "storm-halo";

/* A keyframe track from [seconds, value] pairs. */
const track = (pairs) => ({ values: pairs.map(([, v]) => v), times: pairs.map(([t]) => t / SECONDS) });
const VEIL = track([[0, 0], [0.6, 1], [4, 1], [SECONDS, 0]]);
const ROLL = track([[0, "-100%"], [0.7, "0%"], [4, "0%"], [SECONDS, "-100%"]]);
const RAIN = track([[0, 0], [0.5, 0], [1, 1], [3.9, 1], [4.5, 0], [SECONDS, 0]]);
const FLASH = track([
  [0, 0], [1.33, 0], [1.38, 0.45], [1.5, 0.05], [2.13, 0], [2.18, 0.4], [2.35, 0],
  [2.88, 0], [2.93, 0.85], [3.02, 0.12], [3.12, 0.7], [3.55, 0], [SECONDS, 0],
]);
/* The bank shudders with the last thunderclap. */
const RUMBLE = track([[0, 0], [2.92, 0], [2.98, -7], [3.06, 6], [3.14, -4], [3.24, 2], [3.34, 0], [SECONDS, 0]]);
const CLOUD_LIGHT = track([
  [0, 0], [0.73, 0], [0.78, 0.7], [0.86, 0.1], [0.98, 0], [1.02, 0.55], [1.15, 0],
  [1.35, 0.6], [1.55, 0], [2.15, 0.5], [2.4, 0], [2.9, 0.9], [3.05, 0.2], [3.15, 0.8], [3.6, 0], [SECONDS, 0],
]);

const SKIES = {
  night: {
    veil: "rgb(2 4 10 / 0.68)",
    cloud: "#070a12",
    cloudBack: "#0e1320",
    cloudLit: "#a9b8e0",
    rain: "rgb(185 205 235 / 0.4)",
    core: "#fffdf6",
    glow: "rgb(170 200 255)",
    flash: "rgb(225 232 250)",
  },
  day: {
    veil: "rgb(14 19 31 / 0.62)",
    cloud: "#1e2430",
    cloudBack: "#2c3342",
    cloudLit: "#e6ecf8",
    rain: "rgb(220 230 245 / 0.5)",
    core: "#ffffff",
    glow: "rgb(185 208 255)",
    flash: "rgb(255 252 244)",
  },
};

/* Where everything goes, decided once per storm: the cloud bank stays
   above Zeus's raised bolt; two strikes hit the ground; the last arcs in
   from the left to his bolt, or splits the screen if he isn't in view. */
function plan() {
  const w = innerWidth;
  const h = innerHeight;
  const target = zeusBoltOnScreen();
  const clouds = target ? Math.min(Math.max(target.y - 50, 56), h * 0.18) : h * 0.2;
  const base = clouds * 0.7;
  const r = Math.random;
  const toGround = (x) => bolt([x, base], [x + (r() - 0.5) * w * 0.2, h + 20]);
  return {
    w,
    h,
    clouds,
    target,
    strikes: [toGround(w * (0.12 + r() * 0.2)), toGround(w * (0.42 + r() * 0.16))],
    climax: target
      ? bolt([Math.max(w * 0.06, target.x - Math.max(w * 0.32, 160)), base * 0.8], [target.x, target.y], { forks: 2 })
      : bolt([w * (0.35 + r() * 0.3), base], [w * (0.3 + r() * 0.4), h + 20], { forks: 4 }),
  };
}

export default function Storm({ onDone }) {
  useEndsAfter(STORM_MS, onDone);
  const [{ sky, w, h, clouds, target, strikes, climax }] = useState(() => ({ sky: isDark() ? SKIES.night : SKIES.day, ...plan() }));
  const over = (t) => ({ duration: SECONDS, times: t.times });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-storm overflow-hidden">
      <motion.div className="absolute inset-0" style={{ background: sky.veil }} initial={{ opacity: 0 }} animate={{ opacity: VEIL.values }} transition={over(VEIL)} />
      <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: RAIN.values }} transition={over(RAIN)}>
        <Rain id="storm-rain-far" color={sky.rain} tile={[44, 160]} speed={0.55} weight={1} />
        <Rain id="storm-rain-near" color={sky.rain} tile={[70, 260]} speed={0.36} weight={1.6} />
      </motion.div>
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <filter id={HALO_ID} filterUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        {strikes.map((shape, i) => (
          <Lightning key={AT.strikes[i]} shape={shape} at={AT.strikes[i]} flicker={STRIKE} width={2.6} core={sky.core} glow={sky.glow} halo={HALO_ID} />
        ))}
        <Lightning shape={climax} at={AT.climax} flicker={CLIMAX} width={4} core={sky.core} glow={sky.glow} halo={HALO_ID} />
      </svg>
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ height: clouds + 80 }}
        initial={{ y: "-100%" }}
        animate={{ y: ROLL.values }}
        transition={{ ...over(ROLL), ease: "easeInOut" }}
      >
        <motion.div className="h-full w-full" initial={{ x: 0 }} animate={{ x: RUMBLE.values }} transition={over(RUMBLE)}>
          <Thunderhead width={w} depth={clouds} fill={sky.cloud} back={sky.cloudBack} lit={sky.cloudLit} flicker={CLOUD_LIGHT} duration={SECONDS} />
        </motion.div>
      </motion.div>
      {target && <Burst x={target.x} y={target.y} at={AT.climax} core={sky.core} glow={sky.glow} />}
      <motion.div className="absolute inset-0" style={{ background: sky.flash }} initial={{ opacity: 0 }} animate={{ opacity: FLASH.values }} transition={over(FLASH)} />
    </div>
  );
}
