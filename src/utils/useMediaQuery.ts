import { useEffect, useState } from 'react'

const getMatches = (query: string): boolean => {
  // Prevents SSR issues
  if (typeof window !== 'undefined') return window.matchMedia(query).matches
  return false
}

export const useMediaQuery = (query: string, defaultValue = false): boolean => {
  const [matches, setMatches] = useState<boolean>(defaultValue)

  useEffect(() => {
    setMatches(getMatches(query))
    const handleChange = () => setMatches(getMatches(query))

    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
