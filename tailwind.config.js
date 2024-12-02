/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5A1818',
          dark: '#380808',
        },
        secondary: '#1E0000',
        background: {
          DEFAULT: '#080000',
          dark: '#010000',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            h1: { color: '#fff' },
            h2: { color: '#fff' },
            h3: { color: '#fff' },
            h4: { color: '#fff' },
            h5: { color: '#fff' },
            h6: { color: '#fff' },
            strong: { color: '#fff' },
            code: { color: '#fff' },
            blockquote: { color: '#fff' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            a: { color: '#5A1818', '&:hover': { color: '#380808' } },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}