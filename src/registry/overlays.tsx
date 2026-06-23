import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronDown, Phone, Settings, Trash2 } from "lucide-react";
import type { RegistryEntry } from "./types";

export const overlays: RegistryEntry[] = [
  {
    slug: "form",
    name: "Form",
    group: "Forms",
    blurb:
      "Composed example — solid AeVox fields with a cyan focus glow, label, select, and submit.",
    importLine: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, … } from "@/components/ui/select"`,
    demos: [
      {
        node: (
          <form className="grid w-full max-w-sm gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <Label htmlFor="f-name">Agent name</Label>
              <Input id="f-name" placeholder="e.g. Reception · West" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="f-dept">Department</Label>
              <Select defaultValue="west">
                <SelectTrigger id="f-dept">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="west">Reception · West</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="submit">Create agent</Button>
            </div>
          </form>
        ),
        code: `<div className="grid gap-2">
  <Label htmlFor="name">Agent name</Label>
  <Input id="name" placeholder="e.g. Reception · West" />
</div>
<Select defaultValue="west">
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="west">Reception · West</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    group: "Overlays",
    blurb: "Action menu on a solid panel with AeVox elevation.",
    importLine: `import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"`,
    demos: [
      {
        node: (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Reception · West</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Phone className="size-4" /> Test call
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" /> Configure
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuItem>Test call</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
  },
  {
    slug: "popover",
    name: "Popover",
    group: "Overlays",
    blurb: "Floating panel for inline detail and quick edits.",
    importLine: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"`,
    demos: [
      {
        node: (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Edit hours</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="grid gap-3">
                <div className="font-medium text-t1">Business hours</div>
                <div className="grid gap-2">
                  <Label htmlFor="po-open">Opens</Label>
                  <Input id="po-open" defaultValue="08:00" />
                </div>
                <Button size="sm">Save</Button>
              </div>
            </PopoverContent>
          </Popover>
        ),
        code: `<Popover>
  <PopoverTrigger asChild><Button variant="outline">Edit hours</Button></PopoverTrigger>
  <PopoverContent className="w-72">…</PopoverContent>
</Popover>`,
      },
    ],
  },
  {
    slug: "dialog",
    name: "Dialog",
    group: "Overlays",
    blurb: "Modal on a raised surface with a dimmed overlay.",
    importLine: `import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"`,
    demos: [
      {
        node: (
          <Dialog>
            <DialogTrigger asChild>
              <Button>New agent</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create agent</DialogTitle>
                <DialogDescription>
                  Spin up a new voice agent for a department.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <Label htmlFor="d-name">Name</Label>
                <Input id="d-name" placeholder="Reception · West" />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
        code: `<Dialog>
  <DialogTrigger asChild><Button>New agent</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create agent</DialogTitle>
    </DialogHeader>
    …
    <DialogFooter><Button>Create</Button></DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    group: "Overlays",
    blurb: "Terse hover hint for icon controls.",
    importLine: `import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"`,
    demos: [
      {
        node: (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Phone className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start a test call</TooltipContent>
          </Tooltip>
        ),
        code: `<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline" size="icon"><Phone /></Button>
  </TooltipTrigger>
  <TooltipContent>Start a test call</TooltipContent>
</Tooltip>`,
      },
    ],
  },
];
