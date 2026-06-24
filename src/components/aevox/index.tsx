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
import { useEffect, useState } from "react";
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
      <span className="ping" />
      <span className="ping p2" />
      <span className="ping p3" />
      <span className="core" />
    </div>
  );
}

/* ---- Metric stat (optional count-up) -------------------------------------- */

/** Animates 0 → target on mount; respects prefers-reduced-motion. */
function useCountUp(target: number | undefined, decimals: number) {
  const [n, setN] = useState(target ?? 0);
  useEffect(() => {
    if (target == null) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    const ease = (p: number) => 1 - Math.pow(1 - p, 3);
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / 900);
      setN(target * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  if (target == null) return null;
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function Stat({
  label,
  value,
  count,
  decimals = 0,
  unit,
  className,
}: {
  label: ReactNode;
  /** Static value. Ignored when `count` is set. */
  value?: ReactNode;
  /** Numeric target — animates 0 → count on mount. */
  count?: number;
  decimals?: number;
  unit?: ReactNode;
  className?: string;
}) {
  const counted = useCountUp(count, decimals);
  return (
    <div className={cn("stat", className)}>
      <div className="k">{label}</div>
      <div className="v">
        {counted ?? value}
        {unit ? <small> {unit}</small> : null}
      </div>
    </div>
  );
}
