/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "hsl(0, 0%, 59%)",
        darkGray: "hsl(0, 0%, 17%)",
      },
    },
  },
  plugins: [],
};
