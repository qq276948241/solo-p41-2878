/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
        lg: '4rem',
      },
    },
    extend: {
      colors: {
        cream: '#FAFAF8',
        vintage: {
          DEFAULT: '#8B7355',
          light: '#A89072',
          dark: '#5C4A36',
        },
        sand: '#E8E4DE',
        ink: '#3D3426',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"PingFang SC"', '"Microsoft YaHei"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, -30px) scale(.95)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0) scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .4s ease-out',
        slideUp: 'slideUp .5s ease-out',
        toastIn: 'toastIn .3s ease-out',
      },
    },
  },
  plugins: [],
};
