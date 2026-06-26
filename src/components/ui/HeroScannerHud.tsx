"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * HeroScannerHud — right-column clinical scanner HUD for the homepage hero.
 *
 * Composition (back to front):
 *   1. Subtle grid + dot texture overlay
 *   2. DNA watermark (CSS-filtered to a warm yellow tint)
 *   3. Vertical ruler (left edge)
 *   4. Corner brackets (4 corners)
 *   5. Floating "INFLAMMATION -86%" callout boxes (staggered)
 *   6. Central "PROOF" plate with corner brackets
 *   7. Animated scanline sweep
 *
 * All overlays are pure CSS + absolutely-positioned divs — no images, no canvas.
 * Uses Motion's `useReducedMotion` to disable animation for accessibility.
 */
export function HeroScannerHud() {
  const reduce = useReducedMotion();

  // Stagger timings for the callouts — gives the "live readout" feel
  const callouts = [
    { top: "8%",  left: "62%", label: "INFLAMMATION", value: "-86%", delay: 0.0 },
    { top: "32%", left: "12%", label: "VAGAL TONE",   value: "+41%", delay: 0.6 },
    { top: "55%", left: "70%", label: "HRV",          value: "+28ms", delay: 1.2 },
    { top: "78%", left: "22%", label: "INFLAMMATION", value: "-86%", delay: 1.8 },
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full bg-background overflow-hidden"
    >
      {/* 1. Grid texture (very subtle) */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            "url('/marketing-assets/images/hero/hero-dark-grid-1920x1080.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2. DNA watermark — CSS-filtered to a warm yellow so the particles
             read as "golden", not as the dark grey they actually are */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('/marketing-assets/images/hero/hero-dark-dna-watermark-1920x1080.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter:
            "brightness(1.6) contrast(1.4) sepia(1) saturate(8) hue-rotate(350deg)",
          opacity: 0.85,
          maskImage:
            "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 90%)",
        }}
      />

      {/* Soft yellow gradient overlay (center-right glow) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 50%, rgba(255, 214, 10, 0.10), transparent 70%)",
        }}
      />

      {/* Scanline sweep — animates a thin yellow line top-to-bottom */}
      {!reduce && (
        <motion.div
          className="absolute left-0 right-0 h-px bg-accent/60 pointer-events-none"
          style={{ boxShadow: "0 0 24px rgba(255, 214, 10, 0.5)" }}
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        />
      )}

      {/* 3. Vertical ruler (left edge) */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/40 pointer-events-none" />
      <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between py-6 pointer-events-none">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 text-[9px] font-mono text-accent/60 tracking-widest"
          >
            <span
              className={`block bg-accent/60 ${
                i % 5 === 0 ? "w-3 h-px" : "w-2 h-px"
              }`}
            />
            {i % 5 === 0 && <span>{String(i * 10).padStart(2, "0")}</span>}
          </div>
        ))}
      </div>

      {/* 4. Corner brackets — yellow L-marks */}
      {[
        "top-6 right-6 border-t-2 border-r-2",
        "top-6 left-6 border-t-2 border-l-2",
        "bottom-6 right-6 border-b-2 border-r-2",
        "bottom-6 left-6 border-b-2 border-l-2",
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute w-10 h-10 border-accent pointer-events-none ${cls}`}
        />
      ))}

      {/* 5. Floating INFLAMMATION / VAGAL callouts — staggered, each with its
             own little corner brackets */}
      {callouts.map((c, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: c.top, left: c.left }}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: [0, 1, 1, 1], y: 0 }}
          transition={{
            duration: 0.6,
            delay: c.delay,
            repeat: Infinity,
            repeatDelay: 6,
            repeatType: "loop",
          }}
        >
          {/* Corner brackets around the callout */}
          <div className="absolute -top-2 -left-2 w-3 h-3 border-l-2 border-t-2 border-accent" />
          <div className="absolute -top-2 -right-2 w-3 h-3 border-r-2 border-t-2 border-accent" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 border-l-2 border-b-2 border-accent" />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 border-r-2 border-b-2 border-accent" />

          {/* Connector dots */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />

          {/* The plate */}
          <div className="bg-background/85 backdrop-blur-sm border border-stone px-3 py-1.5 min-w-[120px] text-center">
            <div className="text-[9px] font-mono uppercase tracking-widest text-accent/80 leading-none mb-0.5">
              {c.label}
            </div>
            <div className="text-sm font-mono font-bold text-foreground tracking-tight leading-none">
              {c.value}
            </div>
          </div>
        </motion.div>
      ))}

      {/* 6. Central PROOF plate with corner brackets */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-6 h-6 border-l-2 border-t-2 border-accent" />
          <div className="absolute -top-4 -right-4 w-6 h-6 border-r-2 border-t-2 border-accent" />
          <div className="absolute -bottom-4 -left-4 w-6 h-6 border-l-2 border-b-2 border-accent" />
          <div className="absolute -bottom-4 -right-4 w-6 h-6 border-r-2 border-b-2 border-accent" />

          <motion.div
            className="px-6 py-3 bg-background/70 backdrop-blur-md border border-accent/40"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent/80 text-center mb-1">
              Verified
            </div>
            <div className="text-3xl font-display font-black tracking-[0.2em] text-foreground text-center">
              PROOF
            </div>
          </motion.div>
        </div>
      </div>

      {/* 7. Top + bottom info strips (like a HUD readout) */}
      <div className="absolute top-6 right-20 flex items-center gap-3 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80">
          Live · Subject #001
        </span>
      </div>
      <div className="absolute bottom-6 right-20 pointer-events-none">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted/80">
          TyTron · Lateral X-Ray · 7mo
        </span>
      </div>
    </div>
  );
}