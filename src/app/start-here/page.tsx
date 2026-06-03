import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";

export const metadata: Metadata = {
  title: "Start Here: Dre's Dose of Proof",
  description:
    "The origin story, proof stack, and best next steps for following Dose of Proof.",
};

const proofBeats = [
  {
    title: "The symptoms got too specific to ignore.",
    body: "Brain fog, burning pain, anxiety overlap, neck instability, food reactions, and the slow realization that generic wellness advice was not going to solve it.",
  },
  {
    title: "The scans changed the conversation.",
    body: "Upper cervical imaging and TyTron scans gave the story a mechanical root: C1-C2 instability, loss of curve, and nervous-system irritation.",
  },
  {
    title: "The house was part of the terrain.",
    body: "Four years of hidden mold exposure turned recovery into a full-system audit: structure, environment, immune load, sleep, minerals, and nervous-system output.",
  },
];

const nextSteps = [
  { href: "/testing-roadmap", label: "Map the tests", icon: "test-tube" },
  { href: "/protocol-vault", label: "See the protocol", icon: "folder-structure" },
  { href: "/lead-magnet", label: "Download the checklist", icon: "bookmark-save" },
];

export default function StartHerePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28">
        <section className="px-6 lg:px-12 py-20 border-b border-white/10 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div>
              <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-6 block">
                Dre's Dose of Proof
              </span>
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.05] mb-8">
                Start with the proof.
                <span className="block text-white/50">Then build the protocol.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-2xl mb-10">
                Dose of Proof is the public recovery lab I wish existed when doctors kept telling me I was fine. This is where I document the scans, tests, protocols, and hard-earned sequence behind rebuilding my terrain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/testing-roadmap" size="lg">
                  Start Mapping
                </Button>
                <Button href="/about" variant="secondary" size="lg">
                  Read the Full Story
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <Image
                  src="/marketing-assets/images/personal-proof/combined-scans.png"
                  alt="Dre's cervical imaging and scan proof"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <Image
                  src="/marketing-assets/images/personal-proof/gaslight-card-1.png"
                  alt="Medical gaslighting proof card"
                  fill
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <Image
                  src="/marketing-assets/images/personal-proof/mold-timeline-mobile.png"
                  alt="Mold exposure recovery timeline"
                  fill
                  sizes="(min-width: 1024px) 24vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-20 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {proofBeats.map((beat, index) => (
                <div key={beat.title} className="border border-white/10 rounded-2xl p-6 bg-black/40">
                  <div className="text-accent font-mono text-xs mb-6">0{index + 1}</div>
                  <h2 className="text-2xl tracking-tight font-bold mb-4">{beat.title}</h2>
                  <p className="text-muted leading-relaxed text-sm">{beat.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-24 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-5">
                The Operating System
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tighter mb-6">
                Follow the recovery like a system, not a highlight reel.
              </h2>
              <p className="text-muted leading-relaxed mb-8">
                The brand is built around one promise: show the actual terrain. The wins, the false starts, the labs, the imaging, the protocol changes, the products worth trying, and the things I would skip.
              </p>
              <Button href="/lead-magnet" size="lg">
                Get the 30-Day Checklist
              </Button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {nextSteps.map((step) => (
                <Link
                  key={step.href}
                  href={step.href}
                  className="group border border-white/10 rounded-2xl p-6 bg-zinc-950/70 hover:border-accent/50 transition-colors"
                >
                  <BrandIcon id={step.icon} className="w-7 h-7 text-accent mb-8" />
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                    {step.label}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
