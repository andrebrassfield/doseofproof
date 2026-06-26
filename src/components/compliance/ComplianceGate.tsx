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
 */
export function ComplianceGate() {
  return (
    <aside
      role="note"
      aria-label="Compliance notice"
      className="relative z-40 border-y border-amber-500/30 bg-amber-500/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed font-mono">
          <span className="font-bold uppercase tracking-widest text-amber-400/90 mr-2">
            Educational bridge only.
          </span>
          Dose of Proof does not sell compounds, provide dosing protocols, or facilitate
          sourcing. All health decisions require licensed medical oversight. This site
          demonstrates the proof-centered approach — not the patterns that create
          regulatory exposure.
        </p>
        <Link
          href="/medical-disclaimer"
          className="shrink-0 text-xs font-mono uppercase tracking-widest text-amber-300 hover:text-amber-200 underline underline-offset-4"
        >
          Full disclaimer →
        </Link>
      </div>
    </aside>
  );
}
