import { fontFamily } from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      xs: "450px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT:
            "color-mix(in srgb, var(--primary) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--primary-foreground) calc(100% * <alpha-value>), transparent)",
          hover:
            "color-mix(in srgb, var(--primary-hover) calc(100% * <alpha-value>), transparent)",
        },
        black:
          "color-mix(in srgb, var(--black) calc(100% * <alpha-value>), transparent)",
        white:
          "color-mix(in srgb, var(--white) calc(100% * <alpha-value>), transparent)",
        transparent:
          "color-mix(in srgb, var(--transparent) calc(100% * <alpha-value>), transparent)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      aspectRatio: {
        "2/1": "2 / 1",
        "16/9": "16 / 9",
      },
      translate: {
        200: "200%",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-safe-area")],
} satisfies Config;

export default config;
