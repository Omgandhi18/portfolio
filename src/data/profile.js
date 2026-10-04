import { projects } from "./projects";

export const profile = {
  name: "Om Gandhi",
  mark: "Ω",
  epithet: "Senior Mobile Engineer",
  location: "Ahmedabad, India",
  email: "omgandhi255@gmail.com",
  resume: "/Om_Gandhi_Resume.pdf",
  hero: "Three years of production iOS, macOS and React\u00a0Native, shipped to 500+ businesses and built to last.",
  links: {
    github: "https://github.com/Omgandhi18",
    linkedin: "https://www.linkedin.com/in/gandhiom/",
  },

  /* Read word by word as you scroll. */
  statement:
    "I lead mobile and frontend engineering at Magenta Insights, where five products serve more than five hundred businesses across iOS, Android and the web. I care about structure more than ceremony.",
  about: [
    "Clean Architecture, MVVM and modular design are how my team cut production bugs by around eighty percent in a quarter. Fastlane, OTA updates and branch-based CI/CD turned multi-day releases into a weekly rhythm.",
    "Before all this, my MSc research looked at UPI adoption and digital payments. It still shapes how I think about the systems these products live inside.",
  ],

  stats: [
    { value: 500, suffix: "+", label: "Businesses served" },
    { value: 5, label: "Products owned" },
    { value: 80, prefix: "~", suffix: "%", label: "Fewer production bugs" },
    { value: projects.length, label: "Apps on the App Store" },
  ],

  /* Five columns of the pantheon. */
  skills: [
    {
      label: "Apple Platforms",
      short: "Apple",
      items: ["Swift", "SwiftUI", "UIKit", "CoreML", "Apple Foundation Models", "SwiftData", "XCTest"],
    },
    {
      label: "Cross-Platform",
      short: "Cross",
      items: ["React Native", "TypeScript", "Kotlin", "Jetpack Compose", "React"],
    },
    {
      label: "Architecture",
      short: "Arch",
      items: ["Clean Architecture", "MVVM", "TCA", "Modular Design", "System Design", "Offline-First"],
    },
    {
      label: "Release",
      short: "Ship",
      items: ["Fastlane", "CodePush", "EAS (OTA)", "CI/CD", "GitHub Actions", "Agile / Scrum"],
    },
    {
      label: "AI & ML",
      short: "AI",
      items: ["On-Device ML", "CoreML", "MLKit", "Apple Foundation Models", "Performance Optimisation"],
    },
  ],

  oracles: [
    { greek: "ΜΗΔΕΝ ΑΓΑΝ", english: "Nothing in excess" },
    { greek: "ΓΝΩΘΙ ΣΕΑΥΤΟΝ", english: "Know thy codebase" },
    { greek: "ΣΠΕΥΔΕ ΒΡΑΔΕΩΣ", english: "Make haste, slowly" },
    { greek: "ΔΙΣ ΜΕΤΡΕΙ", english: "Measure twice, ship once" },
  ],
};
