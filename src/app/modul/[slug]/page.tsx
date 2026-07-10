import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { curriculum, findModuleBySlug, type ModuleData, type SubModule } from "@/lib/curriculum";
import ScopeFrame from "@/components/ScopeFrame";
import BranchCard from "@/components/BranchCard";
import TermChip from "@/components/TermChip";

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const mod of curriculum) {
    params.push({ slug: mod.slug });
    if (mod.subModules) {
      for (const sub of mod.subModules) params.push({ slug: sub.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findModuleBySlug(slug);
  if (!found) {
    return { title: "Modül bulunamadı — ML Akademi" };
  }
  const data = found.type === "sub" ? found.sub : found.module;
  const order = found.module.order;
  const description =
    "goal" in data && data.goal
      ? data.goal
      : `MOD-${String(order).padStart(2, "0")} · ${data.title} — ML Akademi müfredatı.`;
  return {
    title: `${data.title} · MOD-${String(order).padStart(2, "0")} — ML Akademi`,
    description,
  };
}

function Content({ data }: { data: ModuleData | SubModule }) {
  return (
    <>
      {data.goal && (
        <section className="mb-10">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-signal-teal">Hedef</p>
          <p className="max-w-2xl font-body text-base text-paper/90">{data.goal}</p>
        </section>
      )}

      {data.mainPath && data.mainPath.length > 0 && (
        <section className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-signal-teal">
            Ana Yol
          </p>
          <ol className="space-y-0">
            {data.mainPath.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 pb-6 pl-2 last:pb-0">
                {i !== data.mainPath!.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-signal-tealDim" />
                )}
                <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-signal-teal bg-graphite-950 font-mono text-xs text-signal-teal">
                  {i + 1}
                </span>
                <span className="pt-1">
                  <span className="block font-body text-sm font-medium text-paper">{step.title}</span>
                  {step.desc && (
                    <span className="mt-1 block font-body text-sm leading-relaxed text-muted">
                      {step.desc}
                    </span>
                  )}
                  {step.detail && (
                    <span className="mt-2 block max-w-2xl border-l-2 border-signal-tealDim/40 pl-3 font-body text-[13px] leading-relaxed text-paper/70">
                      {step.detail}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {data.branches && data.branches.length > 0 && (
        <section className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-tap-amber">
            Yan Dallar
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.branches.map((b) => (
              <BranchCard key={b.title} branch={b} />
            ))}
          </div>
        </section>
      )}

      {data.visual && (
        <section className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-signal-teal">Görsel</p>
          <ScopeFrame label={data.visual} />
        </section>
      )}

      {data.terms && data.terms.length > 0 && (
        <section className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-signal-teal">
            EN Terimler
          </p>
          <div className="flex flex-wrap gap-2">
            {data.terms.map((t) => (
              <TermChip key={t.en} term={t} />
            ))}
          </div>
        </section>
      )}

      {data.task && (
        <section className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-signal-teal">
            Örnek Görev
          </p>
          <div className="rounded border border-graphite-700 bg-graphite-900 p-5">
            <p className="font-body text-sm text-paper/90">{data.task}</p>
          </div>
        </section>
      )}

      {data.bridges && data.bridges.length > 0 && (
        <section className="mb-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-tap-amber">Köprüler</p>
          <div className="flex flex-col gap-2">
            {data.bridges.map((b) => (
              <Link
                key={b.toSlug}
                href={`/modul/${b.toSlug}`}
                className="inline-flex w-fit items-center gap-2 rounded border border-dashed border-tap-amber/60 px-3 py-2 font-mono text-xs text-tap-amber transition-colors hover:bg-tap-amber/10"
              >
                ⇢ {b.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findModuleBySlug(slug);
  if (!found) notFound();

  const { module: mod } = found;
  const isSub = found.type === "sub";
  const data: ModuleData | SubModule = isSub ? found.sub : mod;
  const isHub = !isSub && !!mod.subModules;

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <nav className="mb-6 font-mono text-xs text-muted">
        <Link href="/" className="hover:text-signal-teal">
          Yol Haritası
        </Link>
        {isSub && (
          <>
            {" / "}
            <Link href={`/modul/${mod.slug}`} className="hover:text-signal-teal">
              {mod.title}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-paper">{data.title}</span>
      </nav>

      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-signal-teal">
        MOD-{String(mod.order).padStart(2, "0")}
        {isSub ? ` · ${data.title}` : ""}
      </p>
      <h1 className="mb-10 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {data.title}
      </h1>

      {isHub ? (
        <>
          <p className="mb-8 max-w-2xl font-body text-base text-muted">
            Bu bölüm alt modüllerden oluşuyor. Devam etmek için birini seç:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {mod.subModules!.map((sub) => (
              <Link
                key={sub.slug}
                href={`/modul/${sub.slug}`}
                className="group rounded border border-graphite-700 bg-graphite-900 p-5 transition-colors hover:border-signal-tealDim"
              >
                <span className="block font-display text-base text-paper group-hover:text-signal-teal">
                  {sub.title}
                </span>
                <span className="mt-2 block font-body text-xs text-muted">{sub.goal}</span>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <Content data={data} />
      )}

      <div className="mt-16 flex justify-between border-t border-graphite-700 pt-6 font-mono text-xs">
        <Link href="/" className="text-muted hover:text-signal-teal">
          ← Yol haritasına dön
        </Link>
        <Link href="/sozluk" className="text-muted hover:text-signal-teal">
          Sözlüğe git →
        </Link>
      </div>
    </div>
  );
}
