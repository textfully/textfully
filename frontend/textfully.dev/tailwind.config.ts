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
        border: {
          DEFAULT:
            "color-mix(in srgb, var(--border) calc(100% * <alpha-value>), transparent)",
          hover:
            "color-mix(in srgb, var(--border-hover) calc(100% * <alpha-value>), transparent)",
        },
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
          hover:
            "color-mix(in srgb, var(--primary-hover) calc(100% * <alpha-value>), transparent)",
        },
        secondary:
          "color-mix(in srgb, var(--secondary) calc(100% * <alpha-value>), transparent)",
        tertiary: {
          DEFAULT:
            "color-mix(in srgb, var(--tertiary) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--tertiary-foreground) calc(100% * <alpha-value>), transparent)",
          hover:
            "color-mix(in srgb, var(--tertiary-hover) calc(100% * <alpha-value>), transparent)",
        },
        surface: {
          DEFAULT:
            "color-mix(in srgb, var(--surface) calc(100% * <alpha-value>), transparent)",
          hover:
            "color-mix(in srgb, var(--surface-hover) calc(100% * <alpha-value>), transparent)",
        },
        tint: "color-mix(in srgb, var(--tint) calc(100% * <alpha-value>), transparent)",
        mid: "color-mix(in srgb, var(--mid) calc(100% * <alpha-value>), transparent)",
        highlight:
          "color-mix(in srgb, var(--highlight) calc(100% * <alpha-value>), transparent)",
        backdrop:
          "color-mix(in srgb, var(--backdrop) calc(100% * <alpha-value>), transparent)",
        material:
          "color-mix(in srgb, var(--material) calc(100% * <alpha-value>), transparent)",
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
          accent:
            "color-mix(in srgb, var(--card-accent) calc(100% * <alpha-value>), transparent)",
          border:
            "color-mix(in srgb, var(--card-border) calc(100% * <alpha-value>), transparent)",
          foreground:
            "color-mix(in srgb, var(--card-foreground) calc(100% * <alpha-value>), transparent)",
        },
        black:
          "color-mix(in srgb, var(--black) calc(100% * <alpha-value>), transparent)",
        "almost-black":
          "color-mix(in srgb, var(--almost-black) calc(100% * <alpha-value>), transparent)",
        "dark-ink":
          "color-mix(in srgb, var(--dark-ink) calc(100% * <alpha-value>), transparent)",
        "base-ink":
          "color-mix(in srgb, var(--base-ink) calc(100% * <alpha-value>), transparent)",
        "lighter-ink":
          "color-mix(in srgb, var(--lighter-ink) calc(100% * <alpha-value>), transparent)",
        "dark-sky":
          "color-mix(in srgb, var(--dark-sky) calc(100% * <alpha-value>), transparent)",
        "base-sky":
          "color-mix(in srgb, var(--base-sky) calc(100% * <alpha-value>), transparent)",
        "light-sky":
          "color-mix(in srgb, var(--light-sky) calc(100% * <alpha-value>), transparent)",
        "lighter-sky":
          "color-mix(in srgb, var(--lighter-sky) calc(100% * <alpha-value>), transparent)",
        "lightest-sky":
          "color-mix(in srgb, var(--lightest-sky) calc(100% * <alpha-value>), transparent)",
        white:
          "color-mix(in srgb, var(--white) calc(100% * <alpha-value>), transparent)",
        orange:
          "color-mix(in srgb, var(--orange) calc(100% * <alpha-value>), transparent)",
        "light-orange":
          "color-mix(in srgb, var(--light-orange) calc(100% * <alpha-value>), transparent)",
        "lighter-orange":
          "color-mix(in srgb, var(--lighter-orange) calc(100% * <alpha-value>), transparent)",
        "lightest-orange":
          "color-mix(in srgb, var(--lightest-orange) calc(100% * <alpha-value>), transparent)",
        "light-blue":
          "color-mix(in srgb, var(--light-blue) calc(100% * <alpha-value>), transparent)",
        yellow:
          "color-mix(in srgb, var(--yellow) calc(100% * <alpha-value>), transparent)",
        blue: "color-mix(in srgb, var(--blue) calc(100% * <alpha-value>), transparent)",
        "dark-blue":
          "color-mix(in srgb, var(--dark-blue) calc(100% * <alpha-value>), transparent)",
        "deep-blue":
          "color-mix(in srgb, var(--deep-blue) calc(100% * <alpha-value>), transparent)",
        "light-green":
          "color-mix(in srgb, var(--light-green) calc(100% * <alpha-value>), transparent)",
        green:
          "color-mix(in srgb, var(--green) calc(100% * <alpha-value>), transparent)",
        "dark-green":
          "color-mix(in srgb, var(--dark-green) calc(100% * <alpha-value>), transparent)",
        red: "color-mix(in srgb, var(--red) calc(100% * <alpha-value>), transparent)",
        pink: "color-mix(in srgb, var(--pink) calc(100% * <alpha-value>), transparent)",
        "light-silver":
          "color-mix(in srgb, var(--light-silver) calc(100% * <alpha-value>), transparent)",
        "mid-silver":
          "color-mix(in srgb, var(--mid-silver) calc(100% * <alpha-value>), transparent)",
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
