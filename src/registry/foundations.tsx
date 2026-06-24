import type { RegistryEntry } from "./types";

/* ---- small presentational helpers (gallery-only) -------------------------- */

function Swatch({ token, note }: { token: string; note?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-12 w-12 flex-none rounded-md border border-line-2"
        style={{ background: `hsl(var(${token}))` }}
      />
      <div className="min-w-0">
        <div className="font-mono text-[12.5px] text-ink-1">{token}</div>
        {note ? <div className="text-[12px] text-ink-3">{note}</div> : null}
      </div>
    </div>
  );
}

function SwatchGrid({ tokens }: { tokens: [string, string?][] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokens.map(([t, n]) => (
        <Swatch key={t} token={t} note={n} />
      ))}
    </div>
  );
}

export const foundations: RegistryEntry[] = [
  {
    slug: "colors",
    name: "Color",
    group: "Foundations",
    blurb:
      "Cyan accent, a layered surface ladder, and a six-tone status palette. Every value flips with the light theme.",
    demos: [
      {
        title: "Surfaces — elevation ladder (deepest → highest)",
        node: (
          <SwatchGrid
            tokens={[
              ["--surface-0", "app canvas (deepest)"],
              ["--surface-1", "chrome: sidebar + topbar"],
              ["--surface-2", "cards / panels"],
              ["--surface-3", "raised / hover"],
              ["--surface-4", "active / input"],
            ]}
          />
        ),
      },
      {
        title: "Accent — cyan",
        node: (
          <SwatchGrid
            tokens={[
              ["--accent", "primary accent"],
              ["--accent-2", "hover"],
              ["--accent-deep", "pressed / solid fill"],
            ]}
          />
        ),
      },
      {
        title: "Status",
        node: (
          <SwatchGrid
            tokens={[
              ["--live", "live / active"],
              ["--train", "training"],
              ["--warn", "error / failed"],
              ["--idle", "secondary / draft"],
              ["--pos", "positive delta"],
              ["--neg", "negative delta"],
            ]}
          />
        ),
      },
      {
        title: "Text & borders",
        node: (
          <SwatchGrid
            tokens={[
              ["--ink-1", "primary text"],
              ["--ink-2", "secondary text"],
              ["--ink-3", "muted text"],
              ["--line", "hairline"],
              ["--line-2", "default"],
              ["--line-3", "strong"],
            ]}
          />
        ),
      },
    ],
  },
  {
    slug: "typography",
    name: "Typography",
    group: "Foundations",
    blurb:
      "Bricolage Grotesque for display, Hanken Grotesk for UI, IBM Plex Mono for numbers and code.",
    demos: [
      {
        title: "Display — Bricolage Grotesque",
        node: (
          <div className="space-y-2">
            <div className="font-display text-4xl font-semibold tracking-tight text-ink-1">
              Voice agents, supervised.
            </div>
            <div className="font-mono text-[12px] text-ink-3">
              font-family: var(--f-display)
            </div>
          </div>
        ),
      },
      {
        title: "Sans — Hanken Grotesk",
        node: (
          <div className="space-y-2">
            <p className="max-w-prose text-[15px] leading-relaxed text-ink-2">
              The quick brown fox jumps over the lazy dog. Hanken Grotesk carries
              the interface — labels, body copy, table cells, and form fields.
            </p>
            <div className="font-mono text-[12px] text-ink-3">
              font-family: var(--f-sans)
            </div>
          </div>
        ),
      },
      {
        title: "Mono — IBM Plex Mono",
        node: (
          <div className="space-y-2">
            <div className="font-mono text-2xl font-semibold tabular-nums text-ink-1">
              1,284 calls · 98.6% · 12.4s
            </div>
            <div className="font-mono text-[12px] text-ink-3">
              font-family: var(--f-mono)
            </div>
          </div>
        ),
      },
    ],
  },
  {
    slug: "radii",
    name: "Radius",
    group: "Foundations",
    blurb: "Six-step radius scale from subtle controls to pill chips.",
    demos: [
      {
        node: (
          <div className="flex flex-wrap items-end gap-5">
            {[
              ["--radius-xs", "6"],
              ["--radius-sm", "9"],
              ["--radius-md", "13"],
              ["--radius-lg", "18"],
              ["--radius-xl", "26"],
            ].map(([t, px]) => (
              <div key={t} className="space-y-2 text-center">
                <div
                  className="h-16 w-16 border border-line-3 bg-surface-3"
                  style={{ borderRadius: `var(${t})` }}
                />
                <div className="font-mono text-[11px] text-ink-3">
                  {t}
                  <br />
                  {px}px
                </div>
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
  {
    slug: "elevation",
    name: "Elevation",
    group: "Foundations",
    blurb:
      "Cards lift off the canvas with a lit-from-above edge and a cast shadow. Three ambient tiers plus a cyan glow.",
    demos: [
      {
        node: (
          <div className="flex flex-wrap gap-6">
            {[
              ["--sh-card", "card"],
              ["--sh-2", "popover"],
              ["--sh-3", "modal"],
              ["--sh-glow", "glow"],
            ].map(([t, label]) => (
              <div
                key={t}
                className="grid h-24 w-40 place-items-center rounded-lg border border-line-2 bg-surface-2 text-[13px] text-ink-2"
                style={{ boxShadow: `var(${t})` }}
              >
                {label}
              </div>
            ))}
          </div>
        ),
      },
    ],
  },
];
