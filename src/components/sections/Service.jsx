import { motion } from "framer-motion";
import { professionalWorks } from "../../data/projects";
import { EASE } from "../../lib/motion";
import SplitHeading from "../ui/SplitHeading";

/* The work done in service: a ledger, not a gallery. */
export default function Service() {
  return (
    <section aria-labelledby="service-title" className="mx-auto max-w-site px-5 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
        <div>
          <SplitHeading
            as="h3"
            id="service-title"
            text="In service at Magenta Insights."
            className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-normal leading-[1.02] text-ink"
          />
          <p className="mt-5 max-w-[34ch] leading-relaxed text-muted">
            A five-product B2B suite for 500+ businesses, where I own mobile and frontend engineering.
          </p>
        </div>
        <ol className="border-t border-line">
          {professionalWorks.map((work, i) => (
            <motion.li
              key={work.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              className="group relative grid gap-3 border-b border-line py-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] sm:gap-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-accent/[0.06] transition-transform duration-700 ease-myth group-hover:scale-x-100"
              />
              <div className="relative">
                <h4 className="font-display text-[2rem] leading-none text-ink transition-transform duration-500 ease-myth group-hover:translate-x-2 sm:text-[2.4rem]">
                  {work.name}
                </h4>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {work.platforms.join(", ")}
                </p>
              </div>
              <p className="relative leading-relaxed text-muted sm:pt-1">{work.line}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
