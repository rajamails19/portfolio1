import type { ReactNode } from "react";

type Props = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function SectionHero({ image, eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[58vh] min-h-[440px] w-full">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-drift"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 h-full flex flex-col justify-end pb-14">
          <span className="ember-chip mb-4 w-fit">{eyebrow}</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-ember drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            {title}
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-foreground/85 mt-3 max-w-2xl">
            {subtitle}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}
