import Link from "next/link";

/**
 * ComplianceGate — persistent, non-dismissible global compliance banner.
 *
 * Renders on every page of the site (wired into src/app/layout.tsx).
 * Aligns with the locked Dose of Proof compliance architecture:
 *   - Decisions 8, 12
 *   - 4 Traps framework
 *   - "My Body, Not Yours" rule
 *   - Objective Intent Doctrine (21 CFR 201.128)
 *
 * Educational bridge only. No compounds sold. No dosing protocols. No sourcing.
 *
 * Brand Kit v2 (2026-06-26) — yellow/black clinical poster treatment:
 *   • Solid yellow leading edge (warning tape)
 *   • Hard-edged yellow "EDUCATIONAL BRIDGE ONLY" stamp
 *   • Mono, condensed copy with high-contrast black background
 *
 * Layout note: the navbar above is `fixed` (z-50). Since fixed elements don't
 * take flow space, this banner would render BEHIND the navbar (top half
 * hidden). `mt-16` (64px) reserves the navbar's vertical footprint so the
 * banner's content sits clearly below the navbar, fully visible.
 */
export function ComplianceGate() {
  return (
    <aside
      role="note"
      aria-label="Compliance notice"
      className="relative z-40 mt-16 border-y-2 border-accent bg-background"
    >
      {/* Warning-tape leading edge — 4px solid yellow */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-accent" />

      <div className="max-w-7xl mx-auto pl-5 pr-6 lg:pl-6 lg:pr-12 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {/* Yellow stamp — replaces amber soft tag */}
          <span className="dop-yellow-box text-[10.5px] shrink-0">
            Educational Bridge Only
          </span>
          <p className="text-xs md:text-sm text-foreground/85 leading-relaxed font-mono">
            Dose of Proof does not sell compounds, provide dosing protocols, or facilitate
            sourcing. All health decisions require licensed medical oversight. This site
            demonstrates the proof-centered approach — not the patterns that create
            regulatory exposure.
          </p>
        </div>
        <Link
          href="/medical-disclaimer"
          className="shrink-0 text-xs font-mono uppercase tracking-widest text-accent hover:text-accent-strong underline underline-offset-4 decoration-accent/60 hover:decoration-accent"
        >
          Full disclaimer →
        </Link>
      </div>
    </aside>
  );
}