import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'rose-gold': {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#D6A79E',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        'soft-pink': {
          50: '#fef7f7',
          100: '#feecec',
          200: '#fdd8d8',
          300: '#fcb5b5',
          400: '#f98080',
          500: '#E8B7C4',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
        },
        'warm-bronze': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#A07B6F',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        'glossy-white': '#F6F3F2',
        'soft-shadow': '#CFC7C2'
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      backdropBlur: {
        'xs': '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};

export default config;