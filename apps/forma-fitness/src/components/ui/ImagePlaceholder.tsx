"use client";
import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  folder: string;
  filename: string;
  label: string;
  className?: string;
  aspectRatio?: string;
}

export function ImagePlaceholder({
  folder,
  filename,
  label,
  className = "",
  aspectRatio = "aspect-[4/3]",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative ${aspectRatio} rounded-2xl border-2 border-dashed border-white/30 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center gap-3 overflow-hidden group ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-purple-500/10" />
      <ImageIcon className="w-10 h-10 text-white/40 relative z-10" />
      <div className="text-center relative z-10 px-4">
        <p className="text-white/70 text-sm font-semibold">{label}</p>
        <p className="text-white/40 text-xs mt-1 font-mono">
          /public/{folder}/{filename}
        </p>
      </div>
    </div>
  );
}
