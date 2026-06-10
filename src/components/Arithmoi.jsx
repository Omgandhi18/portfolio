import { profile } from "../data/profile";
import { Laurel } from "./Ornaments";
import Reveal from "./Reveal";

export default function Arithmoi() {
  return (
    <section aria-label="By the numbers" className="border-b border-hairline">
      {/* Top rule, genuinely interrupted by the laurel — no masking */}
      <div className="flex items-center" aria-hidden="true">
        <span className="rule-gilded-in h-px flex-1" />
        <span className="w-20 shrink-0 px-2 text-bronze">
          <Laurel />
        </span>
        <span className="rule-gilded-out h-px flex-1" />
      </div>
      <div className="mx-auto grid max-w-site grid-cols-2 md:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.1}
            className="flex flex-col items-center gap-3 border-hairline px-6 py-12 text-center odd:border-r md:border-r md:last:border-r-0 sm:py-16"
          >
            <span className="font-display text-4xl text-ink sm:text-5xl">{stat.value}</span>
            <span className="meta-caps text-faded">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
