import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        bumnblue: {
          1:  '#0E213A',
          2:  '#126DB7',
          3:  '#2B4AFC',
          4:  '#4172C2',
          5:  '#0F5CE5',
          7:  '#1A2738',
          8:  '#003A6C',
          9:  '#00246C',
          10: '#CFE0FE',
          11: '#306CB2',
          13: '#C3DBF7',
          14: '#CCDEFF',
        },
        bumncyan: {
          1: '#E7F4FC',
          2: '#00CCFF',
        },
        bumngray: {
          1:  '#EBFDFF',
          3:  '#4E4D64',
          4:  '#4D4E64',
          5:  '#4D4F64',
          6:  '#727171',
          7:  '#EDEFF5',
          8:  '#D9D9D9',
          9:  '#5B5B5B',
          10: '#9CA7C4',
          13: '#F3F6F8',
        },
        bumnslate: {
          1:  '#FBFBFB',
          3:  '#646A7A',
          4:  '#929292',
          5:  '#909090',
          6:  '#4D5864',
          7:  '#4D5064',
          8:  '#808790',
          9:  '#656672',
          10: '#E8EAED',
          11: '#424652',
        },
        bumnwhite: {
          1: '#F6F6F6',
          2: '#E1E9EE',
          3: '#F8F8F8',
        },
        bumnblack: {
          1: '#000511',
          2: '#1A1C38',
          3: '#121212',
        },
        bumngreen: {
          1: '#1A2B38',
          2: '#4D645A',
        },
      },
      backgroundImage: {
        'bumn-radial':
          'radial-gradient(135.51% 135.51% at 47.06% -8.88%, #CFDFEB 0, #237CEC 53.25%, #105DE6 100%)',
        'bumn-radial-1':
          'radial-gradient(135.51% 135.51% at 47.06% -8.88%, #CFDFEB 0, #006ECF 53.25%, #01457D 100%)',
        'bumn-gradient-green-1':
          'linear-gradient(85.01deg, #37690F 1.29%, #539120 113.91%)',
        'bumn-gradient-white-1':
          'linear-gradient(267.04deg, #F8F8F8 11.29%, #DEEAF7 150.97%)',
        'bumn-gradient-white-2':
          'linear-gradient(to right, #ffffff 0%, #f8f8f8 40%, #f0f0f0 70%, #e5e5e5 100%)',
        'bumn-gradient-white-3':
          'linear-gradient(180deg, #e5e5e5 30%, #ffffff 100%)',
        'bumn-gradient-white-4':
          'linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 60%, #EDEDED 100%)',
        'bumn-gradient-primary-1':
          'linear-gradient(291.21deg, #0F5CE5 57.89%, #53CAFD 200.26%)',
        'bumn-gradient-primary-2':
          'linear-gradient(180deg, #0F5CE5, #53CAFD)',
        'bumn-gradient-primary-3':
          'linear-gradient(285.72deg, #0F5CE5 59.06%, #53CAFD 129.09%)',
        'bumn-gradient-primary-4':
          'linear-gradient(180deg, #0F5CE5, rgba(15,92,229,0.5) 57.75%, rgba(255,255,255,0))',
        'bumn-gradient-primary-5':
          'linear-gradient(98.56deg, #0F5CE5 38.64%, #53CAFD 123.49%)',
        'bumn-gradient-primary-7':
          'linear-gradient(125.4deg, #418CC2 23.27%, #00326C 83.73%)',
        'bumn-gradient-primary-9':
          'linear-gradient(35.86deg, #0F5CE5 17.49%, #53CAFD 127.03%)',
        'bumn-gradient-primary-10':
          'linear-gradient(90.77deg, #0F5CE5 -10.46%, #53CAFD 44.57%)',
        'bumn-gradient-primary-11':
          'linear-gradient(289.97deg, #01457D -11.88%, #006ECF 43.84%, #68ACE9 110.23%)',
        'bumn-gradient-primary-12':
          'linear-gradient(116.05deg, #01457D 10.91%, #006ECF 106.83%)',
        'bumn-gradient-primary-13':
          'linear-gradient(291.21deg, #016DB7 57.89%, #69B8FF 200.26%)',
        'bumn-gradient-primary-14':
          'linear-gradient(35.86deg, #016DB7 17.49%, #0083DC 127.03%)',
        'bumn-gradient-primary-15':
          'linear-gradient(98.56deg, #01457D 38.64%, #006ECF 123.49%)',
        'bumn-gradient-primary-16':
          'linear-gradient(285.4deg, #01457D 5.28%, #006ECF 86.68%)',
        'bumn-gradient-primary-17':
          'linear-gradient(180deg, #006ECF, rgba(0,110,207,0.5) 57.75%, rgba(255,255,255,0))',
        'bumn-gradient-primary-18':
          'linear-gradient(291.21deg, #0068BB 57.89%, #53CAFD 200.26%)',
        'bumn-gradient-primary-19':
          'linear-gradient(144.05deg, #01457D -64.49%, #006ECF 311.55%)',
        'bumn-gradient-primary-21':
          'linear-gradient(298.98deg, #0058A0 20.07%, #007CD1 123.73%)',
        'bumn-gradient-primary-22':
          'linear-gradient(180deg, #01457D, #006ECF)',
        'bumn-gradient-primary-24':
          'linear-gradient(35.86deg, #0F5CE5 17.49%, #006ECF 127.03%)',
        'bumn-gradient-primary-25':
          'linear-gradient(342.47deg, #006ECF 32.13%, #01457D 78.72%)',
        'bumn-gradient-primary-26':
          'linear-gradient(291deg, #005BA7 42.2%, #147FCB 88.26%)',
      },
      boxShadow: {
        'bumn-1': 'inset 0px -2px 10.2px 0px rgba(255,255,255,0.27)',
        'bumn-2': '0px 3px 47.9px 0px rgba(0,0,0,0.06)',
        'bumn-3': 'inset -3px -5px 14.2px 0px rgba(255,255,255,0.53)',
        'bumn-5': '0px 3px 47.9px 0px rgba(0,0,0,0.06)',
        'bumn-6': 'inset 2.95px -5.17px 9.52px -0.74px #53CAFD',
      },
      maxWidth: {
        'screen-1440': '1440px',
        'screen-1600': '1600px',
        'screen-1920': '1920px',
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
}

export default config