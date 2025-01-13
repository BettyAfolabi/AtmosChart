import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ocean: "#005C97",
        sky: "#4A90E2",
        accent: "#007BFF",
        white: "#FFFFFF",
        primaryOcean: "#B3E5FC",
        secOcean: "#D1D1D1",
        secSky:"#F0F0F0",
        logo: "#357ABD"
      },
    },
  },
  plugins: [],
} satisfies Config;
