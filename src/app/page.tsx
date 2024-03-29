import { Search } from '@/components/Search'
import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-dvh bg-indigo-950 flex flex-col items-center justify-center text-white bg-noise gap-10 p-10">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-4xl">Ewan's Comic Universe Wiki</h1>
        <span className="font-heading text-xl block">A Fan Project</span>
      </header>

      <main className="w-[550px] flex items-center relative">
        <div className="bg-[radial-gradient(72.09%_72.69%_at_36.53%_13.59%,_#0C6BDB_0%,_#002D62_100%)] h-[300px] w-[300px] rounded-full shadow-2xl" />

        <Link
          href="/comics/solar-and-sundry"
          className="flex items-center gap-4 absolute top-[20%] left-[58%] hover:underline font-heading font-bold text-2xl"
        >
          <span>Solar and Sundry</span>
        </Link>

        <Link
          href="/ewan-breakey"
          className="flex items-center gap-4 absolute bottom-[20%] left-[58%] hover:underline font-heading font-bold text-2xl"
        >
          <span>Ewan Breakey</span>
        </Link>
      </main>

      <Search />

      <footer className="text-white/60 font-heading text-center">&copy; 2024 The Ewan Breakey Fan Club</footer>
    </div>
  )
}

export default Home
