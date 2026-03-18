/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#f27226',
          'orange-dark': '#e66425',
          black: '#1e1e1e',
          'black-alt': '#292828',
          white: '#fafcff',
          blue: '#00aed9',
          red: '#cf1117',
          purple: '#6845ff',
          green: '#10a38d',
        }
      },
      fontFamily: {
        headline: ['"Franklin Gothic"', 'Impact', 'sans-serif'],
        body: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
