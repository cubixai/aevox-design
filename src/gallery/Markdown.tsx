import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * On-brand markdown renderer — maps each element onto the AeVox token set so a
 * raw .md (e.g. DESIGN.md) renders as a styled doc, not a code dump.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-ink-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="pt-2 font-display text-[26px] font-semibold tracking-[-0.02em] text-ink-1">
              {children}
            </h2>
          ),
          h2: ({ children }) => (
            <h3 className="mt-10 border-t border-line pt-8 font-display text-[20px] font-semibold tracking-[-0.01em] text-ink-1 first:mt-0 first:border-t-0 first:pt-0">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-6 font-mono text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
              {children}
            </h4>
          ),
          p: ({ children }) => <p className="max-w-prose">{children}</p>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-ink-1">{children}</strong>
          ),
          em: ({ children }) => <em className="text-ink-1">{children}</em>,
          ul: ({ children }) => (
            <ul className="ml-1 space-y-1.5 [&>li]:relative [&>li]:pl-5">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="ml-5 list-decimal space-y-1.5 marker:text-ink-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="before:absolute before:left-0 before:text-accent before:content-['▪'] [ol_&]:before:content-none [ol_&]:before:hidden">
              {children}
            </li>
          ),
          code: ({ children, ...props }: ComponentPropsWithoutRef<"code">) => (
            <code
              className="rounded-[5px] bg-surface-3 px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
              {...props}
            >
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="overflow-x-auto rounded-lg border border-line bg-surface-2 p-4 font-mono text-[13px] leading-relaxed text-ink-1 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-ink-1">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-8 border-line" />,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent-line pl-4 text-ink-3">
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border border-line-2 shadow-card">
              <table className="w-full border-collapse text-[13px]">{children}</table>
            </div>
          ),
          thead: ({ children }) => <thead className="bg-surface-3">{children}</thead>,
          tbody: ({ children }) => (
            <tbody className="bg-surface-2 [&>tr:hover]:bg-surface-3/60 [&>tr:nth-child(even)]:bg-surface-3/35">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="border-b border-line px-3 py-2 text-left font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-ink-3">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-line px-3 py-2 align-top text-ink-2 [&_code]:text-[0.9em]">
              {children}
            </td>
          ),
          tr: ({ children }) => <tr className="last:[&>td]:border-b-0">{children}</tr>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

/** Inline element wrapper used by the style-guide swatches. */
export function Swatch({
  hex,
  name,
  use,
  dark,
}: {
  hex: string;
  name: string;
  use: string;
  dark?: string;
}): ReactNode {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-2 p-3">
      <div
        className="size-11 shrink-0 rounded-md border border-line-2"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <div className="min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-ink-1">{name}</span>
          <span className="font-mono text-[11px] uppercase text-ink-3">{hex}</span>
          {dark && (
            <span className="font-mono text-[11px] text-ink-4">dark {dark}</span>
          )}
        </div>
        <div className="text-[12px] text-ink-3">{use}</div>
      </div>
    </div>
  );
}
