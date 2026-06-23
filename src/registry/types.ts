import type { ReactNode } from "react";

export type Demo = {
  /** Short label shown above the example (e.g. "Variants", "Sizes"). */
  title?: string;
  /** Live rendered example. */
  node: ReactNode;
  /** Idiomatic usage snippet shown in the Code tab. Omit for foundations. */
  code?: string;
};

export type RegistryEntry = {
  /** URL slug, e.g. "button". */
  slug: string;
  /** Display name, e.g. "Button". */
  name: string;
  /** Sidebar group, e.g. "Foundations" | "Primitives" | "AeVox". */
  group: string;
  /** One-line description. */
  blurb: string;
  /** Import line shown at the top of the component page. */
  importLine?: string;
  demos: Demo[];
};

export type RegistryGroup = {
  name: string;
  entries: RegistryEntry[];
};
