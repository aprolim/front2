/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        'senado': {
          'primary': 'var(--senado-primary)',
          'primary-light': 'var(--senado-primary-light)',
          'primary-dark': 'var(--senado-primary-dark)',
          'gold': {
            DEFAULT: 'var(--senado-gold)',
            'lightest3': 'var(--senado-gold-lightest3)',
            'lightest2': 'var(--senado-gold-lightest2)',
            'lightest': 'var(--senado-gold-lightest)',
            'lighter': 'var(--senado-gold-lighter)',
            'soft': 'var(--senado-gold-soft)',
            'light': 'var(--senado-gold-light)',
            'dark': 'var(--senado-gold-dark)',
          },
          'dark': {
            DEFAULT: 'var(--senado-dark)',
            'light': 'var(--senado-dark-light)',
          }
        }
      }
    }
  },
  plugins: [
    // 🔥 Agregar variantes portrait y landscape
    function({ addVariant }) {
      addVariant('portrait', '@media (orientation: portrait)')
      addVariant('landscape', '@media (orientation: landscape)')
    }
  ]
}