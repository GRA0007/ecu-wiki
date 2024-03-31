import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { WIKI_PATH, getPageMetadata } from '@/utils/loadPage'
import fm from 'front-matter'
import Minisearch, { type SearchResult } from 'minisearch'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get('q')?.trim()
  if (!query || query.length < 3) return new NextResponse('Query must be 3 characters or longer', { status: 400 })
  const maxResults = Number(req.nextUrl.searchParams.get('max') ?? 10)

  const filePaths = await readdir(WIKI_PATH, { recursive: true }).then((paths) =>
    paths.filter((path) => path.endsWith('.mdx')),
  )

  const files = await Promise.all(
    filePaths.map(async (filePath) => {
      const source = await readFile(path.join(WIKI_PATH, filePath))
      const { attributes, body: contents } = fm<{ title: string }>(source.toString())
      const { description, image } = getPageMetadata(contents)
      return {
        path: filePath.replace('.mdx', ''),
        title: attributes.title,
        description,
        image,
        contents,
      }
    }),
  )

  const minisearch = new Minisearch({
    fields: ['title', 'contents'],
    storeFields: ['title', 'description', 'image'],
    idField: 'path',
    searchOptions: {
      boost: { title: 2 },
      fuzzy: true,
      prefix: true,
    },
  })
  minisearch.addAll(files)

  return NextResponse.json(minisearch.search(query).slice(0, maxResults))
}

export type SearchResults = (SearchResult & {
  title: string
  description: string | undefined
  image: string | undefined
})[]
