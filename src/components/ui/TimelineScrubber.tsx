"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { BrandIcon } from "./BrandIcon";

export type TimelineStatus = "Exposed" | "Emergency" | "Diagnosed" | "Recovered";

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  symptoms: string[];
  protocol: string[];
  status: TimelineStatus;
}

interface TimelineScrubberProps {
  /**
   * Optional override for the default 4-phase recovery timeline.
   * Use this to render a custom timeline (e.g. for /mold-toxicity or
   * a lead-magnet entry path) while reusing the same interaction model.
   */
  events?: TimelineEvent[];
}

const defaultEvents: TimelineEvent[] = [
  {
    id: "exposure",
    year: "Year 1-2",
    title: "Hidden Exposure & Fatigue",
    subtitle: "Living in a water-damaged house without visible mold signs.",
    symptoms: ["Vague brain fog", "Chronic fatigue", "Frequent sinus congestion", "Anxiety states"],
    protocol: ["Conventional physician consults", "Standard blood panels (Normal)", "General vitamins"],
    status: "Exposed",
  },
  {
    id: "crash",
    year: "Year 3",
    title: "Systemic Crash & ER Visits",
    subtitle: "Total autonomic breakdown as the toxic load reached peak congestion.",
    symptoms: ["Tachycardia (160bpm resting)", "Facial burning", "Extreme insomnia", "Panic attacks"],
    protocol: ["Emergency Room workups (Clear)", "Electrocardiograms", "Offered psychiatric drugs"],
    status: "Emergency",
  },
  {
    id: "diagnosis",
    year: "Year 4",
    title: "Diagnostic Breakthroughs",
    subtitle: "Escaping conventional gaslighting with functional diagnostics.",
    symptoms: ["Ochratoxin at 28.4 ppb", "C1-C2 left translation (3.5mm)", "Reversed cervical curve (-4 degrees)"],
    protocol: ["Mycotoxin Urine Panel", "CIRS Blood Markers", "Upright X-Ray & TyTron scans"],
    status: "Diagnosed",
  },
  {
    id: "recovery",
    year: "Year 5",
    title: "Sequenced Rebuilding",
    subtitle: "Daily execution of the terrain operating system.",
    symptoms: ["HRV baseline increased (14ms -> 48ms)", "Sinuses clear", "Stable heart rates", "Guarding resolved"],
    protocol: ["Drainage support + targeted binders", "NUCCA upper cervical adjustments", "Cellular replenishment"],
    status: "Recovered",
  },
];

const getStatusColor = (status: TimelineStatus) => {
  switch (status) {
    case "Exposed":
      return "text-amber-500 border-amber-500/20 bg-amber-500/5";
    case "Emergency":
      return "text-red-500 border-red-500/20 bg-red-500/5";
    case "Diagnosed":
      return "text-accent border-accent/20 bg-accent/5";
    case "Recovered":
      return "text-green-500 border-green-500/20 bg-green-500/5";
    default:
      return "text-white border-white/10";
  }
};

/**
 * Horizontal recovery-timeline scrubber.
 *
 * Spec (Phase 5.2):
 * - Click a phase to expand its symptom load + active protocol
 * - Keyboard: Arrow Left/Right (or Up/Down) move between phases, Home/End
 *   jump to the first/last phase, Enter/Space activates
 * - Reduced-motion: scale transform on the active step is suppressed
 * - Reduced-motion: the SVG pulse-ring backdrop is hidden
 * - `events` prop accepts a custom timeline for reuse on /mold-toxicity,
 *   lead-magnet entry paths, etc.
 */
export function TimelineScrubber({ events = defaultEvents }: TimelineScrubberProps) {
  const [activeStep, setActiveStep] = useState(2); // default to "Diagnosed" in default timeline
  const trackRef = useRef<HTMLDivElement>(null);

  const moveTo = useCallback(
    (idx: number) => {
      const clamped = ((idx % events.length) + events.length) % events.length;
      setActiveStep(clamped);
    },
    [events.length]
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          moveTo(idx + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          moveTo(idx - 1);
          break;
        case "Home":
          e.preventDefault();
          moveTo(0);
          break;
        case "End":
          e.preventDefault();
          moveTo(events.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          setActiveStep(idx);
          break;
      }
    },
    [moveTo, events.length]
  );

  // After a keyboard move, focus the new active step so screen readers
  // announce it and Tab order stays intuitive.
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't fight mouse focus; only follow the keyboard if focus is inside the track.
    if (trackRef.current && trackRef.current.contains(document.activeElement)) {
      const buttons = trackRef.current.querySelectorAll<HTMLButtonElement>("[data-timeline-step]");
      buttons[activeStep]?.focus();
    }
  }, [activeStep]);

  const currentEvent = events[activeStep];

  return (
    <div
      className="border border-white/10 rounded-2xl bg-zinc-950 p-6 md:p-8 flex flex-col gap-8 js-only"
      data-component="TimelineScrubber"
    >
      <div
        ref={trackRef}
        role="tablist"
        aria-label="Recovery timeline"
        className="relative flex justify-between items-center w-full max-w-2xl mx-auto px-4"
      >
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0" aria-hidden="true" />
        {events.map((evt, idx) => {
          const isActive = idx === activeStep;
          return (
            <button
              key={evt.id}
              role="tab"
              data-timeline-step
              aria-selected={isActive}
              aria-controls={`timeline-panel-${evt.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveStep(idx)}
              onKeyDown={(e) => handleKey(e, idx)}
              className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-300 ${
                isActive ? "scale-110 motion-safe:scale-110" : "opacity-50 hover:opacity-80"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold font-mono text-[9px] ${
                  isActive
                    ? "bg-accent border-accent text-black"
                    : "bg-zinc-900 border-white/20 text-white"
                }`}
                aria-hidden="true"
              >
                {idx + 1}
              </div>
              <span className="text-xs font-mono font-bold font-sans text-white">{evt.year}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`timeline-panel-${currentEvent.id}`}
        role="tabpanel"
        aria-live="polite"
        className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 border border-white/5 bg-black/40 rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none motion-reduce:hidden" aria-hidden="true">
          <svg className="w-full h-full object-cover">
            <use href="/svgs/animated/animated-overlays.svg#pulse-ring-animation" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-bold">
              TIMELINE PHASE
            </span>
            <span
              className={`border px-3 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold ${getStatusColor(currentEvent.status)}`}
            >
              {currentEvent.status}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            {currentEvent.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed">{currentEvent.subtitle}</p>
        </div>

        <div className="relative z-10 grid sm:grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
          <div>
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <BrandIcon id="warning" className="w-4 h-4 text-red-500" />
              Symptom Load
            </h4>
            <ul className="space-y-1.5 text-xs text-muted leading-relaxed">
              {currentEvent.symptoms.map((item, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <BrandIcon id="folder-structure" className="w-4 h-4 text-accent" />
              Active Protocol
            </h4>
            <ul className="space-y-1.5 text-xs text-muted leading-relaxed">
              {currentEvent.protocol.map((item, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span aria-hidden="true">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
