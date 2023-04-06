// const colors = require('tailwindcss/colors')
// import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

module.exports = {
  content: [
    './**/*.html',
    './**/*.vue',
    './**/*.jsx'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)'
      }
    },
    fontFamily: {
      display: ['Source Serif Pro', 'sans-serif'],
      sans: ['Arimo', 'sans-serif']
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
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      )
    })
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  }
}
