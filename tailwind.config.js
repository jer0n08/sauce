module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    deliciousHamburgers: {
      size: "30px",
      color: "#a74c17",
      colorLight: "#e7cea0",
      padding: "0px",
      animationSpeed: 1,
    },
  },
  plugins: [require("tailwindcss-delicious-hamburgers")],
};
