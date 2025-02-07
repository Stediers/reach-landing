/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./wrapper/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      // indieFlower: ["var(--font-indieflower)"],
      gilroy: ["var(--font-gilroy)"],
    },
    fontWeight: {
      thin: 200,
      extralight: 300,
      light: 400,
      normal: 500,
      medium: 600,
      semibold: 700,
      bold: 800,
      extrabold: 900,
    },
    // fontSize: {
    //   xs: "0.75rem",
    //   sm: "0.875rem",
    //   base: "1rem",
    //   lg: "1.125rem",
    //   xl: "1.25rem",
    //   "2xl": "1.5rem",
    //   "3xl": "1.875rem",
    //   "4xl": "2.25rem",
    //   "5xl": "3rem",
    //   "6xl": "4rem",
    //   "7xl": "5rem",
    // },
    extend: {
      fontSize: {
        md: "1rem",
      },
      colors: {
        error: "#EC900F",
        info: "#1174D6",
        danger: "#F5365C",
        success: "#25A76F",
        //not pure black
        black: "#1A1A1A",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        text: {
          DEFAULT: "hsl(var(--text))",
          foreground: "hsl(var(--text-foreground))",
        },
        textsubtle: {
          DEFAULT: "hsl(var(--text-subtle))",
          foreground: "hsl(var(--textsubtle-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
