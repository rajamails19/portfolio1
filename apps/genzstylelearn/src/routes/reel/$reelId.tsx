import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  VolumeX,
  Music2,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { reels } from "@/lib/reels";

export const Route = createFileRoute("/reel/$reelId")({
  head: ({ params }) => {
    const reel = reels[params.reelId];
    return {
      meta: [{ title: reel ? `${reel.title} · Lumen` : "Reel · Lumen" }],
    };
  },
  component: ReelPage,
});

function ReelPage() {
  const { reelId } = Route.useParams();
  const reel = reels[reelId];

  if (!reel) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-4xl mb-4">📭</p>
          <p className="font-bold text-xl mb-2">Reel not found</p>
          <Link to="/" className="text-sm underline opacity-60">
            Back to feed
          </Link>
        </div>
      </div>
    );
  }

  return <ReelPlayer reel={reel} />;
}

function ReelPlayer({ reel }: { reel: (typeof reels)[string] }) {
  const frames = reel.frames;
  const [frameIdx, setFrameIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  // key trick: bump to restart CSS animation on frame change
  const [animKey, setAnimKey] = useState(0);

  const frame = frames[frameIdx];

  // Auto-advance timer
  useEffect(() => {
    if (paused || ended) return;
    const ms = frame.duration * 1000;
    const id = setTimeout(() => {
      if (frameIdx < frames.length - 1) {
        setFrameIdx((i) => i + 1);
        setAnimKey((k) => k + 1);
      } else {
        setEnded(true);
      }
    }, ms);
    return () => clearTimeout(id);
  }, [frameIdx, paused, ended, frame.duration, frames.length]);

  function goNext() {
    if (frameIdx < frames.length - 1) {
      setFrameIdx((i) => i + 1);
      setAnimKey((k) => k + 1);
      setEnded(false);
    } else {
      setEnded(true);
    }
  }

  function goPrev() {
    if (frameIdx > 0) {
      setFrameIdx((i) => i - 1);
      setAnimKey((k) => k + 1);
      setEnded(false);
    }
  }

  function restart() {
    setFrameIdx(0);
    setAnimKey((k) => k + 1);
    setEnded(false);
    setPaused(false);
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden select-none">
      {/* Frame background */}
      <div
        key={frameIdx}
        className={`absolute inset-0 bg-gradient-to-b ${frame.bg} transition-opacity duration-300`}
      />

      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 px-3 pt-3">
        {frames.map((f, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
            {i < frameIdx ? (
              <div className="h-full w-full bg-white" />
            ) : i === frameIdx && !ended ? (
              <div
                key={animKey}
                className="h-full bg-white animate-progress-fill"
                style={{
                  animationDuration: `${f.duration}s`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            ) : i === frameIdx && ended ? (
              <div className="h-full w-full bg-white" />
            ) : (
              <div className="h-full w-0 bg-white" />
            )}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-5 left-0 right-0 z-30 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 text-white/90 hover:text-white transition">
          <ArrowLeft className="size-5" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-white/20 grid place-items-center">
            <span className="text-white text-xs font-bold">
              {reel.author.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <span className="text-white text-sm font-semibold">{reel.author}</span>
          <span className="text-white/40 text-xs">#{reel.tag}</span>
        </div>
        <button className="text-white/70 hover:text-white transition">
          <VolumeX className="size-5" />
        </button>
      </div>

      {/* Tap zones: left = prev, right = next, center = pause */}
      <div className="absolute inset-0 z-10 flex">
        <button className="w-1/3 h-full" onClick={goPrev} aria-label="Previous" />
        <button
          className="w-1/3 h-full flex items-center justify-center"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused && (
            <div className="size-16 rounded-full bg-black/40 grid place-items-center backdrop-blur">
              <Play className="size-7 text-white fill-white" />
            </div>
          )}
        </button>
        <button className="w-1/3 h-full" onClick={goNext} aria-label="Next" />
      </div>

      {/* Frame content */}
      {!ended ? (
        <div
          key={`content-${frameIdx}`}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center pointer-events-none animate-fade-up"
        >
          <p className="text-7xl sm:text-8xl mb-6 drop-shadow-2xl">{frame.emoji}</p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-2xl whitespace-pre-line">
            {frame.headline}
          </h1>
          {frame.code && (
            <div className="mt-5 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur border border-white/20">
              <p className="font-mono text-white text-lg sm:text-xl font-black tracking-tight">
                {frame.code}
              </p>
            </div>
          )}
          <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed whitespace-pre-line max-w-xs">
            {frame.sub}
          </p>
          {/* frame counter */}
          <p className="mt-8 text-white/30 text-xs font-bold tracking-widest uppercase">
            {frameIdx + 1} / {frames.length}
          </p>
        </div>
      ) : (
        /* End card */
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center animate-fade-up">
          <p className="text-6xl mb-4">🎉</p>
          <h2 className="text-2xl font-black text-white mb-2">That's the drop.</h2>
          <p className="text-white/60 text-sm mb-8 max-w-xs">{reel.title}</p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={restart}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition"
            >
              <RotateCcw className="size-4" /> Watch again
            </button>
            {reel.articleId && (
              <Link
                to="/post/$postId"
                params={{ postId: reel.articleId }}
                target="_blank"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:opacity-90 transition"
              >
                <BookOpen className="size-4" /> Read full article
              </Link>
            )}
            <Link to="/" className="text-white/40 text-xs hover:text-white/70 transition mt-1">
              Back to feed
            </Link>
          </div>
        </div>
      )}

      {/* Right action bar */}
      <div className="absolute right-3 bottom-24 z-30 flex flex-col gap-5 items-center">
        <button onClick={() => setLiked((l) => !l)} className="flex flex-col items-center gap-1">
          <Heart
            className={`size-7 transition ${liked ? "fill-rose-500 text-rose-500" : "text-white"}`}
            strokeWidth={1.8}
          />
          <span className="text-white text-[11px] font-semibold">
            {(reel.frames.length * 3.7) | 0}k
          </span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <MessageCircle className="size-7 text-white" strokeWidth={1.8} />
          <span className="text-white text-[11px] font-semibold">843</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Send className="size-7 text-white" strokeWidth={1.8} />
          <span className="text-white text-[11px] font-semibold">Share</span>
        </button>
        <button onClick={() => setSaved((s) => !s)} className="flex flex-col items-center gap-1">
          <Bookmark
            className={`size-7 transition ${saved ? "fill-white text-white" : "text-white"}`}
            strokeWidth={1.8}
          />
          <span className="text-white text-[11px] font-semibold">Save</span>
        </button>
      </div>

      {/* Bottom: title + music */}
      <div className="absolute bottom-6 left-4 right-16 z-30">
        <p className="text-white font-bold text-sm leading-snug line-clamp-2">{reel.title}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <Music2 className="size-3 text-white/50" />
          <p className="text-white/50 text-xs">Original audio · Lumen AI</p>
        </div>
      </div>

      {/* Pause indicator top-right */}
      {paused && (
        <div className="absolute top-16 right-4 z-30">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 backdrop-blur">
            <Pause className="size-3 text-white" />
            <span className="text-white text-[10px] font-bold">PAUSED</span>
          </div>
        </div>
      )}
    </div>
  );
}
