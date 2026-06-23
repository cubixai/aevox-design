# AeVox registry — install the design system into any app

The AeVox design system ships as a **shadcn custom registry** (`registry.json` →
`public/r/*.json`). A fresh React + Tailwind v4 + shadcn app pulls the whole
system with `npx shadcn add` — no manual file copying.

## Items

| Item | What it installs |
|------|------------------|
| `aevox-theme` | The single `global.css` (tokens light+dark, `@theme`, shadcn aliases, `aevox-overrides`, primitives, depth, scrollbar) + its deps. **Themes every stock shadcn component.** |
| `theme-provider` | `ThemeProvider` + `useTheme()` → `src/lib/theme.tsx` |
| `aevox-primitives` | `Sonar`, `Stat`, `StatusDot` → `components/aevox/index.tsx` |
| `button` · `badge` · `avatar` | The 3 shadcn primitives with AeVox variants (cyan outline, status tones, gradient orbs) — these **overwrite** the stock ones |

## Install into a fresh app

Prereqs: the app is Vite/Next + React + **Tailwind v4** + **shadcn** (`components.json` present).

**1.** Theme + AeVox-enhanced components + primitives + provider:

```bash
npx shadcn@latest add https://cubixai.github.io/aevox-design/r/aevox-theme.json https://cubixai.github.io/aevox-design/r/theme-provider.json https://cubixai.github.io/aevox-design/r/aevox-primitives.json https://cubixai.github.io/aevox-design/r/button.json https://cubixai.github.io/aevox-design/r/badge.json https://cubixai.github.io/aevox-design/r/avatar.json
```

**2.** The stock shadcn components you need — the theme styles them automatically:

```bash
npx shadcn@latest add input label textarea card tabs switch select separator dropdown-menu popover dialog tooltip table checkbox skeleton progress slider sonner breadcrumb command accordion radio-group toggle toggle-group kbd
```

Then:
- Import `src/styles/global.css` as the app's CSS entry.
- Add the fonts `<link>` (Bricolage Grotesque / Hanken Grotesk / IBM Plex Mono) to the HTML head.
- Wrap the app in `<ThemeProvider>`; mount `<Toaster />` once.

That's it — stock components are AeVox-themed; the 3 enhanced ones carry the extra variants.

## Regenerate (after any design change)

```bash
npm run registry:build   # = shadcn build → rewrites public/r/*.json
```

The registry is **regenerate-on-change** — never wait for the design to be
"done." Bump the version, rebuild, and consumers pin a version so a moving
design never breaks them.

## Hosting

`public/r/*.json` is static. Any static host works — deploy the repo (or just
`public/`) and the files are served at `/r/...`. While developing, the Vite dev
server already serves them at `http://localhost:5173/r/...`.
