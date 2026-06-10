import { experiences, education } from "../data/experience";
import { Fleuron, Trireme } from "./Ornaments";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Odyssey() {
  return (
    <section id="odyssey" className="mx-auto max-w-site px-6 py-28 sm:px-10 sm:py-36">
      <SectionHeading numeral="Γ´" title="Odyssey" gloss="Experience" />

      <ol className="space-y-0">
        {experiences.map((exp, i) => (
          <li key={exp.company} className="border-t border-hairline first:border-t-0">
            <Reveal delay={i * 0.08} className="grid gap-4 py-12 sm:py-14 lg:grid-cols-[1fr,3fr] lg:gap-12">
              <div>
                <p className="meta-caps text-bronze">{exp.duration}</p>
                <p className="mt-2 meta-caps text-faded">{exp.place}</p>
              </div>
              <div>
                <h3 className="font-display text-2xl text-ink sm:text-[1.7rem]">
                  {exp.role}
                </h3>
                <p className="mt-1 font-body text-lg italic text-bronze">{exp.company}</p>
                <ul className="mt-6 space-y-3 font-body text-base leading-relaxed text-faded sm:text-lg">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span className="mt-[0.75em] h-px w-4 shrink-0 bg-bronze/70" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Paideia — education coda */}
      <Reveal className="mt-8 border-t border-hairline pt-12">
        <p className="meta-caps text-bronze">Paideia — Education</p>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          {education.map((edu) => (
            <div key={edu.degree}>
              <h3 className="font-display text-xl text-ink">{edu.degree}</h3>
              <p className="mt-1 font-body italic text-faded">
                {edu.school} · {edu.duration}
              </p>
              {edu.note && (
                <p className="mt-3 font-body text-base leading-relaxed text-faded">{edu.note}</p>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Fleuron className="mt-14 sm:mt-16" size="w-28">
        <Trireme />
      </Fleuron>
    </section>
  );
}
