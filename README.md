# Ewan's Comic Universe Wiki

> [!WARNING]
> Under construction

Welcome to the source of the ECU wiki. Please feel free to open a PR and contribute to the content.

Check out the comics at https://comics.ewanb.me

## Contributing

All wiki content is stored in the `src/wiki` folder as [MDX files](https://mdxjs.com/).

Files should be named to reflect the title, which should be specified in the file as YAML frontmatter.

### Links

External links can be written as regular markdown links, while internal links should use the wiki links syntax. See below for a table of examples.

| Syntax | HTML |
| ------ | ---- |
| `[External Site](https://example.com)` | `<a href="https://example.com">External site</a>` |
| `[[Internal Link]]` | `<a href="/wiki/Internal_Link">Internal Link</a>` |
| `[[Internal Link\|custom text]]` | `<a href="/wiki/Internal_Link">custom text</a>` |
| `[[Internal Link#History]]` | `<a href="/wiki/Internal_Link#History">Internal Link</a>` |
| `[[Internal Link#History\|custom text]]` | `<a href="/wiki/Internal_Link#History">custom text</a>` |

### Images

All images should be stored in `public/wiki` and can be used on wiki pages with a `<figure>` element.

## Local Development

1. Install [`git-lfs`](https://git-lfs.com/) if you don't already have it (check with `git lfs --version`)
2. Clone this repository
3. Install Node v20 ([fnm](https://github.com/Schniz/fnm) is recommended)
4. Run `corepack enable`
5. Run `yarn` to install dependencies
6. Run `yarn dev` to start the dev server at http://localhost:3000
