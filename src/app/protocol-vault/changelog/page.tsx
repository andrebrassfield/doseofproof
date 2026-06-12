import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { ProtocolChangelog } from "@/components/ui/ProtocolChangelog";
import { getAllProtocolVersions, getActiveProtocolVersion } from "@/lib/protocol-versions";

export const metadata: Metadata = {
  title: "Protocol Changelog | Dose of Proof",
  description:
    "Every version of the Dose of Proof protocol — what changed, why, the data deltas, and the evidence. Reverse-chronological.",
  openGraph: {
    title: "Protocol Changelog | Dose of Proof",
    description: "Every version of the Dose of Proof protocol, documented as it happened.",
  },
};

export default function ProtocolChangelogPage() {
  const versions = getAllProtocolVersions();
  const active = getActiveProtocolVersion();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-[80dvh]">
        <section className="px-6 lg:px-12 max-w-4xl mx-auto">
          <header className="mb-12">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-3 block">
              Protocol Changelog
            </span>
            <h1 className="text-4xl md:text-6xl tracking-tighter leading-none mb-4">
              What changed, why, and what the data said.
            </h1>
            <p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed">
              Every documented version of the Dose of Proof protocol, reverse-chronological. Each
              entry includes the strategic reasoning, the actual intervention changes, before /
              after data, and the evidence (scans, lab values, dashboard snapshots).
            </p>
            {active && (
              <p className="text-muted text-xs mt-4 font-mono">
                Currently active: <span className="text-accent">{active.version}</span> —{" "}
                {active.summary}
              </p>
            )}
          </header>

          <ProtocolChangelog versions={versions} fullPage />

          <aside className="mt-16 p-6 border border-white/10 rounded-xl bg-zinc-950/50">
            <h2 className="text-lg font-bold tracking-tight mb-3">Why a changelog</h2>
            <p className="text-sm text-muted leading-relaxed mb-3">
              Most health sites describe their protocol as if it were a static recipe. Mine
              isn&apos;t — it&apos;s a living system that changes every few months when the data
              warrants it. The changelog makes those changes legible.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              The <em>why</em> for each version is the part only I (Dre) can write — it&apos;s
              strategic intent, not technical detail. Each version file in the source has a
              <code className="mx-1 px-1 py-0.5 bg-white/5 rounded text-accent text-xs">
                why
              </code>
              field; replace any{" "}
              <code className="px-1 py-0.5 bg-white/5 rounded text-amber-400 text-xs">
                PLACEHOLDER
              </code>{" "}
              marker with the real reasoning before publishing.
            </p>
          </aside>
        </section>
      </main>
      <DisclaimerBanner />
      <Footer />
    </>
  );
}
