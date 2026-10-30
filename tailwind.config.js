/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Cores que mudam com o tema vêm de variáveis CSS (ver src/index.css).
      // vks.white = texto, vks.black = fundo; `white` = texto de maior contraste.
      colors: {
        white: 'rgb(var(--vks-strong) / <alpha-value>)',
        vks: {
          primary: '#501BED',
          primaryGlow: 'rgb(var(--vks-primary-glow) / <alpha-value>)',
          primaryDark: '#360EB5',
          onPrimary: '#FFFFFF',
          white: 'rgb(var(--vks-fg) / <alpha-value>)',
          black: 'rgb(var(--vks-bg) / <alpha-value>)',
          surface: 'rgb(var(--vks-surface) / <alpha-value>)',
          surfaceLight: 'rgb(var(--vks-surface-light) / <alpha-value>)',
          darkest: 'rgb(var(--vks-darkest) / <alpha-value>)',
          success: 'rgb(var(--vks-success) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'vks-gradient': 'linear-gradient(135deg, #501BED 0%, #8358FF 100%)',
        'vks-radial': 'radial-gradient(circle at center, rgba(80, 27, 237, 0.25) 0%, rgba(27, 26, 31, 0) 70%)',
      },
      boxShadow: {
        'vks-glow': '0 0 35px -5px rgba(80, 27, 237, 0.55)',
        'vks-glow-lg': '0 0 60px -10px rgba(80, 27, 237, 0.75)',
      }
    },
  },
  plugins: [],
}
