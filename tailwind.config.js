/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        // Base colors - always dark
        background: {
          DEFAULT: '#171717',
          dark: '#171717',
          light: '#171717' // Keep dark even in light mode
        },
        // Text colors
        primary: {
          DEFAULT: '#ffffff',
          dark: '#ffffff',
          light: '#ffffff'
        },
        secondary: {
          DEFAULT: '#9ca3af',
          dark: '#9ca3af',
          light: '#9ca3af'
        },
        // Accent colors remain the same for visual hierarchy
        accent: {
          DEFAULT: '#8b5cf6',
          dark: '#a78bfa',
          light: '#8b5cf6'
        },
        // Border colors
        border: {
          DEFAULT: '#374151',
          dark: '#374151',
          light: '#374151'
        }
      },
      fontFamily: {
        'manrope': ['var(--font-manrope)', 'sans-serif'],
        'caveat': ['Caveat', 'cursive'],
        'sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
     
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-in-delay': 'fadeIn 1s ease-out 0.5s forwards',
        'gradient': 'gradient 15s ease infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'float-medium': 'float-medium 6s ease-in-out infinite',
        'float-fast': 'float-fast 4s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
          'float-slow': {
            '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
            '50%': { transform: 'translateY(-10px) translateX(5px)' },
          },
          'float-medium': {
            '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
            '50%': { transform: 'translateY(-15px) translateX(-5px)' },
          },
          'float-fast': {
            '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
            '50%': { transform: 'translateY(-20px) translateX(10px)' },
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}