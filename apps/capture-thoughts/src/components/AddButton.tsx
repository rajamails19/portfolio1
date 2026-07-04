import { Plus } from "lucide-react";

export function AddButton({ onClick, label = "Add" }: { onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-5 z-40 flex items-center gap-2 rounded-full bg-aurora px-5 py-3.5 font-semibold text-[hsl(0_0%_10%)] shadow-[var(--shadow-glow)] animate-pulse-glow transition hover:scale-105 sm:bottom-8 sm:right-8"
      aria-label={label}
    >
      <Plus className="h-5 w-5" />
      <span className="hidden text-sm sm:inline">{label}</span>
    </button>
  );
}
