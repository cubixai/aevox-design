import { useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { Stat, Sonar } from "@/components/aevox";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import type { RegistryEntry } from "./types";

/** Replay button + auto-plays when scrolled into view, so mount animations
 *  (count-up, reveal) are actually visible — remounts the subtree to re-fire. */
function Replay({ children }: { children: ReactNode }) {
  const [k, setK] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !inView.current) {
          inView.current = true;
          setK((x) => x + 1);
        } else if (!e.isIntersecting) {
          inView.current = false;
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex flex-wrap items-center gap-5">
      <div key={k}>{children}</div>
      <Button size="sm" variant="secondary" onClick={() => setK((x) => x + 1)}>
        <RotateCcw className="size-3.5" /> Replay
      </Button>
    </div>
  );
}

export const animations: RegistryEntry[] = [
  {
    slug: "count-up",
    name: "Count-up",
    group: "Animations",
    blurb:
      "Numbers tick 0 → value on mount via Stat's count prop. Eases out over ~900ms; respects prefers-reduced-motion.",
    importLine: `import { Stat } from "@/components/aevox"`,
    demos: [
      {
        node: (
          <Replay>
            <div className="flex gap-12">
              <Stat label="Deploys today" count={1284} />
              <Stat label="Uptime" count={98.6} decimals={1} unit="%" />
            </div>
          </Replay>
        ),
        code: `<Stat label="Deploys today" count={1284} />
<Stat label="Uptime" count={98.6} decimals={1} unit="%" />`,
      },
    ],
  },
  {
    slug: "reveal",
    name: "Reveal",
    group: "Animations",
    blurb:
      'Opt-in entrance — add className="ae-rise" to a single element. Stagger a group with an inline animation-delay.',
    importLine: `/* ships in global.css */
.ae-rise { animation: ae-rise 0.5s cubic-bezier(.2,.7,.3,1) both }`,
    demos: [
      {
        node: (
          <Replay>
            <div className="flex gap-3">
              {["Tokens", "Themed", "Shipped"].map((t, i) => (
                <div
                  key={t}
                  className="ae-rise rounded-md border border-line-2 bg-surface-1 px-4 py-3 text-[13px] font-medium text-ink-1 shadow-sm"
                  style={{ animationDelay: `${i * 0.09}s` }}
                >
                  {t}
                </div>
              ))}
            </div>
          </Replay>
        ),
        code: `<div className="ae-rise">Reveals on mount</div>
{/* stagger a group with inline animation-delay */}
<div className="ae-rise" style={{ animationDelay: "0.09s" }}>…</div>`,
      },
    ],
  },
  {
    slug: "shimmer",
    name: "Shimmer",
    group: "Animations",
    blurb:
      "Loading placeholder with a soft sweeping highlight — Skeleton, looping continuously.",
    importLine: `import { Skeleton } from "@/components/ui/skeleton"`,
    demos: [
      {
        node: (
          <div className="flex w-full max-w-sm items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ),
        code: `<Skeleton className="size-10 rounded-full" />
<Skeleton className="h-4 w-2/3" />`,
      },
    ],
  },
  {
    slug: "sonar-pulse",
    name: "Sonar pulse",
    group: "Animations",
    blurb:
      "Expanding radar ping for live / active states — Sonar. Rings scale 0.28 → 1 and fade, so it stays in its box at any size.",
    importLine: `import { Sonar } from "@/components/aevox"`,
    demos: [
      {
        node: (
          <div className="grid h-28 place-items-center">
            <Sonar size={84} />
          </div>
        ),
        code: `<Sonar size={84} />`,
      },
    ],
  },
  {
    slug: "hover-press",
    name: "Hover & press",
    group: "Animations",
    blurb:
      "Micro-interactions — cards lift on hover, buttons depress on click. Pure CSS transitions, always on.",
    demos: [
      {
        node: (
          <div className="flex flex-wrap items-center gap-5">
            <Button>Press me</Button>
            <div className="cursor-pointer rounded-lg border border-line-2 bg-surface-2 px-5 py-4 text-[13px] text-ink-2 shadow-[var(--sh-card)] transition hover:-translate-y-0.5 hover:text-ink-1 hover:shadow-[var(--sh-2)]">
              Hover this card
            </div>
          </div>
        ),
        code: `// button: active:translate-y-px (in the variant)
<div className="transition hover:-translate-y-0.5 hover:shadow-[var(--sh-2)]" />`,
      },
    ],
  },
];
