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
        pinkClr: 'var(--pink)',
        goldClr: 'var(--gold)',
      },
      fontFamily: {
        poppins: ["var(--Poppins)"],
        josefin: ["var(--JosefinSans)"],
      },
      screens: {
        "tablet": "950px",
        "desktop": "1150px"
      }
    },
  },
  darkMode: '[data-theme="dark"]',
  plugins: [],
}
