import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { profile } from "../data/profile";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#ethos", id: "ethos", label: "About" },
  { href: "#erga", id: "erga", label: "Work" },
  { href: "#poreia", id: "poreia", label: "Journey" },
  { href: "#epaphe", id: "epaphe", label: "Contact" },
];

const SECTION_IDS = LINKS.map((l) => l.id);

function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const { scrollYProgress } = useScroll();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline bg-marble/85 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-site items-center justify-between px-6 sm:px-10">
        <a
          href="#top"
          className="font-display text-2xl leading-none text-bronze transition-colors hover:text-ink"
          aria-label="Back to top"
        >
          {profile.mark}
        </a>
        <div className="flex items-center gap-3 sm:gap-8">
          <ul className="flex items-center gap-2.5 sm:gap-8">
            {LINKS.map(({ href, id, label }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={active === id ? "true" : undefined}
                  className={`meta-caps text-xs transition-colors hover:text-bronze sm:text-sm ${
                    active === id ? "text-bronze" : "text-faded"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("palette:open"))}
            aria-label="Open command palette"
            className="hidden border border-hairline px-2 py-1 font-body text-xs text-faded transition-colors hover:border-bronze/50 hover:text-bronze sm:block"
          >
            ⌘K
          </button>
          <ThemeToggle />
        </div>
      </nav>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-bronze"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
