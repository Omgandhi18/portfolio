import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { profile } from "../../data/profile";
import ScrollWords from "../ui/ScrollWords";
import Reveal from "../ui/Reveal";
import Pantheon from "./Pantheon";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduced = useReducedMotion();
  const ghostX = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "10%"]);

  return (
    <section id="ethos" ref={ref} aria-labelledby="ethos-title" className="relative overflow-hidden pb-28 pt-24 sm:pb-40 sm:pt-32">
      <h2 id="ethos-title" className="sr-only">
        About
      </h2>
      <motion.span
        aria-hidden="true"
        style={{ x: ghostX }}
        className="ghost-word absolute -top-4 left-0 text-[clamp(7rem,24vw,22rem)]"
      >
        ΗΘΟΣ
      </motion.span>

      <div className="relative mx-auto max-w-site px-5 sm:px-10">
        <ScrollWords
          text={profile.statement}
          className="max-w-[24ch] font-display text-[clamp(2.1rem,4.6vw,4.4rem)] font-normal leading-[1.08] tracking-[-0.01em] text-ink sm:max-w-[26ch]"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-10">
          {profile.about.map((para, i) => (
            <Reveal
              key={i}
              delay={i * 0.12}
              className={`text-[1.05rem] leading-relaxed text-muted md:col-span-4 ${i === 0 ? "md:col-start-5" : ""}`}
            >
              <p>{para}</p>
            </Reveal>
          ))}
        </div>

        <Pantheon />
      </div>
    </section>
  );
}
