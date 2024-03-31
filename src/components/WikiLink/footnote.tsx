import * as HoverCard from '@radix-ui/react-hover-card'
import Link from 'next/link'
import type { LinkProps } from '.'

export const FootnoteLink = (props: LinkProps) => {
  const footnote = document.querySelector(props.href)

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <Link {...props} />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={5}
          className="z-50 w-64 rounded border bg-surface text-surface-foreground p-2 shadow-md outline-none"
        >
          <div
            className="[&_[data-footnote-backref]]:hidden [&_a]:text-primary [&_a]:underline break-words text-sm"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Easiest way to render the footnote content
            dangerouslySetInnerHTML={{ __html: footnote?.firstElementChild?.outerHTML ?? '' }}
          />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
