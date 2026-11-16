# Red Stag Construction site: how it is built

This is an **Astro** static site. It is not Next.js, even though page files live in `src/app/**/page.tsx` and import `next/link` and `next/image`.

- `src/pages/[...path].astro` renders every `src/app/**/page.tsx` to static HTML at build time with React (`renderToStaticMarkup`). Each page module exports a default component plus `metadata` or `generateMetadata`, and `generateStaticParams` for `[slug]` routes.
- `next/link`, `next/image` and `next/navigation` are local shims in `src/shims/` (aliased in `astro.config.mjs`). There is no Next.js runtime.
- **No React runs in the browser.** Components must not rely on hooks or event handler props. Anything interactive is static markup with `data-*` hooks, wired up in `src/scripts/site.ts` (menu, search, lead forms, FAQ search, sliders, review ticker, exit popup, chat widget offset, deferred analytics).
- Layout, `<head>`, fonts and site chrome: `src/layouts/Base.astro`. Global CSS and the `.cta` button system: `src/styles.css` (Tailwind v4).
- `scripts/postbuild.mjs` runs after `astro build`: responsive WebP/AVIF images, intrinsic sizes, lazy loading, hero preload, and table `data-label` attributes.
- Hosting config (clean URLs, redirects, cache headers): `vercel.json`.
- Requires Node 22.23.4 or newer.

Commands: `npm run dev`, `npm run build` (output in `dist/`), `npm run preview`.

Standards for this site: Lighthouse 100 in all categories on mobile and desktop, no em or en dashes in copy, no invented facts, reviews or credentials, and every URL in `public/llms.txt` must be a Markdown link.
