import { PageIcon } from '@/components/PageIcon'
import * as HoverCard from '@radix-ui/react-hover-card'
import { useQuery } from '@tanstack/react-query'
import { LoaderCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import type { LinkProps } from '.'

export const InternalLink = (props: LinkProps) => {
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
        <Link {...props} onMouseEnter={() => setEnabled(true)} />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={5}
          className="z-50 w-64 rounded border bg-surface text-surface-foreground p-2 shadow-md outline-none"
        >
          {!data && isFetching && (
            <div className="flex items-center justify-center">
              <LoaderCircleIcon className="h-4 w-4 animate-spin" />
            </div>
          )}
          {data && (
            <Link href={props.href} className="flex gap-2">
              <PageIcon image={data.image} />
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
