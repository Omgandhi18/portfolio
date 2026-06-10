/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        marble: "rgb(var(--c-marble) / <alpha-value>)",
        panel: "rgb(var(--c-panel) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        faded: "rgb(var(--c-faded) / <alpha-value>)",
        bronze: "rgb(var(--c-bronze) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
      },
      borderColor: {
        hairline: "rgb(var(--c-ink) / 0.16)",
      },
      fontFamily: {
        display: ["Marcellus", "Georgia", "serif"],
        body: ["'EB Garamond Variable'", "Georgia", "serif"],
      },
      letterSpacing: {
        inscription: "0.22em",
        epigraph: "0.16em",
      },
      maxWidth: {
        site: "66rem",
      },
    },
  },
  plugins: [],
};
