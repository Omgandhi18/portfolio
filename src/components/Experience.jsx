import { motion } from "framer-motion";
import { experiences } from "../data/experience";

function ExperienceEntry({ exp, index }) {
  // Pull the start year from duration string e.g. "May 2025 – Present" → "2025"
  const year = exp.duration.match(/\d{4}/)?.[0] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="border-t border-white/5 pt-12 pb-14 relative overflow-hidden"
    >
      {/* Ghost company name — rotated margin note on right edge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none"
      >
        <span
          className="font-clash font-bold text-white"
          style={{
            writingMode: "vertical-rl",
            fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
            letterSpacing: "0.3em",
            opacity: 0.07,
            textTransform: "uppercase",
          }}
        >
          {exp.ghost}
        </span>
      </div>

      {/* Year — chapter number */}
      <div className="mb-4">
        <span
          className="font-clash font-bold leading-none text-gradient-animated"
          style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
        >
          {year}
        </span>
      </div>

      {/* Decorative gradient line */}
      <div
        className="w-10 h-[2px] mb-6"
        style={{ background: "linear-gradient(90deg, #FF5F1F, #E040FB)" }}
      />

      {/* Role title */}
      <h3
        className="font-clash font-bold leading-tight mb-3"
        style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)" }}
      >
        {exp.role}
      </h3>

      {/* Company + meta */}
      <p className="font-satoshi text-sm text-accent-orange mb-1">
        {exp.company}
      </p>
      <p className="font-satoshi text-xs text-text-muted tracking-wide uppercase mb-8">
        {exp.duration} · {exp.type}
      </p>

      {/* Bullets — plain text, no arrows */}
      <ul className="flex flex-col gap-3 mb-8 max-w-2xl">
        {exp.bullets.map((bullet, bi) => (
          <li
            key={bi}
            className={`font-satoshi text-sm text-text-muted leading-relaxed ${bi >= 2 ? "hidden md:block" : ""}`}
          >
            {bullet}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="font-satoshi text-xs px-2.5 py-1 rounded-md bg-surface text-white/40"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding py-24 md:py-32">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <p className="text-xs font-satoshi tracking-widest uppercase text-accent-orange mb-4">
            Experience
          </p>
          <h2 className="font-clash font-bold text-4xl md:text-5xl leading-tight">
            Where I've
            <br />
            <span className="text-gradient">worked.</span>
          </h2>
        </motion.div>

        <div>
          {experiences.map((exp, i) => (
            <ExperienceEntry key={i} exp={exp} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
