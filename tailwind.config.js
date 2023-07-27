/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryClr: 'var(--primary)',
        secondaryClr: 'var(--secondary)',
        secondaryDarkClr: 'var(--secondaryDark)',
        baseClr: 'var(--background)',
        baseLiteClr: 'var(--backgroundLite)',
        textClr: 'var(--text)',
        textLiteClr: 'var(--textLite)',
      }
    },
  },
  darkMode: '[data-theme="dark"]',
  plugins: [],
}
