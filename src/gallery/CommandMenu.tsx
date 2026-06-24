import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { groups } from "@/registry";
import { docs } from "./docs";

/** Global ⌘K / Ctrl-K palette — jump to any section. Also opens on the
 *  `aevox:cmdk` window event (dispatched by the Topbar search button). */
export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("aevox:cmdk", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("aevox:cmdk", onOpen);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    // wait for the dialog to unmount, then scroll the section into view
    requestAnimationFrame(() =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a section…" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Start">
          <CommandItem
            value="Getting started"
            onSelect={() => go("getting-started")}
          >
            Getting started
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Docs">
          {docs.map((d) => (
            <CommandItem
              key={d.slug}
              value={`${d.name} docs`}
              onSelect={() => go(d.slug)}
            >
              {d.name}
            </CommandItem>
          ))}
        </CommandGroup>
        {groups.map((g) => (
          <CommandGroup key={g.name} heading={g.name}>
            {g.entries.map((e) => (
              <CommandItem
                key={e.slug}
                value={`${e.name} ${g.name}`}
                onSelect={() => go(e.slug)}
              >
                {e.name}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
