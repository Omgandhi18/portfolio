import { useEffect } from "react";

/* An invocation runs its course, then lets go of the screen. */
export function useEndsAfter(ms, onDone) {
  useEffect(() => {
    const t = setTimeout(onDone, ms);
    return () => clearTimeout(t);
  }, [ms, onDone]);
}
