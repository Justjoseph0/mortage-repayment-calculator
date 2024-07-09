/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./build/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bgLime: "hsl(61, 70%, 52%)",
        Slate100: "hsl(202, 86%, 94%)",
        slate300: "hsl(203, 41%, 72%)",
        slate900: "hsl(202, 55%, 16%)",
        slate500: "hsl(200, 26%, 54%)",
        slate700: "hsl(200, 24%, 40%)",
        white100: "hsl(0, 0%, 100%)",
        red: " hsl(4, 69%, 50%)",
      },
    },
  },
  plugins: [],
};
