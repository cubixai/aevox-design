import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Copy `text` to the clipboard + flash a "copied" state for ~1.1s. */
export function useCopied() {
  const [copied, setCopied] = useState(false);
  return {
    copied,
    copy: (text: string) => {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    },
  };
}

/** Standalone icon copy button (hex swatches, code blocks). */
export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        copy(value);
      }}
      aria-label={`Copy ${value}`}
      title="Copy"
      className={cn(
        "inline-flex items-center text-ink-3 transition-colors hover:text-accent",
        className,
      )}
    >
      {copied ? (
        <Check className="size-3.5 text-live" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}

/** Click-to-copy inline code (tokens, classes, hex in prose + tables). */
export function CopyCode({ children }: { children: ReactNode }) {
  const { copied, copy } = useCopied();
  return (
    <button
      type="button"
      onClick={() => copy(String(children))}
      title="Click to copy"
      className={cn(
        "cursor-pointer rounded-[5px] bg-surface-3 px-1.5 py-0.5 align-baseline font-mono text-[0.85em] transition-colors hover:bg-surface-4",
        copied ? "text-live" : "text-accent",
      )}
    >
      {children}
      {copied && <Check className="ml-1 inline size-3 -translate-y-px" />}
    </button>
  );
}
