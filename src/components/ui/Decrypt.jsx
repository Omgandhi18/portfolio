import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/* Greek resolves into English: letters flicker through the alphabet and
   settle left to right, the way an inscription gives itself up. */

const ALPHABET = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
const KEEP = /[\s.,'’\-·&]/;
const TICK_MS = 42;

export default function Decrypt({
  greek,
  english,
  className = "",
  trigger = "view",
  delay = 300,
  duration = 1000,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
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
      const settle = Array.from(
        english,
        (_, i) => (i / english.length) * duration * 0.55 + Math.random() * duration * 0.35
      );
      const t0 = performance.now();
      interval = setInterval(() => {
        const t = performance.now() - t0;
        let out = "";
        let done = true;
        for (let i = 0; i < english.length; i++) {
          if (KEEP.test(english[i]) || t >= settle[i]) out += english[i];
          else {
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
  }, [armed, reduced, english, delay, duration]);

  return (
    <span ref={ref} className={className} aria-label={english}>
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
