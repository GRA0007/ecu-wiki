'use client'

import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { FootnoteLink } from './footnote'
import { InternalLink } from './internal'

export type LinkProps = React.ComponentProps<'a'> & { href: string }

export const WikiLink = (linkProps: React.ComponentProps<'a'>) => {
  const props = linkProps as LinkProps

  // Heading links
  if ('data-heading-link' in props)
    return (
      <Link {...props}>
        <LinkIcon className="h-4 w-4 inline-block" />
      </Link>
    )

  // External links
  if (props.target === '_blank')
    return (
      <Link {...props}>
        {props.children}
        <ExternalLinkIcon className="h-3 w-3 inline-block ml-1 align-middle" />
      </Link>
    )

  // Footnote numbers
  if ('data-footnote-ref' in props) return <FootnoteLink {...props} />

  // Internal links (that exist)
  if (props.className?.includes('internal') && !props.className.includes('new')) return <InternalLink {...props} />

  return <Link {...props} />
}
