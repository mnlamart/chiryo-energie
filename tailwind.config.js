/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '50%', // Keep full for avatars/circles
    },
    extend: {
      colors: {
        primary: {
          50: '#faf8f5',
          100: '#f4f0e8',
          200: '#e8ddd0',
          300: '#d4c1a8',
          400: '#ba9d7a',
          500: '#a17e59',
          600: '#8b6644',
          700: '#72533a',
          800: '#5c4231',
          900: '#4d372b',
        },
        accent: {
          50: '#f5f7f6',
          100: '#e5eae8',
          200: '#cbd5d1',
          300: '#a5b5ae',
          400: '#789088',
          500: '#5d746c',
          600: '#4a5e57',
          700: '#3e4f49',
          800: '#36423d',
          900: '#2f3834',
        },
        warm: {
          50: '#fff8f5',
          100: '#ffede0',
          200: '#ffd8bf',
          300: '#ffbd94',
          400: '#ff9d5e',
          500: '#ff8538',
          600: '#e66d1a',
          700: '#bc5814',
          800: '#964718',
          900: '#7a3c16',
        },
        brand: {
          bg: '#f6e0d2',
          card: '#f9e9df',
          header: '#f6d2d2',
          accent: '#F2BDBD',
          hover: '#eea7a7',
          text: '#706964',
        }
      },
    },
  },
  plugins: [],
}

