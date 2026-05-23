import { motion } from "framer-motion";
import { professionalProjects, personalProjects } from "../data/projects";

// ── Icons ─────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

// ── Shared sub-components ─────────────────────────────────────────────────
function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="font-satoshi text-xs px-2.5 py-1 rounded-md bg-white/5 text-white/45">
          {tag}
        </span>
      ))}
    </div>
  );
}

function Links({ links, company }) {
  const hasLinks = links.github || links.appStore;
  if (!hasLinks) {
    return (
      <span className="font-satoshi text-xs text-text-muted opacity-50">
        Built at {company}
      </span>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-satoshi text-xs text-text-muted hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-full transition-all duration-200">
          <GithubIcon /> GitHub
        </a>
      )}
      {links.appStore && (
        <a href={links.appStore} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-satoshi text-xs text-text-muted hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-full transition-all duration-200">
          <AppleIcon /> App Store
        </a>
      )}
    </div>
  );
}

// ── Featured card (full-width) ────────────────────────────────────────────
function FeaturedCard({ project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
    >
      {/* Ghosted background symbol */}
      <span
        className="absolute right-8 top-4 font-clash font-bold select-none pointer-events-none text-white/[0.035]"
        style={{ fontSize: "clamp(90px, 13vw, 160px)", lineHeight: 1 }}
      >
        {project.symbol}
      </span>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
        {/* Left */}
        <div>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="font-clash font-bold text-5xl leading-none"
              style={{ background: project.accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {project.id}
            </span>
            <span className="font-satoshi text-xs text-text-muted">{project.platform}</span>
          </div>
          <h3 className="font-clash font-bold text-4xl md:text-5xl mb-2 leading-tight">{project.name}</h3>
          <p
            className="font-satoshi text-sm mb-6"
            style={{ background: project.accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            {project.subtitle}
          </p>
          <Links links={project.links} company={project.company} />
        </div>

        {/* Right */}
        <div className="flex flex-col gap-5 md:pt-1">
          <p className="font-satoshi text-text-muted text-sm leading-relaxed">{project.description}</p>
          <Tags tags={project.tags} />
        </div>
      </div>
    </motion.article>
  );
}

// ── Secondary card ────────────────────────────────────────────────────────
function SecondaryCard({ project, delay = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col gap-5"
    >
      {/* Ghosted background symbol */}
      <span
        className="absolute right-5 top-3 font-clash font-bold select-none pointer-events-none text-white/[0.04]"
        style={{ fontSize: "64px", lineHeight: 1 }}
      >
        {project.symbol}
      </span>

      <div className="relative z-10 flex-1 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-clash font-bold text-4xl leading-none"
              style={{ background: project.accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
            >
              {project.id}
            </span>
            <span className="font-satoshi text-xs text-text-muted">{project.platform}</span>
          </div>
          <h3 className="font-clash font-bold text-2xl mb-1 leading-tight">{project.name}</h3>
          <p
            className="font-satoshi text-xs mb-4"
            style={{ background: project.accent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            {project.subtitle}
          </p>
          <p className="font-satoshi text-text-muted text-sm leading-relaxed">{project.description}</p>
        </div>
        <Tags tags={project.tags} />
      </div>

      <div className="relative z-10">
        <Links links={project.links} company={project.company} />
      </div>
    </motion.article>
  );
}

// ── Section label ─────────────────────────────────────────────────────────
function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-satoshi text-xs tracking-widest uppercase text-text-muted shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function Projects() {
  const [proFeatured, ...proRest] = professionalProjects;
  const [persFeatured, ...persRest] = personalProjects;

  return (
    <section id="projects" className="section-padding py-24 md:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-satoshi tracking-widest uppercase text-accent-orange mb-4">
            Selected Work
          </p>
          <h2 className="font-clash font-bold text-4xl md:text-5xl leading-tight">
            Things I've
            <br />
            <span className="text-gradient">shipped.</span>
          </h2>
        </motion.div>

        {/* ── Professional ── */}
        <SectionLabel label="Professional" />
        <div className="mb-6">
          <FeaturedCard project={proFeatured} />
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {proRest.map((p, i) => (
            <SecondaryCard key={p.name} project={p} delay={i * 0.08} />
          ))}
        </div>

        {/* ── Personal ── */}
        <SectionLabel label="Personal" />
        <div className="mb-6">
          <FeaturedCard project={persFeatured} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {persRest.map((p, i) => (
            <SecondaryCard key={p.name} project={p} delay={i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  );
}
