import { notFound } from 'next/navigation'
import styles from './content.module.css'
import { loadPage } from './loadPages'

type Props = { params: { slug: string[] } }

const WikiPage = async ({ params }: Props) => {
  const page = await loadPage(params.slug.join('/'))
  if (!page) notFound()

  return (
    <main className="p-4 space-y-4 bg-surface text-surface-foreground rounded-lg">
      <h1 className="font-heading text-3xl font-bold">{page.title}</h1>
      <div className={styles.content}>{page.content}</div>
    </main>
  )
}

export default WikiPage
