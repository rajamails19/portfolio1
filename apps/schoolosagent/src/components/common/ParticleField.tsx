/* Editorial backdrop — replaces the prior particle field with a quiet
   newsprint texture and corner rules. Same export to keep root layout stable. */
export function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/10" />
      <div className="absolute inset-y-0 left-0 w-px bg-foreground/10" />
      <div className="absolute inset-y-0 right-0 w-px bg-foreground/10" />
    </div>
  );
}
