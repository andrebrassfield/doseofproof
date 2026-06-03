import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";

export const metadata: Metadata = {
  title: "Protocol Vault: What Dre Is Actually Doing",
  description:
    "The living Dose of Proof protocol vault for CCI, mold recovery, vagal tone, MCAS, supplements, and tracking.",
};

const protocolTracks = [
  {
    title: "Structure",
    body: "Upper cervical care, curve restoration, posture constraints, and what changes after each adjustment.",
    image: "/marketing-assets/images/personal-proof/cervical-xray.png",
    icon: "spine-neck",
  },
  {
    title: "Inflammation",
    body: "MCAS, histamine load, mold detox sequencing, binders, and the symptoms that move first.",
    image: "/marketing-assets/images/proof-cards/proof-inflammation-chart-1080x1080.png",
    icon: "inflammation-flame",
  },
  {
    title: "Recovery Output",
    body: "HRV, sleep, symptom trend, nervous-system capacity, and the daily dashboard that keeps the story honest.",
    image: "/marketing-assets/images/personal-proof/proof-dashboard-mockup.png",
    icon: "chart-up",
  },
];

const offers = [
  { href: "/lead-magnet", title: "Free 30-Day Checklist", desc: "Start the sequence without buying anything." },
  { href: "/products/what-doctors-miss", title: "Testing Guide", desc: "The paid diagnostic roadmap for deeper mapping." },
  { href: "/work-with-me", title: "Work With Dre", desc: "Apply when you need help sequencing the terrain." },
];

export default function ProtocolVaultPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28">
        <section className="px-6 lg:px-12 py-20 border-b border-white/10 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
            <div>
              <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-6 block">
                Living Protocol Vault
              </span>
              <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.05] mb-8">
                What I am doing.
                <span className="block text-white/50">What is actually changing.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-2xl mb-10">
                This is the brand engine: a living vault of protocols, products, tests, and tracking notes. No miracle claims. Just the operating system behind the recovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/testing-roadmap" size="lg">
                  Map Your Terrain
                </Button>
                <Button href="/vault" variant="secondary" size="lg">
                  Browse Products
                </Button>
              </div>
            </div>
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
              <Image
                src="/marketing-assets/images/personal-proof/protocol-infographic-landscape.png"
                alt="Dose of Proof protocol root cause map"
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover opacity-90"
                priority
              />
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-20 bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl tracking-tighter mb-10">The tracks I am publishing</h2>
            <div className="grid lg:grid-cols-3 gap-4">
              {protocolTracks.map((track) => (
                <div key={track.title} className="border border-white/10 rounded-2xl overflow-hidden bg-black/40">
                  <div className="relative aspect-[16/10] bg-zinc-900">
                    <Image
                      src={track.image}
                      alt={`${track.title} protocol visual`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <BrandIcon id={track.icon} className="w-6 h-6 text-accent mb-6" />
                    <h3 className="text-2xl font-bold tracking-tight mb-3">{track.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{track.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-20 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div>
              <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-5">
                Brand Flywheel
              </span>
              <h2 className="text-4xl md:text-5xl tracking-tighter mb-6">
                Content becomes trust. Trust becomes the product line.
              </h2>
              <p className="text-muted leading-relaxed">
                The vault should become the source of truth behind newsletter issues, short-form clips, affiliate recommendations, paid guides, and future community drops.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <Link
                  key={offer.href}
                  href={offer.href}
                  className="group border border-white/10 rounded-2xl p-6 bg-zinc-950/70 hover:border-accent/50 transition-colors"
                >
                  <BrandIcon id="bookmark-save" className="w-6 h-6 text-accent mb-8" />
                  <h3 className="text-xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{offer.desc}</p>
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
