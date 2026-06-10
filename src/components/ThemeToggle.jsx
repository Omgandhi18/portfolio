import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isDark, toggleTheme } from "../theme";

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <circle cx="10" cy="10" r="4" />
      <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6L16 16M16 4l-1.4 1.4M5.4 14.6L4 16" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [dark, setDarkState] = useState(isDark);

  useEffect(() => {
    const sync = () => setDarkState(isDark());
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  const destination = dark ? "Olympus" : "Othrys";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${destination} (${dark ? "light" : "dark"} mode)`}
      title={`To ${destination}`}
      className="group flex items-center gap-2 text-bronze transition-colors hover:text-ink"
    >
      <span className="relative block h-[18px] w-[18px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={dark ? "sun" : "moon"}
            className="absolute inset-0"
            initial={{ opacity: 0, rotate: -40, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.7 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="meta-caps hidden text-faded transition-colors group-hover:text-bronze md:inline">
        {destination}
      </span>
    </button>
  );
}
