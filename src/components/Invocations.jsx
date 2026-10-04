import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { prefersReducedMotion, travel } from "../theme";

/* Speak a name and something answers. Type, anywhere outside a field:
   "olympus" for day, or a god's name: "zeus" for weather, "poseidon" for
   the sea, "hades" for the dead. The command palette summons the gods by
   the same names, as window events. Each answer is fetched the first
   time it's called for, and ends itself when it has run its course. */
const GODS = {
  zeus: lazy(() => import("./invocations/Storm")),
  poseidon: lazy(() => import("./invocations/Flood")),
  hades: lazy(() => import("./invocations/DeadMarch")),
};
const DAYBREAK = "olympus";
const WORDS = [DAYBREAK, ...Object.keys(GODS)];
const LONGEST_WORD = Math.max(...WORDS.map((w) => w.length));

export default function Invocations() {
  const [answer, setAnswer] = useState(null); // { god, id }
  const done = useCallback(() => setAnswer(null), []);

  useEffect(() => {
    let buffer = "";
    const summon = (god) => {
      if (prefersReducedMotion()) return;
      setAnswer({ god, id: Date.now() });
    };
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-LONGEST_WORD);
      const word = WORDS.find((w) => buffer.endsWith(w));
      if (!word) return;
      buffer = "";
      if (word === DAYBREAK) travel(false);
      else summon(word);
    };
    const calls = Object.keys(GODS).map((god) => [god, () => summon(god)]);
    window.addEventListener("keydown", onKey);
    calls.forEach(([god, call]) => window.addEventListener(god, call));
    return () => {
      window.removeEventListener("keydown", onKey);
      calls.forEach(([god, call]) => window.removeEventListener(god, call));
    };
  }, []);

  if (!answer) return null;
  const Answer = GODS[answer.god];
  return (
    <Suspense fallback={null}>
      <Answer key={answer.id} onDone={done} />
    </Suspense>
  );
}
