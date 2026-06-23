import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { RegistryEntry } from "./types";

function ChipsDemo() {
  const [active, setActive] = useState("all");
  return (
    <div className="flex flex-wrap gap-2">
      {["all", "live", "training", "draft"].map((c) => (
        <Toggle
          key={c}
          size="sm"
          pressed={active === c}
          onPressedChange={() => setActive(c)}
        >
          {c}
        </Toggle>
      ))}
    </div>
  );
}

function SegDemo() {
  const [v, setV] = useState("grid");
  return (
    <ToggleGroup
      type="single"
      value={v}
      onValueChange={(val) => val && setV(val)}
    >
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="board">Board</ToggleGroupItem>
    </ToggleGroup>
  );
}

function ModeDemo() {
  const [v, setV] = useState("test");
  return (
    <ToggleGroup
      type="single"
      value={v}
      onValueChange={(val) => val && setV(val)}
      className="w-72 *:flex-1"
    >
      <ToggleGroupItem value="test">Test</ToggleGroupItem>
      <ToggleGroupItem value="live">Live</ToggleGroupItem>
    </ToggleGroup>
  );
}

export const controls: RegistryEntry[] = [
  {
    slug: "checkbox",
    name: "Checkbox",
    group: "Forms",
    blurb: "Boolean control — checked fills with the accent.",
    importLine: `import { Checkbox } from "@/components/ui/checkbox"`,
    demos: [
      {
        node: (
          <div className="flex items-center gap-3">
            <Checkbox id="cb" defaultChecked />
            <Label htmlFor="cb">Record this call</Label>
          </div>
        ),
        code: `<Checkbox id="cb" defaultChecked />
<Label htmlFor="cb">Record this call</Label>`,
      },
    ],
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    group: "Forms",
    blurb: "Single choice from a small set.",
    importLine: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`,
    demos: [
      {
        node: (
          <RadioGroup defaultValue="warm" className="gap-3">
            {[
              ["warm", "Warm transfer"],
              ["cold", "Cold transfer"],
              ["vm", "Voicemail"],
            ].map(([v, l]) => (
              <div key={v} className="flex items-center gap-3">
                <RadioGroupItem value={v} id={`r-${v}`} />
                <Label htmlFor={`r-${v}`}>{l}</Label>
              </div>
            ))}
          </RadioGroup>
        ),
        code: `<RadioGroup defaultValue="warm">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="warm" id="r-warm" />
    <Label htmlFor="r-warm">Warm transfer</Label>
  </div>
</RadioGroup>`,
      },
    ],
  },
  {
    slug: "slider",
    name: "Slider",
    group: "Forms",
    blurb: "Range control with a cyan track and thumb.",
    importLine: `import { Slider } from "@/components/ui/slider"`,
    demos: [
      {
        node: (
          <div className="w-full max-w-sm">
            <Slider defaultValue={[40]} max={100} step={1} />
          </div>
        ),
        code: `<Slider defaultValue={[40]} max={100} step={1} />`,
      },
    ],
  },
  {
    slug: "toggle",
    name: "Toggle (chip)",
    group: "Forms",
    blurb: "A two-state pill — the AeVox filter chip. Pressed = cyan ghost.",
    importLine: `import { Toggle } from "@/components/ui/toggle"`,
    demos: [
      {
        node: <ChipsDemo />,
        code: `const [active, setActive] = useState("all")
{["all","live","training","draft"].map((c) => (
  <Toggle key={c} size="sm" pressed={active === c}
    onPressedChange={() => setActive(c)}>{c}</Toggle>
))}`,
      },
    ],
  },
  {
    slug: "toggle-group",
    name: "Toggle Group",
    group: "Forms",
    blurb: "Single-select segmented control (AeVox .seg-ctrl) — also the full-width mode switch.",
    importLine: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    demos: [
      {
        title: "Segmented",
        node: <SegDemo />,
        code: `const [v, setV] = useState("grid")
<ToggleGroup type="single" value={v} onValueChange={(val) => val && setV(val)}>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
</ToggleGroup>`,
      },
      {
        title: "Full-width mode switch",
        node: <ModeDemo />,
        code: `<ToggleGroup type="single" value={v} onValueChange={…} className="w-72 *:flex-1">
  <ToggleGroupItem value="test">Test</ToggleGroupItem>
  <ToggleGroupItem value="live">Live</ToggleGroupItem>
</ToggleGroup>`,
      },
    ],
  },
];
