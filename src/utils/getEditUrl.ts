import packageJson from '../../package.json'

const repoUrl = packageJson.repository.url.replace('.git', '')

/** Construct the GitHub file source URL from a wiki page slug */
export const getEditUrl = (slug: string, action: 'edit' | 'create' | 'view' = 'edit') => {
  if (action === 'edit') return `${repoUrl}/edit/main/src/wiki/${slug}.mdx`
  if (action === 'view') return `${repoUrl}/blob/main/src/wiki/${slug}.mdx`
  return `${repoUrl}/new/main/src/wiki?filename=${encodeURIComponent(`${slug}.mdx`)}&value=${encodeURIComponent(
    '---\ntitle: \n---\n',
  )}`
}
