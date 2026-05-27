import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./slides/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          50: "#f5f5f7",
          100: "#e8e8ed",
          200: "#c7c7d1",
          400: "#86868f",
          600: "#3a3a42",
          800: "#1a1a1f",
          900: "#0d0d11",
          950: "#06060a",
        },
        accent: {
          DEFAULT: "#7c5cff",
          glow: "#a78bff",
          soft: "#2a1f5c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
