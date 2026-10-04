import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isDark, prefersReducedMotion, travel } from "../theme";

/* Speak a name and something answers. Type, anywhere outside a field:
   "olympus" for day, "othrys" for night, "zeus" for weather. */
const WORDS = ["olympus", "othrys", "zeus"];

function Bolt({ x }) {
  return (
    <svg viewBox="0 0 120 600" preserveAspectRatio="none" className="absolute top-0 h-[78vh] w-[12vw] max-w-[180px]" style={{ left: `${x}%` }}>
      <path
        d="M70 0 L52 150 L76 142 L40 330 L66 318 L24 600"
        fill="none"
        stroke="rgb(255 244 228)"
        strokeWidth="3.2"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 10px rgba(255,236,210,0.95)) drop-shadow(0 0 32px rgba(230,120,80,0.6))" }}
      />
      <path d="M52 150 L30 220 M40 330 L18 380" fill="none" stroke="rgb(255 244 228)" strokeWidth="1.6" opacity="0.8" />
    </svg>
  );
}

export default function Invocations() {
  const [strike, setStrike] = useState(null);

  useEffect(() => {
    let buffer = "";
    const summon = () => {
      if (prefersReducedMotion()) return;
      setStrike({ id: Date.now(), x: 12 + Math.random() * 70 });
    };
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-10);
      const word = WORDS.find((w) => buffer.endsWith(w));
      if (!word) return;
      buffer = "";
      if (word === "zeus") summon();
      else travel(word === "othrys");
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("zeus", summon);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("zeus", summon);
    };
  }, []);

  useEffect(() => {
    if (!strike) return;
    const t = setTimeout(() => setStrike(null), 1500);
    return () => clearTimeout(t);
  }, [strike]);

  return (
    <AnimatePresence>
      {strike && (
        <motion.div key={strike.id} aria-hidden="true" className="pointer-events-none fixed inset-0 z-storm">
          <motion.div
            className="absolute inset-0"
            style={{ background: isDark() ? "rgb(220 228 245)" : "rgb(255 250 240)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.05, 0.75, 0.1, 0.3, 0] }}
            transition={{ duration: 1.2, times: [0, 0.06, 0.16, 0.28, 0.5, 0.65, 1] }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0.4, 0] }}
            transition={{ duration: 1.1, times: [0, 0.05, 0.15, 0.27, 0.5, 1] }}
          >
            <Bolt x={strike.x} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
