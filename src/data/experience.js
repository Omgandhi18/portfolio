/* The voyage, in the order it was sailed. Each stop has a mythic harbour:
   Aulis, where the fleet gathered; the Hesperides, garden of golden apples;
   Thule, the far north of the Greek map; and Ithaca, home. */

export const voyage = [
  {
    id: "aulis",
    place: { greek: "ΑΥΛΙΣ", english: "Aulis" },
    island: "harbour",
    when: "2019 - 2023",
    where: "Gujarat, India",
    roles: [
      {
        title: "B.E. Computer Science & Engineering",
        org: "Gujarat Technological University",
        notes: [],
      },
    ],
    kind: "study",
  },
  {
    id: "hesperides",
    place: { greek: "ΕΣΠΕΡΙΔΕΣ", english: "Hesperides" },
    island: "orchard",
    when: "Jan 2023 - Dec 2023",
    where: "India",
    roles: [
      {
        title: "iOS Developer",
        org: "Athulya Tech",
        notes: [
          "Promoted from intern to full-time within the onboarding period, on code quality and delivery pace.",
          "Fixed latency and reliability failures in legacy auth and data layers by migrating to Alamofire.",
          "Frame-stable interfaces through Lottie and a rework of view lifecycle management.",
        ],
      },
    ],
    kind: "work",
  },
  {
    id: "thule",
    place: { greek: "ΘΟΥΛΗ", english: "Thule" },
    island: "castle",
    when: "2024 - 2025",
    where: "Edinburgh, Scotland",
    roles: [
      {
        title: "M.Sc. Business Information Technology",
        org: "Edinburgh Napier University",
        notes: [
          "Dissertation on the growth of UPI adoption in India: FinTech trends, payment architecture and consumer behaviour.",
        ],
      },
      {
        title: "Technical Demonstrator",
        org: "Edinburgh Napier University",
        notes: [
          "Weekly labs for cohorts of 15 to 30 students in software engineering, OOP in C# and algorithms.",
          "Open Q&A sessions for the whole student body, debugging live across modules.",
        ],
      },
    ],
    kind: "both",
  },
  {
    id: "ithaca",
    place: { greek: "ΙΘΑΚΗ", english: "Ithaca" },
    island: "home",
    when: "May 2025 - Present",
    where: "Ahmedabad, India",
    roles: [
      {
        title: "Lead Mobile & Frontend Engineer",
        org: "Magenta Insights",
        notes: [
          "Engineering owner across a five-product B2B suite (Magenta BI 2.0, CRM, On Field) serving 500+ businesses.",
          "Architected the mobile foundation for all five on Clean Architecture and MVVM, now the team-wide baseline.",
          "Lead a team of five across two sprint tracks. Review standards and PR templates cut production bugs by ~80% in a quarter.",
          "Replaced multi-day releases with weekly shipping through Fastlane, OTA (CodePush, EAS) and branch-based CI/CD.",
        ],
      },
    ],
    kind: "work",
    present: true,
  },
];
