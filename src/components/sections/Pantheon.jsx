import { useId, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { profile } from "../../data/profile";
import { EASE } from "../../lib/motion";
import CountUp from "../ui/CountUp";
import Decrypt from "../ui/Decrypt";
import SplitHeading from "../ui/SplitHeading";
import { Laurel } from "../art/Ornaments";

/* The temple builds itself as it comes into view: steps laid, columns
   raised, the entablature lowered on top, the pediment set last. The
   frieze carries the numbers; each column is a discipline. */

const build = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};
const lay = {
  hidden: { opacity: 0, scaleX: 0.6 },
  shown: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};
const raise = {
  hidden: { scaleY: 0, opacity: 0 },
  shown: (i) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 1.1, delay: i * 0.08, ease: EASE },
  }),
};
const lower = {
  hidden: { y: -60, opacity: 0 },
  shown: { y: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
};

function Pediment() {
  return (
    <motion.div variants={lower} className="relative">
      <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="block h-[64px] w-full sm:h-[120px]" aria-hidden="true">
        <path d="M6 146 L500 10 L994 146 Z" fill="rgb(var(--c-surface))" />
        <path d="M6 146 L500 10 L994 146" fill="none" stroke="rgb(var(--c-ink) / 0.22)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        <path d="M60 136 L500 24 L940 136 Z" fill="none" stroke="rgb(var(--c-ink) / 0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="absolute inset-x-0 bottom-[22%] flex items-center justify-center gap-3 sm:bottom-[20%] sm:gap-5">
        <span className="hidden w-14 text-accent/70 sm:block">
          <Laurel />
        </span>
        <span className="font-display text-3xl leading-none text-accent sm:text-[3.4rem]" aria-hidden="true">
          Ω
        </span>
        <span className="hidden w-14 -scale-x-100 text-accent/70 sm:block">
          <Laurel />
        </span>
      </div>
      {/* cornice */}
      <div className="h-2 border-y border-line bg-surface sm:h-3" />
    </motion.div>
  );
}

function Frieze() {
  return (
    <motion.div variants={lower} className="border-b border-line bg-surface">
      <div className="grid grid-cols-2 md:grid-cols-[28px_1fr_28px_1fr_28px_1fr_28px_1fr_28px]">
        {profile.stats.map((stat, i) => (
          <div key={stat.label} className="contents">
            <Triglyph className="hidden md:block" />
            <div
              className={`flex flex-col items-center justify-center px-3 py-7 text-center sm:py-9 ${
                i % 2 === 0 ? "border-r border-line md:border-r-0" : ""
              } ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
            >
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="font-display text-5xl font-medium leading-none text-ink sm:text-6xl"
              />
              <span className="mt-3 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
        <Triglyph className="hidden md:block" />
      </div>
    </motion.div>
  );
}

function Triglyph({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-full min-h-[100px] border-x border-line ${className}`}
      style={{
        background:
          "repeating-linear-gradient(90deg, transparent 0 5px, rgb(var(--c-ink) / 0.14) 5px 7px, transparent 7px 9px)",
      }}
    />
  );
}

function Architrave() {
  const oracle = profile.oracles[1];
  return (
    <motion.div variants={lower} className="flex items-center justify-center border-b border-line bg-surface px-4 py-3">
      <Decrypt
        greek={oracle.greek}
        english={oracle.english}
        delay={1400}
        duration={1300}
        className="text-[0.72rem] font-semibold uppercase tracking-inscription text-muted"
      />
    </motion.div>
  );
}

function Capital() {
  return (
    <svg viewBox="0 0 120 34" className="block w-full" aria-hidden="true">
      <rect x="2" y="0" width="116" height="7" fill="rgb(var(--c-surface))" stroke="rgb(var(--c-ink) / 0.2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d="M14 8 H106 C108 18 100 24 92 24 H28 C20 24 12 18 14 8 Z" fill="rgb(var(--c-surface))" stroke="rgb(var(--c-ink) / 0.2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {/* volutes */}
      <g fill="none" stroke="rgb(var(--c-ink) / 0.35)" strokeWidth="1.2" vectorEffect="non-scaling-stroke">
        <path d="M22 12 C12 12 10 24 18 26 C24 27 26 20 21 18 C18 17 17 21 19 22" />
        <path d="M98 12 C108 12 110 24 102 26 C96 27 94 20 99 18 C102 17 103 21 101 22" />
        <path d="M30 17 H90" opacity="0.6" />
      </g>
      <rect x="24" y="25" width="72" height="5" fill="rgb(var(--c-surface))" stroke="rgb(var(--c-ink) / 0.2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Column({ group, index, active, onSelect, controls }) {
  return (
    <motion.button
      type="button"
      custom={index}
      variants={raise}
      onClick={onSelect}
      aria-pressed={active}
      aria-controls={controls}
      style={{ originY: 1 }}
      className="group relative flex flex-col items-stretch px-[6%] outline-none sm:px-[10%]"
    >
      <span className="sr-only">{group.label}</span>
      <Capital />
      <span
        className="relative mx-[9%] block h-[220px] overflow-hidden border-x border-line transition-transform duration-500 ease-myth group-hover:-translate-y-1 sm:h-[300px] lg:h-[340px]"
        style={{
          background:
            "linear-gradient(90deg, rgb(var(--c-ink) / 0.09), transparent 32%, transparent 58%, rgb(var(--c-ink) / 0.16)), repeating-linear-gradient(90deg, rgb(var(--c-surface)) 0 7px, rgb(var(--c-ink) / 0.07) 7px 8px)",
        }}
      >
        {active && (
          <motion.span
            layoutId="pantheon-light"
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgb(var(--c-accent) / 0.4), rgb(var(--c-accent) / 0.08) 60%, transparent)" }}
          />
        )}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-3 hidden text-center text-[0.62rem] font-bold uppercase tracking-[0.12em] transition-colors md:block lg:text-[0.68rem] ${
            active ? "text-accent" : "text-muted group-hover:text-ink"
          }`}
        >
          {group.label}
        </span>
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-3 text-center text-[0.58rem] font-bold uppercase tracking-[0.1em] md:hidden ${
            active ? "text-accent" : "text-muted"
          }`}
        >
          {group.short}
        </span>
      </span>
      <span className="block h-2 border border-line bg-surface sm:h-3" />
      <span className="mx-[-4%] block h-2 border border-t-0 border-line bg-surface" />
    </motion.button>
  );
}

export default function Pantheon() {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const group = profile.skills[active];

  return (
    <div className="mt-28 sm:mt-40">
      <SplitHeading
        as="h3"
        text="Five columns, one roof."
        className="font-display text-[clamp(2rem,4vw,3.4rem)] font-normal leading-tight text-ink"
      />
      <p className="mt-4 max-w-[48ch] text-muted">
        The disciplines my work stands on, held up by the numbers they produced. Select a column to read its inscription.
      </p>

      <LayoutGroup>
        <motion.div
          variants={build}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.25 }}
          className="relative mx-auto mt-14 max-w-[1040px]"
        >
          <Pediment />
          <Frieze />
          <Architrave />
          <div className="grid grid-cols-5" role="group" aria-label="Disciplines">
            {profile.skills.map((g, i) => (
              <Column
                key={g.label}
                group={g}
                index={i}
                active={i === active}
                onSelect={() => setActive(i)}
                controls={panelId}
              />
            ))}
          </div>
          {/* stylobate */}
          <motion.div variants={lay} className="mx-[-1%] h-3 border border-line bg-surface" />
          <motion.div variants={lay} className="mx-[-2.5%] h-3 border border-t-0 border-line bg-surface" />
          <motion.div variants={lay} className="mx-[-4%] h-3 border border-t-0 border-line bg-surface" />
        </motion.div>
      </LayoutGroup>

      <div id={panelId} aria-live="polite" className="mx-auto mt-12 max-w-[1040px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12"
          >
            <h4 className="font-display text-3xl text-ink sm:text-4xl">{group.label}</h4>
            <ul className="flex flex-wrap gap-2.5">
              {group.items.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.045, ease: EASE }}
                  className="border border-line bg-surface/60 px-4 py-2 text-sm font-medium text-ink"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
