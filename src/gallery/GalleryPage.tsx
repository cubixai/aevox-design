import { cn } from "@/lib/utils";
import { groups, registry } from "@/registry";
import { Section } from "./Section";
import { docs } from "./docs";
import logo from "@/assets/logo-mark.png";

function groupId(name: string) {
  return "group-" + name.toLowerCase().replace(/\s+/g, "-");
}

const STACK = ["React", "shadcn/ui", "Tailwind v4"];

function Hero() {
  return (
    <section id="getting-started" className="scroll-mt-6 pb-10 pt-16">
      <img src={logo} alt="AeVox" className="size-20 object-contain" />

      <div className="mt-9 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-accent">
        AeVox · Design System
      </div>
      <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.6rem,6vw,4.25rem)] font-semibold leading-[1.0] tracking-[-0.025em] text-ink-1">
        Build anything, on brand.
      </h1>
      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-2">
        Every shadcn primitive, retuned to the AeVox token set — surfaces, type,
        spacing, and the cyan accent — so whatever you build is on-brand from the
        first line. Built on <span className="text-ink-1">React</span>,{" "}
        <span className="text-ink-1">shadcn/ui</span>, and{" "}
        <span className="text-ink-1">Tailwind v4</span>.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-ink-3">
        <span className="text-ink-2">{registry.length} components</span>
        <span className="text-ink-4">/</span>
        <span>light + dark</span>
        {STACK.map((s) => (
          <span key={s} className="flex items-center gap-3">
            <span className="text-ink-4">/</span>
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

export function GalleryPage() {
  return (
    <div className="mx-auto max-w-3xl px-10 pb-32">
      <Hero />

      <h2
        id="group-docs"
        className="scroll-mt-6 flex items-center gap-3 pt-20 pb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-ink-3"
      >
        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
        Docs
        <span className="ml-1 h-px flex-1 bg-line" aria-hidden />
      </h2>
      {docs.map((d, i) => (
        <section
          key={d.slug}
          id={d.slug}
          className={cn("scroll-mt-6 py-14", i !== 0 && "border-t border-line")}
        >
          <header className="mb-7">
            <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.02em] text-ink-1">
              {d.name}
            </h2>
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-2">
              {d.blurb}
            </p>
          </header>
          {d.body}
        </section>
      ))}

      {groups.map((group) => (
        <div key={group.name}>
          <h2
            id={groupId(group.name)}
            className="scroll-mt-6 flex items-center gap-3 pt-20 pb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-ink-3"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            {group.name}
            <span className="ml-1 h-px flex-1 bg-line" aria-hidden />
          </h2>
          {group.entries.map((entry, i) => (
            <Section key={entry.slug} entry={entry} divider={i !== 0} />
          ))}
        </div>
      ))}

      {/* Tail spacer: lets the final sections scroll under the spy line so the
          sidebar can mark them active (scroll-spy bottom problem). */}
      <div aria-hidden className="h-[60vh]" />
    </div>
  );
}
