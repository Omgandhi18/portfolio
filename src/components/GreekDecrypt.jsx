import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/* A phrase carved in Greek resolves into English — letters flicker
   through the alphabet and settle left to right, the way inscriptions
   give themselves up to a demigod's eye. */

const ALPHABET = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
const KEEP = /[\s.,'’\-—·]/; // spaces and punctuation never scramble

const TICK_MS = 40;

export default function GreekDecrypt({
  greek,
  english,
  className = "",
  trigger = "view", // "view" | "mount"
  delay = 1200,
  duration = 1100,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [text, setText] = useState(greek);
  const armed = trigger === "mount" || inView;

  useEffect(() => {
    if (!armed) return;

    if (reduced) {
      const swap = setTimeout(() => setText(english), delay);
      return () => clearTimeout(swap);
    }

    let interval;
    const start = setTimeout(() => {
      // each letter settles on its own moment, sweeping left to right
      const settle = Array.from(
        english,
        (_, i) =>
          (i / english.length) * duration * 0.55 + Math.random() * duration * 0.35
      );
      const t0 = performance.now();
      interval = setInterval(() => {
        const t = performance.now() - t0;
        let out = "";
        let done = true;
        for (let i = 0; i < english.length; i++) {
          if (KEEP.test(english[i]) || t >= settle[i]) {
            out += english[i];
          } else {
            out += ALPHABET[(Math.random() * ALPHABET.length) | 0];
            done = false;
          }
        }
        setText(out);
        if (done) clearInterval(interval);
      }, TICK_MS);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [armed, reduced, greek, english, delay, duration]);

  return (
    <span ref={ref} className={className} aria-label={english}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
