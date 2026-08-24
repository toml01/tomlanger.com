# tomlanger.com

Personal site for [tomlanger.com](https://tomlanger.com). Static Astro project, currently a minimal foundation.

## Local development

Requires Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

The dev server defaults to `http://localhost:4321`.

## Scripts

| Command | Action |
| --- | --- |
| `npm ci` | Install dependencies from `package-lock.json` |
| `npm run dev` | Start the local dev server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run build` | Build the static site into `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show the Astro CLI help |

## Deployment

GitHub Pages is published from GitHub Actions, not from a branch.

- CI (`.github/workflows/ci.yml`) runs on pull requests and on pushes to `production`. It installs from the lockfile, then runs `npm run check` and `npm run build`.
- Deploy (`.github/workflows/deploy.yml`) runs on pushes to `production` and on manual workflow dispatch. It uses the official Astro Pages action and `actions/deploy-pages`.

Set the repository Pages source to **GitHub Actions** in GitHub: **Settings → Pages → Source**.

## Custom domain

The site is built for the apex domain `tomlanger.com`. Astro `site` is set to `https://tomlanger.com` and `base` is unset so asset URLs stay at `/`.

The custom domain is configured in GitHub (**Settings → Pages → Custom domain**), not by a committed `CNAME` file. GitHub ignores repository `CNAME` files when Pages is published from Actions.

Before attaching `tomlanger.com` in the repository Pages settings, verify the domain in the GitHub account Pages settings. GitHub provides a TXT record for that verification. Add it in DNS and leave it there so the domain stays verified.

After the domain is saved in GitHub, point DNS at GitHub Pages:

Apex `tomlanger.com` `A` records:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Recommended apex `AAAA` records:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

Alternatively, an `ALIAS` or `ANAME` record from `@` to `toml01.github.io` can replace the `A`/`AAAA` records.

Recommended `www` companion:

```
www  CNAME  toml01.github.io
```

Do not use a wildcard (`*.tomlanger.com`). After DNS propagates, enable **Enforce HTTPS** in the Pages settings.
