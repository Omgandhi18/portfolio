import { prefersReducedMotion } from "../theme";

/* The arrival plays once per session. Everything that choreographs
   around it asks here first. */
const KEY = "olympus:arrived";

function decide() {
  if (typeof window === "undefined" || prefersReducedMotion()) return false;
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return false;
  }
}

export const INTRO_PLAYS = decide();
export const INTRO_MS = 2100;

export function markArrived() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* fine */
  }
}

/* Seconds the hero should wait before its own entrance. */
export const HERO_DELAY = INTRO_PLAYS ? 1.75 : 0.15;
