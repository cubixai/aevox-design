import type { ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { useCopied } from "./copy";
import logoMark from "@/assets/aevox-logo.png";

const COLORS = [
  { name: "Cyan / accent", light: "#0A9CB8", dark: "#22D3EE", use: "Primary actions, links, highlights, focus" },
  { name: "Ink — text", light: "#1F2A38", dark: "#ECEEF2", use: "Headlines + body copy" },
  { name: "Muted ink", light: "#8A97A7", dark: "#646A73", use: "Captions, labels, metadata" },
  { name: "Canvas", light: "#EEF1F6", dark: "#0C0E12", use: "Page / slide background" },
  { name: "Card", light: "#FFFFFF", dark: "#1C1F25", use: "Panels, cards, sheets" },
  { name: "Live — green", light: "#0FAE9A", dark: "#34E0C4", use: "Success, active, on-track" },
  { name: "Train — amber", light: "#E0930F", dark: "#F9C652", use: "Pending, in-progress" },
  { name: "Warn — red", light: "#E54848", dark: "#F87171", use: "Error, failed, critical" },
  { name: "Idle — indigo", light: "#6366F1", dark: "#7C89F0", use: "Info, secondary, draft" },
] as const;

const RADII = [
  { cls: "rounded-sm", label: "9px" },
  { cls: "rounded-md", label: "13px · buttons" },
  { cls: "rounded-lg", label: "18px · cards" },
  { cls: "rounded-full", label: "pill" },
] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-3">
      {children}
    </h4>
  );
}

function ColorRow({
  name,
  hex,
  use,
}: {
  name: string;
  hex: string;
  use: string;
}) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(hex)}
      title={`Copy ${hex}`}
      className="group flex w-full items-center gap-3 rounded-lg border border-line bg-surface-2 p-2.5 text-left transition-colors hover:border-line-2 hover:bg-surface-3"
    >
      <div
        className="size-11 shrink-0 rounded-md border border-line-2"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-ink-1">{name}</div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase text-ink-3">
          {hex}
          {copied ? (
            <Check className="size-3 text-live" />
          ) : (
            <Copy className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
        <div className="text-[12px] normal-case text-ink-3">{use}</div>
      </div>
    </button>
  );
}

export function BrandGuide() {
  const { theme } = useTheme();
  return (
    <div className="space-y-9">
      <p className="max-w-prose text-[15px] leading-relaxed text-ink-2">
        The AeVox look for decks, social, print, Figma, or Canva — colors, the
        three fonts, and the spacing. Copy the hex, grab the fonts. The one rule:{" "}
        <span className="text-ink-1">cyan is the only accent</span>.
      </p>

      <section className="space-y-3">
        <Eyebrow>
          Color{" "}
          <span className="font-normal normal-case text-ink-4">
            — {theme} theme (toggle ☀ / ☾ up top to switch)
          </span>
        </Eyebrow>
        <div className="grid gap-2 sm:grid-cols-2">
          {COLORS.map((c) => (
            <ColorRow
              key={c.name}
              name={c.name}
              hex={theme === "dark" ? c.dark : c.light}
              use={c.use}
            />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <Eyebrow>Typography</Eyebrow>
        <div className="space-y-2.5">
          <div className="rounded-lg border border-line bg-surface-2 p-4">
            <div className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink-1">
              Build anything, on brand.
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
              Bricolage Grotesque · headlines · 32–56px bold
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface-2 p-4">
            <div className="text-[15px] text-ink-2">
              The quick brown fox jumps over the lazy dog — body copy that stays
              easy to read at 15–16px.
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
              Hanken Grotesk · body · 15–16px
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface-2 p-4">
            <div className="font-mono text-lg text-ink-1">98.6%  ·  RS-881938  ·  12:30 PM</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
              IBM Plex Mono · data + labels
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <Eyebrow>Shape &amp; spacing</Eyebrow>
        <div className="flex flex-wrap items-end gap-4 rounded-lg border border-line bg-surface-2 p-4">
          {RADII.map((r) => (
            <div key={r.cls} className="text-center">
              <div className={cn("size-16 border border-line-2 bg-surface-3", r.cls)} aria-hidden />
              <div className="mt-1.5 font-mono text-[10px] text-ink-3">{r.label}</div>
            </div>
          ))}
        </div>
        <p className="max-w-prose text-[14px] leading-relaxed text-ink-2">
          Soft, generous corners. Pad cards 20–24px and stack related items 8–12px
          apart — calm, never cramped.
        </p>
      </section>

      <section className="space-y-3">
        <Eyebrow>Logo</Eyebrow>
        <div className="flex gap-3">
          <div className="flex size-28 items-center justify-center rounded-lg border border-line bg-surface-1">
            <img src={logoMark} alt="AeVox on light" className="size-16 object-contain" />
          </div>
          <div className="flex size-28 items-center justify-center rounded-lg border border-line bg-[#0c0e12]">
            <img src={logoMark} alt="AeVox on dark" className="size-16 object-contain" />
          </div>
        </div>
        <p className="max-w-prose text-[14px] leading-relaxed text-ink-2">
          Use the mark on a clean light or dark surface, with clear space ≈ its own
          height. Never rotate, stretch, recolor, or add effects.
        </p>
      </section>

      <section className="space-y-3">
        <Eyebrow>Do &amp; don&apos;t</Eyebrow>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-live/25 bg-live-ghost p-4">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-live">Do</div>
            <ul className="mt-2 space-y-1.5 text-[14px] text-ink-2">
              <li>Keep cyan as the single accent.</li>
              <li>Use the three brand fonts everywhere.</li>
              <li>Dark text on light surfaces, light on dark.</li>
              <li>Give elements room — soft radius, generous padding.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-warn/25 bg-warn-ghost p-4">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-warn">Don&apos;t</div>
            <ul className="mt-2 space-y-1.5 text-[14px] text-ink-2">
              <li>Recolor, rotate, or stretch the logo.</li>
              <li>Add a second accent or off-brand colors.</li>
              <li>Swap in arbitrary fonts.</li>
              <li>Crowd elements in tight, hard-edged boxes.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
