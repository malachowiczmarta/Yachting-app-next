module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      500: '500px',
      400: '400px',
      280: '280px'
    },
    screens: {
      xsm: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {}
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: []
};
