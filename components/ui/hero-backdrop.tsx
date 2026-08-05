export function HeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* soft top wash */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-brand-50/90 to-transparent" />

      {/* grid, faded radially from the top */}
      <div
        className="absolute inset-0 bg-grid opacity-50"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 72% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 72% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      {/* four-colour brand glows */}
      <div className="absolute -top-40 left-1/2 h-[30rem] w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-brand-500/25 via-ink-600/15 to-brand-400/20 blur-3xl" />
      <div className="absolute -top-20 left-[2%] h-72 w-72 rounded-full bg-gold-500/10 blur-3xl animate-float-slow" />
      <div className="absolute -top-24 right-[4%] h-72 w-72 rounded-full bg-crimson-500/10 blur-3xl animate-float-medium" />
      <div className="absolute bottom-0 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-full bg-ink-600/5 blur-3xl" />

      {/* bottom fade into page background */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />

      {/* 4-colour brand edge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[3px]"
        style={{ background: "linear-gradient(90deg,#f30a29,#f3a800,#008dec,#1d36bf)" }}
      />
    </div>
  );
}

export default HeroBackdrop;
