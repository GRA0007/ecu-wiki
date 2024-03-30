import { readdir } from 'node:fs/promises'
import { DateFormatter } from '@/components/DateFormatter'
import { getEditUrl } from '@/utils/getEditUrl'
import { WIKI_PATH, loadPage } from '@/utils/loadPage'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import styles from './content.module.css'

type Props = { params: { slug: string[] } }

// Statically generate the wiki pages
export const generateStaticParams = async () => {
  const files = await readdir(WIKI_PATH, { recursive: true }).then((paths) =>
    paths.filter((path) => path.endsWith('.mdx')),
  )

  return files.map((fileName) => ({
    slug: fileName.replace('.mdx', '').split('/'),
  }))
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const page = await loadPage(params.slug.join('/'))
  if (!page) notFound()

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      images: page.image,
    },
  }
}

const WikiPage = async ({ params }: Props) => {
  const page = await loadPage(params.slug.join('/'))
  if (!page) notFound()

  const editUrl = getEditUrl(params.slug)

  return (
    <>
      <header className="flex justify-between align-top mb-4 gap-x-4 gap-y-2 max-sm:flex-col">
        <h1 className="font-heading text-3xl font-bold">{page.title}</h1>

        <div className="flex items-baseline gap-x-4 flex-wrap sm:flex-col sm:items-end sm:text-right">
          <Link href={editUrl} rel="noreferrer nofollow" target="_blank" className="underline text-sm">
            Edit page
          </Link>
          <span className="text-xs text-surface-foreground/50">
            Last edited <DateFormatter date={page.lastModified} />
          </span>
        </div>
      </header>

      <div className={styles.content}>{page.content}</div>
    </>
  )
}

export default WikiPage
