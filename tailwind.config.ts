const naviktTailwindPreset = require('@navikt/ds-tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [naviktTailwindPreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './schemas/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
