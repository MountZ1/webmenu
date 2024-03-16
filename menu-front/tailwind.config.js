/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainbackground: "#023047",
        secondbackground: "#fb8500"
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
      require("daisyui"),
      require('preline/plugin'),
  ],
  plugins: [],
};
