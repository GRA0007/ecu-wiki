import { repository } from '../../package.json'

/** Construct the GitHub file source URL from a wiki page slug */
export const getEditUrl = (slug: string[]) => {
  return `${repository.url.replace('.git', '')}/blob/main/src/wiki/${slug.join('/')}.mdx`
}
