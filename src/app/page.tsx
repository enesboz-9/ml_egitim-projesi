import Link from "next/link";
import Roadmap from "@/components/Roadmap";
import { curriculum } from "@/lib/curriculum";

export default function Home() {
  const totalBranches = curriculum.reduce((acc, m) => {
    const own = m.branches?.length ?? 0;
    const sub = m.subModules?.reduce((a, s) => a + (s.branches?.length ?? 0), 0) ?? 0;
    return acc + own + sub;
  }, 0);
  const totalNodes =
    curriculum.length + curriculum.reduce((acc, m) => acc + (m.subModules?.length ?? 0), 0);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-graphite-700 bg-graphite-950">
        <div className="bg-grid bg-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal-teal">
            MOD-01 → MOD-22 · Ana yol + yan dallar + köprüler
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Python&apos;dan <span className="text-signal-teal">YOLO&apos;ya</span>,
            tek bir devre üzerinde ilerleyen müfredat.
          </h1>
          <p className="mt-6 max-w-xl font-body text-base text-muted sm:text-lg">
            Her modül bir düğüm. Teal hat ana yolu, amber saplamalar isteğe bağlı yan dalları,
            kesikli amber yaylar ise bölümler arası kavramsal köprüleri gösteriyor. Bir düğüme
            tıkla, o modülün içine gir.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs text-muted">
            <span>
              <span className="text-paper">{totalNodes}</span> alt modül
            </span>
            <span className="h-1 w-1 rounded-full bg-graphite-700" />
            <span>
              <span className="text-paper">{totalBranches}</span> yan dal
            </span>
            <span className="h-1 w-1 rounded-full bg-graphite-700" />
            <span>
              <span className="text-paper">2</span> köprü çifti
            </span>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">İnteraktif Yol Haritası</h2>
            <p className="mt-1 font-body text-sm text-muted">
              MOD-01&apos;den MOD-22&apos;ye — sırayla veya dallara sapa sapa ilerle.
            </p>
          </div>
          <div className="hidden gap-4 font-mono text-[11px] text-muted sm:flex">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-4 rounded bg-signal-teal" /> Ana yol
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-4 rounded bg-tap-amber" /> Yan dal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-4 rounded border border-dashed border-tap-amber" /> Köprü
            </span>
          </div>
        </div>
        <div className="rounded-lg border border-graphite-700 bg-graphite-900/40 p-4 sm:p-8">
          <Roadmap />
        </div>
      </section>

      {/* MODÜL LİSTESİ (erişilebilirlik ve tarama için düz liste) */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-6 font-display text-xl font-semibold sm:text-2xl">Tüm Modüller</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((mod) => (
            <Link
              key={mod.slug}
              href={`/modul/${mod.slug}`}
              className="group flex items-start gap-3 rounded border border-graphite-700 bg-graphite-900 p-4 transition-colors hover:border-signal-tealDim"
            >
              <span className="font-mono text-xs text-signal-teal">
                {String(mod.order).padStart(2, "0")}
              </span>
              <span>
                <span className="block font-display text-sm text-paper group-hover:text-signal-teal">
                  {mod.title}
                </span>
                {mod.subModules && (
                  <span className="mt-0.5 block font-mono text-[11px] text-muted">
                    {mod.subModules.map((s) => s.title).join(" · ")}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
