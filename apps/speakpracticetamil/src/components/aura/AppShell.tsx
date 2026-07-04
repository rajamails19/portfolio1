import { type ReactNode } from "react";
import { BottomDock } from "./BottomDock";

export function AppShell({
  children,
  hideDock = false,
}: {
  children: ReactNode;
  hideDock?: boolean;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      <div className="pointer-events-none fixed inset-0 bg-amber-aurora opacity-60" aria-hidden />
      <div className="pointer-events-none fixed inset-0 bg-noise opacity-50" aria-hidden />
      <div className="relative mx-auto w-full max-w-[480px] pb-36">
        {children}
      </div>
      {!hideDock && <BottomDock />}
    </div>
  );
}

export function TopBar({
  title,
  eyebrow,
  right,
}: {
  title?: string;
  eyebrow?: string;
  right?: ReactNode;
}) {
  return (
    <header className="flex items-end justify-between px-6 pt-10 pb-6">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">{eyebrow}</p>
        )}
        {title && (
          <h1 className="font-serif text-3xl tracking-tight italic text-balance">{title}</h1>
        )}
      </div>
      {right}
    </header>
  );
}