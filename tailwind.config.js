/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#090D19',
        'bg-card': '#141A32',
        'bg-input': '#1D233B',
        'border-color': '#323851',
        'text-primary': '#EEEEEE',
        'text-secondary': '#888EAA',
        'accent-blue': '#36CCFF',
        'btn-gradient-start': '#289AFF',
        'btn-gradient-end': '#9241FF',
        'btn-secondary': '#22283E',
        'danger-color': '#912633',
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}