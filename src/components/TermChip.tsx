import type { Term } from "@/lib/curriculum";

export default function TermChip({ term }: { term: Term }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 rounded border border-graphite-700 bg-graphite-900 px-2.5 py-1 font-mono text-[11px]">
      <span className="text-paper">{term.tr}</span>
      <span className="text-tap-amber">{term.en}</span>
    </span>
  );
}
