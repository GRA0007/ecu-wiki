'use client'

import { memo, useEffect, useState } from 'react'

export const DateFormatter = memo(({ date }: { date: Date }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Render a skeleton until the component is mounted on the client
  if (!isMounted) return <span className="inline-block h-[1em] w-[7em] animate-pulse rounded-sm bg-border" />

  return date.toLocaleString('en', { day: 'numeric', month: 'long', year: 'numeric' })
})
