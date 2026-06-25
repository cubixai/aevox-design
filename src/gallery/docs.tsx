import type { ReactNode } from "react";
import { Palette, FileText } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { Markdown } from "./Markdown";
import themeCss from "@/styles/index.css?raw";
import designMd from "../../DESIGN.md?raw";
import { BrandGuide } from "./BrandGuide";

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
  /** Sidebar + page group heading. Defaults to "Docs". */
  group?: string;
  /** Sidebar icon (used by the Reference pages). */
  icon?: ReactNode;
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
    slug: "brand-guide",
    name: "Brand guide",
    group: "Reference",
    icon: <Palette className="size-4" />,
    collapsible: true,
    blurb:
      "Plain-language style guide for designers & marketing — real colour swatches (light + dark), the fonts, shape, and spacing for Figma, Canva, slides, social, or print.",
    body: <BrandGuide />,
  },
  {
    slug: "design-spec",
    name: "Spec",
    group: "Reference",
    icon: <FileText className="size-4" />,
    collapsible: true,
    blurb:
      "Full technical reference — every token, class, and rule. Rendered from DESIGN.md.",
    body: <Markdown>{designSpec}</Markdown>,
  },
];

/** Docs grouped by their `group` (default "Docs"), preserving array order. */
export const docGroups: { name: string; docs: DocSection[] }[] = (() => {
  const out: { name: string; docs: DocSection[] }[] = [];
  for (const d of docs) {
    const name = d.group ?? "Docs";
    let grp = out.find((g) => g.name === name);
    if (!grp) {
      grp = { name, docs: [] };
      out.push(grp);
    }
    grp.docs.push(d);
  }
  return out;
})();
