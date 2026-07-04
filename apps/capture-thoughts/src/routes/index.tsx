import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useVaultItems, useBlobUrl } from "@/hooks/use-vault";
import { Image as ImageIcon, FileText, Mic, Film, Plus, Sparkles, Play, ArrowRight, Star } from "lucide-react";
import heroCreator from "@/assets/hero-creator.jpg";
import type { VaultItem } from "@/lib/vault-storage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyCapture — Capture everything that inspires you" },
      { name: "description", content: "Save screenshots, ideas, voice thoughts, and videos before they disappear. Your personal inspiration hub." },
      { property: "og:title", content: "MyCapture — Your personal inspiration hub" },
      { property: "og:description", content: "Save screenshots, ideas, voice thoughts, and videos before they disappear." },
    ],
  }),
  component: Home,
});

function Home() {
  const all = useVaultItems();
  const recent = all.slice(0, 8);
  const counts = {
    pic: all.filter((i) => i.kind === "pic").length,
    text: all.filter((i) => i.kind === "text").length,
    voice: all.filter((i) => i.kind === "voice").length,
    video: all.filter((i) => i.kind === "video").length,
    total: all.length,
  };

  return (
    <AppShell>
      {/* HERO */}
      <section className="relative mt-2 grid items-center gap-6 sm:mt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Decorative floating bits */}
        <span className="pointer-events-none absolute -left-2 top-10 hidden h-10 w-10 rotate-12 rounded-2xl bg-[var(--lilac)] opacity-70 shadow-[var(--shadow-soft)] sm:block animate-float-soft" style={{ ['--r' as never]: '12deg' } as React.CSSProperties} />
        <span className="pointer-events-none absolute right-1/3 -top-2 hidden h-6 w-6 -rotate-6 rounded-full bg-[var(--mint)] opacity-80 shadow-[var(--shadow-soft)] sm:block animate-float-soft" />

        <div className="relative animate-fade-up">
          <span className="card-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-foreground/70">
            <Sparkles className="h-3.5 w-3.5 text-accent-warm" /> Your space. Your stuff.
          </span>
          <h1 className="mt-5 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
            Capture everything <br className="hidden sm:block" />
            that <span className="text-accent-warm italic">inspires</span> you.
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/65 sm:text-lg">
            Save screenshots, ideas, voice thoughts, and videos before they disappear. Your moments. All in one place.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/pics"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3.5 text-sm font-semibold text-[var(--primary-foreground)] shadow-[var(--shadow-pop)] transition hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" /> Quick Capture
            </Link>
            <a
              href="#recent"
              className="card-soft inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4 text-accent-warm" /> Explore Recent
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm">
            <Stat n={counts.total} label="Items Saved" emoji="🗂️" />
            <Stat n={counts.text} label="Notes" emoji="📝" />
            <Stat n={counts.voice} label="Voice Memos" emoji="🎤" />
            <Stat n={counts.video} label="Videos" emoji="🎬" />
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
          <div className="card-pop relative overflow-hidden rounded-[2rem] bg-[var(--peach)]">
            <img
              src={heroCreator}
              alt="A warm cozy creator desk with camera, notebook, headphones and coffee"
              width={1600}
              height={1100}
              className="h-full max-h-[520px] w-full object-cover"
            />
          </div>
          {/* Floating chip */}
          <div className="card-pop absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium sm:flex">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--mint)]">✨</span>
            <span>New idea saved</span>
          </div>
          <div className="card-pop absolute -right-3 top-6 hidden rotate-3 items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium sm:flex">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--blush)]">📸</span>
            <span>2 screenshots</span>
          </div>
        </div>
      </section>

      {/* QUICK CAPTURE CARDS */}
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Quick capture anything <span className="text-accent-warm">✨</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <CategoryCard
            to="/pics"
            title="Images"
            sub="Upload, paste, or snap"
            color="var(--peach)"
            emoji="📸"
            count={counts.pic}
            preview={<ImagesPreview />}
          />
          <CategoryCard
            to="/text"
            title="Notes"
            sub="Write down your thoughts"
            color="var(--mint)"
            emoji="📝"
            count={counts.text}
            preview={<NotesPreview />}
          />
          <CategoryCard
            to="/voice"
            title="Voice"
            sub="Record or upload audio"
            color="var(--lilac)"
            emoji="🎤"
            count={counts.voice}
            preview={<VoicePreview />}
          />
          <CategoryCard
            to="/videos"
            title="Videos"
            sub="Upload, link, or record"
            color="var(--blush)"
            emoji="🎬"
            count={counts.video}
            preview={<VideosPreview />}
          />
        </div>
      </section>

      {/* RECENT */}
      <section id="recent" className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold sm:text-3xl">Recent captures</h2>
          <Link to="/pics" className="card-soft inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="card-soft rounded-3xl p-10 text-center">
            <p className="text-3xl">🌱</p>
            <p className="mt-3 text-foreground/70">Your inspiration hub is empty. Capture your first thing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {recent.map((item) => (
              <RecentTile key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* QUOTE BAND */}
      <section className="mt-16">
        <div className="card-pop relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--peach)] via-[var(--butter)] to-[var(--blush)] p-8 sm:p-12">
          <div className="relative max-w-2xl">
            <p className="text-sm font-semibold text-accent-warm">⚡ Daily reminder</p>
            <p className="mt-3 text-3xl leading-tight sm:text-4xl">
              "Ideas are easy. <em className="text-foreground/70">Execution is everything.</em>"
            </p>
            <p className="mt-4 text-sm text-foreground/60">Catch them before they slip away.</p>
          </div>
          <div className="pointer-events-none absolute -right-6 -bottom-6 hidden gap-2 sm:flex">
            <div className="h-28 w-24 rotate-6 rounded-xl bg-white p-1.5 shadow-[var(--shadow-pop)]">
              <div className="h-full w-full rounded-md bg-gradient-to-br from-[var(--lilac)] to-[var(--blush)]" />
            </div>
            <div className="h-28 w-24 -rotate-3 rounded-xl bg-white p-1.5 shadow-[var(--shadow-pop)]">
              <div className="h-full w-full rounded-md bg-gradient-to-br from-[var(--mint)] to-[var(--peach)]" />
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function Stat({ n, label, emoji }: { n: number; label: string; emoji: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--secondary)] text-base">{emoji}</span>
      <div className="leading-tight">
        <div className="text-base font-bold">{n}</div>
        <div className="text-[11px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function CategoryCard({
  to,
  title,
  sub,
  color,
  emoji,
  count,
  preview,
}: {
  to: string;
  title: string;
  sub: string;
  color: string;
  emoji: string;
  count: number;
  preview: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group card-soft relative flex flex-col overflow-hidden rounded-[1.75rem] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
      style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${color} 60%, white) 0%, white 70%)` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-foreground/60">
          {count}
        </span>
      </div>
      <p className="mt-1 text-xs text-foreground/60">{sub}</p>

      <div className="relative mt-4 min-h-[120px] flex-1">{preview}</div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground">Open</span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-[var(--primary-foreground)] shadow-[var(--shadow-soft)] transition group-hover:scale-110">
          <Plus className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

/* Preview illustrations (CSS only, friendly) */
function ImagesPreview() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div className="aspect-square rounded-lg bg-gradient-to-br from-[#a7c7e7] to-[#5b8db8]" />
      <div className="aspect-square rounded-lg bg-gradient-to-br from-[#f6c6a5] to-[#d98c5f]" />
      <div className="aspect-square rounded-lg bg-gradient-to-br from-[#cfe7c1] to-[#7ea968]" />
      <div className="col-span-2 aspect-[2/1] rounded-lg bg-gradient-to-br from-[#e8b8d1] to-[#b27093]" />
      <div className="aspect-square rounded-lg bg-gradient-to-br from-[#f3d77a] to-[#c89a3a]" />
    </div>
  );
}

function NotesPreview() {
  return (
    <div className="rounded-xl bg-white p-3 shadow-[var(--shadow-soft)]">
      <div className="mb-2 text-xs font-bold">Today's Game Plan</div>
      {["Wake up early", "Workout", "Deep work", "Build something"].map((t) => (
        <div key={t} className="flex items-center gap-2 py-0.5 text-[11px] text-foreground/70">
          <span className="grid h-3 w-3 place-items-center rounded-sm border border-foreground/30" />
          {t}
        </div>
      ))}
    </div>
  );
}

function VoicePreview() {
  return (
    <div className="flex h-full items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-[var(--shadow-soft)]">
      <div className="flex h-10 flex-1 items-center gap-[3px]">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="block w-[3px] origin-center rounded-full bg-[var(--ink)]/70 animate-wave"
            style={{
              height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
              animationDelay: `${i * 60}ms`,
            }}
          />
        ))}
      </div>
      <span className="text-[10px] font-semibold text-foreground/60">00:45</span>
    </div>
  );
}

function VideosPreview() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      <div className="relative col-span-1 aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br from-[#1e4c6b] to-[#0d2a3f]">
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/95 text-foreground">
            <Play className="h-3.5 w-3.5 fill-current" />
          </span>
        </div>
      </div>
      <div className="grid grid-rows-2 gap-1.5">
        <div className="rounded-lg bg-gradient-to-br from-[#c2a583] to-[#7d6249]" />
        <div className="rounded-lg bg-gradient-to-br from-[#9ab6cf] to-[#536b83]" />
      </div>
    </div>
  );
}

function RecentTile({ item }: { item: VaultItem }) {
  const url = useBlobUrl(item.blobKey);
  const route =
    item.kind === "pic" ? "/pics" : item.kind === "text" ? "/text" : item.kind === "voice" ? "/voice" : "/videos";
  const KindIcon = item.kind === "pic" ? ImageIcon : item.kind === "text" ? FileText : item.kind === "voice" ? Mic : Film;
  const kindLabel = item.kind === "pic" ? "Image" : item.kind === "text" ? "Note" : item.kind === "voice" ? "Voice" : "Video";

  return (
    <Link
      to={route}
      className="group card-soft relative block aspect-[4/5] overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
    >
      {item.kind === "pic" && url && (
        <img src={url} alt={item.title ?? ""} className="h-full w-full object-cover transition group-hover:scale-105" />
      )}
      {item.kind === "video" && url && (
        <>
          <video src={url} className="h-full w-full object-cover" muted playsInline />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-foreground">
              <Play className="h-4 w-4 fill-current" />
            </span>
          </span>
        </>
      )}
      {item.kind === "text" && (
        <div className="flex h-full flex-col justify-between bg-[var(--ink)] p-3 text-[var(--primary-foreground)]">
          <p className="line-clamp-6 text-xs font-medium leading-snug">{item.text}</p>
        </div>
      )}
      {item.kind === "voice" && (
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--butter)] to-[var(--peach)] p-3">
          <div className="flex h-12 items-center gap-[3px]">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="block w-[3px] rounded-full bg-[var(--ink)]/70 animate-wave"
                style={{
                  height: `${20 + Math.abs(Math.sin(i * 0.9)) * 80}%`,
                  animationDelay: `${i * 70}ms`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="absolute left-2 bottom-2 flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-[10px] font-semibold text-foreground shadow-[var(--shadow-soft)]">
        <KindIcon className="h-3 w-3" /> {kindLabel}
      </div>
      {item.favorite && (
        <Star className="absolute right-2 top-2 h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
      )}
    </Link>
  );
}
