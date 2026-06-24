import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import type { Demo, RegistryEntry } from "@/registry/types";

function DemoBlock({ demo }: { demo: Demo }) {
  return (
    <div className="space-y-3">
      {demo.title ? (
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.09em] text-ink-3">
          {demo.title}
        </h3>
      ) : null}
      <div className="ae-scope flex min-h-[156px] flex-wrap items-center gap-4 rounded-lg border border-line-2 p-9">
        {demo.node}
      </div>
      {demo.code ? <CodeBlock code={demo.code} /> : null}
    </div>
  );
}

export function Section({
  entry,
  divider = true,
}: {
  entry: RegistryEntry;
  divider?: boolean;
}) {
  return (
    <section
      id={entry.slug}
      className={cn("scroll-mt-6 py-14", divider && "border-t border-line")}
    >
      <header className="mb-7">
        <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink-1">
          {entry.name}
        </h2>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">
          {entry.blurb}
        </p>
        {entry.importLine ? (
          <pre className="mt-4 overflow-x-auto rounded-sm border border-line-2 bg-surface-1 px-3 py-2 font-mono text-[12px] text-ink-2">
            <code>{entry.importLine}</code>
          </pre>
        ) : null}
      </header>
      <div className="space-y-8">
        {entry.demos.map((demo, i) => (
          <DemoBlock key={i} demo={demo} />
        ))}
      </div>
    </section>
  );
}
