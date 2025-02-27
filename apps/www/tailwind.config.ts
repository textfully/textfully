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
        general: ["General Sans", "sans-serif"],
        inter: ["var(--font-inter)", ...fontFamily.sans],
      },
      colors: {
        black:
          "color-mix(in srgb, var(--black) calc(100% * <alpha-value>), transparent)",
        white:
          "color-mix(in srgb, var(--white) calc(100% * <alpha-value>), transparent)",
        transparent:
          "color-mix(in srgb, var(--transparent) calc(100% * <alpha-value>), transparent)",
        border:
          "color-mix(in srgb, var(--border) calc(100% * <alpha-value>), transparent)",
        input:
          "color-mix(in srgb, var(--input) calc(100% * <alpha-value>), transparent)",
        ring: "color-mix(in srgb, var(--ring) calc(100% * <alpha-value>), transparent)",
        background:
          "color-mix(in srgb, var(--background) calc(100% * <alpha-value>), transparent)",
        foreground:
          "color-mix(in srgb, var(--foreground) calc(100% * <alpha-value>), transparent)",
        primary: {
          DEFAULT:
            "color-mix(in srgb, var(--primary) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--primary-foreground) calc(100% * <alpha-value>), transparent)",
        },
        secondary: {
          DEFAULT:
            "color-mix(in srgb, var(--secondary) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--secondary-foreground) calc(100% * <alpha-value>), transparent)",
        },
        destructive: {
          DEFAULT:
            "color-mix(in srgb, var(--destructive) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--destructive-foreground) calc(100% * <alpha-value>), transparent)",
        },
        muted: {
          DEFAULT:
            "color-mix(in srgb, var(--muted) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--muted-foreground) calc(100% * <alpha-value>), transparent)",
        },
        accent: {
          DEFAULT:
            "color-mix(in srgb, var(--accent) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--accent-foreground) calc(100% * <alpha-value>), transparent)",
        },
        popover: {
          DEFAULT:
            "color-mix(in srgb, var(--popover) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--popover-foreground) calc(100% * <alpha-value>), transparent)",
        },
        card: {
          DEFAULT:
            "color-mix(in srgb, var(--card) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--card-foreground) calc(100% * <alpha-value>), transparent)",
        },
      },
      height: {
        "row-lg": "68px",
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
