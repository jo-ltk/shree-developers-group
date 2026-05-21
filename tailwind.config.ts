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
        cream: "#F5F0E8",
        dark: "#1C1208",
        rust: "#D43F33",
      },
      keyframes: {
        "carousel-hint-nudge": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        "carousel-hint-nudge": "carousel-hint-nudge 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
