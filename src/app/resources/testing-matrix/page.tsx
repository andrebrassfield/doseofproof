import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { TestingMatrix } from "@/components/ui/TestingMatrix";
import { getTestingMatrix } from "@/lib/testing-matrix";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testing Decision Matrix | Dose of Proof",
  description:
    "Filterable table of every lab and imaging test on Dose of Proof — symptom cluster to test, cost band, turnaround, and Dre's own results.",
  openGraph: {
    title: "Testing Decision Matrix | Dose of Proof",
    description: "Every lab and imaging test on Dose of Proof, with cost, turnaround, and real results.",
  },
};

export default function TestingMatrixPage() {
  const rows = getTestingMatrix();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-[80dvh]">
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <header className="mb-10">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-3 block">
              Testing Decision Matrix
            </span>
            <h1 className="text-4xl md:text-6xl tracking-tighter leading-none mb-4">
              Every test I&apos;ve run, ranked by what it proved.
            </h1>
            <p className="text-muted text-base md:text-lg max-w-3xl leading-relaxed">
              Six labs and imaging studies. Filter by pillar (Structure, Mold, MCAS, Autonomic), sort
              by cost or my own result, and read the deep-dive on each. This is the same matrix I
              use when triaging a new symptom cluster — symptom first, test second, lab third.
            </p>
            <p className="text-muted text-xs mt-4 font-mono">
              Last updated {new Date().toISOString().slice(0, 10)} · {rows.length} tests · Data
              sourced from each{" "}
              <Link href="/tests" className="text-accent hover:underline">
                test guide
              </Link>{" "}
              + editorial supplementation
            </p>
          </header>

          <TestingMatrix rows={rows} />

          <aside className="mt-12 p-6 border border-white/10 rounded-xl bg-zinc-950/50">
            <h2 className="text-lg font-bold tracking-tight mb-3">How to use this matrix</h2>
            <ol className="space-y-2 text-sm text-muted list-decimal pl-5">
              <li>
                <strong className="text-white">Start with the symptom cluster.</strong> If the
                dominant complaint is mechanical (neck, head pressure, posture-dependent), filter
                Structure. If it&apos;s biotoxin (sinus, fatigue, brain fog in a water-damaged
                building), filter Mold.
              </li>
              <li>
                <strong className="text-white">Cross-reference cost &amp; turnaround.</strong>{" "}
                Cervical imaging is fast and cheap. Mycotoxin urine panels are slow and expensive.
                Sequence accordingly.
              </li>
              <li>
                <strong className="text-white">Use &quot;My Result&quot; as a calibration anchor.</strong>{" "}
                The confirmed / abnormal flags on each row are my own data. They tell you what the
                test actually caught in someone with a multi-year chronic illness — useful for
                interpreting your own.
              </li>
              <li>
                <strong className="text-white">Click into the test guide.</strong> Each name links to
                the full MDX spec with FAQ, what-it-can-show, and the next test in the chain.
              </li>
            </ol>
          </aside>
        </section>
      </main>
      <DisclaimerBanner />
      <Footer />
    </>
  );
}
