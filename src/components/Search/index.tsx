import { SearchIcon } from 'lucide-react'

export const Search = () => {
  return (
    <search className="relative transition-transform focus-within:-translate-y-0.5 max-w-full">
      <SearchIcon className="absolute left-5 top-0 h-full w-4 pointer-events-none text-surface-foreground" />
      <input
        type="search"
        className="bg-surface text-surface-foreground rounded shadow-lg px-5 py-4 pl-14 w-[200px] md:w-[350px] max-w-full focus:outline-none focus:ring"
        placeholder="Search"
      />
    </search>
  )
}
