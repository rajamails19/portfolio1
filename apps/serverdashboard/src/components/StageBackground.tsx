export function StageBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0" style={{ background: "var(--background)" }} />
      {/* drifting aurora */}
      <div
        className="absolute -inset-32 animate-drift"
        style={{ background: "var(--gradient-stage)" }}
      />
      {/* big soft orbs */}
      <div
        className="absolute -left-32 top-20 h-[520px] w-[520px] rounded-full blur-3xl opacity-50 animate-float"
        style={{ background: "var(--gradient-magenta)" }}
      />
      <div
        className="absolute right-[-180px] top-[40%] h-[600px] w-[600px] rounded-full blur-3xl opacity-40 animate-float"
        style={{ background: "var(--gradient-sky)", animationDelay: "1.2s" }}
      />
      <div
        className="absolute left-[30%] bottom-[-200px] h-[500px] w-[500px] rounded-full blur-3xl opacity-40 animate-float"
        style={{ background: "var(--gradient-gold)", animationDelay: "2.4s" }}
      />
      {/* sparkles */}
      <div className="absolute inset-0">
        {Array.from({ length: 28 }).map((_, i) => {
          const top = (i * 53) % 100;
          const left = (i * 37 + 7) % 100;
          const size = (i % 3) + 2;
          const delay = (i % 7) * 0.3;
          return (
            <span
              key={i}
              className="absolute rounded-full animate-sparkle"
              style={{
                top: `${top}%`,
                left: `${left}%`,
                width: size,
                height: size,
                background: "white",
                opacity: 0.4,
                animationDelay: `${delay}s`,
                boxShadow: "0 0 8px white",
              }}
            />
          );
        })}
      </div>
      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
