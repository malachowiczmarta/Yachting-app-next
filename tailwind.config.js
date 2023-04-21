module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      500: '500px',
      400: '400px',
      280: '280px'
    },
    extend: {
      backgroundImage: {
        'main-background': "url('/public/background.webp')"
      },
      screens: {
        xsm: '425px'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: []
};
