import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Phone, Settings, Users, Search } from "lucide-react";
import type { RegistryEntry } from "./types";

function CommandDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <Search className="size-4" /> Search… <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search agents, settings…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Agents">
            <CommandItem>
              <Phone className="size-4" /> Reception · West
            </CommandItem>
            <CommandItem>
              <Users className="size-4" /> Billing
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              <Search className="size-4" /> Search calls
            </CommandItem>
            <CommandItem>
              <Settings className="size-4" /> Open settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const feedback: RegistryEntry[] = [
  {
    slug: "toast",
    name: "Toast",
    group: "Feedback",
    blurb: "Sonner toasts on the AeVox popover surface — themed to the active theme.",
    importLine: `import { toast } from "sonner"
// <Toaster /> is mounted once at the app root`,
    demos: [
      {
        node: (
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => toast.success("Agent deployed", { description: "Reception · West is live." })}
            >
              Success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("Call failed", { description: "No answer after 30s." })}
            >
              Error
            </Button>
            <Button variant="outline" onClick={() => toast("Saved")}>
              Plain
            </Button>
          </div>
        ),
        code: `import { toast } from "sonner"

toast.success("Agent deployed", {
  description: "Reception · West is live.",
})`,
      },
    ],
  },
  {
    slug: "command",
    name: "Command Palette",
    group: "Feedback",
    blurb: "⌘K-style command menu — the AeVox cmdk surface for fast navigation.",
    importLine: `import {
  Command, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"`,
    demos: [
      {
        node: <CommandDemo />,
        code: `const [open, setOpen] = useState(false)
<Button variant="outline" onClick={() => setOpen(true)}>Search… ⌘K</Button>
<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search agents, settings…" />
  <CommandList>
    <CommandGroup heading="Agents">
      <CommandItem>Reception · West</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`,
      },
    ],
  },
];
