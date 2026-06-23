import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import type { RegistryEntry } from "./types";

const AGENTS = [
  { name: "Acme Studio", dept: "Design", calls: 1284, variant: "live" as const, status: "Live" },
  { name: "Marketing Site", dept: "Marketing", calls: 642, variant: "training" as const, status: "Training" },
  { name: "Docs Portal", dept: "Docs", calls: 318, variant: "idle" as const, status: "Draft" },
];

export const dataDisplay: RegistryEntry[] = [
  {
    slug: "table",
    name: "Table",
    group: "Data",
    blurb: "Mono uppercase headers, hairline rows, hover highlight — the AeVox data table.",
    importLine: `import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"`,
    demos: [
      {
        node: (
          <div className="w-full overflow-hidden rounded-lg border border-line-2 bg-surface-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-right">Deploys</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGENTS.map((a) => (
                  <TableRow key={a.name}>
                    <TableCell className="font-medium text-t1">{a.name}</TableCell>
                    <TableCell className="text-t2">{a.dept}</TableCell>
                    <TableCell className="text-right font-mono tabular-nums text-t1">
                      {a.calls.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={a.variant}>{a.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ),
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Project</TableHead>
      <TableHead className="text-right">Deploys</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Acme Studio</TableCell>
      <TableCell className="text-right font-mono tabular-nums">1,284</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
    ],
  },
  {
    slug: "avatar",
    name: "Avatar",
    group: "Data",
    blurb:
      "Photo with an initials fallback — plus AeVox gradient orbs via the fallback tone (a member or workspace avatar).",
    importLine: `import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`,
    demos: [
      {
        title: "Sizes",
        node: (
          <div className="flex items-end gap-4">
            {(["sm", "default", "lg"] as const).map((s) => (
              <Avatar key={s} size={s}>
                <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            ))}
          </div>
        ),
        code: `<Avatar size="sm">…</Avatar>
<Avatar>…</Avatar>           {/* default */}
<Avatar size="lg">…</Avatar>`,
      },
      {
        title: "Photo & initials",
        node: (
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>BK</AvatarFallback>
            </Avatar>
          </div>
        ),
        code: `<Avatar size="lg">
  <AvatarImage src="/me.jpg" alt="" />
  <AvatarFallback>AR</AvatarFallback>
</Avatar>`,
      },
      {
        title: "Gradient orbs (tone)",
        node: (
          <div className="flex items-center gap-4">
            {(["violet", "green", "amber", "gray", "accent"] as const).map(
              (tone, i) => (
                <Avatar key={tone} size="lg">
                  <AvatarFallback tone={tone}>{"ARBKCT"[i * 2]}{"ARBKCT"[i * 2 + 1]}</AvatarFallback>
                </Avatar>
              ),
            )}
          </div>
        ),
        code: `<Avatar size="lg">
  <AvatarFallback tone="violet">AR</AvatarFallback>
</Avatar>`,
      },
    ],
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    group: "Data",
    blurb: "Loading placeholder with a soft shimmer.",
    importLine: `import { Skeleton } from "@/components/ui/skeleton"`,
    demos: [
      {
        node: (
          <div className="flex w-full max-w-sm items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="grid flex-1 gap-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ),
        code: `<Skeleton className="size-10 rounded-full" />
<Skeleton className="h-4 w-2/3" />`,
      },
    ],
  },
  {
    slug: "progress",
    name: "Progress",
    group: "Data",
    blurb: "Determinate bar in the cyan accent.",
    importLine: `import { Progress } from "@/components/ui/progress"`,
    demos: [
      {
        node: (
          <div className="grid w-full max-w-sm gap-3">
            <Progress value={32} />
            <Progress value={68} />
            <Progress value={91} />
          </div>
        ),
        code: `<Progress value={68} />`,
      },
    ],
  },
  {
    slug: "accordion",
    name: "Accordion",
    group: "Data",
    blurb: "Collapsible sections for dense settings.",
    importLine: `import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion"`,
    demos: [
      {
        node: (
          <Accordion type="single" collapsible className="w-full max-w-md">
            <AccordionItem value="a">
              <AccordionTrigger>Appearance</AccordionTrigger>
              <AccordionContent className="text-t2">
                Theme, density, and layout options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Usage</AccordionTrigger>
              <AccordionContent className="text-t2">
                Plan, invoices, and usage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
        code: `<Accordion type="single" collapsible>
  <AccordionItem value="a">
    <AccordionTrigger>Appearance</AccordionTrigger>
    <AccordionContent>…</AccordionContent>
  </AccordionItem>
</Accordion>`,
      },
    ],
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    group: "Navigation",
    blurb: "Location trail for nested screens.",
    importLine: `import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"`,
    demos: [
      {
        node: (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Acme Studio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Configure</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
        code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Configure</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
      },
    ],
  },
];
