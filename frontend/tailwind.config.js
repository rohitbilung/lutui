/** @type {import('tailwindcss').Config} */
export default {
    theme: {
      extend: {
        colors: {
          lutui: "rgb(var(--lutui) / <alpha-value>)", // Use CSS variable for Tailwind
        },
      },
    },
    plugins: [],
  };
  