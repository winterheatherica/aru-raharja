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
        // yang lama
        "bumn":
          "radial-gradient(120% 100% at 50% -10%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.60) 15%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #67B5FF 0%, #2F8DEB 40%, #0F6AD8 75%, #0853BE 100%)",

        // yang baru — mirip screenshot: highlight kiri-atas, gelap ke kanan-bawah
        "bumn-2":
          "radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 22%, rgba(255,255,255,0) 48%), linear-gradient(135deg, #69B6FF 0%, #1E7EDC 48%, #0F6AD8 72%, #094F9F 100%)",
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
