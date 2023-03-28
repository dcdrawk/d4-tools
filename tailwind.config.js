// const colors = require('tailwindcss/colors')
// import colors from 'tailwindcss/colors'

module.exports = {
  content: [
    './**/*.html',
    './**/*.vue',
    './**/*.jsx'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      display: ['Rubik', 'sans-serif'],
      body: ['Open Sans', 'sans-serif']
    },
    container: {
      center: true,
      screens: {
        sm: '100%',
        md: '100%',
        lg: '1024px',
        xl: '1280px'
      }
    }
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   black: colors.black,
    //   blue: colors.blue,
    //   white: colors.white,
    //   gray: colors.neutral,
    //   indigo: colors.indigo,
    //   emerald: colors.emerald,
    //   red: colors.rose,
    //   yellow: colors.amber
    // }
  },
  variants: {
    extend: {
      borderWidth: ['last']
    }
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
