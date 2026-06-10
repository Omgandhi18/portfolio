import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { isDark } from "../theme";
import GreekDecrypt from "./GreekDecrypt";

const EASE = [0.22, 1, 0.36, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function Hero() {
  // The oracle speaks once per visit
  const [oracle] = useState(
    () => profile.oracles[Math.floor(Math.random() * profile.oracles.length)]
  );

  // Zeus stirs — at most once per visit, only over Othrys
  const [bolt, setBolt] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const delay = 7000 + Math.random() * 11000;
    const arm = setTimeout(() => {
      if (isDark()) {
        setBolt(true);
        setTimeout(() => setBolt(false), 1400);
      }
    }, delay);
    return () => clearTimeout(arm);
  }, []);

  const meta = [
    { label: "Github", href: profile.links.github },
    { label: "Linkedin", href: profile.links.linkedin },
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "Vita ↓", href: profile.resume, download: true },
  ];

  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Light from above — dawn on Olympus, dusk over Othrys */}
      <div
        aria-hidden="true"
        className="summit-light pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
      />

      {/* Zeus, briefly */}
      {bolt && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="sky-flash summit-light absolute inset-x-0 top-0 h-[60vh]" />
          <svg
            viewBox="0 0 60 200"
            className="bolt absolute right-[22%] top-0 h-[34vh] w-auto text-gold"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          >
            <path d="M34 0 L22 78 L33 74 L18 160" />
            <path d="M27 52 L17 80" />
          </svg>
        </div>
      )}

      <motion.span
        {...rise(0.1)}
        className="font-display text-4xl text-bronze sm:text-5xl"
        aria-hidden="true"
      >
        {profile.mark}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, letterSpacing: "0.4em" }}
        animate={{ opacity: 1, letterSpacing: "0.18em" }}
        transition={{ duration: 1.6, delay: 0.25, ease: EASE }}
        className="relative mt-8 font-display text-[clamp(2.4rem,8.5vw,6.5rem)] uppercase leading-none text-ink"
      >
        Om&nbsp;Gandhi
        <span aria-hidden="true" className="hero-sheen absolute inset-0">
          Om&nbsp;Gandhi
        </span>
      </motion.h1>

      <motion.div {...rise(0.55)} className="mt-8 flex items-center gap-4">
        <span className="h-px w-10 bg-bronze/60 sm:w-16" aria-hidden="true" />
        <p className="meta-caps text-faded sm:text-sm">
          {profile.epithet} — {profile.platforms}
        </p>
        <span className="h-px w-10 bg-bronze/60 sm:w-16" aria-hidden="true" />
      </motion.div>

      <motion.p
        {...rise(0.75)}
        className="mt-10 max-w-xl font-body text-lg italic leading-relaxed text-faded sm:text-xl"
      >
        {profile.hero}
      </motion.p>

      <motion.div {...rise(0.95)} className="mt-12">
        <p className="meta-caps text-faded">{profile.location}</p>
        <ul className="mt-4 flex items-center justify-center gap-3 sm:gap-4">
          {meta.map(({ label, href, download }, i) => (
            <li key={label} className="flex items-center gap-3 sm:gap-4">
              {i > 0 && <span className="text-bronze/70" aria-hidden="true">·</span>}
              <a
                href={href}
                download={download}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="meta-caps link-carve text-ink transition-colors hover:text-bronze"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.p {...rise(1.2)} className="mt-14">
        <GreekDecrypt
          greek={oracle.greek}
          english={oracle.english}
          delay={2800}
          duration={1400}
          className="meta-caps text-bronze"
        />
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.span
          className="block h-12 w-px bg-ink/30"
          animate={{ scaleY: [1, 0.4, 1] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>
    </section>
  );
}
