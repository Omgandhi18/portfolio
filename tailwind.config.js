/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        ground: "rgb(var(--c-ground) / <alpha-value>)",
        "on-ground": "rgb(var(--c-on-ground) / <alpha-value>)",
      },
      borderColor: {
        line: "rgb(var(--c-ink) / 0.12)",
      },
      fontFamily: {
        display: ["'Cormorant Variable'", "Georgia", "serif"],
        sans: ["'Manrope Variable'", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        inscription: "0.28em",
        label: "0.18em",
      },
      maxWidth: {
        site: "84rem",
      },
      /* z-index scale: nav 40, sheet 60, palette 70, intro 80, grain 90, storm 95 */
      zIndex: {
        nav: "40",
        sheet: "60",
        palette: "70",
        intro: "80",
        grain: "90",
        storm: "95",
      },
      transitionTimingFunction: {
        myth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
