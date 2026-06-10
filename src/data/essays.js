export const essays = [
  {
    slug: "architecture-you-can-point-at",
    title: "Architecture You Can Point At",
    date: "June 2026",
    dek: "An eighty-percent drop in production bugs didn't come from better debugging. It came from making the wrong code harder to write.",
    body: [
      "When I took ownership of mobile engineering across five products at Magenta Insights, the codebases didn't share a disease so much as a condition: everything was possible everywhere. Network calls in view layers, business rules inside components, state mutated wherever it was convenient. None of it was wrong in isolation. All of it together meant every change was a negotiation with the whole application.",
      "The fix was not heroics. It was Clean Architecture and MVVM, applied with the kind of stubbornness that survives sprint pressure. Domain logic in the centre with no knowledge of UI or transport; data sources behind interfaces; view models that translate state for views that do nothing but render it. The shape is boring. That is its entire value.",
      "Boring shapes are enforceable. A reviewer doesn't have to be the smartest person in the room to spot a repository import inside a view — the layering makes the violation visible at a glance. We encoded that visibility into PR templates and code-review standards: every change declares which layer it touches and why. Review stopped being a matter of taste and started being a matter of structure.",
      "Testability followed for free, which is the part people under-sell. When the domain layer has no framework imports, unit tests need no simulators and no ceremony. Tests that are cheap to write get written; tests that get written catch regressions before users do. Independent testability wasn't a goal of the architecture — it was a property of it.",
      "Within the first quarter, production bugs dropped by roughly eighty percent. I hold that number loosely — bug counts are noisy, and a team that starts measuring improves for more than one reason. But the mechanism was visible in review after review: whole classes of defect became structurally impossible. You cannot corrupt state from a layer that cannot see it.",
      "Delivery is architecture too. We replaced multi-day manual releases with Fastlane automation, OTA pipelines through CodePush and EAS, and branch-based CI/CD — and the weekly shipping rhythm that followed did more for code quality than any style guide, because small diffs are reviewable diffs, and reviewable diffs keep the layering honest.",
      "Architecture is usually defended in diagrams. I've come to prefer a harder test: can you point at it? Not at the slide — at the codebase, at the pull request the structure rejected, at the bug class that stopped appearing. If the architecture only exists in the diagram, it doesn't exist. If it exists in what the code refuses to let you do, it's real.",
    ],
  },
  {
    slug: "the-best-server-is-no-server",
    title: "The Best Server Is No Server",
    date: "June 2026",
    dek: "Three shipped apps, zero backends. What building on-device taught me about latency, privacy, and the economics of ML features.",
    body: [
      "I have shipped three apps with machine-learning features — a command palette that understands natural language, a real-time translator, a finance tracker with live analytics — and none of them talks to a server I own. That isn't a constraint I accepted. It's the design.",
      "Latency first, because users feel it first. A network inference call costs you a round trip before the model even starts thinking — and it costs you that round trip on every single interaction, forever. On-device, the floor drops to whatever the silicon allows. Nova Key parses intent with Apple Foundation Models between keystrokes; Translo turns typed text into another language as fast as the screen can render it. No spinner survives contact with zero network dependency.",
      "On-device also flips the privacy conversation from policy to physics. Oink! keeps your entire spending history in SwiftData on your own phone; Nova Key processes everything you type without a byte of egress. There is no 'we take your privacy seriously' paragraph, because there is no collected data to be serious about. Privacy by construction beats privacy by promise — and it's a far easier conversation with users, reviewers, and yourself.",
      "Then there's the economics nobody puts on the landing page: every cloud inference has a unit cost that scales with your success. A translation app that pays per API call is an app whose best users are its biggest liability. Translo translates for free, forever, because MLKit's models run locally — the marginal cost of a delighted user is zero. For an independent developer, that isn't an optimisation; it's the difference between an app that can exist and one that can't.",
      "Honesty requires the other column: on-device is not a free lunch. Local models are smaller, and smaller means less capable; you don't get frontier-model reasoning on a phone. The discipline is to constrain the problem until the local model is enough — translation, intent parsing, and spending analytics are all bounded domains where a small model is not a compromise but a fit. Detect capability at runtime, degrade gracefully where hardware is older, and never build a feature whose floor depends on a model you can't ship.",
      "Offline-first is the architecture that holds all of this together. When local is the source of truth, the network becomes an enhancement instead of a dependency — and entire categories of failure mode disappear with it: no sync conflicts to resolve in support tickets, no spinners over empty states, no outage that takes your users' data hostage. The app works on a plane, in a basement, in a village with one bar of signal — which is to say, it works.",
      "The industry default is still server-first, with on-device as the exotic alternative. I think that default is quietly expiring. The hardware in people's pockets is extraordinary, the local-model ecosystem is maturing fast, and the best latency, the best privacy story, and the best unit economics all live in the same place. The best server is the one you never have to ship.",
    ],
  },
];
