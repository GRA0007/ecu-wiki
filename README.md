# Ewan's Comic Universe Wiki

> [!WARNING]
> Under construction

Welcome to the source of the ECU wiki. Please feel free to open a PR and contribute to the content.

Check out the comics at https://comics.ewanb.me

## Contributing

All wiki content is stored in the `src/wiki` folder as [MDX files](https://mdxjs.com/). It uses file-based routing. For example, the file at `src/wiki/solar-and-sundry/objects/latch.mdx` will be accessible at `/solar-and-sundry/object/latch`. Note that links between MDX files should be relative and include the mdx extension, which will be removed on the website.

## Local Development

1. Clone this repository
2. Install Node v20 ([fnm](https://github.com/Schniz/fnm) is recommended)
3. Run `corepack enable`
4. Run `yarn` to install dependencies
5. Run `yarn dev` to start the dev server at http://localhost:3000
