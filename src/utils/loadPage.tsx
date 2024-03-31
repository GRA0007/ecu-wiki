import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { StubNotice } from '@/components/StubNotice'
import { getEditUrl } from '@/utils/getEditUrl'
import { remarkWikiLink } from '@portaljs/remark-wiki-link'
import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import type { Html, Paragraph, PhrasingContent } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import * as wikiLink from 'mdast-util-wiki-link'
import { syntax } from 'micromark-extension-wiki-link'
import { compileMDX } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { cache } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'

export const WIKI_PATH = path.join(process.cwd(), 'src/wiki')

export const getAllPageSlugs = cache(async () =>
  readdir(WIKI_PATH).then((paths) =>
    paths.flatMap((path) => (path.endsWith('.mdx') ? [path.replace('.mdx', '')] : [])),
  ),
)

/**
 * Load a page contents from MDX
 */
export const loadPage = cache(async (slug: string) => {
  const filePath = path.join(WIKI_PATH, `${slug}.mdx`)

  const source = await readFile(filePath).catch(() => undefined)
  if (!source) return undefined

  const stats = await stat(filePath)
  const permalinks = await getAllPageSlugs()

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          remarkSmartypants,
          [
            remarkWikiLink,
            {
              permalinks,
              wikiLinkResolver: (name: string) => [name.replaceAll(/\s/g, '_')],
            },
          ],
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'append',
              content: { type: 'text', value: '' },
              properties: { 'data-heading-link': true, ariaHidden: true, tabIndex: -1 },
            },
          ],
        ],
        remarkRehypeOptions: {
          clobberPrefix: '',
          footnoteLabel: 'References',
          footnoteLabelProperties: {},
        },
      },
    },
    components: {
      Stub: () => <StubNotice editUrl={getEditUrl(slug)} />,
      a: ({ children, ...props }) => {
        if (!props.href) throw new Error('Link href is missing')
        const isExternal = props.href.includes('://') && !props.href?.includes('.mdx')

        const isFootnoteNumber = 'data-footnote-ref' in props
        const isHeadingLink = 'data-heading-link' in props

        return (
          <Link
            {...props}
            href={isExternal ? props.href : props.href?.replace('.mdx', '')}
            rel={isExternal ? 'nofollow noreferrer' : undefined}
            target={isExternal ? '_blank' : undefined}
            // className={isFootnoteNumber ? 'hover:underline' : 'underline'}
          >
            {isHeadingLink && <LinkIcon className="h-4 w-4 inline-block" />}
            {isFootnoteNumber ? <>[{children}]</> : children}
            {isExternal && <ExternalLinkIcon className="h-3 w-3 inline-block ml-1 align-middle" />}
          </Link>
        )
      },
    },
  })

  const { description, image } = getPageMetadata(source.toString())

  return {
    title: frontmatter.title,
    description,
    image,
    lastModified: stats.mtime,
    content,
  }
})

export const getPageMetadata = (source: string) => {
  let markdown = source
  // Remove frontmatter
  if (markdown.startsWith('---')) {
    markdown = markdown.split('---\n').slice(2).join('---\n')
  }

  const tree = fromMarkdown(markdown, { extensions: [syntax()], mdastExtensions: [wikiLink.fromMarkdown()] })

  // Find first paragraph
  const firstRootParagraph = tree.children.find((child): child is Paragraph => child.type === 'paragraph')
  const description = firstRootParagraph?.children.flatMap(getChildTextValue).join('')

  // Find first image
  const firstFigure = tree.children.find(
    (child): child is Html => child.type === 'html' && child.value.startsWith('<figure'),
  )
  const image = firstFigure?.value.match(/(?:src=")(.+?)(?:")/)?.[1]

  return { description, image }
}

// Recursively get the plain text of all children
const getChildTextValue = (child: PhrasingContent): string[] => {
  if (child.type === 'text' || 'permalink' in (child.data ?? {})) return [(child as { value: string }).value]
  if (child.type === 'link' || child.type === 'strong' || child.type === 'emphasis' || child.type === 'delete')
    return child.children.flatMap(getChildTextValue)
  return []
}
