import { useEffect } from "react";
import { isDark, requestTravel } from "../theme";

/* Speak the name of a realm and the gates will answer.
   Type "olympus" or "othrys" anywhere outside a field. */

const WORDS = [
  { word: "olympus", dark: false },
  { word: "othrys", dark: true },
];

const BUFFER_MAX = 8;

export default function Invocation() {
  useEffect(() => {
    let buffer = "";
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-BUFFER_MAX);
      const spoken = WORDS.find(({ word }) => buffer.endsWith(word));
      if (spoken && spoken.dark !== isDark()) {
        buffer = "";
        requestTravel(spoken.dark);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
