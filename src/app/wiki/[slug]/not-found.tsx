'use client'

import { getEditUrl } from '@/utils/getEditUrl'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const NotFound = () => {
  const params = useParams<{ slug: string }>()

  return (
    <>
      <header className="flex justify-between align-top mb-4">
        <h1 className="font-heading text-3xl font-bold">{params.slug.replace(/_/g, ' ')}</h1>
      </header>

      <p>
        This page has not yet been created. Would you like to{' '}
        <Link
          href={getEditUrl(params.slug, 'create')}
          className="text-primary underline"
          target="_blank"
          rel="noreferrer nofollow"
        >
          create it
        </Link>
        ?
      </p>
    </>
  )
}

export default NotFound
