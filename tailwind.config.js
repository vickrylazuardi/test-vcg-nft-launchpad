module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: {
        default: "20px",
        sm: "1.5rem",
        md: "1.5rem",
        lg: "0",
        xl: "0",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
      },
    },
    screens: {
      "3xl": { min: "1780px" },
      "2xl": { max: "1779px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "830px" },
      sm: { max: "639px" },
    },
    fontFamily: {
      sans: ["Rajdhani"],
    },
    maxWidth: {
      content: "max-content",
    },
    extend: {
      width: {
        60: "60px",
      },
      height: {
        60: "60px",
      },
    },
  },
  plugins: [],
};
