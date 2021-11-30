/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/frontend/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        'primary': '#42A87A',
        'primary-100': '#F3FAF7',
        'primary-200': '#CCF3DC',
        'primary-300': '#98E1B8',
        'primary-400': '#6AC795',
        'primary-500': '#42A87A',
        'primary-600': '#2C7D57',
        'secondary': '#E95D24',
        'secondary-100': '#FFF7F0',
        'secondary-200': '#FFE0C9',
        'secondary-300': '#FFC5A1',
        'secondary-400': '#FFA778',
        'secondary-500': '#F5814C',
        'secondary-600': '#E95D24',
        'grayscale-100': '#F5F5F5',
        'grayscale-200': '#EEEEEE',
        'grayscale-300': '#CCCCCC',
        'grayscale-400': '#999999',
        'grayscale-500': '#666666',
        'grayscale-600': '#333333',
        'grayscale-700': '#161616',
        'white': '#FFFFFF',
        'black': '#333333',
        'success': '#55B685',
        'danger': '#D63636',
        'warning': '#FFC452',
        'info': '#1890FF',
      },
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        proxima: ['Proxima Nova'],
      },
      inset: {
        '-10px': '-10px',
        '-50px': '-50px',
        '-66px': '-66px',
        '5/12': '41.6666%',
        '6/12': '50%',
        '7/12': '58.3333%',
        '8/12': '66.6666%',
        '9/12': '75%',
        '10/12': '83.3333%',
        '11/12': '91.6666%',
      },
      spacing: {
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        90: '22.5rem',
        100: '25rem',
        200: '50rem',
        300: '75rem',
      },
      maxHeight: {
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '10/12': '83.3333%',
      },
      maxWidth: {
        '9/12': '75%',
        '10/12': '83.3333%',
        '11/12': '91.6666%',
      },
      minWidth: {
        10: '2.5rem',
        12: '3rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
