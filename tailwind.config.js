/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffef5',
          100: '#fffde6',
          200: '#fff8c2',
          300: '#fff099',
          400: '#ffe566',
          500: '#ffd700',
          600: '#e6c200',
          700: '#b39700',
          800: '#806c00',
          900: '#4d4100',
        },
        dark: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#d5d5d9',
          300: '#b0b0b8',
          400: '#85858f',
          500: '#666674',
          600: '#52525e',
          700: '#43434d',
          800: '#27272c',
          900: '#18181b',
          950: '#0f0f11',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
        'count-up': 'countUp 0.8s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.6)' },
        },
        countUp: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ffd700 0%, #ffed4a 50%, #ffd700 100%)',
        'dark-gradient': 'linear-gradient(180deg, #18181b 0%, #0f0f11 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
