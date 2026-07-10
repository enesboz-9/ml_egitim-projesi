import type { Branch } from "@/lib/curriculum";

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div className="relative rounded border border-tap-amberDim/50 bg-graphite-900 py-3 pl-5 pr-4">
      <span className="absolute left-0 top-0 h-full w-[3px] rounded-l bg-tap-amber" />
      <p className="font-display text-sm text-paper">{branch.title}</p>
      {branch.desc && <p className="mt-1 font-body text-xs text-muted">{branch.desc}</p>}
    </div>
  );
}
