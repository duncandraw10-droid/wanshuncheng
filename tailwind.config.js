/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2563EB',
        'primary-hover': '#1D4ED8',
        'secondary': '#14B8A6',
        'dark-bg': '#172B46',
        'surface': '#F8FAFC',
        'text-main': '#334155',
      },
      fontFamily: {
        'sans': ['"Noto Sans TC"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['Inter', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      }
    },
  },
  plugins: [],
}
