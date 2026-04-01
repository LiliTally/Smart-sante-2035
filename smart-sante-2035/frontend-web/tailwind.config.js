/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette medicale claire
        sky:    { 50:'#F0F9FF', 100:'#E0F2FE', 200:'#BAE6FD', 500:'#0EA5E9', 600:'#0284C7' },
        mint:   { 100:'#DCFCE7', 500:'#22C55E' },
        alert:  { 100:'#FEE2E2', 500:'#EF4444' },
        warm:   { 100:'#FEF3C7', 500:'#F59E0B' }
      },
      boxShadow: {
        soft: '0 4px 16px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
};
