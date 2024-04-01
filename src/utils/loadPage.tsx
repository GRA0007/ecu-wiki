import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { StubNotice } from '@/components/StubNotice'
import { WikiLink } from '@/components/WikiLink'
import { getEditUrl } from '@/utils/getEditUrl'
import { remarkWikiLink } from '@portaljs/remark-wiki-link'
import type { Html, Paragraph, PhrasingContent } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import * as wikiLink from 'mdast-util-wiki-link'
import { syntax } from 'micromark-extension-wiki-link'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cache } from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import title from 'title'

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
  const permalinks = await getAllPageSlugs().then((slugs) => slugs.map((slug) => `/wiki/${slug}`))

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
              wikiLinkResolver: (name: string) => [
                `/wiki/${title(name).replaceAll(/\s/g, '_')}`,
                `/wiki/${name.replaceAll(/\s/g, '_')}`,
              ],
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
          [
            rehypeExternalLinks,
            {
              target: '_blank',
              rel: 'noreferrer nofollow',
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
      a: WikiLink,
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
