/** @type {import('tailwindcss').Config} */

// Colors that change between the dark and light theme are CSS variables
// (channels like "7 11 26") defined in src/styles/global.css, so every
// existing utility (text-slate-400, bg-white/5, bg-ink-950 ...) follows the theme.
const themed = (name) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // "white" is used everywhere as a translucent overlay (bg-white/5, border-white/10).
        // It flips to a dark tint in the light theme. Text/knobs that must stay pure white use text-[#fff].
        white: themed("--c-overlay"),
        // Text that sits on bright gradient badges/buttons: always dark, in both themes.
        onaccent: "#070b1a",
        ink: {
          950: themed("--c-ink-950"),
          900: themed("--c-ink-900"),
          800: themed("--c-ink-800"),
          700: themed("--c-ink-700"),
        },
        slate: {
          50: themed("--c-slate-50"),
          100: themed("--c-slate-100"),
          200: themed("--c-slate-200"),
          300: themed("--c-slate-300"),
          400: themed("--c-slate-400"),
          500: themed("--c-slate-500"),
          600: themed("--c-slate-600"),
          700: themed("--c-slate-700"),
          800: themed("--c-slate-800"),
          900: themed("--c-slate-900"),
          950: themed("--c-slate-950"),
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "system-ui", "-apple-system", "Helvetica Neue", "Arial", "sans-serif"],
      },
      boxShadow: {
        card: "var(--shadow-card)",
        btn: "0 12px 24px -12px rgba(45,212,191,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
        nav: "var(--shadow-nav)",
      },
      backgroundImage: {
        "app-radial": "var(--app-bg)",
      },
      animation: {
        "orb-float": "orb-float 18s cubic-bezier(0.22,1,0.36,1) infinite alternate",
        "page-in": "page-in 0.45s cubic-bezier(0.22,1,0.36,1)",
      },
      keyframes: {
        "orb-float": {
          from: { transform: "translateY(0) scale(1)" },
          to: { transform: "translateY(-40px) scale(1.12)" },
        },
        "page-in": {
          from: { opacity: 0, transform: "translateY(14px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
