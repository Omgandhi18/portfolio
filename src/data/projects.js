export const professionalWorks = [
  {
    name: "Magenta BI 2.0",
    platform: "iOS · Android · Web",
    line: "Full-scale business intelligence platform serving 500+ business customers — architected the complete mobile foundation on Clean Architecture and MVVM.",
  },
  {
    name: "Magenta On Field",
    platform: "iOS · Android",
    line: "Sales-force automation for field agents — visit management, order collection, and real-time reporting, optimised for low-end Android devices.",
  },
  {
    name: "Magenta CRM",
    platform: "iOS · Android · Web",
    line: "CRM tightly integrated with Magenta BI — leads, interactions, and BI intelligence surfaced in context across mobile and web.",
  },
  {
    name: "Panchayat",
    platform: "Web · Internal Tool",
    line: "Kanban-based feature lifecycle tool with threaded chat, versioned Markdown documents, and a per-feature role model.",
  },
];

export const projects = [
  {
    name: "Nova Key",
    platform: "macOS",
    kind: "On-Device AI Command Palette",
    thesis: "A privacy-first command palette for macOS, powered by Apple Foundation Models.",
    bullets: [
      "All natural-language processing runs fully on-device — zero data egress, near-zero latency.",
      "Offline-first AI scheduling and unified system search built on Clean Architecture, with no server round-trips at all.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/nova-key/id6754893146?mt=12",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Command palettes and assistants on the Mac either do too little or phone home too much. Anything with real language understanding shipped the user's words to a server — adding latency to every keystroke and a privacy disclosure to every feature. I wanted Spotlight-grade speed with actual language understanding, and I wanted the network out of the loop entirely.",
      architecture:
        "Built on Clean Architecture: the intent layer — Apple Foundation Models running fully on-device — sits behind a boundary, so parsing, the command registry, and execution are independently testable. Natural language resolves to typed intents; a unified search index covers apps, files, and system actions; offline-first scheduling turns phrases into calendar entries without a round trip. Zero data egress, by construction.",
      outcome:
        "Shipped on the App Store. Response feels instantaneous because nothing leaves the machine — there is no server to wait for, no inference bill to pay, and no privacy-policy asterisk. ⌘⇧K, and the palette answers.",
    },
  },
  {
    name: "Oink!",
    platform: "iOS",
    kind: "Personal Finance Tracker",
    thesis: "A finance tracker that never lets your money data leave your hand.",
    bullets: [
      "Secure on-device persistence via SwiftData — 100% local, zero backend infrastructure.",
      "Real-time spending visualisation with Swift Charts and SwiftUI.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/oink/id6705128036",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Personal finance apps ask for your bank credentials, your email address, and your trust — then keep your spending history on their servers. The data is among the most sensitive a person has, and none of it needs to leave the phone for the app to be useful.",
      architecture:
        "SwiftData owns persistence: every transaction lives in the device's own store, modelled for fast aggregate queries. SwiftUI and Swift Charts render spending in real time straight from local data — no cache invalidation, no sync state machine, no backend at all. MVVM keeps the views thin and the logic testable.",
      outcome:
        "On the App Store with zero infrastructure cost and a one-line privacy story: your money data never leaves your hand. The architecture is the feature.",
    },
  },
  {
    name: "Translo",
    platform: "iOS · macOS",
    kind: "On-Device ML Translator",
    thesis: "Fully offline translation — real-time, no server, no inference cost.",
    bullets: [
      "Zero-latency text translation built on Google MLKit, running entirely on-device.",
      "Shipped across iPhone and Mac with a shared SwiftUI core.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/translo/id6659895212",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Translation is a network feature in most apps — every phrase becomes an API call, which means latency on every interaction, a cost on every request, and an app that is useless on a plane or behind a firewall.",
      architecture:
        "Google MLKit's translation models run entirely on-device, wrapped behind a thin translation boundary so the engine could be swapped without touching the UI. A shared SwiftUI core ships the same experience to iPhone and Mac; language packs download once and live locally.",
      outcome:
        "Real-time translation with zero latency, zero inference cost, and full offline operation — typed text becomes another language as fast as it can be rendered.",
    },
  },
];
