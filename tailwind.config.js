/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vks: {
          primary: '#501BED',
          primaryGlow: '#7344FF',
          primaryDark: '#360EB5',
          white: '#E2E2E2',
          black: '#1B1A1F',
          surface: '#232129',
          surfaceLight: '#2D2A36',
          darkest: '#111014',
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
