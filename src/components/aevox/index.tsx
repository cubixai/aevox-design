/**
 * AeVox-native primitives — the few parts that have NO shadcn equivalent.
 *
 * Everything else maps onto a themed shadcn primitive:
 *   StatusBadge / Tag → <Badge variant="live|tag|…">
 *   Orb               → <Avatar><AvatarFallback tone="violet"|…>
 *   Chip              → <Toggle>            (pill)
 *   Segmented / Mode  → <ToggleGroup>       (segmented control)
 *   AeToggle          → <Switch>
 *   Kbd               → <Kbd>               (shadcn)
 *
 * What's left below is genuinely AeVox: the sonar pulse, the metric
 * stat pattern, and the inline status dot.
 */
import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

/* ---- Inline status dot ---------------------------------------------------- */

export type DotTone = "live" | "train" | "idle" | "warn" | "off";

export function StatusDot({
  tone = "live",
  className,
  ...rest
}: { tone?: DotTone } & HTMLAttributes<HTMLElement>) {
  return <i className={cn("dot", tone, className)} {...rest} />;
}

/* ---- Sonar — a live / active pulse indicator ---------------------------- */

export function Sonar({
  size = 14,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("sonar", className)} style={{ width: size, height: size }}>
      <span className="ring" />
      <span className="ring" />
      <span className="ring" />
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "var(--acc)",
          boxShadow: "0 0 12px var(--glow)",
        }}
      />
    </div>
  );
}

/* ---- Metric stat ---------------------------------------------------------- */

export function Stat({
  label,
  value,
  unit,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("stat", className)}>
      <div className="k">{label}</div>
      <div className="v">
        {value}
        {unit ? <small> {unit}</small> : null}
      </div>
    </div>
  );
}
