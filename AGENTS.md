# Repository Guidance

## Toolchain and verification

- Use Node.js >=22.12.0 with npm and the committed `package-lock.json`; install dependencies with `npm ci`.
- Match CI verification order: `npm run check`, then `npm run build`.
- There are no `test`, `lint`, or formatter scripts.

## Pages and layout

- Route entrypoints are `src/pages/index.astro` and `src/pages/404.astro`.
- Both routes use `src/layouts/BaseLayout.astro`; keep the shared page shell and metadata there instead of duplicating them in routes.
- `BaseLayout.astro` imports global CSS and owns canonical and social metadata.

## URLs and generated files

- `astro.config.mjs` sets `site` to `https://tomlanger.com` and intentionally has no `base`; preserve root-relative URLs and canonical generation unless deployment changes.
- Do not edit or commit generated/ignored `dist/`, `.astro/`, or `node_modules/`.

## Deployment and domain

- `production`, not `main`, is the integration and deploy branch; CI runs on pull requests and `production` pushes.
- GitHub Pages deploys from Actions on `production`.
- Never add a `CNAME` file: the custom domain is configured through GitHub Pages settings and DNS.
