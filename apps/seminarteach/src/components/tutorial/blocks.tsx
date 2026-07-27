import { Copy, Check, Quote, Info, Lightbulb, AlertTriangle } from "lucide-react";
import { useState } from "react";
import type { Block } from "@/lib/tutorial-data";
import { cn } from "@/lib/utils";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h1":
      return (
        <div>
          {block.eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary shadow-sm ring-1 ring-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
              {block.eyebrow}
            </div>
          )}
          <h1 className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-foreground md:text-6xl">
            <span className="text-gradient">{block.text}</span>
          </h1>
        </div>
      );
    case "h2":
      return (
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-[17px] leading-[1.75] text-foreground/80 md:text-lg">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote className="glass relative rounded-3xl p-6 pl-14 shadow-glass">
          <Quote className="absolute left-5 top-5 h-6 w-6 text-primary/60" />
          <p className="font-display text-xl italic text-foreground">"{block.text}"</p>
          {block.cite && (
            <cite className="mt-2 block text-sm not-italic text-muted-foreground">— {block.cite}</cite>
          )}
        </blockquote>
      );
    case "divider":
      return (
        <div className="flex items-center justify-center py-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </div>
      );
    case "callout":
      return <Callout {...block} />;
    case "image":
      return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />;
    case "gif":
      return (
        <ImageBlock
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          motion={block.motion ?? "kenburns"}
        />
      );
    case "code":
      return <CodeBlock lang={block.lang} code={block.code} filename={block.filename} />;
  }
}

function Callout({
  title,
  text,
  tone = "info",
}: {
  title: string;
  text: string;
  tone?: "info" | "tip" | "warn";
}) {
  const conf = {
    info: { Icon: Info, ring: "ring-primary/30", bg: "from-primary/10 to-primary/5", ic: "text-primary" },
    tip: { Icon: Lightbulb, ring: "ring-accent/40", bg: "from-accent/20 to-peach/10", ic: "text-accent-foreground" },
    warn: { Icon: AlertTriangle, ring: "ring-destructive/30", bg: "from-destructive/10 to-destructive/5", ic: "text-destructive" },
  }[tone];
  const { Icon } = conf;
  return (
    <div
      className={cn(
        "glass relative flex gap-4 rounded-3xl bg-gradient-to-br p-5 ring-1",
        conf.bg,
        conf.ring,
      )}
    >
      <div className={cn("mt-0.5 shrink-0 rounded-xl bg-white/70 p-2", conf.ic)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-display text-lg font-semibold text-foreground">{title}</div>
        <p className="mt-1 text-sm leading-relaxed text-foreground/80">{text}</p>
      </div>
    </div>
  );
}

function ImageBlock({
  src,
  alt,
  caption,
  motion,
}: {
  src: string;
  alt: string;
  caption?: string;
  motion?: "kenburns" | "drift";
}) {
  return (
    <figure className="group relative">
      <div className="relative overflow-hidden rounded-3xl shadow-glass ring-1 ring-white/70">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "h-auto w-full",
            motion === "kenburns" && "animate-ken-burns",
            motion === "drift" && "animate-drift",
          )}
        />
        {motion && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live
            </div>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CodeBlock({ lang, code, filename }: { lang: string; code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-[oklch(0.22_0.04_300)] shadow-glass ring-1 ring-white/10">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd66b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6bff9d]" />
          <span className="ml-3 font-mono text-xs text-white/60">
            {filename ?? lang}
          </span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/70 transition hover:bg-white/20 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-white/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
