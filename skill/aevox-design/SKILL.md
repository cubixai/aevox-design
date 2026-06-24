---
name: aevox-design
description: Install the AeVox Voice design system (light-default, cyan-accented, React + shadcn/ui + Tailwind v4) into a new OR existing project. Bootstraps Tailwind v4 + shadcn if missing, drops the single theme global.css (themes every stock shadcn component), installs the AeVox-enhanced button/badge/avatar + Sonar/Stat primitives + ThemeProvider, and wires fonts. Also the reference for "what token / utility do I use for X". Trigger: /aevox-design.
---

# AeVox Design System — installer + reference

Invoking this skill = follow the runbook below to install the system into the
current project. It is **idempotent**: re-running only fills gaps. Bundled assets
live in this skill's `assets/` dir. The live reference gallery is `~/dev/aevox-design`.

## Core model

One file (`assets/aevox-global.css`) carries the AeVox tokens (light + dark),
Tailwind v4 `@theme`, shadcn aliases, and the `aevox-overrides` layer. Because the
overrides target shadcn's `data-slot` attributes, **every stock component themes
itself** — no per-component work for ~95% of the system. Only three components add
new variants/props (`button` cyan outline, `badge` status tones, `avatar` orbs);
those ship as ready files in `assets/components/`. `Sonar`/`Stat`/`StatusDot` are
the only AeVox-native parts (no shadcn equivalent).

---

# Runbook

## 0 · Detect (read first, change nothing yet)
Inspect `package.json` + the tree and report findings before acting:
- React? (`react`). Vite (`vite`) or Next (`next`)?
- Tailwind **v4**? (`tailwindcss` ^4 **and** `@tailwindcss/vite` or `@tailwindcss/postcss`).
- shadcn? (`components.json` present, `@/lib/utils` `cn`).
- Which `components/ui/*` already exist (so you don't clobber customized ones).

## 1 · Foundation (install only what's missing)
- **Tailwind v3 detected → STOP.** This system is Tailwind **v4 only** (uses `@theme`,
  `@custom-variant`, CSS `@layer`). A v3→v4 upgrade is a real migration (config →
  CSS-first, breaking utility changes) and is **NOT automated by this skill yet**
  (TODO). Report it and let the user upgrade to v4 first, or scope to a v4 app.
- **Tailwind v4 missing (no Tailwind at all):**
  - Vite: `npm i -D tailwindcss @tailwindcss/vite`; add `tailwindcss()` to `vite.config` plugins; ensure a CSS entry with `@import "tailwindcss";`.
  - Next: `npm i tailwindcss @tailwindcss/postcss postcss`; `postcss.config` with `@tailwindcss/postcss`; `@import "tailwindcss";` in `app/globals.css`.
- **shadcn missing:** `npx shadcn@latest init` (base color neutral, CSS variables). Confirm `components.json` + `@/lib/utils` exist.
- Ensure deps: `npm i class-variance-authority clsx tailwind-merge lucide-react` and `npm i -D tw-animate-css`. For toggles/avatars/etc. shadcn pulls `radix-ui`.

## 2 · Theme (the one file)
- Copy `assets/aevox-global.css` → the project's main stylesheet (Vite: `src/styles/global.css`; Next: `app/globals.css`). It **starts with** `@layer …; @import "tailwindcss"; @import "tw-animate-css";` so it REPLACES the project's existing Tailwind entry — back up any current `@theme`/`:root` first, then make this file the imported entry.
- Add the fonts via `<link>` in the HTML head (NOT a CSS `@import` — Tailwind v4 hoists + drops it):
  ```html
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Hanken+Grotesk:ital,wght@0,300..700;1,300..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  ```

## 3 · Components
- **Stock components**: add the ones the project uses (or the standard set) — the theme css styles them automatically:
  `npx shadcn@latest add input label textarea card tabs switch select separator dropdown-menu popover dialog tooltip table checkbox skeleton progress slider sonner breadcrumb command accordion radio-group toggle toggle-group kbd`
- **AeVox-enhanced**: copy `assets/components/{button,badge,avatar}.tsx` over `src/components/ui/*`. If a target already exists and looks customized, DIFF and confirm before overwriting.
- **Primitives**: copy `assets/aevox-primitives.tsx` → `src/components/aevox/index.tsx`.
- **Provider**: copy `assets/theme-provider.tsx` → `src/lib/theme.tsx`; wrap the app root in `<ThemeProvider>`; mount `<Toaster />` once (fix sonner's import to `@/lib/theme` if needed).

## 4 · Verify
- `npx tsc -b` (or `tsc --noEmit`) + a build. Fix alias/import paths. Load the app; confirm light is default and components look AeVox.

## Alt · registry install (when the repo is hosted)
If `~/dev/aevox-design` is deployed (or its dev server is running), skip the copy
steps and pull from the registry instead (`https://cubixai.github.io/aevox-design` = that origin):
```bash
npx shadcn@latest add https://cubixai.github.io/aevox-design/r/aevox-theme.json https://cubixai.github.io/aevox-design/r/theme-provider.json \
  https://cubixai.github.io/aevox-design/r/aevox-primitives.json https://cubixai.github.io/aevox-design/r/button.json https://cubixai.github.io/aevox-design/r/badge.json https://cubixai.github.io/aevox-design/r/avatar.json
```
then the stock-component `shadcn add` line from step 3. See `~/dev/aevox-design/REGISTRY.md`.

---

# Reference

## Files (`assets/`)
| File | → target |
|---|---|
| `aevox-global.css` | the single drop-in stylesheet |
| `components/{button,badge,avatar}.tsx` | `components/ui/*` (AeVox variants) |
| `aevox-primitives.tsx` | `components/aevox/index.tsx` (Sonar/Stat/StatusDot) |
| `theme-provider.tsx` | `lib/theme.tsx` |
| `tokens.md` | **read before writing utilities** — token → utility cheatsheet |

## Generating new components
- Standard UI → themed shadcn component as-is; don't restyle.
- Voice-domain → `Sonar`, `Stat`, `StatusDot`, `Badge` tones, `Avatar` orbs.
- Custom → compose with named utilities (`tokens.md`). Never hardcode hex. Surfaces: page `bg-surface-0`, chrome `bg-surface-1`, cards `bg-surface-2`, floating menus a step above what they open over. Headings `font-display`; metrics `font-mono tabular-nums`; structural labels mono-uppercase. Accent sparingly (`text-acc`/`bg-acc-ghost`/`border-acc-line` for active; solid `bg-primary` for the main CTA only). Light is default; dark is `data-theme="dark"`.
