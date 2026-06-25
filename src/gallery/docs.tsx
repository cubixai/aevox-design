import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { Markdown, Swatch } from "./Markdown";
import themeCss from "@/styles/index.css?raw";
import designMd from "../../DESIGN.md?raw";
import logoMark from "@/assets/logo-mark.png";

// The full DESIGN.md, minus its title + intro (the doc section header supplies those).
const designSpec = (() => {
  const i = designMd.indexOf("## 1");
  return i >= 0 ? designMd.slice(i) : designMd;
})();

export type DocSection = {
  slug: string;
  name: string;
  blurb: string;
  body: ReactNode;
  /** Render the body inside a collapsed-by-default disclosure (long reference pages). */
  collapsible?: boolean;
};

function P({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-prose text-[15px] leading-relaxed text-ink-2">{children}</p>
  );
}
function H({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-3">
      {children}
    </h3>
  );
}

export const docs: DocSection[] = [
  {
    slug: "style-guide",
    name: "Brand & style guide",
    blurb:
      "For slides, social, print, or any app — no code needed. Copy the hex values, grab the three fonts, follow the spacing. The one rule: cyan is the only accent.",
    collapsible: true,
    body: (
      <div className="space-y-9">
        <P>
          This is the AeVox visual language for non-code use. Everything below is
          copy-paste ready — hex codes, font names, spacing — so a deck, a social
          post, or a print piece reads as unmistakably AeVox as the product does.
        </P>

        <div className="space-y-3">
          <H>Logo</H>
          <P>
            The AeVox mark works on light and dark. Give it clear space, keep it its
            own color, and never rotate, stretch, or add effects.
          </P>
          <div className="mt-1 flex gap-3">
            <div className="flex size-28 items-center justify-center rounded-lg border border-line bg-surface-1">
              <img src={logoMark} alt="AeVox on light" className="size-16 object-contain" />
            </div>
            <div className="flex size-28 items-center justify-center rounded-lg border border-line bg-[#0c0e12]">
              <img src={logoMark} alt="AeVox on dark" className="size-16 object-contain" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <H>Color</H>
          <P>
            Cyan is the single accent — primary actions, links, highlights. Inks are
            text. Surfaces are backgrounds. The status colors are for states only
            (success, pending, error, info) — not decoration. Each chip shows the
            light value; the dark-mode value follows where it differs.
          </P>
          <div className="mt-1 grid gap-2 sm:grid-cols-2">
            <Swatch hex="#0a9cb8" dark="#22d3ee" name="Cyan / accent" use="Primary buttons, links, highlights, focus" />
            <Swatch hex="#1f2a38" dark="#eceef2" name="Ink — text" use="Headlines + body copy" />
            <Swatch hex="#8a97a7" name="Muted ink" use="Captions, labels, metadata" />
            <Swatch hex="#eef1f6" dark="#0c0e12" name="Canvas" use="Page background" />
            <Swatch hex="#ffffff" dark="#1c1f25" name="Card" use="Panels, cards, sheets" />
            <Swatch hex="#0fae9a" name="Live — green" use="Success, active, on-track" />
            <Swatch hex="#e0930f" name="Train — amber" use="Pending, in-progress" />
            <Swatch hex="#e54848" name="Warn — red" use="Error, failed, critical" />
            <Swatch hex="#6366f1" name="Idle — indigo" use="Info, secondary, draft" />
          </div>
        </div>

        <div className="space-y-3">
          <H>Typography</H>
          <P>
            Three free Google fonts. <strong className="text-ink-1">Bricolage Grotesque</strong>{" "}
            for headlines, <strong className="text-ink-1">Hanken Grotesk</strong> for
            body copy, <strong className="text-ink-1">IBM Plex Mono</strong> for
            numbers, labels, and code.
          </P>
          <div className="mt-1 space-y-2.5">
            <div className="rounded-lg border border-line bg-surface-2 p-4">
              <div className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink-1">
                Build anything, on brand.
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
                Bricolage Grotesque · headlines
              </div>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-4">
              <div className="text-[15px] text-ink-2">
                The quick brown fox jumps over the lazy dog.
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
                Hanken Grotesk · body
              </div>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-4">
              <div className="font-mono text-lg text-ink-1">98.6%  ·  RS-881938  ·  12:30 PM</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-3">
                IBM Plex Mono · data + labels
              </div>
            </div>
          </div>
          <P>Load all three with one tag:</P>
          <CodeBlock
            lang="markup"
            code={`<link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Hanken+Grotesk:wght@300..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>`}
          />
        </div>

        <div className="space-y-3">
          <H>Shape &amp; spacing</H>
          <P>
            Soft, generous corners — cards ≈ 18px, buttons ≈ 13px, pills fully round.
            Keep breathing room: pad cards 20–24px, and stack related items 8–12px
            apart. The UI should feel calm, never cramped.
          </P>
        </div>

        <div className="space-y-3">
          <H>Do &amp; don&apos;t</H>
          <div className="mt-1 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-live/25 bg-live-ghost p-4">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-live">
                Do
              </div>
              <ul className="mt-2 space-y-1.5 text-[14px] text-ink-2">
                <li>Keep cyan as the single accent.</li>
                <li>Use the three brand fonts everywhere.</li>
                <li>Dark text on light surfaces, light on dark.</li>
                <li>Give elements room — soft radius, generous padding.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-warn/25 bg-warn-ghost p-4">
              <div className="font-mono text-[11px] font-bold uppercase tracking-wide text-warn">
                Don&apos;t
              </div>
              <ul className="mt-2 space-y-1.5 text-[14px] text-ink-2">
                <li>Recolor, rotate, or stretch the logo.</li>
                <li>Add a second accent or off-brand colors.</li>
                <li>Swap in arbitrary fonts.</li>
                <li>Crowd elements in tight, hard-edged boxes.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "installation",
    name: "Installation",
    blurb:
      "Add the whole system to a React + Tailwind v4 + shadcn project. One theme file styles every stock shadcn component.",
    body: (
      <div className="space-y-5">
        <H>With the skill (recommended)</H>
        <P>
          In your project, invoke the <code className="text-accent">aevox-design</code>{" "}
          skill. It detects your stack, bootstraps Tailwind v4 + shadcn if missing,
          drops the theme, installs the AeVox-enhanced components + primitives, and
          wires the provider and fonts.
        </P>
        <CodeBlock lang="bash" code={`/aevox-design`} />

        <H>From the registry</H>
        <P>
          AeVox ships as a shadcn registry. First, the theme + enhanced
          components + primitives + provider:
        </P>
        <CodeBlock
          lang="bash"
          code={`npx shadcn@latest add https://cubixai.github.io/aevox-design/r/aevox-theme.json \\
  https://cubixai.github.io/aevox-design/r/theme-provider.json \\
  https://cubixai.github.io/aevox-design/r/aevox-primitives.json \\
  https://cubixai.github.io/aevox-design/r/button.json \\
  https://cubixai.github.io/aevox-design/r/badge.json \\
  https://cubixai.github.io/aevox-design/r/avatar.json`}
        />
        <P>
          Then the stock shadcn components you need — the theme styles them
          automatically:
        </P>
        <CodeBlock
          lang="bash"
          code={`npx shadcn@latest add input label textarea card tabs switch select separator dropdown-menu popover dialog tooltip table checkbox skeleton progress slider sonner breadcrumb command accordion radio-group toggle toggle-group kbd`}
        />

        <H>Fonts</H>
        <P>
          Load the three families via a <code className="text-accent">&lt;link&gt;</code>{" "}
          in the document head (not a CSS import — Tailwind v4 hoists and drops it).
        </P>
        <CodeBlock
          lang="markup"
          code={`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&family=Hanken+Grotesk:ital,wght@0,300..700;1,300..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
  rel="stylesheet"
/>`}
        />
      </div>
    ),
  },
  {
    slug: "theming",
    name: "Theming",
    blurb:
      "Light is the default; dark is one class away. Everything routes through CSS variables, so the whole UI flips at once.",
    body: (
      <div className="space-y-5">
        <P>
          The system is light-default. Dark mode is the{" "}
          <code className="text-accent">.dark</code> class on{" "}
          <code className="text-accent">&lt;html&gt;</code> (the shadcn / Tailwind
          v4 convention) — the bundled{" "}
          <code className="text-accent">ThemeProvider</code> persists it and exposes a
          hook.
        </P>
        <CodeBlock
          code={`import { ThemeProvider, useTheme } from "@/lib/theme"

// wrap the app
<ThemeProvider>
  <App />
</ThemeProvider>

// toggle anywhere
const { theme, toggleTheme } = useTheme()`}
        />
        <H>Using tokens</H>
        <P>
          Never hardcode hex — go through a token utility so both themes track.
          Surfaces ladder from the canvas up: page{" "}
          <code className="text-accent">bg-surface-0</code>, chrome{" "}
          <code className="text-accent">bg-surface-1</code>, cards{" "}
          <code className="text-accent">bg-surface-2</code>. Text{" "}
          <code className="text-accent">text-ink-1/2/3</code>; accent{" "}
          <code className="text-accent">text-accent</code> /{" "}
          <code className="text-accent">bg-accent-ghost</code>. See the Foundations
          section below for the full palette.
        </P>
        <CodeBlock
          code={`<div className="rounded-lg border border-line-2 bg-surface-2 p-5">
  <h3 className="font-display text-ink-1">Acme Studio</h3>
  <p className="text-ink-2">Live · 3 environments</p>
  <span className="font-mono tabular-nums text-accent">98.6%</span>
</div>`}
        />
      </div>
    ),
  },
  {
    slug: "theme-css",
    name: "Theme CSS",
    blurb:
      "The single stylesheet behind everything — tokens, base, and every per-component override. Copy it as global.css and import once.",
    body: (
      <div className="space-y-5">
        <P>
          This one file themes every stock shadcn component. Save it as{" "}
          <code className="text-accent">app/global.css</code> (or{" "}
          <code className="text-accent">src/styles/global.css</code>), import it
          once at your app root, and every primitive picks up AeVox — no
          per-component patching. The registry and skill install this for you;
          the full source is here to copy or audit.
        </P>
        <CodeBlock lang="css" code={themeCss} scroll />
        <P>
          Layer order matters:{" "}
          <code className="text-accent">
            theme, base, aevox, components, utilities, aevox-overrides
          </code>{" "}
          — the AeVox overrides sit above Tailwind utilities so the component
          theming wins, while your own utility classes still override per-element.
        </P>
      </div>
    ),
  },
  {
    slug: "design-spec",
    name: "Full design spec",
    blurb:
      "The complete technical reference (DESIGN.md) — tokens, theming, elevation, the data-slot component model, primitives, motion, and the §12 do/don't conventions. For developers extending the system.",
    collapsible: true,
    body: <Markdown>{designSpec}</Markdown>,
  },
];
