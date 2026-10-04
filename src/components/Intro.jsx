import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_MS, INTRO_PLAYS, markArrived } from "../lib/intro";
import { EASE_IN_OUT } from "../lib/motion";

/* Arrival, once per session: Ω is inked, then the sky parts like a
   curtain to reveal the mountain. */
export default function Intro() {
  const [on, setOn] = useState(INTRO_PLAYS);

  useEffect(() => {
    if (!on) return;
    markArrived();
    const t = setTimeout(() => setOn(false), INTRO_MS - 700);
    return () => clearTimeout(t);
  }, [on]);

  return (
    <AnimatePresence>
      {on && (
        <motion.div key="intro" className="fixed inset-0 z-intro" aria-hidden="true">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-bg"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.95, ease: EASE_IN_OUT }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-bg"
            exit={{ y: "100%" }}
            transition={{ duration: 0.95, ease: EASE_IN_OUT }}
          />
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.4 }}
          >
            <svg viewBox="0 0 100 100" className="w-20 text-accent sm:w-24">
              <motion.path
                d="M14 86 H36 V78 C22 72 14 60 14 46 C14 26 30 12 50 12 C70 12 86 26 86 46 C86 60 78 72 64 78 V86 H86"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: EASE_IN_OUT }}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ duration: 1, delay: 0.5, ease: EASE_IN_OUT }}
              className="mt-6 pl-[0.32em] text-[0.7rem] font-bold uppercase text-ink/70"
            >
              Om Gandhi
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
