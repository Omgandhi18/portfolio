import { profile } from "../data/profile";
import { Brazier, Fleuron } from "./Ornaments";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Ethos() {
  return (
    <section id="ethos" className="mx-auto max-w-site px-6 py-28 sm:px-10 sm:py-36">
      <SectionHeading numeral="Η" title="Ethos" gloss="About" />

      <div className="grid gap-16 lg:grid-cols-[3fr,2fr] lg:gap-20">
        <Reveal>
          <div className="space-y-7 font-body text-lg leading-relaxed text-ink sm:text-xl">
            {profile.epigraph.map((para, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-bronze" : undefined}>
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl>
            {profile.skills.map(({ label, items }) => (
              <div key={label} className="border-t border-hairline py-5 first:border-t-0 first:pt-0">
                <dt className="meta-caps text-bronze">{label}</dt>
                <dd className="mt-2 font-body text-base leading-relaxed text-faded">
                  {items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Fleuron className="mt-14 sm:mt-16" size="w-12">
        <Brazier />
      </Fleuron>
    </section>
  );
}
