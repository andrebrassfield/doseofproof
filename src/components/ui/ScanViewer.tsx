"use client";

import { useState } from "react";
import { SafeImage as Image } from "./SafeImage";
import { BrandIcon } from "./BrandIcon";

interface Hotspot {
  id: string;
  top: string;
  left: string;
  title: string;
  description: string;
}

interface ScanViewerProps {
  imageSrc: string;
  altText: string;
  hotspots: Hotspot[];
}

export function ScanViewer({ imageSrc, altText, hotspots }: ScanViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="border border-white/10 rounded-2xl bg-zinc-950 overflow-hidden flex flex-col lg:flex-row gap-6 p-6">
      <div className="relative flex-1 aspect-square md:aspect-[4/3] bg-black rounded-xl border border-white/5 overflow-hidden">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover opacity-80"
        />
        {/* Render Hotspots */}
        {hotspots.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setActiveHotspot(spot)}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
              activeHotspot?.id === spot.id
                ? "bg-accent border-accent text-black scale-110 shadow-lg shadow-accent/20"
                : "bg-black/60 border-white/30 text-white hover:border-accent hover:scale-105"
            }`}
            style={{ top: spot.top, left: spot.left }}
            aria-label={`View detail: ${spot.title}`}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/20 opacity-75"></span>
            <span className="font-mono text-xs font-bold font-sans">+</span>
          </button>
        ))}
      </div>

      <div className="w-full lg:w-80 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6">
        {activeHotspot ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <BrandIcon id="target-crosshair" className="w-5 h-5" />
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] font-bold">
                Clinical Hotspot
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {activeHotspot.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {activeHotspot.description}
            </p>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-wider font-mono"
            >
              [Clear Selection]
            </button>
          </div>
        ) : (
          <div className="text-center lg:text-left py-12 lg:py-0 text-muted">
            <BrandIcon id="scan-line" className="w-8 h-8 text-white/20 mx-auto lg:mx-0 mb-4 animate-pulse" />
            <h3 className="text-white font-medium mb-2">Interactive Scan Viewer</h3>
            <p className="text-xs leading-relaxed max-w-xs mx-auto lg:mx-0">
              Click any of the pulsing coordinates on the medical scan to overlay clinical findings and biological structural mappings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
