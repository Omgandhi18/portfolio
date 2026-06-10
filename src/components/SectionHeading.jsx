import Reveal from "./Reveal";

export default function SectionHeading({ numeral, title, gloss }) {
  return (
    <Reveal className="relative mb-14 sm:mb-20">
      {/* Ghost numeral — carved into the wall behind the heading */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 -top-14 select-none font-display text-[clamp(9rem,18vw,15rem)] leading-none text-ink/[0.045] sm:-top-20"
      >
        {numeral.replace("´", "")}
      </span>
      <div className="flex items-center gap-5">
        <span className="font-display text-lg text-bronze" aria-hidden="true">
          {numeral}
        </span>
        <span className="rule-gilded h-px flex-1" aria-hidden="true" />
        <span className="meta-caps text-faded">{gloss}</span>
      </div>
      <h2 className="mt-6 font-display text-3xl uppercase tracking-inscription text-ink sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}
