"use client";

import { useState } from "react";
import { BrandIcon } from "./BrandIcon";

interface Metric {
  label: string;
  value: string;
  status: "optimal" | "warning" | "critical";
  trend: string;
}

export function DashboardPreview() {
  const [alignmentState, setAlignmentState] = useState<"aligned" | "subluxated">("aligned");

  const getMetrics = (): Metric[] => {
    if (alignmentState === "aligned") {
      return [
        { label: "Heart Rate Variability", value: "58 ms", status: "optimal", trend: "Trending Up (+14%)" },
        { label: "Sleep Quality Index", value: "89%", status: "optimal", trend: "Deep sleep baseline reached" },
        { label: "Cervical Alignment", value: "NUCCA Aligned", status: "optimal", trend: "0.2mm lateral deviation" },
        { label: "Histamine Mediation", value: "Balanced", status: "optimal", trend: "Sympathetic tone buffering active" }
      ];
    } else {
      return [
        { label: "Heart Rate Variability", value: "18 ms", status: "critical", trend: "Severe suppression (-68%)" },
        { label: "Sleep Quality Index", value: "62%", status: "warning", trend: "Insomnia baseline triggered" },
        { label: "Cervical Alignment", value: "C1 Subluxated", status: "critical", trend: "3.4mm left rotation shift" },
        { label: "Histamine Mediation", value: "Overload", status: "warning", trend: "Unchecked mast cell degranulation" }
      ];
    }
  };

  const metrics = getMetrics();

  const getStatusBg = (status: string) => {
    switch (status) {
      case "optimal": return "bg-green-500/10 border-green-500/30 text-green-500";
      case "warning": return "bg-amber-500/10 border-amber-500/30 text-amber-500";
      case "critical": return "bg-red-500/10 border-red-500/30 text-red-500";
      default: return "bg-white/5 border-white/10 text-white";
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-zinc-950 p-6 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
        <div>
          <span className="text-accent font-mono text-[9px] uppercase tracking-[0.2em] font-bold">Autonomic Status Monitor</span>
          <h4 className="text-lg font-bold text-white tracking-tight">Physiological Signal Dashboard</h4>
        </div>
        
        {/* Toggle States */}
        <div className="flex bg-black/60 border border-white/15 p-1 rounded-lg">
          <button
            onClick={() => setAlignmentState("aligned")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-all duration-300 ${
              alignmentState === "aligned"
                ? "bg-accent text-black shadow-md shadow-accent/15"
                : "text-muted hover:text-white"
            }`}
          >
            Aligned Post-NUCCA
          </button>
          <button
            onClick={() => setAlignmentState("subluxated")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-tight transition-all duration-300 ${
              alignmentState === "subluxated"
                ? "bg-red-500 text-white shadow-md shadow-red-500/15"
                : "text-muted hover:text-white"
            }`}
          >
            Rotated state (Day 14)
          </button>
        </div>
      </div>

      {/* Grid of metrics */}
      <div className="grid sm:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="border border-white/5 bg-black/30 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[120px]">
            <div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{metric.label}</span>
                <span className={`border px-2 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest font-bold ${getStatusBg(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              <p className="text-3xl font-black text-white tracking-tight mt-2">
                {metric.value}
              </p>
            </div>
            <p className="text-[11px] text-muted font-medium mt-4">
              {metric.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 flex gap-3 items-start">
        <BrandIcon id="heart-rate-vagal" className="w-5 h-5 text-accent shrink-0 mt-0.5 animate-pulse" />
        <p className="text-xs text-muted leading-relaxed">
          {alignmentState === "aligned" 
            ? "NUCCA correction decompressing the vagus nerve. Autonomic pathways are operating within healthy metrics, allowing systemic inflammation signals to stabilize." 
            : "Atlas rotation placing mechanical traction on CN X. The parasympathetic brake is weak, allowing histamine pathways and cytokine cascades to degranulate unchecked."}
        </p>
      </div>
    </div>
  );
}
