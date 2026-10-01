/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#155EA8',
        'primary-hover': '#104985',
        'secondary': '#14B8A6',
        'dark-bg': '#0B1728',
        'surface': '#F3F5F7',
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
