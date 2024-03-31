'use client'

import type { SearchResults } from '@/app/api/search/route'
import useDebouncedState from '@/utils/useDebouncedState'
import { useMediaQuery } from '@/utils/useMediaQuery'
import {
  type Placement,
  offset,
  shift,
  useFloating,
  useFocus,
  useInteractions,
  useListNavigation,
} from '@floating-ui/react'
import { useQuery } from '@tanstack/react-query'
import { FileTextIcon, LoaderCircleIcon, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { screens } from 'tailwindcss/defaultTheme'

interface SearchProps {
  maxResults?: number
  align?: 'center' | 'side'
}

export const Search = ({ maxResults = 10, align = 'side' }: SearchProps) => {
  const router = useRouter()
  const isMobile = useMediaQuery(`(max-width: ${screens.md})`)
  const [isOpen, setIsOpen] = useState(false)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: getPlacement(isMobile, align),
    middleware: [offset(4), shift({ padding: isMobile ? 20 : 40 })],
  })
  const focus = useFocus(context)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<HTMLAnchorElement[]>([])
  const listNavigation = useListNavigation(context, { listRef, activeIndex, onNavigate: setActiveIndex, loop: true })
  const { getReferenceProps, getFloatingProps } = useInteractions([focus, listNavigation])

  const [value, query, setValue] = useDebouncedState('')

  const { data: results, isFetching } = useQuery({
    queryKey: ['search', query],
    enabled: query.trim().length >= 3,
    placeholderData: (previousData) => (query.trim().length >= 3 ? previousData : undefined),
    queryFn: () => {
      return fetch(`/api/search?q=${encodeURIComponent(query)}&max=${maxResults}`).then(
        (res): Promise<SearchResults> => res.json(),
      )
    },
  })

  // Calculate highlight ranges
  useEffect(() => {
    if (!CSS.highlights) return
    CSS.highlights.clear()
    if (!results || results.length === 0 || !isOpen) return

    const ranges = results.flatMap((result) => {
      const fields = Array.from(new Set(...Object.values(result.match)))

      return fields.flatMap((field) => {
        const fieldNode = document.querySelector(`[data-result-${field}='${result.id}']`)?.firstChild
        if (fieldNode?.nodeType !== Node.TEXT_NODE) return []

        return result.queryTerms.flatMap((term) => {
          const indices = [...(fieldNode.textContent?.matchAll(new RegExp(term, 'gi')) ?? [])].flatMap((a) =>
            a.index !== undefined ? [a.index] : [],
          )
          return indices.map((index) => {
            const range = new Range()
            range.setStart(fieldNode, index)
            range.setEnd(fieldNode, index + term.length)
            return range
          })
        })
      })
    })

    const resultsHighlight = new Highlight(...ranges)
    CSS.highlights.set('results', resultsHighlight)
  }, [results, isOpen])

  return (
    <search className="relative">
      <div
        className="relative transition-transform focus-within:-translate-y-0.5 max-w-full"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {isFetching ? (
          <LoaderCircleIcon className="absolute left-5 top-0 h-full w-4 pointer-events-none text-surface-foreground animate-spin" />
        ) : (
          <SearchIcon className="absolute left-5 top-0 h-full w-4 pointer-events-none text-surface-foreground" />
        )}
        <input
          type="search"
          className="bg-surface text-surface-foreground rounded shadow-lg px-5 py-4 pl-14 w-[200px] md:w-[350px] max-w-full focus:outline-none focus:ring dark:border"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              e.preventDefault()
              if (results && results.length > 0) {
                router.push(`/wiki/${results[0].id}`)
              }
            }
          }}
        />
      </div>

      {isOpen && results && value.trim().length >= 3 && (
        <div
          className="w-[max(100%,300px)] max-w-[calc(100vw_-_40px)] md:max-w-[calc(100vw_-_80px)] bg-surface text-surface-foreground break-words dark:border rounded py-1 shadow-lg [&::highlight(results)]:bg-primary/20"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {results.map((result, i) => (
            <Link
              key={result.id}
              href={`/wiki/${result.id}`}
              className="flex gap-2 p-2 hover:bg-surface-foreground/10"
              ref={(node) => {
                if (node) listRef.current[i] = node
              }}
            >
              {result.image ? (
                <img src={result.image} alt="" className="object-cover h-10 w-10 rounded flex-shrink-0" />
              ) : (
                <div className="h-10 w-10 bg-background rounded flex items-center justify-center text-white flex-shrink-0">
                  <FileTextIcon className="w-4 h-4" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-heading font-bold leading-snug" data-result-title={result.id}>
                  {result.title}
                </span>
                <span className="text-xs line-clamp-2" data-result-contents={result.id}>
                  {result.description}
                </span>
              </div>
            </Link>
          ))}

          {results.length === 0 && (
            <div className="text-sm text-center py-2 text-surface-foreground/60">No results</div>
          )}
        </div>
      )}
    </search>
  )
}

// Define missing types
declare class Highlight {
  constructor(...ranges: Range[])
}
declare namespace CSS {
  const highlights: {
    clear: () => void
    set: (name: string, highlight: Highlight) => void
  }
}

const getPlacement = (isMobile: boolean, align: SearchProps['align']): Placement => {
  if (align === 'center') return 'bottom'
  return isMobile ? 'bottom-start' : 'bottom-end'
}
