export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-overlay absolute inset-0" />
      <div
        className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #14d8a4 0%, #4a86ff 55%, transparent 100%)",
        }}
      />
      <div
        className="absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full opacity-15 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, #b78bff, transparent 70%)" }}
      />
      <div
        className="absolute -right-40 top-1/2 h-[420px] w-[420px] rounded-full opacity-15 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, #7cf8d4, transparent 70%)" }}
      />
    </div>
  );
}
