import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        assistant: ["var(--font-assistant)", "sans-serif"],
        inriaSerif: ["var(--font-inria-serif)", "serif"],
        barlowCondensed: ["var(--font-barlow-condensed)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        bitter: ["var(--font-bitter)", "serif"]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#2954CC"
      },
    },
  },
  plugins: [],
};
export default config;
