import { foundations } from "./foundations";
import { components } from "./components";
import { overlays } from "./overlays";
import { controls } from "./controls";
import { dataDisplay } from "./data-display";
import { feedback } from "./feedback";
import type { RegistryEntry, RegistryGroup } from "./types";

export const registry: RegistryEntry[] = [
  ...foundations,
  ...components,
  ...overlays,
  ...controls,
  ...dataDisplay,
  ...feedback,
];

const GROUP_ORDER = [
  "Foundations",
  "Primitives",
  "Forms",
  "Data",
  "Navigation",
  "Overlays",
  "Feedback",
  "AeVox",
];

export const groups: RegistryGroup[] = GROUP_ORDER.map((name) => ({
  name,
  entries: registry.filter((e) => e.group === name),
})).filter((g) => g.entries.length > 0);

export function getEntry(slug: string): RegistryEntry | undefined {
  return registry.find((e) => e.slug === slug);
}

export const firstSlug = registry[0]?.slug ?? "colors";

export type { RegistryEntry, RegistryGroup, Demo } from "./types";
