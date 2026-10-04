import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy, DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "../../data/profile";
import { EASE } from "../../lib/motion";
import Magnetic from "../ui/Magnetic";
import SplitHeading from "../ui/SplitHeading";
import Footer from "./Footer";

/* Omega, written in the stars: the constellation draws itself in. */
const STARS = [
  [70, 300],
  [128, 300],
  [104, 240],
  [86, 170],
  [130, 100],
  [210, 76],
  [290, 100],
  [334, 170],
  [316, 240],
  [292, 300],
  [350, 300],
];
const EXTRA = [
  [40, 60],
  [380, 40],
  [24, 200],
  [396, 230],
  [190, 190],
  [240, 330],
  [150, 22],
];

function Constellation() {
  const reduced = useReducedMotion();
  const d = STARS.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <motion.svg
      viewBox="0 0 420 360"
      initial={reduced ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      className="h-auto w-full"
      aria-hidden="true"
    >
      {/* chart rings, as on an old celestial map */}
      <g fill="none" stroke="var(--chart-line)" strokeWidth="0.8" opacity="0.45">
        <circle cx="210" cy="190" r="170" strokeDasharray="1 6" />
        <circle cx="210" cy="190" r="120" opacity="0.6" />
        <path d="M20 190 H400 M210 0 V360" strokeDasharray="2 8" opacity="0.6" />
      </g>
      <motion.path
        d={d}
        fill="none"
        stroke="var(--chart-line)"
        strokeWidth="1.3"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          shown: { pathLength: 1, transition: { duration: 2.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] } },
        }}
      />
      {STARS.map(([x, y], i) => (
        <motion.g
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0 },
            shown: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 + i * 0.22, ease: EASE } },
          }}
          style={{ originX: `${x}px`, originY: `${y}px` }}
        >
          <circle cx={x} cy={y} r="10" fill="rgb(var(--c-accent) / 0.12)" />
          <path
            d={`M${x} ${y - 6} L${x + 1.4} ${y - 1.4} L${x + 6} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 6} L${x - 1.4} ${y + 1.4} L${x - 6} ${y} L${x - 1.4} ${y - 1.4} Z`}
            fill="var(--chart-star)"
          />
        </motion.g>
      ))}
      {EXTRA.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="1.6"
          fill="var(--chart-star)"
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 0.6, transition: { delay: 2.8 + i * 0.1 } } }}
        />
      ))}
    </motion.svg>
  );
}

function CopyEmail() {
  const [state, setState] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2400);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="btn btn-ghost min-w-[9.5rem] justify-center text-ink hover:bg-ink hover:text-bg"
      aria-live="polite"
    >
      {state === "copied" ? <Check size={16} weight="bold" /> : <Copy size={16} />}
      {state === "copied" ? "Copied" : state === "failed" ? "Copy blocked" : "Copy email"}
    </button>
  );
}

export default function Contact() {
  const links = [
    { label: "GitHub", href: profile.links.github, Icon: GithubLogo },
    { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedinLogo },
  ];
  return (
    <section id="epaphe" aria-labelledby="epaphe-title" className="relative overflow-hidden pt-28 sm:pt-40">
      <div className="relative mx-auto grid max-w-site items-center gap-16 px-5 sm:px-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <SplitHeading
            id="epaphe-title"
            text="Send word."
            className="font-display text-[clamp(4rem,11vw,10.5rem)] font-normal leading-[0.88] tracking-[-0.025em] text-ink"
          />
          <p className="mt-8 max-w-[38ch] text-lg leading-relaxed text-muted">
            The conversation is open: a role, a product, an app, or a question about one of them.
          </p>
          <Magnetic strength={0.18} className="mt-10">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-baseline gap-3 break-all font-display text-[clamp(1.6rem,4.2vw,3.4rem)] leading-tight text-ink"
            >
              <span className="link-line">{profile.email}</span>
              <ArrowUpRight
                size={28}
                className="shrink-0 self-center text-accent transition-transform duration-500 ease-myth group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </Magnetic>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CopyEmail />
            {links.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost text-ink hover:bg-ink hover:text-bg"
              >
                <Icon size={18} />
                {label}
              </a>
            ))}
            <a href={profile.resume} download className="btn btn-ghost text-ink hover:bg-ink hover:text-bg">
              <DownloadSimple size={18} />
              Résumé
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[460px] text-accent">
          <Constellation />
        </div>
      </div>
      <Footer />
    </section>
  );
}
