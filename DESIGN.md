# AeVox Design System

The canonical spec for the AeVox design language: React + shadcn/ui + Tailwind v4,
cyan-accented, **light by default**. One `global.css` themes every stock shadcn
component via `data-slot` overrides — ~95% of the system needs zero per-component work.

Live gallery: https://cubixai.github.io/aevox-design/ · Install: `/aevox-design` skill or the shadcn registry.

---

## 1 · Principles

- **One token source, two themes.** Every color routes through a CSS variable, stored as **HSL channels** (`--ink-1: 214 29% 17%`) so Tailwind alpha modifiers work (`text-ink-2/40`). Light is the base `:root`; dark is opt-in via the `.dark` class. The whole UI flips at once.
- **Elevation, lit from above.** Surfaces ladder from a deep canvas up to raised cards. Cards carry a lit top edge + a cast shadow and lift on hover. The UI never reads flat.
- **Cyan is the one accent.** A single brand cyan for primary actions, focus, links, active states. No second hue competing.
- **Mono for data + labels.** IBM Plex Mono for numerals, keycaps, status pills, and eyebrow labels — it signals "system."
- **Motion is purposeful, never decorative.** Hover, press, skeleton shimmer, the sonar pulse, opt-in count-up/reveal. No scroll-fade-everything. Always respects `prefers-reduced-motion`.

---

## 2 · Theming model

- **Light = default.** No class on `<html>` → light.
- **Dark = opt-in.** The `.dark` class on `<html>` → dark (the standard shadcn / Tailwind v4 convention; `next-themes` defaults to it).
- An app shipping only the CSS (no JS) renders light, with no flash.
- Bundled `ThemeProvider` (`@/lib/theme`) persists the choice and exposes `useTheme()` (`theme`, `toggleTheme`).

```tsx
<ThemeProvider><App /></ThemeProvider>
const { theme, toggleTheme } = useTheme()
```

---

## 3 · Color

### Surfaces — elevation ladder (deepest → highest)

| Token | Utility | Role | Light | Dark |
|---|---|---|---|---|
| `--surface-0` | `bg-surface-0` | app canvas (deepest) | `#eef1f6` | `#0c0e12` |
| `--surface-1` | `bg-surface-1` | chrome: sidebar + topbar | `#ffffff` | `#17191e` |
| `--surface-2` | `bg-surface-2` | cards / panels | `#ffffff` | `#1c1f25` |
| `--surface-3` | `bg-surface-3` | raised / hover | `#f1f4f9` | `#23262d` |
| `--surface-4` | `bg-surface-4` | active / input | `#e7ecf3` | `#2c3037` |
| `--stage` | — | recessed preview surface | `#f6f8fc` | `#101319` |

### Borders

| Token | Utility | Light | Dark |
|---|---|---|---|
| `--line` | `border-line` | `#e7ebf1` | `#24272e` |
| `--line-2` | `border-line-2` | `#d8dee7` | `#313640` |
| `--line-3` | `border-line-3` | `#bcc6d2` | `#434954` |

### Text

| Token | Utility | Role | Light | Dark |
|---|---|---|---|---|
| `--ink-1` | `text-ink-1` | primary | `#1f2a38` | `#eceef2` |
| `--ink-2` | `text-ink-2` | secondary | `#4c5a6c` | `#9aa0a9` |
| `--ink-3` | `text-ink-3` | tertiary / labels | `#8a97a7` | `#646a73` |
| `--ink-4` | `text-ink-4` | faint | `#aab3c1` | `#474c54` |

### Accent — cyan

| Token | Utility | Role | Light | Dark |
|---|---|---|---|---|
| `--accent` | `text-accent` | accent | `#0a9cb8` | `#22d3ee` |
| `--accent-2` | `text-accent-2` | hover | `#0a87a0` | `#10bcd8` |
| `--accent-deep` | `text-accent-deep` | pressed / deep | `#0a6d82` | `#0a9cba` |
| `--accent-ghost` | `bg-accent-ghost` | tinted fill (~10–12%) | — | — |
| `--accent-line` | — | tinted border (~32–35%) | — | — |

Note: light cyan is deeper (so white text reads on filled cyan); dark cyan is brighter (dark ink on filled cyan).

### Status — six tones

| Token | Utility | Meaning | Light | Dark |
|---|---|---|---|---|
| `--live` | `text-live` | live / active | `#0fae9a` | `#34e0c4` |
| `--train` | `text-train` | training / pending | `#e0930f` | `#f9c652` |
| `--warn` | `text-warn` | error / failed | `#e54848` | `#f87171` |
| `--idle` | `text-idle` | secondary / draft | `#6366f1` | `#7c89f0` |
| `--pos` | `text-pos` | positive | `#13a06a` | `#34d399` |
| `--neg` | `text-neg` | negative | `#e5486b` | `#fb7185` |

