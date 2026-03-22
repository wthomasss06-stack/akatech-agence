/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0fdf5',
          100: '#dcfce8',
          400: '#4ade80',
          500: '#22c864',
          600: '#1fb865',
          700: '#17a354',
          800: '#0d6e38',
          900: '#08150e',
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", 'sans-serif'],
        body:    ["'Exo 2'", 'sans-serif'],
        mono:    ["'JetBrains Mono'", 'monospace'],
        orb:     ["'Orbitron'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
