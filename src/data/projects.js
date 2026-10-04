/* Each app has a patron. The emblem key picks its line-art in art/Emblems.jsx.
   Optional `media` ({ icon, shots: [] }) under /public/apps/<slug>/ is shown
   when present; the emblem carries the panel when it is not. */

export const projects = [
  {
    slug: "silo",
    name: "Silo",
    platforms: ["iOS"],
    kind: "On-device wishlist manager",
    thesis: "A wishlist stash that saves everything you want to buy, and keeps it entirely on your phone.",
    patron: {
      name: "Demeter",
      greek: "ΔΗΜΗΤΗΡ",
      line: "Demeter kept the harvest safe in the granary. Silo keeps what you want in yours.",
    },
    emblem: "wheat",
    bullets: [
      "Share any product link from Safari or a shopping app. Image, title and price are fetched on-device.",
      "Colour-coded collections. No accounts, no servers, no tracking.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/silo-your-wishlist-stash/id6784780927",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Every wishlist and save-for-later app wants an account, then parks the list of things you want on its servers: a running record of your desires, monetised. Saving a product link shouldn't cost a login or a data-collection disclosure, and none of it needs to leave the phone.",
      architecture:
        "Silo parses shared product links on-device, pulling image, title and price with no backend in the loop, and files them into colour-coded collections stored in the device's own store. A share-sheet extension in, a tap back to the store out, and nothing in between that touches a server.",
      outcome:
        "On the App Store at 3.9 MB with a one-line privacy story: the list of everything you want never leaves your hand. Tap an item when you're ready and it takes you straight back to the store.",
    },
  },
  {
    slug: "nova-key",
    name: "Nova Key",
    platforms: ["macOS"],
    kind: "On-device AI command palette",
    thesis: "A privacy-first command palette for macOS, powered by Apple Foundation Models.",
    patron: {
      name: "Prometheus",
      greek: "ΠΡΟΜΗΘΕΥΣ",
      line: "Prometheus carried fire down from Olympus. Nova Key carries language models down from the cloud, onto your Mac.",
    },
    emblem: "torch",
    bullets: [
      "All natural-language processing runs on-device: zero data egress, near-zero latency.",
      "Offline-first scheduling and unified system search on Clean Architecture, with no server round-trips.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/nova-key/id6754893146?mt=12",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Command palettes on the Mac either do too little or phone home too much. Anything with real language understanding shipped the user's words to a server, adding latency to every keystroke and a privacy disclosure to every feature. I wanted Spotlight-grade speed with actual language understanding, and the network out of the loop.",
      architecture:
        "The intent layer, Apple Foundation Models running fully on-device, sits behind a boundary, so parsing, the command registry and execution are independently testable. Natural language resolves to typed intents, a unified index covers apps, files and system actions, and offline-first scheduling turns phrases into calendar entries without a round trip.",
      outcome:
        "Shipped on the App Store. It feels instantaneous because nothing leaves the machine: no server to wait for, no inference bill, no privacy-policy asterisk. Press ⌘⇧K and the palette answers.",
    },
  },
  {
    slug: "oink",
    name: "Oink!",
    platforms: ["iOS"],
    kind: "Personal finance tracker",
    thesis: "A finance tracker that never lets your money data leave your hand.",
    patron: {
      name: "Plutus",
      greek: "ΠΛΟΥΤΟΣ",
      line: "Plutus carried the horn of plenty. Oink! keeps count of yours, and tells no one.",
    },
    emblem: "cornucopia",
    bullets: [
      "On-device persistence with SwiftData. Fully local, zero backend.",
      "Real-time spending charts with Swift Charts and SwiftUI.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/oink/id6705128036",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Personal finance apps ask for your bank credentials, your email and your trust, then keep your spending history on their servers. It is some of the most sensitive data a person has, and none of it needs to leave the phone for the app to be useful.",
      architecture:
        "SwiftData owns persistence: every transaction lives in the device's own store, modelled for fast aggregate queries. SwiftUI and Swift Charts render spending in real time straight from local data, with no cache invalidation, no sync state machine and no backend. MVVM keeps views thin and logic testable.",
      outcome:
        "On the App Store with zero infrastructure cost and a one-line privacy story: your money data never leaves your hand. The architecture is the feature.",
    },
  },
  {
    slug: "translo",
    name: "Translo",
    platforms: ["iOS", "macOS"],
    kind: "On-device ML translator",
    thesis: "Fully offline translation. Real-time, no server, no inference cost.",
    patron: {
      name: "Hermes",
      greek: "ΕΡΜΗΣ",
      line: "Hermes carried words between gods and mortals. Translo carries them between languages, offline.",
    },
    emblem: "caduceus",
    bullets: [
      "Zero-latency translation on Google MLKit, running entirely on-device.",
      "One shared SwiftUI core, shipped to iPhone and Mac.",
    ],
    links: {
      appStore: "https://apps.apple.com/us/app/translo/id6659895212",
      github: "https://github.com/Omgandhi18",
    },
    caseStudy: {
      problem:
        "Translation is a network feature in most apps. Every phrase becomes an API call, which means latency on every interaction, a cost on every request, and an app that is useless on a plane or behind a firewall.",
      architecture:
        "Google MLKit's translation models run entirely on-device, wrapped behind a thin translation boundary so the engine can be swapped without touching the UI. A shared SwiftUI core ships the same experience to iPhone and Mac; language packs download once and live locally.",
      outcome:
        "Real-time translation with zero latency, zero inference cost and full offline operation. Typed text becomes another language as fast as it can be rendered.",
    },
  },
];

export const professionalWorks = [
  {
    name: "Magenta BI 2.0",
    platforms: ["iOS", "Android", "Web"],
    line: "Business intelligence for 500+ business customers. I architected the complete mobile foundation on Clean Architecture and MVVM.",
  },
  {
    name: "Magenta On Field",
    platforms: ["iOS", "Android"],
    line: "Sales-force automation for field agents: visits, order collection and live reporting, tuned for low-end Android devices.",
  },
  {
    name: "Magenta CRM",
    platforms: ["iOS", "Android", "Web"],
    line: "A CRM wired into Magenta BI, so leads and interactions arrive with business intelligence already in context.",
  },
  {
    name: "Panchayat",
    platforms: ["Web", "Internal"],
    line: "A kanban feature-lifecycle tool with threaded chat, versioned Markdown documents and a per-feature role model.",
  },
];
