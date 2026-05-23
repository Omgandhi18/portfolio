import { motion } from "framer-motion";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Omgandhi18",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gandhiom/",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-padding py-24 md:py-36 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-satoshi tracking-widest uppercase text-accent-orange mb-6">
            Get in Touch
          </p>

          {/* Big headline */}
          <h2
            className="font-clash font-bold leading-[0.88] mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Let's build
            <br />
            <span className="text-gradient-animated">something.</span>
          </h2>

          <p className="font-satoshi text-text-muted text-base max-w-lg mb-14 leading-relaxed">
            Open to senior mobile engineering roles, consulting, and interesting
            conversations about on-device AI and mobile architecture.
          </p>

          {/* Email as CTA — the primary action */}
          <a
            href="mailto:omkgandhi@outlook.com"
            className="group inline-flex items-center gap-3 font-clash font-semibold text-white/75 hover:text-white transition-colors duration-200 mb-16"
            style={{ fontSize: "clamp(1.1rem, 3vw, 2rem)" }}
          >
            <span className="border-b border-white/15 group-hover:border-accent-orange pb-1 transition-colors duration-300">
              omkgandhi@outlook.com
            </span>
            <motion.span
              className="text-text-muted group-hover:text-accent-orange transition-colors duration-200"
              whileHover={{ x: 3, y: -3 }}
            >
              ↗
            </motion.span>
          </a>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/5" />
          </div>

          {/* Social links */}
          <div className="flex items-center gap-8 mb-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-satoshi text-sm text-text-muted hover:text-white transition-colors duration-200"
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>

          <p className="font-satoshi text-xs text-text-muted">
            Based in Ahmedabad, India · Available remotely worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}
