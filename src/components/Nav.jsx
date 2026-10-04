import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Command } from "@phosphor-icons/react";
import { scrollToId } from "../lib/lenis";
import { EASE } from "../lib/motion";
import { HERO_DELAY } from "../lib/intro";
import ThemeDial from "./ThemeDial";
import OmegaMark from "./ui/OmegaMark";

const LINKS = [
  { id: "ethos", label: "About" },
  { id: "erga", label: "Work" },
  { id: "poreia", label: "Journey" },
  { id: "epaphe", label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active === "top" ? null : active;
}

export default function Nav() {
  const active = useActiveSection();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const goingDown = y > prev;
    if (y < 120) setHidden(false);
    else if (goingDown && y - prev > 4) setHidden(true);
    else if (!goingDown && prev - y > 4) setHidden(false);
    setSolid(y > innerHeight * 0.85);
  });

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: hidden ? 0 : 0 }}
      className={`fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
      style={{ transitionDelay: "0s" }}
    >
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: HERO_DELAY + 1.2 }}
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-site items-center justify-between px-5 sm:px-10"
      >
        <a href="#top" onClick={go("top")} aria-label="Om Gandhi, back to top" className="text-3xl text-accent">
          <OmegaMark />
        </a>
        <div className="flex items-center gap-2 sm:gap-6">
          <ul className="flex items-center gap-3 sm:gap-7">
            {LINKS.map(({ id, label }) => (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? "true" : undefined}
                  className={`py-2 text-[0.8rem] font-semibold transition-colors sm:text-sm ${
                    active === id ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {label}
                </a>
                {active === id && (
                  <motion.span
                    layoutId="nav-mark"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("palette:open"))}
            aria-label="Open command palette"
            className="hidden h-9 items-center gap-1 border border-line px-2.5 text-xs font-semibold text-ink/70 transition-colors hover:border-ink hover:text-ink sm:inline-flex"
          >
            <Command size={13} weight="bold" />K
          </button>
          <ThemeDial />
        </div>
      </motion.nav>
    </motion.header>
  );
}
