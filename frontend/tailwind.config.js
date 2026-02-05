/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme colors inspired by twitterapi.io
        dark: {
          bg: '#1e293b',      // Slate-800
          card: '#334155',    // Slate-700
          border: '#475569',  // Slate-600
          text: '#f1f5f9',    // Slate-100
          muted: '#94a3b8',   // Slate-400
        }
      }
    },
  },
  plugins: [],
}
