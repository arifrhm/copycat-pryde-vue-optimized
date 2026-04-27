/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // PRYDE Designs Authentic Colors - Dark Theme
        primary: {
          // Teal/Cyan accent (#03d8c8)
          50: '#f0fdfe',
          100: '#ccfbfe',
          200: '#99f6fe',
          300: '#5ef0fd',
          400: '#27e3f8',
          500: '#03d8c8',
          600: '#02b5a7',
          700: '#029186',
          800: '#036e68',
          900: '#035653',
          DEFAULT: '#03d8c8'
        },
        // Orange/Terracotta for client portal (#d3501f)
        accent: {
          50: '#fef5f2',
          100: '#fee8de',
          200: '#fdd0ba',
          300: '#fba98e',
          400: '#f37f5c',
          500: '#d3501f',
          600: '#b43c13',
          700: '#91300f',
          800: '#742611',
          900: '#5d2015',
          DEFAULT: '#d3501f'
        },
        // Dark background (#222b34)
        dark: {
          50: '#e8ebef',
          100: '#c5c9d1',
          200: '#9ea4b0',
          300: '#77808f',
          400: '#5a6577',
          500: '#445266',
          600: '#394453',
          700: '#2f3845',
          800: '#272f3a',
          900: '#222b34',
          950: '#1a2026',
          DEFAULT: '#222b34'
        },
        // Light text color (#f5f6f9)
        offwhite: {
          50: '#ffffff',
          100: '#f9fafb',
          200: '#f5f6f9',
          300: '#edeff2',
          400: '#e0e4e8',
          500: '#c8ced8',
          DEFAULT: '#f5f6f9'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Barlow Semi Condensed', 'sans-serif']
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem'
      }
    }
  },
  plugins: []
}
