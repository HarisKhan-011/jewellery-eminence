/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/svg/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    extend: {
      colors: {
        theme: '#D8B866',
        themeLight: '#FFF3D8',
        themeDark: '#A67828',
        heading: '#2A2118',
        textBody: '#675B4B',
        text2: '#c5c8d4',
        text3: '#767A7D',

        success: '#50CD89',
        danger: '#F1416C',
        info: '#B48637',
        warning: '#D8B866',
        purple: '#8C6424',
        pink: '#C9A451',

        black: '#2A2118',
        yellow: '#D8B866',
        red: '#B33A3A',
        gray: '#FBF1DF',
        gray2: '#EADCC5',
        gray3: '#FFF8ED',
        gray4: '#F4E6CE',
        gray5: '#FFFBF4',
        gray6: '#EADCC5',
        greenDark : '#75CC68',
        greenLight : '#EEFBEC',
        current: 'currentColor',
      },
      dropShadow: {
        'xs': ' 0px 1px 2px rgba(37, 39, 41, 0.12)',
      },
      boxShadow: {
        'xs': '0px 1px 2px rgba(37, 39, 41, 0.12)',
        'sm': '0px 0.1rem 1rem 0.25rem rgba(0, 0, 0, 0.05)',
        'md': '0px 2px 3px rgba(11,15,45,.1)',
        '_md': '0px -1px 4px rgba(11,15,45,.1)',
        'lg': '0px 0px 50px rgba(11,15,45,.1)',
      }

    },
    transitionTimingFunction: {
      'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
    },
    borderRadius: {
      'none': '0',
      'sm': '2px',
      DEFAULT: '4px',
      'md': '6px',
      'lg': '10px',
      'full': '9999px',
      'large': '12px',
    },
    fontFamily: {
      heading: "'Jost', sans-serif",
      body: "'Jost', sans-serif",
      fontAwesome: "'Font Awesome 6 Pro'",
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      padding: '15px',

      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1380px',
      },
    },
    fontSize: {
      'xs': '8px',
      'sm': '10px',
      'tiny': '12px',
      'base': '14px',
      'lg': '16px',
      'xl': '18px',
      '2xl': '20px',
      '3xl': '22px',
      '4xl': '24px',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
  },
  plugins: [],
}
