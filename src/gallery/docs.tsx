import type { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";

export type DocSection = {
  slug: string;
  name: string;
  blurb: string;
  body: ReactNode;
};

function P({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-prose text-[15px] leading-relaxed text-t2">{children}</p>
  );
}
function H({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-t3">
      {children}
    </h3>
  );
}

export const docs: DocSection[] = [
  {
    slug: "installation",
    name: "Installation",
    blurb:
      "Add the whole system to a React + Tailwind v4 + shadcn project. One theme file styles every stock shadcn component.",
    body: (
      <div className="space-y-5">
        <H>With the skill (recommended)</H>
        <P>
          In your project, invoke the <code className="text-acc">aevox-design</code>{" "}
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
          Load the three families via a <code className="text-acc">&lt;link&gt;</code>{" "}
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
      "Light is the default; dark is one attribute away. Everything routes through CSS variables, so the whole UI flips at once.",
    body: (
      <div className="space-y-5">
        <P>
          The system is light-default. Dark mode is{" "}
          <code className="text-acc">data-theme="dark"</code> on{" "}
          <code className="text-acc">&lt;html&gt;</code> — the bundled{" "}
          <code className="text-acc">ThemeProvider</code> persists it and exposes a
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
          <code className="text-acc">bg-surface-0</code>, chrome{" "}
          <code className="text-acc">bg-surface-1</code>, cards{" "}
          <code className="text-acc">bg-surface-2</code>. Text{" "}
          <code className="text-acc">text-t1/t2/t3</code>; accent{" "}
          <code className="text-acc">text-acc</code> /{" "}
          <code className="text-acc">bg-acc-ghost</code>. See the Foundations
          section below for the full palette.
        </P>
        <CodeBlock
          code={`<div className="rounded-lg border border-line-2 bg-surface-2 p-5">
  <h3 className="font-display text-t1">Acme Studio</h3>
  <p className="text-t2">Live · 3 environments</p>
  <span className="font-mono tabular-nums text-acc">98.6%</span>
</div>`}
        />
      </div>
    ),
  },
];
