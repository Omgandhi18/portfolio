import Lenis from "lenis";
import { prefersReducedMotion } from "../theme";

/* One smooth-scroll instance for the whole page. Absent under reduced
   motion, in which case every helper falls back to native behaviour. */
let lenis = null;

export function startLenis() {
  if (lenis || prefersReducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, anchors: { offset: -72 } });
  let frame;
  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  lenis.__stop = () => cancelAnimationFrame(frame);
  return lenis;
}

export function stopLenis() {
  lenis?.__stop();
  lenis?.destroy();
  lenis = null;
}

export function lockScroll(locked) {
  if (lenis) {
    locked ? lenis.stop() : lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === "top" ? 0 : -72, duration: 1.6 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}
