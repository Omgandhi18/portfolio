import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0,  opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="section-padding flex items-center justify-between h-16">
        <a href="#" className="font-clash font-semibold text-lg tracking-tight text-gradient">
          Om Gandhi
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-satoshi transition-colors duration-200 relative"
                  style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.45)" }}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, #FF5F1F, #E040FB)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="mailto:omkgandhi@outlook.com"
              className="text-sm font-satoshi px-4 py-2 rounded-full border border-accent-orange/40 text-accent-orange hover:bg-accent-orange/10 transition-all duration-200"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0"             : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-white/5"
          >
            <ul className="section-padding py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm font-satoshi text-text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:omkgandhi@outlook.com"
                  className="inline-block text-sm font-satoshi px-4 py-2 rounded-full border border-accent-orange/40 text-accent-orange"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
