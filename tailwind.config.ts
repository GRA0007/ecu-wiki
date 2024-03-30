import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      display: 'var(--font-display)',
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
    },
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        primary: 'rgb(var(--primary))',
        surface: {
          DEFAULT: 'rgb(var(--surface))',
          foreground: 'rgb(var(--surface-foreground))',
        },
        border: 'rgb(var(--border))',
      },
      backgroundImage: {
        noise: "url('/noise.png')",
      },
    },
  },
  plugins: [],
}
export default config
