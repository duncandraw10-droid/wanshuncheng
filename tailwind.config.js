/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./404.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1e40af",
        "primary-container": "#172554",
        "primary-hover": "#2563eb",
        "primary-fixed": "#dbeafe",
        "secondary": "#059669",
        "secondary-cta": "#10b981",
        "secondary-cta-hover": "#059669",
        "surface": "#f8fafc",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f1f5f9",
        "surface-container": "#e2e8f0",
        "surface-container-high": "#cbd5e1",
        "surface-container-highest": "#94a3b8",
        "on-surface": "#0f172a",
        "on-surface-variant": "#475569",
        "outline": "#64748b",
        "outline-variant": "#e2e8f0",
        "dark-bg": "#090d16",
        "dark-surface": "#0f172a",
        "line": "#06c755"
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Noto Sans TC"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      spacing: {
        "margin": "2.5rem",
        "margin-mobile": "1.25rem",
        "gutter": "1.5rem"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        "lg": "0.375rem",
        "xl": "0.5rem",
        "2xl": "0.75rem"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
