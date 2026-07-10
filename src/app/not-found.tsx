import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <div className="bg-grid bg-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-tap-amber">
          Sinyal kaybı
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          404
        </h1>
        <p className="mt-4 max-w-md font-body text-sm text-muted">
          Aradığın modül devrede yok — belki numarası değişti, belki hiç bağlanmadı.
          Ana yola geri dönüp oradan devam edebilirsin.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded border border-signal-teal px-4 py-2 font-mono text-xs uppercase tracking-wider text-signal-teal transition-colors hover:bg-signal-teal/10"
          >
            Yol haritasına dön
          </Link>
          <Link
            href="/sozluk"
            className="rounded border border-graphite-700 px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-tap-amber hover:text-tap-amber"
          >
            Sözlüğe bak
          </Link>
        </div>
      </div>
    </div>
  );
}
