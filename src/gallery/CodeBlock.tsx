import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Highlight, type PrismTheme } from "prism-react-renderer";

/* Prism theme wired to AeVox tokens — flips with light/dark automatically. */
const aevoxPrism: PrismTheme = {
  plain: { color: "var(--t1)", backgroundColor: "transparent" },
  styles: [
    {
      types: ["comment", "prolog", "cdata"],
      style: { color: "var(--t3)", fontStyle: "italic" },
    },
    { types: ["punctuation", "operator"], style: { color: "var(--t2)" } },
    {
      types: ["keyword", "module", "control-flow"],
      style: { color: "var(--idle)" },
    },
    {
      types: ["string", "char", "attr-value", "template-string", "inserted"],
      style: { color: "var(--live)" },
    },
    { types: ["tag", "deleted"], style: { color: "var(--acc)" } },
    {
      types: ["class-name", "maybe-class-name", "constant", "symbol"],
      style: { color: "var(--acc)" },
    },
    { types: ["attr-name", "property"], style: { color: "var(--train)" } },
    { types: ["function", "method"], style: { color: "var(--acc-2)" } },
    { types: ["number", "boolean"], style: { color: "var(--pos)" } },
  ],
};

export function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-md border border-line-2 bg-surface-1">
      <button
        type="button"
        onClick={() => {
          navigator.clipboard?.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        }}
        className="absolute right-2 top-2 z-10 inline-flex h-7 items-center gap-1.5 rounded-xs border border-line-2 bg-surface-3 px-2 text-[11px] font-medium text-t2 opacity-0 transition hover:text-t1 group-hover:opacity-100"
      >
        {copied ? (
          <Check className="size-3.5 text-live" />
        ) : (
          <Copy className="size-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
      <Highlight theme={aevoxPrism} code={code.trim()} language={lang}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
