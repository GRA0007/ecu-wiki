# Ewan's Comic Universe Wiki

> [!WARNING]
> Under construction

Welcome to the source of the ECU wiki. Please feel free to open a PR and contribute to the content.

Check out the comics at https://comics.ewanb.me

## Contributing

All wiki content is stored in the `src/wiki` folder as [MDX files](https://mdxjs.com/). It uses file-based routing. For example, the file at `src/wiki/solar-and-sundry/objects/latch.mdx` will be accessible at `/solar-and-sundry/object/latch`. Note that links between MDX files should be relative and include the mdx extension, which will be removed on the website. All images should be stored in `public/wiki` and can be used on wiki pages with a `<figure>` element.

## Local Development

1. Install [`git-lfs`](https://git-lfs.com/) if you don't already have it (check with `git lfs --version`)
2. Clone this repository
3. Install Node v20 ([fnm](https://github.com/Schniz/fnm) is recommended)
4. Run `corepack enable`
5. Run `yarn` to install dependencies
6. Run `yarn dev` to start the dev server at http://localhost:3000
