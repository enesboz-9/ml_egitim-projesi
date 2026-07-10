import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#12151B",
          900: "#1B1F27",
          800: "#232833",
          700: "#2A2F3A",
        },
        signal: {
          teal: "#4FD1C5",
          tealDim: "#2E7D74",
        },
        tap: {
          amber: "#F2A65A",
          amberDim: "#8A5E32",
        },
        paper: "#E8E6DF",
        muted: "#8890A0",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        grid:
          "linear-gradient(to right, #2A2F3A 1px, transparent 1px), linear-gradient(to bottom, #2A2F3A 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [],
};
export default config;
