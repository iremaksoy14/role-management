module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ah: {
          900: "#0F2D6B",
          800: "#14387E",
          700: "#173D8D",
          600: "#1A46A3",
          500: "#1E4BB3",
          100: "#E8EEF9",
          red: "#D61F26",
        },
      },
      boxShadow: {
        ah: "0 6px 20px rgba(15,45,107,0.12)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },

  plugins: [],
};
