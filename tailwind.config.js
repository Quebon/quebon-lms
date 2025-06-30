/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Noto Sans KR', 'sans-serif'],
      },
      colors: {
        'lg-primary': '#BE0737',
        'lg-secondary': '#53091D',
        'lg-tertiary': '#F3BFCD',
        'lg-neutral': '#606060',
        'lg-button': '#4599FF',
        'lg-button-hover': '#3577CC',
        'lg-done': '#22C55E',
        'lg-done-hover': '#398053',
        'lg-progress': '#4599FF',
        'lg-toast': '#BE0737',
      },
    },
  },
  plugins: [],
};
