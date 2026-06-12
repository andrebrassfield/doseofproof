"use client";

import { useState, useEffect, useRef } from "react";
import { BrandIcon } from "./BrandIcon";

type MetricStatus = "optimal" | "warning" | "critical";

interface Metric {
  label: string;
  value: string;
  status: MetricStatus;
  trend: string;
}

interface DashboardDataset {
  label: string;
  metrics: Metric[];
  insight: string;
}

interface DashboardPreviewProps {
  /**
   * Optional real anonymized dataset for /protocol-vault. When provided,
   * the user can toggle between the editorial 'Aligned / Rotated' demo
   * and the real data via the 'Show my data' button.
   *
   * Shape:
   * {
   *   label: "Real data — Q2 2026",
   *   metrics: Metric[],
   *   insight: string
   * }
   */
  realDataset?: DashboardDataset;
  /**
   * Async loader for the real dataset. Use this when the dataset lives in
   * Notion / an API and shouldn't be inlined into the bundle.
   */
  loadRealDataset?: () => Promise<DashboardDataset | null>;
}

const editorialAligned: DashboardDataset = {
  label: "Aligned Post-NUCCA",
  metrics: [
    { label: "Heart Rate Variability", value: "58 ms", status: "optimal", trend: "Trending Up (+14%)" },
    { label: "Sleep Quality Index", value: "89%", status: "optimal", trend: "Deep sleep baseline reached" },
    { label: "Cervical Alignment", value: "NUCCA Aligned", status: "optimal", trend: "0.2mm lateral deviation" },
    { label: "Histamine Mediation", value: "Balanced", status: "optimal", trend: "Sympathetic tone buffering active" },
  ],
  insight:
    "NUCCA correction decompressing the vagus nerve. Autonomic pathways are operating within healthy metrics, allowing systemic inflammation signals to stabilize.",
};

const editorialRotated: DashboardDataset = {
  label: "Rotated state (Day 14)",
  metrics: [
    { label: "Heart Rate Variability", value: "18 ms", status: "critical", trend: "Severe suppression (-68%)" },
    { label: "Sleep Quality Index", value: "62%", status: "warning", trend: "Insomnia baseline triggered" },
    { label: "Cervical Alignment", value: "C1 Subluxated", status: "critical", trend: "3.4mm left rotation shift" },
    { label: "Histamine Mediation", value: "Overload", status: "warning", trend: "Unchecked mast cell degranulation" },
  ],
  insight:
    "Atlas rotation placing mechanical traction on CN X. The parasympathetic brake is weak, allowing histamine pathways and cytokine cascades to degranulate unchecked.",
};

const getStatusBg = (status: MetricStatus) => {
  switch (status) {
    case "optimal":
      return "bg-green-500/10 border-green-500/30 text-green-500";
    case "warning":
      return "bg-amber-500/10 border-amber-500/30 text-amber-500";
    case "critical":
      return "bg-red-500/10 border-red-500/30 text-red-500";
    default:
      return "bg-white/5 border-white/10 text-white";
  }
};

/**
 * Autonomic status dashboard preview.
 *
 * Spec (Phase 5.2):
 * - Two editorial states (Aligned Post-NUCCA, Rotated state) demonstrating
 *   the HRV / sleep / alignment / histamine contrast
 * - 'Show my data' toggle: when realDataset or loadRealDataset is provided,
 *   load the real anonymized dataset (HRV, sleep, pain, histamine, adjustments)
 *   and display it in the same card frame
 * - Loading state + error state for async loaders
 * - Keyboard accessible toggle group (role=tablist)
 * - Reduced-motion safe (no transforms; transitions only on background-color)
 */
export function DashboardPreview({ realDataset, loadRealDataset }: DashboardPreviewProps) {
  const [view, setView] = useState<"aligned" | "rotated" | "real">("aligned");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState<DashboardDataset | null>(null);
  const fetchStartedRef = useRef(false);

  // When the user clicks 'Show my data' and we have a loader, fetch once.
  useEffect(() => {
    if (view !== "real" || !loadRealDataset || fetched || fetchStartedRef.current) return;
    fetchStartedRef.current = true;
    setLoading(true);
    setError(null);
    loadRealDataset()
      .then((ds) => {
        if (ds) setFetched(ds);
        else setError("No real data available yet.");
      })
      .catch((err) => setError(err?.message ?? "Failed to load data."))
      .finally(() => setLoading(false));
  }, [view, loadRealDataset, fetched]);

  const active: DashboardDataset | null =
    view === "aligned"
      ? editorialAligned
      : view === "rotated"
        ? editorialRotated
        : fetched ?? realDataset ?? null;

  const tabs: Array<{ id: "aligned" | "rotated" | "real"; label: string; color: string }> = [
    { id: "aligned", label: "Aligned Post-NUCCA", color: "accent" },
    { id: "rotated", label: "Rotated state (Day 14)", color: "red-500" },
  ];
  if (realDataset || loadRealDataset) {
    tabs.push({ id: "real", label: "Show my data", color: "white" });
  }

  return (
    <div
      className="border border-white/10 rounded-2xl bg-zinc-950 p-6 flex flex-col gap-6 js-only"
      data-component="DashboardPreview"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-accent font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
            Autonomic Status Monitor
          </span>
          <h4 className="text-lg font-bold text-white tracking-tight">Physiological Signal Dashboard</h4>
          {active && (
            <p className="text-xs text-muted mt-1 font-mono">VIEW: {active.label}</p>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Dashboard state"
          className="flex bg-black/60 border border-white/15 p-1 rounded-lg"
        >
          {tabs.map((tab) => {
            const isActive = view === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="dashboard-metrics"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setView(tab.id)}
                onKeyDown={(e) => {
                  const idx = tabs.findIndex((t) => t.id === tab.id);
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    setView(tabs[(idx + 1) % tabs.length].id);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    setView(tabs[(idx - 1 + tabs.length) % tabs.length].id);
                  }
                }}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-colors duration-300 ${
                  isActive
                    ? tab.id === "aligned"
                      ? "bg-accent text-black shadow-md shadow-accent/15"
                      : tab.id === "rotated"
                        ? "bg-red-500 text-white shadow-md shadow-red-500/15"
                        : "bg-white text-black shadow-md shadow-white/10"
                    : "text-muted hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div id="dashboard-metrics" role="tabpanel" aria-live="polite">
        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="border border-white/5 bg-black/30 rounded-xl p-5 min-h-[120px] animate-pulse"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="border border-red-500/30 bg-red-500/5 rounded-xl p-5 text-sm text-red-200"
          >
            {error}
          </div>
        ) : active ? (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              {active.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="border border-white/5 bg-black/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[120px]"
                >
                  <div>
                    <div className="flex justify-between items-center gap-4">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <span
                        className={`border px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest font-bold ${getStatusBg(metric.status)}`}
                      >
                        {metric.status}
                      </span>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tight mt-2">{metric.value}</p>
                  </div>
                  <p className="text-[11px] text-muted font-medium mt-4">{metric.trend}</p>
                </div>
              ))}
            </div>

            <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 flex gap-3 items-start mt-6">
              <BrandIcon
                id="heart-rate-vagal"
                className="w-5 h-5 text-accent shrink-0 mt-0.5 animate-pulse"
              />
              <p className="text-xs text-muted leading-relaxed">{active.insight}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
