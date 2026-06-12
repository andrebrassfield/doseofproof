import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { SpecialistNetwork } from "@/components/ui/SpecialistNetwork";
import { getAllSpecialists } from "@/lib/specialists";

export const metadata: Metadata = {
  title: "Specialist Network | Dose of Proof",
  description:
    "Vetted NUCCA chiropractors, functional medicine doctors, MCAS specialists, and CIRS/Shoemaker practitioners. Map + filter by specialty, location, and remote availability.",
  openGraph: {
    title: "Specialist Network | Dose of Proof",
    description: "Vetted specialists — NUCCA, Blair, MCAS, CIRS, functional medicine, and more.",
  },
};

export default async function SpecialistNetworkPage() {
  const { rows, source } = await getAllSpecialists();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-[80dvh]">
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <header className="mb-10">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-3 block">
              Specialist Network
            </span>
            <h1 className="text-4xl md:text-6xl tracking-tighter leading-none mb-4">
              Providers I&apos;ve vetted, mapped.
            </h1>
            <p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed">
              Every specialist in this network has either personally treated me, was vetted by a
              trusted clinician in my orbit, or was independently confirmed by a patient community
              I trust. Filter by specialty, location, or remote availability. Click a pin for
              details.
            </p>
            <p className="text-muted text-xs mt-4 font-mono">
              Data source: <span className="text-accent">{source}</span> · {rows.length} providers
              currently listed · Last reviewed {new Date().toISOString().slice(0, 10)}
            </p>
          </header>

          <SpecialistNetwork rows={rows} />

          <aside className="mt-12 p-6 border border-white/10 rounded-xl bg-zinc-950/50">
            <h2 className="text-lg font-bold tracking-tight mb-3">Vetting policy</h2>
            <p className="text-sm text-muted leading-relaxed mb-3">
              A specialist is added to the public network only after one of:
            </p>
            <ol className="space-y-2 text-sm text-muted list-decimal pl-5 mb-3">
              <li>I (Dre) have personally consulted with them.</li>
              <li>A clinician I trust (NUCCA specialist, functional medicine MD) has referred patients to them with positive long-term outcomes.</li>
              <li>
                A patient community I trust has independently confirmed them with multiple positive
                outcomes.
              </li>
            </ol>
            <p className="text-sm text-muted leading-relaxed">
              I do not accept payment, referral fees, or affiliate arrangements from any provider
              in this network. The list is editorial, not commercial.
            </p>
          </aside>
        </section>
      </main>
      <DisclaimerBanner />
      <Footer />
    </>
  );
}
