# K Kushal Kumar: Portfolio

React 19 + TypeScript + Vite.

```bash
npm install     # node_modules from the old zip were Windows-only, so reinstall
npm run dev
npm run build
```

## Structure

- `src/components/` one file per section (Hero, Snapshot, About, Work, Experience, TechStack, Contact) plus `icons.tsx`
- `src/styles/` one stylesheet per section; **all shared tokens live in `globals.css`**
- `public/images/portrait-cutout.(webp|png)` transparent portrait used by the hero
- `public/fonts/` self-hosted Geist Mono and Instrument Serif

## Things you may want to edit

- **Hero lettering**: `LEFT_LINES` / `RIGHT_LINES` in `Hero.tsx`. Each line is pinned to a baseline and width (`textLength`) from the approved comp, so if you change the words, adjust `length` to match.
- **Project links**: in `Work.tsx` every card currently points to `#contact` (no case-study pages exist yet). Give a project its own `href` when it has a page or repo.
- **Fonts**: Satoshi (Fontshare) and Anton (Google Fonts) load from `index.html`. To self-host them, drop the files in `public/fonts/`, add `@font-face` in `globals.css`, and remove the `<link>` tags.
