import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { essays } from "../data/essays";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Grammata() {
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <section id="grammata" className="mx-auto max-w-site px-6 py-28 sm:px-10 sm:py-36">
      <SectionHeading numeral="Γ" title="Grammata" gloss="Writing" />

      <div>
        {essays.map((essay, i) => {
          const isOpen = openSlug === essay.slug;
          return (
            <Reveal key={essay.slug} delay={i * 0.08} className="border-t border-hairline first:border-t-0">
              <article className="py-12 sm:py-14">
                <div className="grid gap-4 lg:grid-cols-[1fr,3fr] lg:gap-12">
                  <p className="meta-caps text-bronze">{essay.date}</p>
                  <div>
                    <h3 className="font-display text-2xl text-ink sm:text-[1.7rem]">
                      {essay.title}
                    </h3>
                    <p className="mt-3 max-w-2xl font-body text-lg italic leading-relaxed text-faded">
                      {essay.dek}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpenSlug(isOpen ? null : essay.slug)}
                      aria-expanded={isOpen}
                      aria-controls={`essay-${essay.slug}`}
                      className="meta-caps mt-5 text-bronze transition-colors hover:text-ink"
                    >
                      {isOpen ? "Roll up the scroll ▴" : "Unroll the scroll ▾"}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`essay-${essay.slug}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="max-w-2xl space-y-6 pt-8 font-body text-lg leading-relaxed text-ink">
                            {essay.body.map((para, j) => (
                              <p
                                key={j}
                                className={
                                  j === 0
                                    ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-bronze"
                                    : undefined
                                }
                              >
                                {para}
                              </p>
                            ))}
                            <p aria-hidden="true" className="pt-2 text-center font-display text-bronze">
                              ⁂
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
