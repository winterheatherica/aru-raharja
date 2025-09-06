import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bumn':
          'radial-gradient(120% 100% at 50% -10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.60) 15%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #67B5FF 0%, #2F8DEB 40%, #0F6AD8 75%, #0853BE 100%)',
      },
      maxWidth: {
        'screen-1440': '1440px',
        'screen-1600': '1600px',
        'screen-1920': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