Each tone has a matching `--*-ghost` (≈12% tint) for pill backgrounds.

---

## 4 · Typography

| Role | Variable | Utility | Family |
|---|---|---|---|
| Display | `--f-display` | `font-display` | Bricolage Grotesque |
| Body / UI | `--f-sans` | `font-sans` | Hanken Grotesk |
| Mono / data | `--f-mono` | `font-mono` | IBM Plex Mono |

- Headlines: `font-display`, tight tracking (`-0.02em` to `-0.025em`).
- Numerals/metrics, keycaps, status pills, eyebrow labels: `font-mono`, often uppercase with letter-spacing.
- Load the three families via `<link>` in the document head (not a CSS `@import` — Tailwind v4 hoists/drops it).

---

## 5 · Radius

| Token | Utility | Value |
|---|---|---|
| `--radius-xs` | `rounded-xs` | 6px |
| `--radius-sm` | `rounded-sm` | 9px |
| `--radius-md` | `rounded-md` (`--radius`) | 13px |
| `--radius-lg` | `rounded-lg` | 18px |
| `--radius-xl` | `rounded-xl` | 26px |
| `--radius-pill` | `rounded-full` | 999px |

---

## 6 · Elevation & shadows

Cards get a lit-from-above edge (`--edge`, `inset 0 1px 0`) plus a cast shadow, and lift `translateY(-1px)` on hover.

| Token | Utility | Role |
|---|---|---|
| `--sh-card` / `--sh-card-hi` | `shadow-card` / `shadow-card-hi` | resting / raised card |
| `--sh-1` `--sh-2` `--sh-3` | `shadow-1/2/3` | popover · modal · max |
| `--sh-glow` | `shadow-glow` | cyan focus glow |

Floating surfaces (select / dropdown / popover / command) sit one surface step up (`--surface-3`) + a cast shadow, so they never blend into the card beneath. Modals use `--surface-2` + `--sh-3`.

---

## 7 · Component theming (the `data-slot` model)

The `aevox-overrides` cascade layer targets shadcn's `data-slot` attributes and sits **above** Tailwind utilities, so stock components adopt the AeVox look with no per-component edits. Highlights:

- **Inputs / textarea / select-trigger** → solid `--surface-1` fill, cyan focus glow; `aria-invalid` → red border + ring.
- **Tabs / toggle-group / toggle** → square-rounded segmented control; active carries cyan (`accent-ghost` + `accent-line`).
- **Table** → mono uppercase headers, hairline rows, hover highlight.
- **Kbd** → physical keycap (thick bottom edge + cast shadow).
- **Skeleton** → cyan-aware shimmer with enough contrast on any surface.
- **Card** → elevated, lit edge, hover lift.
- **Dialog / overlay** → raised plane + dimmed overlay.

### Three enhanced components (ship as files)

- **Button** — variants: `default` (solid cyan gradient + white text, the one loud CTA), `secondary` (solid white/surface + border + shadow), `outline` (transparent + cyan border/text), `ghost`, `destructive` (soft tinted red), `link`. Sizes `xs · sm · default · lg` + icon sizes. **Gradient only on primary.**
- **Badge** — every variant is a mono-uppercase ghost pill. Status tones: `live · training · idle · warn · accent · neutral`, plus `tag` (metadata).
- **Avatar** — photo + initials; `AvatarFallback tone="violet|green|amber|gray|accent"` → gradient orbs.

---

## 8 · AeVox-native primitives

No shadcn equivalent — `import { Sonar, Stat, StatusDot } from "@/components/aevox"`.

- **Sonar** — expanding radar ping for live/active states. `<Sonar size={n} />`; rings scale `0.28 → 1` so they stay in the box at any size.
- **Stat** — headline metric, mono numerals. Static `value`, or `count={n}` (+ `decimals`) to **animate 0 → value** on mount.
- **StatusDot** — inline `<i class="dot {tone}">` indicator.
- **`.ae-rise`** — opt-in entrance utility (`animation: ae-rise .5s … both`); stagger with inline `animation-delay`.

---

## 9 · Motion

Ship list (all reduced-motion-safe):

| Motion | Where | Trigger |
|---|---|---|
| Count-up | `Stat count={…}` | on mount |
| Reveal | `.ae-rise` | on mount (opt-in) |
| Shimmer | Skeleton | continuous |
| Sonar pulse | `Sonar` | continuous |
| Hover lift / press | cards, buttons | interactive |

**Not shipped (deliberate):** scroll-fade-everything, typing text — reads as templated and slows a reference UI.

---

## 10 · Install

