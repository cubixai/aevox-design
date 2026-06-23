import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Kbd } from "@/components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sonar, Stat, StatusDot } from "@/components/aevox";
import { ArrowRight, Phone, Plus, Settings, Trash2 } from "lucide-react";
import type { RegistryEntry } from "./types";

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return <Switch checked={on} onCheckedChange={setOn} />;
}

export const components: RegistryEntry[] = [
  {
    slug: "button",
    name: "Button",
    group: "Primitives",
    blurb: "Primary uses the cyan accent; every variant themed to AeVox.",
    importLine: `import { Button } from "@/components/ui/button"`,
    demos: [
      {
        title: "Variants",
        node: (
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        ),
        code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
      },
      {
        title: "Sizes",
        node: (
          <div className="flex flex-wrap items-end gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
        code: `<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`,
      },
      {
        title: "With icons",
        node: (
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              <Plus /> New agent
            </Button>
            <Button variant="secondary">
              <Phone /> Test call
            </Button>
            <Button variant="link">
              View all <ArrowRight />
            </Button>
          </div>
        ),
        code: `<Button><Plus /> New agent</Button>
<Button variant="secondary"><Phone /> Test call</Button>
<Button variant="link">View all <ArrowRight /></Button>`,
      },
      {
        title: "Icon only",
        node: (
          <div className="flex flex-wrap items-center gap-3">
            <Button size="icon" aria-label="Call">
              <Phone />
            </Button>
            <Button size="icon" variant="secondary" aria-label="Settings">
              <Settings />
            </Button>
            <Button size="icon" variant="outline" aria-label="Delete">
              <Trash2 />
            </Button>
            <Button size="icon-sm" variant="secondary" aria-label="Add">
              <Plus />
            </Button>
          </div>
        ),
        code: `<Button size="icon"><Phone /></Button>
<Button size="icon" variant="outline"><Trash2 /></Button>`,
      },
      {
        title: "Disabled",
        node: (
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Primary</Button>
            <Button variant="secondary" disabled>
              Secondary
            </Button>
            <Button variant="outline" disabled>
              Outline
            </Button>
          </div>
        ),
        code: `<Button disabled>Primary</Button>`,
      },
    ],
  },
  {
    slug: "badge",
    name: "Badge",
    group: "Primitives",
    blurb:
      "One Badge, every label: shadcn variants plus AeVox status tones (mono uppercase) and metadata tags.",
    importLine: `import { Badge } from "@/components/ui/badge"`,
    demos: [
      {
        title: "Variants",
        node: (
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        ),
        code: `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`,
      },
      {
        title: "Status tones",
        node: (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="live">Live</Badge>
            <Badge variant="training">Training</Badge>
            <Badge variant="idle">Draft</Badge>
            <Badge variant="warn">Failed</Badge>
            <Badge variant="accent">New</Badge>
            <Badge variant="neutral">Paused</Badge>
          </div>
        ),
        code: `<Badge variant="live">Live</Badge>
<Badge variant="training">Training</Badge>
<Badge variant="warn">Failed</Badge>
<Badge variant="accent">New</Badge>`,
      },
      {
        title: "Tags & inline status dot",
        node: (
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="tag">inbound</Badge>
            <Badge variant="tag">en-US</Badge>
            <span className="flex items-center gap-2 text-[14px] text-t2">
              <StatusDot tone="live" /> Reception · West
            </span>
          </div>
        ),
        code: `<Badge variant="tag">inbound</Badge>
<StatusDot tone="live" /> Reception · West`,
      },
    ],
  },
  {
    slug: "card",
    name: "Card",
    group: "Primitives",
    blurb: "Elevated panel — the primary content container.",
    importLine: `import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"`,
    demos: [
      {
        node: (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Reception · West</CardTitle>
              <CardDescription>Live · 3 active calls</CardDescription>
            </CardHeader>
            <CardContent className="text-[14px] text-t2">
              Handling inbound for the western region. Avg. handle time 12.4s.
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Open</Button>
              <Button size="sm" variant="ghost">
                Pause
              </Button>
            </CardFooter>
          </Card>
        ),
        code: `<Card>
  <CardHeader>
    <CardTitle>Reception · West</CardTitle>
    <CardDescription>Live · 3 active calls</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><Button size="sm">Open</Button></CardFooter>
</Card>`,
      },
    ],
  },
  {
    slug: "separator",
    name: "Separator",
    group: "Primitives",
    blurb: "Hairline divider using the AeVox border token.",
    importLine: `import { Separator } from "@/components/ui/separator"`,
    demos: [
      {
        node: (
          <div className="w-full max-w-xs text-[14px] text-t2">
            <div className="pb-2">Profile</div>
            <Separator />
            <div className="py-2">Notifications</div>
            <Separator />
            <div className="pt-2">Security</div>
          </div>
        ),
        code: `<Separator />`,
      },
    ],
  },
  {
    slug: "kbd",
    name: "Kbd",
    group: "Primitives",
    blurb: "Mono keyboard hint for command surfaces.",
    importLine: `import { Kbd } from "@/components/ui/kbd"`,
    demos: [
      {
        node: (
          <div className="flex items-center gap-2 text-[14px] text-t2">
            Open command bar <Kbd>⌘</Kbd> <Kbd>K</Kbd>
          </div>
        ),
        code: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`,
      },
    ],
  },

  /* ---- Forms ------------------------------------------------------------- */
  {
    slug: "input",
    name: "Input & Label",
    group: "Forms",
    blurb: "Solid field on --bg-1 with a cyan focus glow — the AeVox form language.",
    importLine: `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"`,
    demos: [
      {
        node: (
          <div className="grid w-full max-w-sm gap-2">
            <Label htmlFor="agent">Agent name</Label>
            <Input id="agent" placeholder="e.g. Reception · West" />
          </div>
        ),
        code: `<Label htmlFor="agent">Agent name</Label>
<Input id="agent" placeholder="e.g. Reception · West" />`,
      },
    ],
  },
  {
    slug: "textarea",
    name: "Textarea",
    group: "Forms",
    blurb: "Multi-line field for prompts and notes.",
    importLine: `import { Textarea } from "@/components/ui/textarea"`,
    demos: [
      {
        node: <Textarea className="max-w-sm" placeholder="System prompt…" rows={4} />,
        code: `<Textarea placeholder="System prompt…" rows={4} />`,
      },
    ],
  },
  {
    slug: "select",
    name: "Select",
    group: "Forms",
    blurb: "Radix Select on the AeVox popover surface with mono group labels.",
    importLine: `import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"`,
    demos: [
      {
        node: (
          <Select defaultValue="west">
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="west">Reception · West</SelectItem>
              <SelectItem value="billing">Billing</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        ),
        code: `<Select defaultValue="west">
  <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="west">Reception · West</SelectItem>
  </SelectContent>
</Select>`,
      },
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    group: "Forms",
    blurb: "Boolean toggle — checked fills with the accent. (Replaces the old AeVox toggle.)",
    importLine: `import { Switch } from "@/components/ui/switch"`,
    demos: [
      {
        node: (
          <div className="flex items-center gap-3">
            <SwitchDemo />
            <Label>Record calls</Label>
          </div>
        ),
        code: `const [on, setOn] = useState(true)
<Switch checked={on} onCheckedChange={setOn} />`,
      },
    ],
  },
  {
    slug: "tabs",
    name: "Tabs",
    group: "Navigation",
    blurb: "Segmented panel navigation — active tab is a raised AeVox surface.",
    importLine: `import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"`,
    demos: [
      {
        node: (
          <Tabs defaultValue="overview" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="calls">Calls</TabsTrigger>
              <TabsTrigger value="config">Config</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-3 text-[14px] text-t2">
              Live performance for the selected agent.
            </TabsContent>
            <TabsContent value="calls" className="pt-3 text-[14px] text-t2">
              Recent call log and transcripts.
            </TabsContent>
            <TabsContent value="config" className="pt-3 text-[14px] text-t2">
              Voice, prompts, and routing.
            </TabsContent>
          </Tabs>
        ),
        code: `<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="calls">Calls</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`,
      },
    ],
  },

  /* ---- AeVox-native (no shadcn equivalent) ------------------------------- */
  {
    slug: "sonar",
    name: "Sonar",
    group: "AeVox",
    blurb: "The voice motif — concentric rings signalling active listening. The AeVox signature.",
    importLine: `import { Sonar } from "@/components/aevox"`,
    demos: [
      {
        node: (
          <div className="flex items-center gap-10 py-6 pl-6">
            <Sonar size={12} />
            <Sonar size={18} />
          </div>
        ),
        code: `<Sonar size={18} />`,
      },
    ],
  },
  {
    slug: "stat",
    name: "Stat",
    group: "AeVox",
    blurb: "Headline metric — mono numerals with a labelled key.",
    importLine: `import { Stat } from "@/components/aevox"`,
    demos: [
      {
        node: (
          <div className="flex flex-wrap gap-12">
            <Stat label="Calls today" value="1,284" />
            <Stat label="Containment" value="98.6" unit="%" />
            <Stat label="Avg. handle" value="12.4" unit="s" />
          </div>
        ),
        code: `<Stat label="Calls today" value="1,284" />
<Stat label="Containment" value="98.6" unit="%" />`,
      },
    ],
  },
];
