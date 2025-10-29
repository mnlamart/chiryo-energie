/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f1e8',
          100: '#e8ddd0',
          200: '#d4c1a8',
          300: '#ba9d7a',
          400: '#a17e59',
          500: '#8b6644',
          600: '#72533a',
          700: '#5c4231',
          800: '#4d372b',
          900: '#423027',
        },
        accent: {
          50: '#f0f7f4',
          100: '#dceee6',
          200: '#bcddcd',
          300: '#90c4ad',
          400: '#5fa587',
          500: '#3d856a',
          600: '#2d6b55',
          700: '#265646',
          800: '#21463a',
          900: '#1d3b32',
        },
        warm: {
          50: '#fef7f0',
          100: '#feede0',
          200: '#fcd8bf',
          300: '#f9bd94',
          400: '#f5975e',
          500: '#f27738',
          600: '#e3591a',
          700: '#bc4514',
          800: '#973818',
          900: '#7a3016',
        }
      },
    },
  },
  plugins: [],
}

