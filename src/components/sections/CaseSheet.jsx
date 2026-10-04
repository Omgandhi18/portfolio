import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppStoreLogo, ArrowUpRight, X } from "@phosphor-icons/react";
import { EASE } from "../../lib/motion";
import { lockScroll } from "../../lib/lenis";
import Emblem from "../art/Emblems";

const PARTS = [
  { key: "problem", title: "The problem" },
  { key: "architecture", title: "The architecture" },
  { key: "outcome", title: "The outcome" },
];

/* The full account of one app, on a sheet that rises over the page. */
export default function CaseSheet({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    lockScroll(true);
    const t = setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="sheet"
          className="fixed inset-0 z-sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[3px]" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.75, ease: EASE }}
            className="absolute inset-x-0 bottom-0 top-[6vh] overflow-y-auto overscroll-contain border-t border-line bg-bg sm:top-[8vh]"
            data-lenis-prevent
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/90 px-5 py-4 backdrop-blur sm:px-10">
              <p className="text-xs font-bold uppercase tracking-inscription text-muted">{project.patron.name}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 border border-line px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Close
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="mx-auto grid max-w-site gap-12 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Emblem kind={project.emblem} className="w-40 text-accent sm:w-56" />
                <h2 id="case-title" className="mt-8 font-display text-6xl font-normal leading-none text-ink sm:text-7xl">
                  {project.name}
                </h2>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">{project.kind}</p>
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-solid mt-8"
                >
                  <AppStoreLogo size={18} />
                  App Store
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>

              <div className="space-y-14">
                <p className="max-w-[32ch] pb-1 font-display text-[clamp(1.8rem,3vw,2.6rem)] italic leading-[1.2] text-ink">
                  {project.thesis}
                </p>
                {PARTS.map(({ key, title }, i) => (
                  <motion.section
                    key={key}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: EASE }}
                    className="grid gap-4 border-t border-line pt-8 md:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] md:gap-10"
                  >
                    <h3 className="font-display text-2xl text-accent">{title}</h3>
                    <p className="max-w-[62ch] text-[1.05rem] leading-[1.75] text-muted">{project.caseStudy[key]}</p>
                  </motion.section>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
