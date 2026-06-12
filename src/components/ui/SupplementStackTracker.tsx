"use client";

import { useMemo, useState } from "react";
import type { Supplement, SupplementPhase } from "@/lib/supplements";
import { BrandIcon } from "@/components/ui/BrandIcon";

const PHASE_STYLES: Record<SupplementPhase, string> = {
  Structure: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  Inflammation: "bg-amber-500/10 border-amber-500/30 text-amber-300",
  "Recovery Output": "bg-green-500/10 border-green-500/30 text-green-300",
  Drainage: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  Foundational: "bg-purple-500/10 border-purple-500/30 text-purple-300",
};

const CYCLE_ORDER: Supplement["cycle"][] = ["morning", "midday", "evening", "bedtime", "as-needed"];

interface SupplementStackTrackerProps {
  rows: Supplement[];
}

export function SupplementStackTracker({ rows }: SupplementStackTrackerProps) {
  const [selectedPhase, setSelectedPhase] = useState<SupplementPhase | "all">("all");
  const [query, setQuery] = useState("");

  const phases = useMemo(
    () => Array.from(new Set(rows.map((r) => r.phase))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    return rows
      .filter((r) => (selectedPhase === "all" ? true : r.phase === selectedPhase))
      .filter((r) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return `${r.compound} ${r.brand} ${r.purpose} ${r.biomarker ?? ""}`
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => {
        const ca = CYCLE_ORDER.indexOf(a.cycle);
        const cb = CYCLE_ORDER.indexOf(b.cycle);
        if (ca !== cb) return ca - cb;
        return a.compound.localeCompare(b.compound);
      });
  }, [rows, selectedPhase, query]);

  return (
    <div className="space-y-6 js-only" data-component="SupplementStackTracker">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border border-white/10 rounded-xl bg-zinc-950 p-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search compounds, brands, biomarkers…"
          className="h-9 bg-black border border-white/15 rounded-md px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent md:w-96"
          aria-label="Filter supplements"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPhase("all")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded border transition-colors ${
              selectedPhase === "all"
                ? "bg-accent text-black border-accent"
                : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
            }`}
          >
            All phases ({rows.length})
          </button>
          {phases.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPhase(p)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded border transition-colors ${
                selectedPhase === p
                  ? `${PHASE_STYLES[p]} bg-white/10`
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
              }`}
            >
              {p} ({rows.filter((r) => r.phase === p).length})
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="border border-dashed border-white/20 rounded-2xl bg-zinc-950/50 p-12 text-center">
          <BrandIcon id="pill-capsule" className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">The stack is being curated.</h3>
          <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
            Every compound in this list is one Dre has personally vetted and approved for public
            disclosure. Until the Airtable sync is wired up, the stack will be empty. Check back
            as the disclosure list grows.
          </p>
        </div>
      ) : (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-950">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-black/60 border-b border-white/10">
                <tr>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Compound</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Dose</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Brand</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Cycle</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Phase</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Purpose</th>
                  <th className="text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest text-accent font-bold">Biomarker / Outcome</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted text-sm">
                      No compounds match the current filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 align-top">
                        <div className="text-white font-bold">{s.compound}</div>
                        {s.affiliateUrl && (
                          <a
                            href={s.affiliateUrl}
                            target="_blank"
                            rel="sponsored noopener noreferrer"
                            className="text-accent text-[10px] font-mono uppercase tracking-widest hover:underline mt-1 inline-block"
                          >
                            Buy →
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top font-mono text-muted text-xs">{s.dose}</td>
                      <td className="px-4 py-3 align-top font-mono text-muted text-xs">{s.brand}</td>
                      <td className="px-4 py-3 align-top">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                          {s.cycle}
                          {!s.continuous && (
                            <span className="ml-1 text-amber-400">· cycle</span>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <span
                          className={`border px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold ${PHASE_STYLES[s.phase]}`}
                        >
                          {s.phase}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top text-muted text-xs leading-relaxed">
                        {s.purpose}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {s.biomarker && (
                          <div className="text-[10px] font-mono uppercase tracking-widest text-accent mb-1">
                            {s.biomarker}
                          </div>
                        )}
                        {s.outcome && (
                          <p className="text-muted text-xs leading-relaxed">{s.outcome}</p>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-muted">
            {filtered.length} of {rows.length} compounds shown
          </div>
        </div>
      )}

      <p className="text-[11px] text-muted text-center leading-relaxed">
        Affiliate links, when present, are tagged{" "}
        <code className="text-amber-400">rel=&quot;sponsored&quot;</code>. Per editorial policy,
        every compound is paired with a free DIY alternative. Dre does not accept paid placements.
      </p>
    </div>
  );
}
