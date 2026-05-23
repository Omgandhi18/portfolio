import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "OM GANDHI".split("");

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Wait for BOTH fonts AND a minimum display time so the animation
    // always plays to completion — whichever takes longer wins.
    const minDisplay = new Promise((r) => setTimeout(r, 1800));
    const cap        = setTimeout(() => setDone(true), 3500);

    Promise.all([document.fonts.ready, minDisplay]).then(() => {
      clearTimeout(cap);
      // Brief pause so the completed state is visible before fade-out
      setTimeout(() => setDone(true), 350);
    });

    return () => clearTimeout(cap);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Name reveal */}
          <div className="overflow-hidden flex">
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-clash font-bold text-4xl md:text-6xl tracking-tight inline-block"
                style={{ whiteSpace: "pre" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Gradient underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 h-[2px] w-48 origin-left"
            style={{ background: "linear-gradient(90deg, #FF5F1F, #E040FB)" }}
          />

          {/* Loading bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.2, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 h-px w-32 origin-left"
            style={{ background: "linear-gradient(90deg, #FF5F1F40, #E040FB40)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
