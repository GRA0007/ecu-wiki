import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { WIKI_PATH, getPageMetadata } from '@/utils/loadPage'
import fm from 'front-matter'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (_req: NextRequest, { params }: { params: { slug: string } }) => {
  try {
    const source = await readFile(path.join(WIKI_PATH, `${params.slug}.mdx`))
    const { attributes, body: contents } = fm<{ title: string }>(source.toString())
    const { description, image } = getPageMetadata(contents)
    return NextResponse.json({
      title: attributes.title,
      description,
      image,
    })
  } catch {
    return new NextResponse('Page not found', { status: 404 })
  }
}
