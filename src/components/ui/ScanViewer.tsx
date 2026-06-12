"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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
  /**
   * Optional caption shown below the image (e.g. source / date / study link).
   * Rendered in the no-JS fallback as a `<figcaption>` for SEO + accessibility.
   */
  caption?: string;
}

/**
 * Interactive diagnostic scan viewer.
 *
 * Spec (Phase 5.2):
 * - Click any pulsing `+` hotspot to reveal its clinical detail in the side panel.
 * - Click the image to open a fullscreen modal with zoom/pan (react-zoom-pan-pinch).
 * - Keyboard: Tab between hotspots, Enter/Space to select, Esc to close modal,
 *   +/- to zoom inside the modal.
 * - No-JS fallback: the server-rendered HTML is a `<details><summary>View
 *   annotated scan</summary><img>…` block, fully usable without JavaScript.
 */
export function ScanViewer({ imageSrc, altText, hotspots, caption }: ScanViewerProps) {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const transformRef = useRef<any>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  const handleHotspotKey = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveHotspot(hotspots[idx]);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (idx + 1) % hotspots.length;
        (document.querySelectorAll("[data-scan-hotspot]")[next] as HTMLElement | undefined)?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (idx - 1 + hotspots.length) % hotspots.length;
        (document.querySelectorAll("[data-scan-hotspot]")[prev] as HTMLElement | undefined)?.focus();
      }
    },
    [hotspots]
  );

  // Lock body scroll when modal is open + Esc to close + return focus on close.
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    modalCloseRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      {/* The interactive client island. Hidden when JS is disabled — the <noscript>
          fallback below provides the no-JS experience. */}
      <div
        className="border border-white/10 rounded-2xl bg-zinc-950 overflow-hidden flex flex-col lg:flex-row gap-6 p-6 js-only"
        data-component="ScanViewer"
      >
        <div className="relative flex-1 aspect-square md:aspect-[4/3] bg-black rounded-xl border border-white/5 overflow-hidden group">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setModalOpen(true)}
            className="absolute inset-0 z-0 cursor-zoom-in"
            aria-label={`Open ${altText} in fullscreen with zoom controls`}
          >
            <Image
              src={imageSrc}
              alt={altText}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover opacity-80"
            />
          </button>

          {/* Hotspot markers (sit above the image trigger button) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {hotspots.map((spot, idx) => (
              <button
                key={spot.id}
                data-scan-hotspot
                data-active={activeHotspot?.id === spot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(spot);
                }}
                onKeyDown={(e) => handleHotspotKey(e, idx)}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 pointer-events-auto ${
                  activeHotspot?.id === spot.id
                    ? "bg-accent border-accent text-black scale-110 shadow-lg shadow-accent/20"
                    : "bg-black/60 border-white/30 text-white hover:border-accent hover:scale-105"
                }`}
                style={{ top: spot.top, left: spot.left }}
                aria-label={`View detail: ${spot.title}`}
                aria-expanded={activeHotspot?.id === spot.id}
                aria-controls="scan-detail-panel"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/20 opacity-75"></span>
                <span className="font-mono text-xs font-bold font-sans">+</span>
              </button>
            ))}
          </div>
        </div>

        <div
          id="scan-detail-panel"
          role="region"
          aria-live="polite"
          className="w-full lg:w-80 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-6"
        >
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
                Click any of the pulsing coordinates on the medical scan to overlay clinical findings and biological structural mappings. Click the image to zoom in fullscreen.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen zoom modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${altText} — zoom view`}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white/70 text-sm font-mono uppercase tracking-widest">
              {altText}
            </span>
            <button
              ref={modalCloseRef}
              onClick={() => {
                setModalOpen(false);
                triggerRef.current?.focus();
              }}
              className="text-white/70 hover:text-white text-sm font-mono uppercase tracking-widest px-3 py-1 border border-white/20 rounded"
              aria-label="Close zoom view"
            >
              Close [esc]
            </button>
          </div>
          <div className="flex-1 relative">
            <TransformWrapper
              ref={transformRef}
              initialScale={1}
              minScale={1}
              maxScale={6}
              wheel={{ step: 0.2 }}
              doubleClick={{ mode: "zoomIn", step: 0.6 }}
              panning={{ disabled: false }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={() => zoomIn()}
                      className="w-10 h-10 rounded bg-white/10 hover:bg-white/20 text-white text-lg"
                      aria-label="Zoom in"
                    >
                      +
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="w-10 h-10 rounded bg-white/10 hover:bg-white/20 text-white text-lg"
                      aria-label="Zoom out"
                    >
                      −
                    </button>
                    <button
                      onClick={() => resetTransform()}
                      className="px-3 h-10 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
                      aria-label="Reset zoom"
                    >
                      RESET
                    </button>
                  </div>
                  <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{ width: "100%", height: "100%" }}
                  >
                    <Image
                      src={imageSrc}
                      alt={altText}
                      fill
                      sizes="100vw"
                      className="object-contain"
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      )}

      {/* No-JS fallback: server-rendered <details> with the static image and a
          textual hotspot list. Activated by disabling JS or via assistive tech
          that strips scripts. Visible only when the .js-only class would be hidden. */}
      <noscript>
        <details className="border border-white/10 rounded-2xl bg-zinc-950 p-6 my-6">
          <summary className="cursor-pointer text-white font-medium">
            View annotated scan (no-JS mode)
          </summary>
          <figure className="mt-4">
            {/* Plain <img> so it works without next/image's runtime */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={altText}
              className="w-full h-auto rounded border border-white/5"
            />
            {caption && (
              <figcaption className="text-xs text-muted mt-2 text-center">{caption}</figcaption>
            )}
          </figure>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {hotspots.map((spot) => (
              <li key={spot.id}>
                <strong className="text-white">{spot.title}:</strong> {spot.description}
              </li>
            ))}
          </ul>
        </details>
      </noscript>
    </>
  );
}
