import { useEffect, useState } from "react";
import { isDark } from "../theme";

/* Re-renders only on an actual realm change. */
export function useIsDark() {
  const [dark, setDark] = useState(isDark);
  useEffect(() => {
    const sync = () => setDark(isDark());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);
  return dark;
}
