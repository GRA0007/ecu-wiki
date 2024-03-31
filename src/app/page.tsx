import { Search } from '@/components/Search'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center text-white bg-noise gap-10 p-10">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-4xl">Ewan's Comic Universe Wiki</h1>
        <span className="font-heading text-xl block">A Fan Project</span>
      </header>

      <main className="w-[550px] flex items-center relative">
        <img src="/logo.svg" alt="" className="w-[300px] h-[300px]" />

        <Link
          href="/wiki/Solar_and_Sundry"
          className="flex items-center gap-4 absolute top-[20%] left-[58%] hover:underline font-heading font-bold text-2xl"
        >
          <span>Solar and Sundry</span>
        </Link>

        <Link
          href="/wiki/Ewan_Breakey"
          className="flex items-center gap-4 absolute bottom-[20%] left-[58%] hover:underline font-heading font-bold text-2xl"
        >
          <span>Ewan Breakey</span>
        </Link>
      </main>

      <Search maxResults={3} align="center" />

      <footer className="text-white/60 font-heading text-center">&copy; 2024 The Ewan Breakey Fan Club</footer>
    </div>
  )
}

export default Home
