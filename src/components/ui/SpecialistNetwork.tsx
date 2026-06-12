"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Specialist, Specialty } from "@/lib/specialists";
import { BrandIcon } from "@/components/ui/BrandIcon";

const SPECIALTY_LABELS: Record<Specialty, string> = {
  NUCCA: "NUCCA",
  Blair: "Blair",
  Orthospinology: "Orthospinology",
  "Atlas-Orthogonal": "Atlas-Orthogonal",
  "Functional-Medicine": "Functional Medicine",
  "Lyme-Literate": "Lyme-Literate (LLMD)",
  "MCAS-Specialist": "MCAS Specialist",
  "Mold-Literate": "Mold-Literate",
  "CIRS-Shoemaker": "CIRS / Shoemaker Protocol",
  "Vagus-Stim": "Vagus Nerve Stimulation",
  "PT-Occipital": "PT (Occipital / Cervical)",
  Endocrinologist: "Endocrinologist",
  Other: "Other",
};

// react-leaflet must be client-only because it touches `window`.
const SpecialistMap = dynamic(() => import("./SpecialistMapClient"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] border border-white/10 rounded-xl bg-zinc-950 flex items-center justify-center text-muted text-sm">
      Loading map…
    </div>
  ),
});

interface SpecialistNetworkProps {
  rows: Specialist[];
}

export function SpecialistNetwork({ rows }: SpecialistNetworkProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | "all">("all");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [query, setQuery] = useState("");

  const specialties = useMemo(
    () => Array.from(new Set(rows.map((r) => r.specialty))).sort(),
    [rows]
  );

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (selectedSpecialty !== "all" && r.specialty !== selectedSpecialty) return false;
      if (remoteOnly && !r.remote) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${r.name} ${r.city} ${r.region} ${r.country} ${r.subSpecialty ?? ""} ${r.notes ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [rows, selectedSpecialty, remoteOnly, query]);

  // Count by specialty for the filter chip badges
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const r of rows) c[r.specialty] = (c[r.specialty] ?? 0) + 1;
    return c;
  }, [rows]);

  return (
    <div className="space-y-6 js-only" data-component="SpecialistNetwork">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border border-white/10 rounded-xl bg-zinc-950 p-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city, specialty, notes…"
            className="h-9 bg-black border border-white/15 rounded-md px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent md:w-96"
            aria-label="Filter specialists"
          />
          <label className="flex items-center gap-2 text-xs text-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remoteOnly}
              onChange={(e) => setRemoteOnly(e.target.checked)}
              className="accent-accent"
            />
            <span>Remote / telemedicine only</span>
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSpecialty("all")}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded border transition-colors ${
              selectedSpecialty === "all"
                ? "bg-accent text-black border-accent"
                : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
            }`}
          >
            All ({counts.all ?? 0})
          </button>
          {specialties.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSpecialty(s)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-widest rounded border transition-colors ${
                selectedSpecialty === s
                  ? "bg-accent text-black border-accent"
                  : "bg-white/5 text-white/60 border-white/10 hover:border-white/20"
              }`}
            >
              {SPECIALTY_LABELS[s]} ({counts[s] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* Map + cards */}
      {rows.length === 0 ? (
        <div className="border border-dashed border-white/20 rounded-2xl bg-zinc-950/50 p-12 text-center">
          <BrandIcon id="target-crosshair" className="w-10 h-10 text-white/30 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">The network is being built.</h3>
          <p className="text-muted text-sm max-w-md mx-auto leading-relaxed">
            Every provider in this list is vetted by Dre before going public. Until the Airtable
            sync is wired up, the network will be empty. Check back soon — providers Dre has
            personally worked with are added as they&apos;re approved.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <SpecialistMap rows={filtered} />
          <ul className="space-y-3 max-h-[480px] overflow-y-auto pr-1" aria-label="Specialist cards">
            {filtered.length === 0 ? (
              <li className="text-muted text-sm italic px-4 py-8 text-center">
                No specialists match the current filter.
              </li>
            ) : (
              filtered.map((s) => <SpecialistCard key={s.id} specialist={s} />)
            )}
          </ul>
        </div>
      )}

      <p className="text-[10px] font-mono uppercase tracking-widest text-muted text-center">
        Showing {filtered.length} of {rows.length} vetted specialists
      </p>
    </div>
  );
}

function SpecialistCard({ specialist }: { specialist: Specialist }) {
  return (
    <li className="border border-white/10 rounded-xl bg-zinc-950 p-4 hover:border-white/30 transition-colors">
      <div className="flex flex-wrap items-start gap-2 mb-2">
        <h3 className="text-white font-bold text-sm flex-1">{specialist.name}</h3>
        {specialist.rating && (
          <span className="text-amber-400 text-xs font-mono" aria-label={`${specialist.rating} out of 5`}>
            {"★".repeat(specialist.rating)}
            <span className="text-white/20">{"★".repeat(5 - specialist.rating)}</span>
          </span>
        )}
      </div>
      <p className="text-accent text-[10px] font-mono uppercase tracking-widest mb-1">
        {SPECIALTY_LABELS[specialist.specialty]}
        {specialist.subSpecialty ? ` · ${specialist.subSpecialty}` : ""}
      </p>
      <p className="text-muted text-xs">
        {specialist.city}, {specialist.region}, {specialist.country}
        {specialist.remote && (
          <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-green-400">
            · Remote
          </span>
        )}
      </p>
      {specialist.notes && (
        <p className="text-muted text-xs leading-relaxed mt-2 line-clamp-3">{specialist.notes}</p>
      )}
      {specialist.url && (
        <a
          href={specialist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent text-xs font-mono mt-2 inline-block hover:underline"
        >
          Visit site →
        </a>
      )}
    </li>
  );
}
