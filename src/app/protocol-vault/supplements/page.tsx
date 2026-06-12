import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { SupplementStackTracker } from "@/components/ui/SupplementStackTracker";
import { getAllSupplements } from "@/lib/supplements";

export const metadata: Metadata = {
  title: "Supplement Stack Tracker | Dose of Proof",
  description:
    "Dre's current supplement stack — compound, dose, brand, cycle, body-system phase, and tracked biomarker / outcome.",
  openGraph: {
    title: "Supplement Stack Tracker | Dose of Proof",
    description: "Current supplement stack with doses, brands, phases, and outcomes.",
  },
};

export default async function SupplementStackPage() {
  const { rows, source } = await getAllSupplements();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-[80dvh]">
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <header className="mb-10">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-3 block">
              Supplement Stack Tracker
            </span>
            <h1 className="text-4xl md:text-6xl tracking-tighter leading-none mb-4">
              What I&apos;m actually taking, and why.
            </h1>
            <p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed">
              Every compound in my current stack — exact dose, brand, daily cycle, body-system phase,
              and the biomarker I track to know it&apos;s working. Filter by phase (Structure /
              Inflammation / Recovery Output / Drainage / Foundational). The stack changes with
              each protocol version.
            </p>
            <p className="text-muted text-xs mt-4 font-mono">
              Data source: <span className="text-accent">{source}</span> · {rows.length} compounds
              currently disclosed · Last updated {new Date().toISOString().slice(0, 10)}
            </p>
          </header>

          <SupplementStackTracker rows={rows} />

          <aside className="mt-12 p-6 border border-white/10 rounded-xl bg-zinc-950/50">
            <h2 className="text-lg font-bold tracking-tight mb-3">Disclosure policy</h2>
            <p className="text-sm text-muted leading-relaxed mb-3">
              A compound appears in this stack only when:
            </p>
            <ol className="space-y-2 text-sm text-muted list-decimal pl-5 mb-3">
              <li>I (Dre) have taken it for at least 4 weeks.</li>
              <li>I have a measurable outcome (lab, scan, or symptom) tied to the intervention.</li>
              <li>I&apos;m willing to publicly recommend the exact brand and dose.</li>
            </ol>
            <p className="text-sm text-muted leading-relaxed">
              Affiliate links, when present, are always tagged{" "}
              <code className="text-amber-400">rel=&quot;sponsored&quot;</code> and paired with a free
              DIY alternative. I don&apos;t accept paid placements. Compounds I&apos;m still
              experimenting with stay in the Airtable base with <code>disclose: false</code> and
              never appear here.
            </p>
          </aside>
        </section>
      </main>
      <DisclaimerBanner />
      <Footer />
    </>
  );
}
