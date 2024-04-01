import fs from 'node:fs'
import path from 'node:path'
import git from 'isomorphic-git'

/** Get the last modified date of a markdown page using git */
export const getPageModifiedDate = async (slug: string) => {
  const log = await git.log({
    fs,
    gitdir: path.join(process.cwd(), '.git'),
    filepath: `src/wiki/${slug}.mdx`,
    depth: 1,
  })
  return new Date(log[0].commit.committer.timestamp * 1000)
}
