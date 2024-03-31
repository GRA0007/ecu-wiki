import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
/**
 * Debounce a state by a given amount of milliseconds.
 *
 * @default 300
 *
 * @example
 * const [value, debouncedValue, setValue] = useDebouncedState('', 500)
 */
const useDebouncedState = <T>(initialValue: T, delay = 300): [T, T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue)
  const [debouncedValue, setDebouncedValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
    setDebouncedValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(handler)
  }, [delay, value])

  return [value, debouncedValue, setValue]
}

export default useDebouncedState
