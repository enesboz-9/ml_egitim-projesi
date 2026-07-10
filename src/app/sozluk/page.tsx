import type { Metadata } from "next";
import { allTerms } from "@/lib/curriculum";
import GlossarySearch from "@/components/GlossarySearch";

export const metadata: Metadata = {
  title: "Terim Sözlüğü — ML Akademi",
  description: "Müfredat boyunca geçen tüm İngilizce ML/CV terimleri ve Türkçe karşılıkları.",
};

export default function GlossaryPage() {
  const terms = allTerms().sort((a, b) => a.en.localeCompare(b.en));

  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-signal-teal">A-Z</p>
      <h1 className="mb-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Terim Sözlüğü
      </h1>
      <p className="mb-10 max-w-2xl font-body text-sm text-muted">
        Müfredat boyunca geçen tüm İngilizce teknik terimler ve Türkçe karşılıkları, tek bir yerde.
        Her modül sayfasında da ilgili terimler ayrıca listelenir.
      </p>
      <GlossarySearch terms={terms} />
    </div>
  );
}
