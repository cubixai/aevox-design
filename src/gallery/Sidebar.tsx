import { groups, registry } from "@/registry";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "./useScrollSpy";
import { docs } from "./docs";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const ids = [
    "getting-started",
    ...docs.map((d) => d.slug),
    ...registry.map((e) => e.slug),
  ];
  const active = useScrollSpy(ids);

  const linkCls = (id: string) =>
    cn(
      "block rounded-sm px-2 py-1.5 text-[13.5px] transition",
      active === id
        ? "bg-acc-ghost font-medium text-acc"
        : "text-t2 hover:bg-surface-3 hover:text-t1",
    );

  return (
    <nav className="flex flex-col gap-6 px-4 py-6">
      <a
        href="#getting-started"
        onClick={onNavigate}
        className={linkCls("getting-started")}
      >
        Getting started
      </a>

      <div>
        <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-t3">
          Docs
        </div>
        <ul className="space-y-0.5">
          {docs.map((d) => (
            <li key={d.slug}>
              <a
                href={`#${d.slug}`}
                onClick={onNavigate}
                className={linkCls(d.slug)}
              >
                {d.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {groups.map((group) => (
        <div key={group.name}>
          <div className="px-2 pb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-t3">
            {group.name}
          </div>
          <ul className="space-y-0.5">
            {group.entries.map((entry) => (
              <li key={entry.slug}>
                <a
                  href={`#${entry.slug}`}
                  onClick={onNavigate}
                  className={linkCls(entry.slug)}
                >
                  {entry.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
