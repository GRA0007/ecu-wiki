import { SearchIcon } from 'lucide-react'

export const Search = () => {
  return (
    <div className="relative transition-transform focus-within:-translate-y-1">
      <SearchIcon className="absolute left-5 top-0 h-full w-4 pointer-events-none" />
      <input
        type="search"
        className="bg-surface text-surface-foreground rounded shadow-lg px-5 py-4 pl-14 w-[350px] max-w-full focus:outline-none focus:ring-2"
        placeholder="Search"
      />
    </div>
  )
}
