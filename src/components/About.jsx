import { motion } from "framer-motion";
import { useState } from "react";

const skillGroups = [
  {
    category: "Apple Platforms",
    skills: ["Swift", "SwiftUI", "UIKit", "CoreML", "Apple Foundation Models", "SwiftData", "XCTest"],
  },
  {
    category: "Cross-Platform",
    skills: ["React Native", "TypeScript", "Kotlin", "Jetpack Compose", "React"],
  },
  {
    category: "Architecture",
    skills: ["Clean Architecture", "MVVM", "TCA", "Offline-First", "Modular Design"],
  },
  {
    category: "DevOps & Release",
    skills: ["Fastlane", "CodePush", "EAS (OTA)", "CI/CD", "GitHub Actions", "Git"],
  },
  {
    category: "AI & ML",
    skills: ["On-Device ML", "CoreML", "MLKit", "Apple Foundation Models"],
  },
];

function SkillRow({ group, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-b border-white/5 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 cursor-default transition-colors duration-200"
      style={{ backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent" }}
    >
      {/* Gradient left accent on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-opacity duration-300"
        style={{
          background: "linear-gradient(to bottom, #FF5F1F, #E040FB)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Row number */}
      <span
        className="font-clash text-xs w-10 shrink-0 transition-all duration-300 pl-4 md:pl-6"
        style={{
          background: hovered ? "linear-gradient(135deg, #FF5F1F, #E040FB)" : "none",
          WebkitBackgroundClip: hovered ? "text" : "unset",
          WebkitTextFillColor: hovered ? "transparent" : "rgba(255,255,255,0.2)",
          backgroundClip: hovered ? "text" : "unset",
          color: hovered ? "transparent" : "rgba(255,255,255,0.2)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Category */}
      <span
        className="font-satoshi text-xs tracking-widest uppercase shrink-0 transition-colors duration-200 md:w-52"
        style={{ color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}
      >
        {group.category}
      </span>

      {/* Skills — plain text, not pills */}
      <div className="flex flex-wrap gap-x-7 gap-y-1.5 md:pl-4">
        {group.skills.map((skill, si) => (
          <span
            key={skill}
            className="font-satoshi text-sm transition-colors duration-200"
            style={{
              color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
              transitionDelay: hovered ? `${si * 20}ms` : "0ms",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding py-24 md:py-32">
      <div className="max-w-6xl mx-auto">

        {/* Bio — 2 col */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-satoshi tracking-widest uppercase text-accent-orange mb-4">
              About
            </p>
            <h2 className="font-clash font-bold text-4xl md:text-5xl mb-2 leading-tight">
              Engineering for
              <br />
              <span className="text-gradient">the long run.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-satoshi text-text-muted leading-relaxed mb-4">
              Mobile-first technical leader with 3+ years shipping production iOS,
              macOS, and React Native apps that real businesses depend on. Leading
              the engineering effort across a 5-product B2B SaaS suite at Magenta
              Insights — serving 500+ customers across iOS, Android, and web.
            </p>
            <p className="font-satoshi text-text-muted leading-relaxed mb-8">
              My philosophy: offline-first, on-device when possible, always Clean
              Architecture. The best mobile software feels instant because it never
              needs to ask a server for permission.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub", href: "https://github.com/Omgandhi18" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/gandhiom/" },
                { label: "Email", href: "mailto:omkgandhi@outlook.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-satoshi text-sm px-4 py-2 rounded-full bg-surface-2 text-text-muted hover:text-white border border-white/5 hover:border-white/15 transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Capabilities — full-width skill rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-1 px-0">
            <p className="text-xs font-satoshi tracking-widest uppercase text-text-muted">
              Capabilities
            </p>
            <p className="text-xs font-satoshi text-text-muted opacity-40">
              {skillGroups.reduce((acc, g) => acc + g.skills.length, 0)} skills
            </p>
          </div>

          <div className="border-t border-white/5">
            {skillGroups.map((group, i) => (
              <SkillRow key={group.category} group={group} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
