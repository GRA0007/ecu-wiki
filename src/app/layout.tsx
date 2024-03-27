import type { Metadata } from 'next'
import { Grenze, Grenze_Gotisch, Inter } from 'next/font/google'
import './globals.css'

const displayFont = Grenze_Gotisch({ subsets: ['latin'], variable: '--font-display' })
const headingFont = Grenze({ subsets: ['latin'], weight: ['300', '700'], variable: '--font-heading' })
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: {
    default: "Ewan's Comic Universe Wiki",
    template: '%s | ECU Wiki',
  },
  description: "Explore the facts and behind the scenes of Ewan's Comic Universe",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  )
}

export default RootLayout
