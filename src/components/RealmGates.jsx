import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { isDark, setDark } from "../theme";
import GreekDecrypt from "./GreekDecrypt";

/* The doors of the destination realm close over the screen, the world
   changes behind them, and they part to let you through. Colours are
   literal, not tokens — the tokens flip mid-crossing. */

const REALMS = {
  dark: {
    bg: "#141210",
    line: "rgba(194, 164, 104, 0.4)",
    lineSoft: "rgba(194, 164, 104, 0.2)",
    glyph: "#C2A468",
    shade: "rgba(0, 0, 0, 0.45)",
    name: "ΟΘΡΥΣ",
    latin: "OTHRYS",
    tone: 0.85,
    grit: 0.1,
  },
  light: {
    bg: "#F2EEE3",
    line: "rgba(120, 95, 53, 0.4)",
    lineSoft: "rgba(120, 95, 53, 0.2)",
    glyph: "#785F35",
    shade: "rgba(28, 27, 24, 0.12)",
    name: "ΟΛΥΜΠΟΣ",
    latin: "OLYMPUS",
    tone: 0.5,
    grit: 0.07,
  },
};

/* Broad tonal variation — the cloudiness of stone. */
const TONE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='700'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.004 0.009' numOctaves='3' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0.45 0 0 0 0 0.42 0 0 0 0 0.36 0 0 0 0.03 0'/%3E%3C/filter%3E%3Crect width='700' height='700' filter='url(%23m)'/%3E%3C/svg%3E\")";

/* Fine grit — the tooth of the surface. */
const GRIT =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.47 0 0 0 0 0.4 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23g)'/%3E%3C/svg%3E\")";

const CLOSE = { duration: 0.55, ease: [0.65, 0, 0.35, 1] };
const OPEN = { duration: 0.85, ease: [0.22, 1, 0.36, 1] };
const HOLD_MS = 1000;
const ARRIVE_HOLD_MS = 1150;

/* Every load begins at the realm's gates, already shut —
   they open to let you in. */
function shouldArrive() {
  return !matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Coffer({ realm, className = "" }) {
  return (
    <div className={`relative border ${className}`} style={{ borderColor: realm.line }}>
      <div
        className="absolute inset-1.5 border sm:inset-2.5"
        style={{ borderColor: realm.lineSoft }}
      />
      {/* the boss at the heart of each coffer */}
      <div
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ background: realm.glyph, opacity: 0.5 }}
      />
    </div>
  );
}

function DoorPanel({ side, realm, covered, arriving, onDone }) {
  const left = side === "left";
  return (
    <motion.div
      initial={{ x: arriving ? "0%" : left ? "-101%" : "101%" }}
      animate={{ x: covered ? "0%" : left ? "-101%" : "101%" }}
      transition={covered ? CLOSE : OPEN}
      onAnimationComplete={left ? onDone : undefined}
      className={`absolute inset-y-0 w-[50.5%] ${left ? "left-0" : "right-0"}`}
      style={{ background: realm.bg }}
    >
      {/* stone */}
      <div className="absolute inset-0" style={{ backgroundImage: TONE, opacity: realm.tone }} />
      <div className="absolute inset-0" style={{ backgroundImage: GRIT, opacity: realm.grit }} />
      {/* outer door frame */}
      <div
        className={`absolute inset-y-4 border sm:inset-y-6 ${
          left ? "left-4 right-3 sm:left-6 sm:right-4" : "left-3 right-4 sm:left-4 sm:right-6"
        }`}
        style={{ borderColor: realm.line }}
      />
      {/* coffered field */}
      <div
        className={`absolute inset-y-10 grid grid-cols-1 grid-rows-3 gap-4 sm:inset-y-14 sm:grid-cols-2 sm:gap-6 ${
          left ? "left-9 right-8 sm:left-14 sm:right-12" : "left-8 right-9 sm:left-12 sm:right-14"
        }`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <Coffer key={i} realm={realm} className={i > 2 ? "hidden sm:block" : ""} />
        ))}
      </div>
      {/* depth gathers at the seam */}
      <div
        className={`absolute inset-y-0 w-16 sm:w-24 ${left ? "right-0" : "left-0"}`}
        style={{
          background: `linear-gradient(${left ? "to left" : "to right"}, ${realm.shade}, transparent)`,
        }}
      />
      {/* the seam */}
      <div
        className={`absolute inset-y-0 w-px ${left ? "right-0" : "left-0"}`}
        style={{ background: realm.line }}
      />
      {/* ring handle hung from its boss */}
      <div
        className={`absolute top-[62%] -translate-y-1/2 ${left ? "right-7 sm:right-10" : "left-7 sm:left-10"}`}
      >
        <div
          className="mx-auto h-2 w-2 rounded-full"
          style={{ background: realm.glyph, opacity: 0.9 }}
        />
        <div
          className="-mt-0.5 h-8 w-8 rounded-full border-2"
          style={{ borderColor: realm.glyph, opacity: 0.8 }}
        />
      </div>
    </motion.div>
  );
}

export default function RealmGates() {
  // { dark, stage: "arriving" | "closing" | "opening" }
  const [travel, setTravel] = useState(() =>
    shouldArrive() ? { dark: isDark(), stage: "arriving" } : null
  );
  const busy = useRef(travel !== null);

  useEffect(() => {
    if (travel?.stage === "arriving") {
      const open = setTimeout(
        () => setTravel((t) => t && { ...t, stage: "opening" }),
        ARRIVE_HOLD_MS
      );
      return () => clearTimeout(open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- arrival runs once, from mount state
  }, []);

  useEffect(() => {
    const onTravel = (e) => {
      if (busy.current) return;
      busy.current = true;
      setTravel({ dark: e.detail.dark, stage: "closing" });
    };
    window.addEventListener("realm:travel", onTravel);
    return () => window.removeEventListener("realm:travel", onTravel);
  }, []);

  if (!travel) return null;

  const realm = REALMS[travel.dark ? "dark" : "light"];
  const { stage } = travel;
  const covered = stage !== "opening";
  const arriving = stage === "arriving";

  const onLeftPanelDone = () => {
    if (stage === "closing") {
      // Doors are shut — the world changes behind them.
      setDark(travel.dark);
      setTimeout(
        () => setTravel((t) => t && { ...t, stage: "opening" }),
        HOLD_MS
      );
    } else if (stage === "opening") {
      busy.current = false;
      setTravel(null);
    }
    // "arriving" ends via its own timer, not the door animation
  };

  return (
    <div className="fixed inset-0 z-[95] overflow-hidden" aria-hidden="true">
      <DoorPanel side="left" realm={realm} covered={covered} arriving={arriving} onDone={onLeftPanelDone} />
      <DoorPanel side="right" realm={realm} covered={covered} arriving={arriving} />
      {/* the realm announces itself at the seam */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: covered ? 1 : 0 }}
        transition={
          stage === "closing"
            ? { duration: 0.45, delay: 0.4 }
            : arriving
              ? { duration: 0.6, delay: 0.15 }
              : { duration: 0.18 }
        }
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <span className="font-display text-5xl sm:text-6xl" style={{ color: realm.glyph }}>
          Ω
        </span>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ background: realm.line }} />
          <p
            className="font-body text-sm tracking-[0.35em]"
            style={{ color: realm.glyph, paddingLeft: "0.35em" }}
          >
            <GreekDecrypt
              greek={realm.name}
              english={realm.latin}
              trigger="mount"
              delay={arriving ? 450 : 950}
              duration={550}
            />
          </p>
          <span className="h-px w-8" style={{ background: realm.line }} />
        </div>
      </motion.div>
    </div>
  );
}
