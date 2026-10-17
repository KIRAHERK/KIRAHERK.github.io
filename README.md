# kiraherk.github.io

Personal site of **Hussein Al Herk**, junior AI engineer (computer vision, RAG, security) in Damascus, Syria.

Live at **https://kiraherk.github.io**

## Stack

React 19 · TanStack Start (static prerender) · Tailwind CSS v4 · TypeScript. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Develop

```bash
npm install
npm run dev                      # local dev server
GITHUB_PAGES=true npm run build  # static build, same as CI
```

The page lives in `src/routes/index.tsx`; the animated pose figure in the hero is `src/components/PoseFigure.tsx`; colours and fonts are in `src/styles.css`.

The previous design is kept on the `backup/original-2026-10-17` branch.
