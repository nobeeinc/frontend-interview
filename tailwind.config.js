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
    colors: {
      'primary': '#42A87A',
      'primary-100': '#F0FFF4',
      'primary-200': '#DCF9ED',
      'primary-300': '#9CD7BD',
      'primary-400': '#7ECCA9',
      'primary-500': '#5DB48D',
      'primary-600': '#42A87A',
      'primary-700': '#328C62',
      'primary-800': '#005F31',
      'secondary': '#E95D24',
      'secondary-100': '#FFF7F0',
      'secondary-200': '#FFE0C9',
      'secondary-300': '#FFC5A1',
      'secondary-400': '#FFA778',
      'secondary-500': '#F5814C',
      'secondary-600': '#E95D24',
      'gray-100': '#F5F5F5',
      'gray-200': '#EEEEEE',
      'gray-300': '#DADADA',
      'gray-400': '#CDCDCD',
      'gray-500': '#999999',
      'gray-700': '#666666',
      'gray-800': '#333333',
      'gray-900': '#161616',
      'blue-100': '#F7FAFC',
      'blue-200': '#F1F5F9',
      'blue-300': '#EDEFF3',
      'blue-400': '#EBEDF2',
      'blue-500': '#AEB6CA',
      'blue-600': '#718096',
      'success': '#42A87A',
      'danger-400': '#FF455C',
      'danger-500': '#FF3A3A',
      'danger': '#FF3A3A',
      'warning-400': '#FFC452',
      'warning-500': '#E49F18',
      'warning': '#E49F18',
      'info-200': '#E6F7FF',
      'info-300': '#B5DBFF',
      'info-400': '#1890FF',
      'info-500': '#0078E7',
      'white': '#FFFFFF',
      'black': '#333333',
      'transparent': 'transparent',
      'current': 'currentColor',
      'danger-custom-1': '#FFF6F7'
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        proxima: ['Proxima Nova'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
