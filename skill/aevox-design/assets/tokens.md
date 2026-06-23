# AeVox token → utility cheatsheet

Light is the **default** theme; dark is `data-theme="dark"` on `<html>` (the
attribute is always explicit). Prefer the **named utilities** below over
arbitrary values. Never hardcode hex — always go through a token so both themes
keep working.

## Surfaces (elevation ladder, deepest → highest)

| Utility | Token | Use |
|---|---|---|
| `bg-surface-0` | `--bg-0` | app canvas / page background (deepest) |
| `bg-surface-1` | `--bg-1` | chrome: sidebar, topbar |
| `bg-surface-2` | `--bg-2` | cards / panels |
| `bg-surface-3` | `--bg-3` | raised / hover |
| `bg-surface-4` | `--bg-4` | active / input |

## Text

| Utility | Token | Use |
|---|---|---|
| `text-t1` | `--t1` | primary text |
| `text-t2` | `--t2` | secondary text |
| `text-t3` | `--t3` | muted / captions |
| `text-t4` | `--t4` | faint |

## Borders

`border-line` (`--border`, hairline) · `border-line-2` (`--border-2`, default) ·
`border-line-3` (`--border-3`, strong)

## Accent (cyan)

`text-acc` / `bg-acc` / `border-acc` (`--acc`) · `*-acc-2` (hover) ·
`*-acc-deep` (solid fill / pressed) · `bg-acc-ghost` (tint) ·
`border-acc-line` (tinted border) · `text-glow` (`--glow`)

## Status palette

`live` (active/teal) · `train` (training/amber) · `warn` (error/red) ·
`idle` (draft/indigo) · `pos` (positive) · `neg` (negative) —
available as `text-*` and `bg-*` (e.g. `text-live`, `bg-warn`).

## Type

`font-display` (Bricolage Grotesque — headings) ·
`font-sans` (Hanken Grotesk — UI/body) ·
`font-mono` (IBM Plex Mono — numerals/code). Use `tabular-nums` for metrics.

## Radius

`rounded-xs` (6) · `rounded-sm` (9) · `rounded-md` (13) · `rounded-lg` (18) ·
`rounded-xl` (26) · `rounded-full` (pill)

## Shadow

`shadow-card` / `shadow-card-hi` (card rest/hover) · `shadow-1/2/3`
(popover → modal) · `shadow-glow` (cyan focus glow)

## shadcn semantic aliases (already mapped — use normally)

`bg-background` `text-foreground` `bg-card` `bg-popover` `bg-primary`
`text-primary-foreground` `bg-secondary` `bg-muted` `text-muted-foreground`
`bg-accent` `bg-destructive` `border-border` `border-input` `ring-ring`.
These all resolve to AeVox tokens, so stock shadcn components are already themed.
