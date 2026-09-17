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
          DEFAULT: "#0984e3",
          glow: "#7dd3fc",
          soft: "#0642b4",
        },
        // powerkurzus.hu blues: primary #0984e3, hover #0773cb,
        // hero gradient linear-gradient(135deg, #2d95e6, #0642b4)
        brand: {
          50: "#eef6fd",
          100: "#d9ecfb",
          200: "#b5d9f8",
          300: "#8ac4f2",
          400: "#2d95e6",
          500: "#0984e3",
          600: "#0773cb",
          700: "#0642b4",
          800: "#05379b",
          900: "#062c72",
        },
      },
    },
  },
  plugins: [],
};

export default config;
