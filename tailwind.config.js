/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        clash: ["'Clash Display'", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      colors: {
        bg: "#0F0F14",
        surface: "#16161E",
        "surface-2": "#1E1E2A",
        "accent-orange": "#FF5F1F",
        "accent-magenta": "#E040FB",
        "text-muted": "#8888A0",
      },
      animation: {
        "gradient-shift": "gradientShift 6s ease infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
