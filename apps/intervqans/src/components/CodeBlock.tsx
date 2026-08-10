import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

// react-syntax-highlighter defaults codeTagProps.style to the theme's own
// `code[class*="language-"]` entry, which carries a solid background. Since
// <code> renders `display: inline` across multiple lines, that background
// hugs each line individually instead of filling the block — the "highlighted
// line" look. Strip background/backgroundColor from every token in the theme
// (not just the code tag) so no language or token type can ever reintroduce
// it — the block's only background comes from this wrapper's own bg-[#1a1530].
type PrismTheme = Record<string, React.CSSProperties>;

function stripBackgrounds(theme: PrismTheme): PrismTheme {
  const clean: PrismTheme = {};
  for (const [key, value] of Object.entries(theme)) {
    const { background: _background, backgroundColor: _backgroundColor, ...rest } = value;
    clean[key] = rest;
  }
  return clean;
}

const codeTheme = stripBackgrounds(oneDark);

export function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-block-shell group relative my-4 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1530] shadow-[0_20px_60px_-20px_oklch(0.3_0.15_290/0.5)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-xs font-medium uppercase tracking-wider text-white/60">
            {language}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            copy();
          }}
          className="flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70 opacity-100 transition hover:bg-white/10 hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={codeTheme}
        customStyle={{
          margin: 0,
          padding: "1rem 1.25rem",
          background: "transparent",
          fontSize: "0.85rem",
          lineHeight: 1.6,
          overflowX: "auto",
        }}
        codeTagProps={{
          className: `language-${language}`,
          style: {
            ...codeTheme['code[class*="language-"]'],
            display: "block",
            background: "transparent",
          },
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
