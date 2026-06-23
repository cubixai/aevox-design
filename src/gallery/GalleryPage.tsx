import { cn } from "@/lib/utils";
import { groups, registry } from "@/registry";
import { Section } from "./Section";
import { docs } from "./docs";

function groupId(name: string) {
  return "group-" + name.toLowerCase().replace(/\s+/g, "-");
}

const STACK = ["React", "shadcn/ui", "Tailwind v4"];
// Static voice waveform — a drawn signal, not a second motion source.
const WAVE = [
  18, 30, 22, 46, 64, 40, 72, 52, 88, 60, 100, 70, 84, 48, 66, 34, 52, 26, 38,
  20, 30, 16, 24, 14, 20, 12, 16, 10,
];

function Hero() {
  return (
    <section id="getting-started" className="scroll-mt-6 pb-8 pt-16">
      {/* Signature: the sonar "ping" — voice agents listen. */}
      <div className="ae-hero-sonar" aria-hidden>
        <span className="ring base b2" />
        <span className="ring base b1" />
        <span className="ring ping" />
        <span className="ring ping p2" />
        <span className="ring ping p3" />
        <span className="core" />
      </div>

      <div className="mt-10 font-mono text-[12px] font-semibold uppercase tracking-[0.22em] text-acc">
        AeVox Voice · Design System
      </div>
      <h1 className="mt-3 max-w-2xl font-display text-[clamp(2.6rem,6vw,4.25rem)] font-semibold leading-[1.0] tracking-[-0.025em] text-t1">
        Design language for voice agents.
      </h1>
      <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-t2">
        Every shadcn primitive, retuned to the AeVox token set — surfaces, type,
        spacing, and the cyan accent — so a new screen matches the platform the
        moment you drop it in. Built on <span className="text-t1">React</span>,{" "}
        <span className="text-t1">shadcn/ui</span>, and{" "}
        <span className="text-t1">Tailwind v4</span>.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-t3">
        <span className="text-t2">{registry.length} components</span>
        <span className="text-t4">/</span>
        <span>light + dark</span>
        {STACK.map((s) => (
          <span key={s} className="flex items-center gap-3">
            <span className="text-t4">/</span>
            {s}
          </span>
        ))}
      </div>

      {/* Voice signal — doubles as the divider into the catalog. */}
      <div
        className="mt-12 flex h-12 items-center gap-[3px] opacity-60"
        aria-hidden
      >
        {WAVE.concat([...WAVE].reverse()).map((h, i) => (
          <span
            key={i}
            className="w-[3px] flex-1 rounded-full bg-acc"
            style={{ height: `${h}%`, opacity: 0.25 + (h / 100) * 0.5 }}
          />
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
        className="scroll-mt-6 flex items-center gap-3 pt-20 pb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-t3"
      >
        <span className="size-1.5 rounded-full bg-acc" aria-hidden />
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
            <h2 className="font-display text-[30px] font-semibold leading-tight tracking-[-0.02em] text-t1">
              {d.name}
            </h2>
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-t2">
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
            className="scroll-mt-6 flex items-center gap-3 pt-20 pb-2 font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-t3"
          >
            <span className="size-1.5 rounded-full bg-acc" aria-hidden />
            {group.name}
            <span className="ml-1 h-px flex-1 bg-line" aria-hidden />
          </h2>
          {group.entries.map((entry, i) => (
            <Section key={entry.slug} entry={entry} divider={i !== 0} />
          ))}
        </div>
      ))}
    </div>
  );
}
