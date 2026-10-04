import { motion } from "framer-motion";
import { MoonStars, Sun } from "@phosphor-icons/react";
import { useIsDark } from "../lib/useTheme";
import { toggleTheme } from "../theme";

/* A tiny horizon: the sun sets as the moon rises (and back). The new
   realm then opens across the page from this very point. */
export default function ThemeDial({ className = "" }) {
  const dark = useIsDark();
  const label = dark ? "Switch to day (light mode)" : "Switch to night (dark mode)";
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={label}
      title={dark ? "To Olympus, by day" : "To Othrys, by night"}
      className={`relative h-9 w-9 overflow-hidden border border-line text-ink transition-colors hover:border-ink ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 block h-[72px] w-9"
        initial={false}
        animate={{ rotate: dark ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 14 }}
        style={{ originX: "50%", originY: "50%" }}
      >
        <span className="absolute left-1/2 top-[9px] -translate-x-1/2 text-accent">
          <Sun size={17} weight="bold" />
        </span>
        <span className="absolute bottom-[9px] left-1/2 -translate-x-1/2 rotate-180 text-ink">
          <MoonStars size={17} weight="bold" />
        </span>
      </motion.span>
      <span aria-hidden="true" className="absolute inset-x-1.5 bottom-[5px] h-px bg-ink/25" />
    </button>
  );
}
