/** @type {import('tailwindcss').Config} */
import odsTwPreset from './lib/tailwind.preset.js';

export default {
  presets: [odsTwPreset],
  content: ['./lib/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  prefix: '',
  plugins: [],
};
