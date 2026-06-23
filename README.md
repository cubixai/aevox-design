# AeVox Design System

A light-default, cyan-accented design system for voice-agent interfaces, built on
**React + shadcn/ui + Tailwind v4**. One theme file styles every stock shadcn
component; the whole thing ships as a shadcn registry and a Claude Code skill.

**→ Live gallery + docs: https://cubixai.github.io/aevox-design**

```bash
npm install
npm run dev      # gallery at http://localhost:5173
npm run build    # typecheck + production build (Pages base /aevox-design/)
```

## Install into your app

A fresh React + Tailwind v4 + shadcn project pulls the whole system from the
registry (see `REGISTRY.md` for the full walkthrough):

Theme + AeVox components + primitives + provider:

```bash
npx shadcn@latest add https://cubixai.github.io/aevox-design/r/aevox-theme.json https://cubixai.github.io/aevox-design/r/theme-provider.json https://cubixai.github.io/aevox-design/r/aevox-primitives.json https://cubixai.github.io/aevox-design/r/button.json https://cubixai.github.io/aevox-design/r/badge.json https://cubixai.github.io/aevox-design/r/avatar.json
```

Then the stock shadcn components you need (the theme styles them automatically):

```bash
npx shadcn@latest add input label textarea card tabs switch select separator dropdown-menu popover dialog tooltip table checkbox skeleton progress slider sonner breadcrumb command accordion radio-group toggle toggle-group kbd
```

Then import `global.css`, add the fonts `<link>`, wrap the app in `<ThemeProvider>`,
mount `<Toaster />`. Light is the default; dark is `data-theme="dark"` on `<html>`.

## Claude Code skill

There's a companion skill — **`aevox-design`** — that installs the whole system
into a new *or* existing project (bootstraps Tailwind v4 + shadcn if missing, drops
the theme, installs the enhanced components + primitives, wires the provider and
fonts). It's bundled in [`skill/aevox-design`](./skill/aevox-design). To use it:

```bash
cp -r skill/aevox-design ~/.claude/skills/aevox-design
```

Then in any project: `/aevox-design`.

## How it works

Everything routes through CSS variables, so shadcn and Tailwind both consume one
source of truth:

```
AeVox token (--bg-2, --acc, --r-md)
  → shadcn alias (--card, --primary, --radius)
  → Tailwind @theme utility (bg-card, bg-primary, rounded-md)
```

An `@layer aevox-overrides` block targets shadcn's `data-slot` attributes, so stock
components adopt the AeVox look (solid fields, cyan-active tabs, elevated menus,
mono table headers, depth, themed scrollbar) with no per-component edits. Only
`button` / `badge` / `avatar` add new variants; `Sonar` / `Stat` / `StatusDot` are
the only AeVox-native parts.

## Layout

| Path | What |
|------|------|
| `src/styles/index.css` | The single theme — tokens + `@theme` + shadcn aliases + `aevox-overrides`. Shipped as `aevox-global.css`. |
| `src/components/ui/` | shadcn primitives (3 enhanced) |
| `src/components/aevox/` | `Sonar`, `Stat`, `StatusDot` |
| `src/registry/` · `src/gallery/` | the catalog + the gallery site |
| `registry.json` · `public/r/` | the shadcn registry (`npm run registry:build`) |
| `skill/aevox-design/` | the Claude Code installer skill |
