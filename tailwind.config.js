module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./wrapper/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.25rem", "1.75rem"],
      xl: ["1.5rem", "2rem"],
    },
    fontWeight: {
      extrathin: 200,
      thin: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    // Poppins font
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Poppins", "serif"],
      body: ["Poppins", "sans-serif"],
    },

    extend: {
      fontSize: {
        md: ["1.125rem", "1.75rem"],
        "2xl": ["1.75rem", "2rem"],
        "3xl": ["1.875rem", "2.25rem"],
        "4xl": ["2.25rem", "2.5rem"],
      },
      screens: {
        mobileLandscape: {
          raw: "(orientation: landscape) and (min-height: 300px) and (max-height: 650px)",
        },
      },
      colors: {
        primary: "#f40e1e",
        error: "#EC900F",
        info: "#1174D6",
        danger: "#F5365C",
        success: "#25A76F",
        background: "#F4F4F4",
        gray: "#e8e8e8",
        text: "#2d2d2d",
        textsubtle: "#6b6b6b",
        white: "#ffffff",
        black: "#000000",
        facebook: "#316FF6",
        whatsapp: "#25D366",
        linkedin: "#0077B5",
        rating: {
          1: "#cb1d27",
          1.5: "#dd1e11",
          2: "#f07517",
          2.5: "#ee9f17",
          3: "#9cb535",
          3.5: "#99b235",
          4: "#7ec443",
          4.5: "#7ec443",
          5: "#7ec443",
        },
      },
    },
  },
  plugins: [],
};
