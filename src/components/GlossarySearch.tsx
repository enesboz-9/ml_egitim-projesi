"use client";

import { useMemo, useState } from "react";
import type { Term } from "@/lib/curriculum";
import TermChip from "@/components/TermChip";

export default function GlossarySearch({ terms }: { terms: Term[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return terms;
    return terms.filter(
      (t) => t.en.toLocaleLowerCase("tr").includes(q) || t.tr.toLocaleLowerCase("tr").includes(q)
    );
  }, [terms, query]);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted">
          /
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Terim ara — TR veya EN (örn. gradyan, epoch...)"
          aria-label="Sözlükte terim ara"
          className="w-full rounded border border-graphite-700 bg-graphite-900 py-2.5 pl-8 pr-3 font-body text-sm text-paper placeholder:text-muted focus:border-signal-teal focus:outline-none"
        />
      </div>

      <p className="mb-4 font-mono text-[11px] text-muted">
        {filtered.length} / {terms.length} terim
      </p>

      {filtered.length === 0 ? (
        <p className="font-body text-sm text-muted">
          &ldquo;{query}&rdquo; için bir eşleşme yok. Başka bir terim deneyebilirsin.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {filtered.map((t) => (
            <TermChip key={t.en} term={t} />
          ))}
        </div>
      )}
    </div>
  );
}
