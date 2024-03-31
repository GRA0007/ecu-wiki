'use client'

import * as HoverCard from '@radix-ui/react-hover-card'
import { useQuery } from '@tanstack/react-query'
import { ExternalLinkIcon, FileTextIcon, LinkIcon, LoaderCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export const WikiLink = (linkProps: React.ComponentProps<'a'>) => {
  const props = linkProps as React.ComponentProps<'a'> & { href: string }

  if ('data-heading-link' in props)
    return (
      <Link {...props}>
        <LinkIcon className="h-4 w-4 inline-block" />
      </Link>
    )

  if (props.target === '_blank')
    return (
      <Link {...props}>
        {props.children}
        <ExternalLinkIcon className="h-3 w-3 inline-block ml-1 align-middle" />
      </Link>
    )

  if (props.className?.includes('internal') && !props.className.includes('new')) return <InternalLink {...props} />

  return <Link {...props} />
}

const InternalLink = (props: React.ComponentProps<'a'> & { href: string }) => {
  const slug = props.href.replace('/wiki/', '')
  const [enabled, setEnabled] = useState(false)

  const { data, isError, isFetching } = useQuery({
    queryKey: ['internalLink', slug],
    enabled,
    queryFn: () =>
      fetch(`/api/page/${slug}`).then(
        (res): Promise<{ title: string; description: string | undefined; image: string | undefined }> => res.json(),
      ),
  })

  return (
    <HoverCard.Root open={isError ? false : undefined}>
      <HoverCard.Trigger asChild>
        <Link {...props} onMouseEnter={() => setEnabled(true)}>
          {props.children}
        </Link>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={5}
          className="z-50 w-64 rounded dark:border bg-surface text-surface-foreground p-2 shadow-md outline-none"
        >
          {!data && isFetching && (
            <div className="flex items-center justify-center">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" />
            </div>
          )}
          {data && (
            <Link href={props.href} className="flex gap-2">
              {data.image ? (
                <img src={data.image} alt="" className="object-cover h-10 w-10 rounded flex-shrink-0" />
              ) : (
                <div className="h-10 w-10 bg-background rounded flex items-center justify-center text-white flex-shrink-0">
                  <FileTextIcon className="w-4 h-4" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-heading font-bold leading-snug">{data.title}</span>
                <span className="text-xs line-clamp-4">{data.description}</span>
              </div>
            </Link>
          )}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
