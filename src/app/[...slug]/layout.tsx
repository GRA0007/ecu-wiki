import { Search } from '@/components/Search'
import Link from 'next/link'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center text-white bg-noise gap-5 md:gap-10 p-5 md:p-10">
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

      <nav className="px-6 py-4 bg-surface text-surface-foreground rounded w-[1000px] max-w-full shadow-lg dark:border">
        <Link href="/comics" className="font-heading hover:underline font-bold text-xl">
          Comics
        </Link>
      </nav>

      <main className="p-6 pt-4 bg-surface text-surface-foreground rounded w-[1000px] max-w-full shadow-lg dark:border">
        {children}
      </main>

      <footer className="text-white/60 font-heading text-center">&copy; 2024 The Ewan Breakey Fan Club</footer>
    </div>
  )
}

export default Layout
