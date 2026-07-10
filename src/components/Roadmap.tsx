"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { curriculum } from "@/lib/curriculum";

const COLS = 5;
const CELL_W = 190;
const CELL_H = 172;
const PAD = 90;

interface Node {
  slug: string;
  order: number;
  shortTitle: string;
  title: string;
  x: number;
  y: number;
  branchCount: number;
  hasSub: boolean;
}

export default function Roadmap() {
  const [active, setActive] = useState<string | null>(null);

  const nodes: Node[] = useMemo(() => {
    return curriculum.map((mod, i) => {
      const row = Math.floor(i / COLS);
      const colIdx = i % COLS;
      const actualCol = row % 2 === 0 ? colIdx : COLS - 1 - colIdx;
      return {
        slug: mod.slug,
        order: mod.order,
        shortTitle: mod.shortTitle,
        title: mod.title,
        x: PAD + actualCol * CELL_W,
        y: PAD + row * CELL_H,
        branchCount: mod.branches?.length ?? 0,
        hasSub: !!mod.subModules,
      };
    });
  }, []);

  const rows = Math.ceil(nodes.length / COLS);
  const width = PAD * 2 + (COLS - 1) * CELL_W;
  const height = PAD * 2 + (rows - 1) * CELL_H;

  const mainPath = nodes.map((n, i) => `${i === 0 ? "M" : "L"} ${n.x} ${n.y}`).join(" ");

  const bridgePairs = useMemo(() => {
    const bySlug = new Map(nodes.map((n) => [n.slug, n]));
    const pairs: { from: Node; to: Node; label: string }[] = [];
    for (const mod of curriculum) {
      if (mod.bridges) {
        for (const b of mod.bridges) {
          const from = bySlug.get(mod.slug);
          const to = bySlug.get(b.toSlug);
          if (from && to) pairs.push({ from, to, label: b.label });
        }
      }
      if (mod.subModules) {
        for (const sub of mod.subModules) {
          if (sub.bridges) {
            for (const b of sub.bridges) {
              const from = bySlug.get(mod.slug);
              const to = bySlug.get(b.toSlug);
              if (from && to) pairs.push({ from, to, label: b.label });
            }
          }
        }
      }
    }
    return pairs;
  }, [nodes]);

  return (
    <>
      {/* MOBİL: sade dikey liste (dokunmatik için daha uygun) */}
      <div className="sm:hidden">
        <ol className="relative">
          {nodes.map((n, i) => (
            <li key={n.slug} className="relative flex gap-3 pb-5 last:pb-0">
              {i !== nodes.length - 1 && (
                <span className="absolute left-[15px] top-8 h-[calc(100%-4px)] w-px bg-signal-tealDim" />
              )}
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-signal-teal bg-graphite-950 font-mono text-xs text-signal-teal">
                {n.order}
              </span>
              <Link
                href={`/modul/${n.slug}`}
                className="flex flex-1 items-center justify-between gap-2 rounded border border-graphite-700 bg-graphite-900 px-3 py-2.5 active:border-signal-tealDim"
              >
                <span className="font-display text-sm text-paper">{n.shortTitle}</span>
                {n.branchCount > 0 && (
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-tap-amber" />
                )}
              </Link>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-mono text-[10px] text-muted">
          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-tap-amber" /> yan dalı olan
          modülleri işaretler
        </p>
      </div>

      {/* MASAÜSTÜ/TABLET: interaktif devre şeması */}
      <div className="relative hidden w-full overflow-x-auto sm:block">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[720px]"
          style={{ height: "auto" }}
          aria-hidden="true"
        >
          {/* zemin ızgarası */}
          <defs>
            <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#232833" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="url(#dotgrid)" />

          {/* köprüler (cross-link) */}
          {bridgePairs.map((p, idx) => {
            const mx = (p.from.x + p.to.x) / 2;
            const my = (p.from.y + p.to.y) / 2 - 70;
            return (
              <path
                key={idx}
                d={`M ${p.from.x} ${p.from.y} Q ${mx} ${my} ${p.to.x} ${p.to.y}`}
                fill="none"
                stroke="#F2A65A"
                strokeWidth={active === p.from.slug || active === p.to.slug ? 2 : 1}
                strokeDasharray="3 6"
                opacity={active === p.from.slug || active === p.to.slug ? 0.9 : 0.35}
              />
            );
          })}

          {/* ana yol */}
          <path
            d={mainPath}
            fill="none"
            stroke="#2E7D74"
            strokeWidth={5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={mainPath}
            fill="none"
            stroke="#4FD1C5"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="trace-pulse"
          />

          {/* yan dal saplamaları */}
          {nodes.map((n) => {
            if (n.branchCount === 0) return null;
            const dir = n.y < height / 2 ? 1 : -1;
            const stubY = n.y + dir * 56;
            return (
              <g key={`stub-${n.slug}`} opacity={active === n.slug ? 1 : 0.55}>
                <line x1={n.x} y1={n.y} x2={n.x} y2={stubY} stroke="#F2A65A" strokeWidth={2} />
                <circle cx={n.x} cy={stubY} r={4} fill="#F2A65A" />
              </g>
            );
          })}

          {/* düğümler */}
          {nodes.map((n) => (
            <g key={n.slug}>
              <circle
                cx={n.x}
                cy={n.y}
                r={active === n.slug ? 15 : 12}
                fill="#1B1F27"
                stroke={active === n.slug ? "#4FD1C5" : "#2A2F3A"}
                strokeWidth={2}
                style={{ transition: "r 120ms ease, stroke 120ms ease" }}
              />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fill={active === n.slug ? "#4FD1C5" : "#8890A0"}
              >
                {n.order}
              </text>
            </g>
          ))}
        </svg>

        {/* tıklanabilir HTML katmanı (erişilebilirlik için) */}
        <div className="pointer-events-none absolute inset-0">
          {nodes.map((n) => (
            <Link
              key={n.slug}
              href={`/modul/${n.slug}`}
              onMouseEnter={() => setActive(n.slug)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(n.slug)}
              onBlur={() => setActive(null)}
              className="pointer-events-auto absolute -translate-x-1/2 flex flex-col items-center text-center focus-visible:outline-none"
              style={{
                left: `${(n.x / width) * 100}%`,
                top: `${(n.y / height) * 100}%`,
                transform: "translate(-50%, 26px)",
                width: `${(CELL_W / width) * 100}%`,
              }}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  active === n.slug ? "text-signal-teal" : "text-muted"
                }`}
              >
                MOD-{String(n.order).padStart(2, "0")}
              </span>
              <span
                className={`font-display text-xs sm:text-sm leading-tight transition-colors ${
                  active === n.slug ? "text-paper" : "text-paper/80"
                }`}
              >
                {n.shortTitle}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
