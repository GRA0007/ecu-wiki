import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { DateFormatter } from '@/components/DateFormatter'
import { PageIcon } from '@/components/PageIcon'
import { WIKI_PATH, getAllPageSlugs, getPageMetadata } from '@/utils/loadPage'
import fm from 'front-matter'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import packageJson from '../../package.json'

const Home = async () => {
  const pages = await getAllPageSlugs()
    .then((slugs) =>
      Promise.all(
        slugs.map(async (slug) => {
          const source = await readFile(path.join(WIKI_PATH, `${slug}.mdx`))
          const { attributes, body } = fm<{ title: string }>(source.toString())
          const { description, image } = getPageMetadata(body)
          const { mtime } = await stat(path.join(WIKI_PATH, `${slug}.mdx`))
          return { slug, title: attributes.title, description, image, lastModified: mtime }
        }),
      ),
    )
    .then((page) => page.sort((a, b) => b.lastModified.valueOf() - a.lastModified.valueOf()))

  return (
    <>
      <header className="flex justify-between align-top mb-4">
        <h1 className="font-heading text-3xl font-bold">Home</h1>
      </header>

      <p>
        Welcome to the Ewan's Comic Universe Wiki! This wiki is open source on GitHub, and can be edited by{' '}
        <a
          href={packageJson.repository.url.replace('.git', '')}
          target="_blank"
          rel="nofollow noreferrer"
          className="underline text-primary"
        >
          visiting the repository
          <ExternalLinkIcon className="h-3 w-3 inline-block ml-1 align-middle" />
        </a>
        . You can read Solar and Sundry by visiting the{' '}
        <a href="https://sas.ewanb.me" target="_blank" rel="nofollow noreferrer" className="underline text-primary">
          official website
          <ExternalLinkIcon className="h-3 w-3 inline-block ml-1 align-middle" />
        </a>
        .
      </p>

      <div className="flex gap-4 mt-5 max-md:flex-col">
        <div className="flex-[2] flex items-center justify-center">
          <img src="/logo.svg" alt="" className="h-[400px] w-[400px]" />
        </div>

        <div className="flex-1 border rounded p-4 space-y-3">
          <h2 className="font-heading font-bold text-xl leading-3 pb-2">Recently Edited Pages</h2>
          {pages.slice(0, 5).map((page) => (
            <Link key={page.slug} href={`/wiki/${page.slug}`} className="flex gap-2 group">
              <PageIcon image={page.image} />
              <div className="flex flex-col">
                <span className="font-heading font-bold leading-3 group-hover:underline">{page.title}</span>
                <span className="text-xs text-surface-foreground/60 my-1">
                  Edited <DateFormatter date={page.lastModified} />
                </span>
                <span className="text-xs line-clamp-4">{page.description}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
