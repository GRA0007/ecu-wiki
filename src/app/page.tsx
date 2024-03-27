import { Search } from '@/components/Search'
import { CircleDashedIcon } from 'lucide-react'
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
          href="/solar-and-sundry"
          className="flex items-center gap-4 absolute top-[20%] left-[58%] hover:underline font-heading font-bold text-2xl focus:outline-none focus-visible:ring-2 rounded"
        >
          <img
            src="https://imagedelivery.net/zthi1l8fKrUGB5ig08mq-Q/6b7613e1-2834-4db0-ca26-f03b2e36df00/public"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>Solar and Sundry</span>
        </Link>

        <Link
          href="/untitled"
          className="flex items-center gap-4 absolute bottom-[20%] left-[58%] hover:underline font-heading font-bold text-2xl focus:outline-none focus-visible:ring-2 rounded"
        >
          <CircleDashedIcon className="h-8 w-8 text-white/60" />
          <span>Untitled</span>
        </Link>
      </main>

      <Search />

      <footer className="text-white/60 font-heading">&copy; 2024 The Ewan Breakey Fan Club</footer>
    </div>
  )
}

export default Home
