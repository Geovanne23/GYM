/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      /* Colors use CSS variables so each page can override the palette
         (e.g. 404.html uses orange instead of blue).
         Variables are defined as RGB triplets for opacity modifier support. */
      colors: {
        primary: {
          50:  'rgb(var(--cp-50)  / <alpha-value>)',
          300: 'rgb(var(--cp-300) / <alpha-value>)',
          400: 'rgb(var(--cp-400) / <alpha-value>)',
          500: 'rgb(var(--cp-500) / <alpha-value>)',
          600: 'rgb(var(--cp-600) / <alpha-value>)',
          700: 'rgb(var(--cp-700) / <alpha-value>)',
        },
        secondary: {
          400: 'rgb(var(--cs-400) / <alpha-value>)',
          500: 'rgb(var(--cs-500) / <alpha-value>)',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 7s infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-15px)' },
        },
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(20px, -30px) scale(1.1)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
};
