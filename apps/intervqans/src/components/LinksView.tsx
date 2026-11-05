import { useState } from "react";
import { ExternalLink, Link2 } from "lucide-react";
import { handyLinks, type HandyLink } from "@/content/handy-links";
import { SimpleHero } from "@/components/SimpleHero";

const hostOf = (href: string) => new URL(href).hostname;

// "learn.microsoft.com/en-us/training/…" — host plus path, without the scheme.
const shortUrl = (href: string) => {
  const u = new URL(href);
  return `${u.hostname}${u.pathname}`.replace(/\/$/, "");
};

function SiteThumb({ link }: { link: HandyLink }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
      {failed ? (
        <span className="font-display text-2xl font-bold text-neutral-700">
          {link.name.charAt(0)}
        </span>
      ) : (
        <img
          src={`https://www.google.com/s2/favicons?domain=${hostOf(link.href)}&sz=128`}
          alt=""
          className="h-10 w-10 object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

export function LinksView() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-8">
      <SimpleHero icon={Link2} plain="Handy" accent="Links-URLS" />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {handyLinks.map((link, index) => (
          <li
            key={link.href}
            className="animate-pop-in min-w-0"
            style={{ animationDelay: `${index * 55}ms` }}
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex h-full items-center gap-4 overflow-hidden rounded-3xl bg-noir/50 p-5 ring-1 backdrop-blur transition duration-300 hover:-translate-y-1 ${link.cardClass}`}
            >
              <SiteThumb link={link} />
              <span className="min-w-0 flex-1">
                <span
                  className={`block break-words font-display text-xl font-semibold leading-tight ${link.nameClass}`}
                >
                  {link.name}
                </span>
                <span className="mt-1 block break-words text-sm text-foreground/70">
                  {link.topic}
                </span>
                <span className="mt-2 block truncate font-mono text-[11px] text-foreground/45 transition group-hover:text-foreground/75">
                  {shortUrl(link.href)}
                </span>
              </span>
              <ExternalLink
                aria-hidden
                className="h-4 w-4 shrink-0 self-start text-foreground/35 transition group-hover:text-foreground/80"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
