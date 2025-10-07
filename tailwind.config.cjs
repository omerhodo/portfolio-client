/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        'bitcount': ['"Bitcount Prop Single Ink"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
