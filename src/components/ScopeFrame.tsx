export default function ScopeFrame({ label }: { label: string }) {
  return (
    <div className="relative overflow-hidden rounded border border-graphite-700 bg-graphite-900">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #4FD1C5 0px, #4FD1C5 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div className="relative flex min-h-[140px] flex-col items-center justify-center gap-2 px-6 py-8 text-center">
        <span className="font-mono text-[10px] uppercase tracking-wider text-signal-teal">
          Görsel / interaktif alan · yakında
        </span>
        <p className="max-w-md font-body text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
