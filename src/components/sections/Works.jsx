import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AppStoreLogo, ArrowUpRight, BookOpenText } from "@phosphor-icons/react";
import { projects } from "../../data/projects";
import { EASE } from "../../lib/motion";
import Emblem from "../art/Emblems";
import Decrypt from "../ui/Decrypt";
import SplitHeading from "../ui/SplitHeading";
import CaseSheet from "./CaseSheet";
import Service from "./Service";

/* On wide screens the works pan sideways while the page scrolls down:
   a gallery of stelae walked past. Narrow screens, and anyone who
   prefers less motion, get the same panels stacked. */
function useGallery() {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(() => matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return wide && !reduced;
}

function Tags({ items, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((t) => (
        <li key={t} className="border border-line px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function IntroPanel() {
  return (
    <div className="relative flex shrink-0 flex-col justify-center px-5 pb-16 pt-28 sm:px-10 lg:h-full lg:w-[min(46vw,720px)] lg:py-0 lg:pl-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))] lg:pr-16">
      <span aria-hidden="true" className="ghost-word absolute -left-4 top-[8%] text-[clamp(7rem,20vw,19rem)] lg:top-[14%]">
        ΕΡΓΑ
      </span>
      <p className="label relative flex items-center gap-3 text-accent">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        Selected work
      </p>
      <SplitHeading
        text="Four apps. No servers."
        className="relative mt-6 font-display text-[clamp(3rem,6vw,6rem)] font-normal leading-[0.95] tracking-[-0.015em] text-ink"
      />
      <p className="relative mt-7 max-w-[34ch] text-lg leading-relaxed text-muted">
        Everything I ship on my own runs on the device. Each app has a patron, and a reason it never phones home.
      </p>
    </div>
  );
}

function WorkPanel({ project, onOpen, wide }) {
  return (
    <article
      aria-labelledby={`work-${project.slug}`}
      className="relative grid shrink-0 items-center gap-10 border-t border-line px-5 py-20 sm:px-10 lg:h-full lg:w-[min(92vw,1320px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16 lg:border-l lg:border-t-0 lg:px-16 lg:py-0"
    >
      {/* the emblem, lit from behind */}
      <figure className="relative mx-auto w-[min(78vw,420px)] lg:w-[min(36vw,52vh,520px)]">
        <div
          aria-hidden="true"
          className="absolute inset-[-18%] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(var(--c-accent) / 0.13), transparent)" }}
        />
        <Emblem kind={project.emblem} className="relative w-full text-accent" />
        <figcaption className="relative mt-6 text-center">
          <Decrypt
            greek={project.patron.greek}
            english={project.patron.name}
            delay={900}
            className="text-xs font-bold uppercase tracking-inscription text-ink"
          />
          <p className="mx-auto mt-2 max-w-[36ch] text-sm leading-relaxed text-muted">{project.patron.line}</p>
        </figcaption>
      </figure>

      <motion.div
        initial={{ opacity: 0, x: wide ? 40 : 0, y: wide ? 0 : 24 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Tags items={project.platforms} />
        <h3 id={`work-${project.slug}`} className="mt-5 font-display text-[clamp(3.4rem,6.4vw,6.6rem)] font-normal leading-[0.92] tracking-[-0.02em] text-ink">
          {project.name}
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">{project.kind}</p>
        <p className="mt-6 max-w-[30ch] pb-1 font-display text-[1.65rem] italic leading-[1.25] text-ink sm:text-[1.9rem]">
          {project.thesis}
        </p>
        <ul className="mt-6 max-w-[48ch] space-y-2.5 text-[0.98rem] leading-relaxed text-muted">
          {project.bullets.map((b) => (
            <li key={b} className="grid grid-cols-[18px_1fr] gap-2">
              <span aria-hidden="true" className="mt-[0.7em] h-px w-3 bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <button type="button" onClick={(e) => onOpen(project, e.currentTarget)} className="btn btn-solid">
            <BookOpenText size={18} />
            Case study
          </button>
          <a
            href={project.links.appStore}
            target="_blank"
            rel="noreferrer"
            className="link-line inline-flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <AppStoreLogo size={18} />
            App Store
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </div>
      </motion.div>
    </article>
  );
}

export default function Works() {
  const wide = useGallery();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState(null);
  const opener = useRef(null);

  useEffect(() => {
    if (!wide || !trackRef.current) return;
    const measure = () => setDistance(Math.max(0, trackRef.current.scrollWidth - innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [wide]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const onOpen = (project, trigger) => {
    opener.current = trigger;
    setOpen(project);
  };
  const onClose = () => {
    setOpen(null);
    requestAnimationFrame(() => opener.current?.focus());
  };

  return (
    <>
      <section
        id="erga"
        ref={sectionRef}
        aria-label="Selected work"
        className="relative"
        style={wide ? { height: `calc(${distance}px + 100dvh)` } : undefined}
      >
        <div className={wide ? "sticky top-0 h-[100dvh] overflow-hidden" : ""}>
          <motion.div ref={trackRef} style={wide ? { x } : undefined} className="flex flex-col lg:h-full lg:flex-row">
            <IntroPanel />
            {projects.map((p) => (
              <WorkPanel key={p.slug} project={p} onOpen={onOpen} wide={wide} />
            ))}
            {wide && <div aria-hidden="true" className="w-[6vw] shrink-0" />}
          </motion.div>
          {wide && (
            <motion.div
              aria-hidden="true"
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
            />
          )}
        </div>
      </section>
      <Service />
      <CaseSheet project={open} onClose={onClose} />
    </>
  );
}
