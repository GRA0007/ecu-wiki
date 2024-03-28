import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { StubNotice } from '@/components/StubNotice'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cache } from 'react'

const WIKI_PATH = path.join(process.cwd(), 'src/wiki')

export const loadPages = cache(async () => {
  const files = await readdir(WIKI_PATH, { recursive: true }).then((paths) =>
    paths.filter((path) => path.endsWith('.mdx')),
  )

  return Promise.all(
    files.map(async (fileName) => {
      const { content, frontmatter } = await compileMDX<{ title: string }>({
        source: await readFile(path.join(WIKI_PATH, fileName)),
        options: { parseFrontmatter: true },
      })
      return {
        slug: fileName.split('/').at(-1)?.replace('.mdx', ''),
        title: frontmatter.title,
        content,
      }
    }),
  )
})

export const loadPage = cache(async (filePath: string) => {
  const source = await readFile(path.join(WIKI_PATH, `${filePath}.mdx`)).catch(() => undefined)
  if (!source) return undefined

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
    components: { Stub: StubNotice },
  })
  return {
    title: frontmatter.title,
    content,
  }
})
