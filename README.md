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

## Where things are

| What | File |
|---|---|
| All text, in English and Arabic (projects, stats, timeline, skills) | `src/content.ts` |
| Page layout and project cards | `src/components/Portfolio.tsx` |
| Project pictures: phone screens, accuracy bars, retrieval flow, voice note, class draft | `src/components/WorkVisuals.tsx` |
| Interactive pose figure in the hero | `src/components/PoseFigure.tsx` |
| Scroll reveal, count-up numbers, live release versions | `src/components/motion.tsx` |
| Colours, fonts and animations | `src/styles.css` |
| App screenshots (WebP, 420 px wide) | `public/work/` |

## Common edits

- **A project is finished:** in `src/content.ts`, change its `status` from `"building"` to `"live"` and delete its `note`. Do it in both the `en` and `ar` blocks.
- **New release:** nothing to do. Cards with a `releaseRepo` fetch the latest GitHub release when the page opens and show its version and date. `version` is only the fallback.
- **New project:** add an entry to `work.projects` (both languages), give it an `id`, and add that id to `ACCENT` and `LAYOUT` in `Portfolio.tsx` and to `visualsFor` if it has a picture.

Animations respect the system's reduce-motion setting, and the page is complete without JavaScript.

The previous designs are kept on the `backup/original-2026-10-17` branch and in git history.
