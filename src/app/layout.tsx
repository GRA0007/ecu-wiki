import Providers from '@/app/providers'
import type { Metadata } from 'next'
import { Grenze, Grenze_Gotisch, Inter } from 'next/font/google'
import './globals.css'

const displayFont = Grenze_Gotisch({ subsets: ['latin'], variable: '--font-display' })
const headingFont = Grenze({ subsets: ['latin'], weight: ['300', '700'], variable: '--font-heading' })
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' })

const BASE_URL = new URL(
  process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:${process.env.PORT || 3000}`),
)

export const metadata: Metadata = {
  title: {
    default: "Ewan's Comic Universe Wiki",
    template: '%s | ECU Wiki',
  },
  description: "Explore the facts and behind the scenes of Ewan's Comic Universe",
  keywords: ['ewan breakey', 'comic', 'solar and sundry', 'webcomic'],
  robots: 'index, follow',
  icons: '/logo.svg',
  metadataBase: BASE_URL,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${headingFont.variable} ${bodyFont.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
