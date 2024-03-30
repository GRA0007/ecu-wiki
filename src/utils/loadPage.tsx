import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { StubNotice } from '@/components/StubNotice'
import { getEditUrl } from '@/utils/getEditUrl'
import { ExternalLinkIcon } from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'

export const WIKI_PATH = path.join(process.cwd(), 'src/wiki')

/**
 * Load a page contents from MDX. The slug should include forward slashes but not the file extension.
 */
export const loadPage = cache(async (slug: string) => {
  const filePath = path.join(WIKI_PATH, `${slug}.mdx`)

  const source = await readFile(filePath).catch(() => undefined)
  if (!source) return undefined

  const stats = await stat(filePath)

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        remarkRehypeOptions: {
          clobberPrefix: '',
          footnoteLabel: 'References',
          footnoteLabelProperties: {},
        },
      },
    },
    components: {
      Stub: () => <StubNotice editUrl={getEditUrl(slug.split('/'))} />,
      a: ({ children, ...props }) => {
        if (!props.href) throw new Error('Link href is missing')
        const isExternal = props.href.includes('://') && !props.href?.includes('.mdx')

        const isFootnoteNumber = Boolean('data-footnote-ref' in props && props['data-footnote-ref'])

        return (
          <Link
            {...props}
            href={isExternal ? props.href : props.href?.replace('.mdx', '')}
            rel={isExternal ? 'nofollow noreferrer' : undefined}
            target={isExternal ? '_blank' : undefined}
            className={isFootnoteNumber ? 'hover:underline' : 'underline'}
          >
            {isFootnoteNumber ? <>[{children}]</> : children}
            {isExternal && <ExternalLinkIcon className="h-3 w-3 inline-block ml-1 align-middle" />}
          </Link>
        )
      },
    },
  })

  return {
    title: frontmatter.title,
    lastModified: stats.mtime,
    content,
  }
})
