import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { professionalWorks, projects } from "../data/projects";
import GreekDecrypt from "./GreekDecrypt";
import { Fleuron, Temple } from "./Ornaments";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const STUDY_PARTS = [
  { key: "problem", greek: "ΠΡΟΒΛΗΜΑ", gloss: "The Problem" },
  { key: "architecture", greek: "ΤΕΚΤΟΝΙΚΗ", gloss: "The Architecture" },
  { key: "outcome", greek: "ΕΡΓΟΝ", gloss: "The Outcome" },
];

export default function Works() {
  const [openStudy, setOpenStudy] = useState(null);
  const open = projects.find((p) => p.name === openStudy);

  return (
    <section id="erga" className="mx-auto max-w-site px-6 py-28 sm:px-10 sm:py-36">
      <SectionHeading numeral="Β´" title="Erga" gloss="Selected Works" />

      <div className="grid border border-hairline divide-y divide-hairline md:grid-cols-3 md:divide-x md:divide-y-0">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={i * 0.12}
            className="group flex flex-col gap-5 p-8 transition-colors duration-500 hover:bg-panel sm:p-10"
          >
            <p className="meta-caps text-bronze">{project.platform}</p>
            <div>
              <h3 className="font-display text-2xl text-ink">{project.name}</h3>
              <p className="mt-1 font-body text-sm uppercase tracking-epigraph text-faded">
                {project.kind}
              </p>
            </div>
            <p className="font-body text-lg italic leading-relaxed text-ink">
              {project.thesis}
            </p>
            <ul className="space-y-3 font-body text-base leading-relaxed text-faded">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-bronze/70" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-4">
              {project.links.appStore && (
                <a
                  href={project.links.appStore}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-caps link-carve text-ink transition-colors hover:text-bronze"
                >
                  App Store ↗
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="meta-caps link-carve text-ink transition-colors hover:text-bronze"
                >
                  Github ↗
                </a>
              )}
              {project.caseStudy && (
                <button
                  type="button"
                  onClick={() =>
                    setOpenStudy(openStudy === project.name ? null : project.name)
                  }
                  aria-expanded={openStudy === project.name}
                  aria-controls="case-study-panel"
                  className="meta-caps text-bronze transition-colors hover:text-ink"
                >
                  {openStudy === project.name ? "Seal the stele ▴" : "Full account ▾"}
                </button>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Expanded case study — a stele unsealed */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="case-study-panel"
            key={open.name}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border border-t-0 border-hairline bg-panel/40 p-8 sm:p-12">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="font-display text-xl text-ink sm:text-2xl">
                  {open.name} — the full account
                </h4>
                <button
                  type="button"
                  onClick={() => setOpenStudy(null)}
                  className="meta-caps shrink-0 text-faded transition-colors hover:text-bronze"
                >
                  Close
                </button>
              </div>
              <div className="mt-8 grid gap-10 md:grid-cols-3">
                {STUDY_PARTS.map(({ key, greek, gloss }, i) => (
                  <div key={key}>
                    <p>
                      <GreekDecrypt
                        greek={greek}
                        english={gloss}
                        trigger="mount"
                        delay={900 + i * 350}
                        duration={900}
                        className="meta-caps text-bronze"
                      />
                    </p>
                    <p className="mt-4 font-body text-base leading-relaxed text-faded">
                      {open.caseStudy[key]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In Service — professional suite, a ledger not a gallery */}
      <Reveal className="mt-20 sm:mt-24">
        <p className="meta-caps text-bronze">In Service — Magenta Insights</p>
        <ul className="mt-6">
          {professionalWorks.map((work) => (
            <li
              key={work.name}
              className="grid gap-2 border-t border-hairline py-6 lg:grid-cols-[1fr,3fr] lg:gap-12"
            >
              <div>
                <h3 className="font-display text-xl text-ink">{work.name}</h3>
                <p className="mt-1 meta-caps text-faded">{work.platform}</p>
              </div>
              <p className="font-body text-base leading-relaxed text-faded sm:text-lg">
                {work.line}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Fleuron className="mt-14 sm:mt-16" size="w-16">
        <Temple />
      </Fleuron>
    </section>
  );
}
