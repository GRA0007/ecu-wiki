import Providers from '@/app/providers'
import { Footer } from '@/components/Footer'
import { Search } from '@/components/Search'
import type { Metadata } from 'next'
import { Grenze, Grenze_Gotisch, Inter } from 'next/font/google'
import Link from 'next/link'
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
      <body
        className={`${displayFont.variable} ${headingFont.variable} ${bodyFont.variable} min-h-dvh bg-background flex flex-col items-center text-white bg-noise gap-5 md:gap-10 p-5 md:p-10`}
      >
        <Providers>
          <div className="w-[1000px] max-w-full flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <img src="/logo.svg" alt="" className="h-12 w-12" />
              <div className="flex flex-col">
                <Link href="/" className="font-display text-3xl hover:underline underline-offset-4 decoration-2">
                  Ewan's Comic Universe Wiki
                </Link>
                <span className="font-heading text-lg">A Fan Project</span>
              </div>
            </div>

            <Search />
          </div>

          <nav className="px-6 py-4 bg-surface text-surface-foreground rounded w-[1000px] max-w-full shadow-lg dark:border flex gap-5 items-baseline">
            <Link href="/" className="font-heading hover:underline font-bold text-xl">
              Home
            </Link>
            <Link href="/wiki/Comics" className="font-heading hover:underline font-bold text-xl">
              Comics
            </Link>
          </nav>

          <main className="p-6 pt-4 bg-surface text-surface-foreground rounded w-[1000px] max-w-full shadow-lg dark:border">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
