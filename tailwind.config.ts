import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Safelist classes that may be built dynamically so they are not purged in production
  safelist: [
    // Buttons
    "bg-red-500",
    "hover:bg-red-600",
    "text-white",
    "opacity-50",
    "opacity-70",
    "cursor-not-allowed",
    "rounded-full",
    "p-3",
    // Existing download button colors
    "bg-[#FFCC00]",
    "hover:bg-[#e6b800]",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      sm: { max: "700px" },
      xs: { max: "320px" },
      md: "700px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
} satisfies Config;