- **Skill:** run `/aevox-design` in the target project (detects stack, fills gaps, drops theme + components + fonts). **Tailwind v4 + shadcn required** — v3→v4 migration is a separate, not-yet-automated step.
- **Registry:** `npx shadcn@latest add https://cubixai.github.io/aevox-design/r/aevox-theme.json …` then `shadcn add` the stock components — the theme styles them automatically.

Full token + utility reference + live previews: the gallery's **Foundations** and **Theme CSS** sections.

---

## 11 · Migrating legacy colors → tokens

Never use raw Tailwind palette colors (`bg-red-500`, `text-gray-500`, …). Map them to the token utilities. Standard mapping:

| Legacy hue | Token | Notes |
|---|---|---|
| red · rose | `warn` | error / failed / critical |
| orange | `warn` | high severity |
| amber · yellow | `train` | pending / training / medium |
| green · emerald · teal · lime | `live` | active; use `pos` for positive metrics, `success` Badge for "done" |
| blue · sky | `idle` | info / secondary |
| indigo · violet · purple · fuchsia | `idle` | use `accent` only if it's a brand-primary usage |
| cyan | `accent` | the brand accent |
| gray · slate · zinc · neutral · stone | `ink-*` / `surface-*` / `line-*` | text→`text-ink-2/3`, fills→`bg-surface-2/3`, borders→`border-line-2` |

Shade conventions: light fills `bg-*-50/100` → `bg-*-ghost`; mid text `text-*-600/700` → `text-*`; borders `border-*-200/300` → `border-*/25`. If the markup is a badge/pill, prefer the canonical `<Badge variant="live|train|warn|idle|accent|neutral|success">` over ad-hoc color classes.

---

## 12 · Conventions — build *on* the system, not beside it

Use the design-system components + tokens. Never hand-roll a look-alike — that is how drift starts.

### Components — use them, don't recreate them

| Need | Do | Don't |
|---|---|---|
| Panel / card | `<Card>` (+ `CardHeader/CardContent/CardFooter`) | a div styled `bg-card border rounded-lg p-6` |
| Status / label | `<Badge variant="live\|train\|warn\|idle\|accent\|neutral\|success">` | `<Badge variant="outline" className="border-warn text-warn">` or a `<span className="rounded-full uppercase">` |
| Button | `<Button variant=… size=…>` | raw `<button className="…">` |
| Text field | `<Input>` / `<Textarea>` | raw `<input>` (except `type=file/color`/native pickers) |
| Select / menu | `<Select>` / `<DropdownMenu>` | hand-built dropdown divs |
| Table | `<Table>` (`TableHeader/Row/Cell`) | grid/flex divs faking a table |
| Modal | `<Dialog>` | `fixed inset-0` overlay divs |

- **Badges carry no dot and no icon** — a tone-tinted mono pill *is* the badge. Need a live indicator? Put the `StatusDot` primitive *beside* the text, not inside a badge.
- **Never nest a `<Card>` inside a `<Card>`** — use a `bg-surface-3` sub-panel for inner grouping.
- **`className` is for layout/sizing only** (`w-full`, `gap-2`, `mb-4`, `max-w-sm`). **Never override a component's *appearance* with `className`** (`bg-accent`, `text-warn`, `border-line`, custom `hover:`) — pick the right **variant**. A `<Button className="bg-accent text-surface-0">` reinventing the primary → just `<Button>`; a warn-tinted outline → `variant="destructive"`; a custom-styled `SelectTrigger` → drop the color classes, keep the width. Overriding the variant defeats the system.

### Color

- **Never** raw Tailwind palette — `bg-red-500`, `text-gray-500`, `border-blue-200`. Map to tokens (§11).
- **Do** use token utilities: `bg-surface-*`, `text-ink-*`, `border-line-*`, `text-accent`, status `text-warn/train/live/idle/pos/neg` (+ `bg-*-ghost`, `border-*/25`).
- **Shadcn semantic classes are fine** — `text-muted-foreground`, `bg-muted`, `bg-card`, `bg-primary`, `text-primary`, `border-border` all map to tokens and flip with the theme. Use them freely. One caveat: `bg-background` is the **canvas** (surface-0), not a card surface — for a panel, use `<Card>`/`surface-2`.
- **Legit hex exceptions** (not UI chrome — leave them): chart/data-viz series colors, brand logos, and color *data* the user chooses (e.g. a classification/role color).

### Status tones — canonical mapping

- Urgency / severity: `low → live`, `medium → train`, `high → warn`, `critical → warn` (or `destructive`).
- State: resolved/done → `success`/`live`; pending/in-progress → `train`/`accent`; error/failed → `warn`; draft/secondary → `idle`/`neutral`.

### Theme + motion

- Dark mode is the `.dark` class on `<html>`. Reach for `dark:` variants only when a token can't express it — most things just flip via tokens.
- Keep motion purposeful (hover, press, skeleton, sonar, opt-in count-up/reveal). No scroll-fade-everything, no typing text.
