import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { leadMagnets } from "../page";

type ThankYouPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(leadMagnets).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ThankYouPageProps) {
  const { slug } = await params;
  const magnet = leadMagnets[slug];
  if (!magnet) return {};

  return {
    title: `Thank You | ${magnet.title}`,
    description: "Your download is ready. Check your inbox for the access guide and details.",
  };
}

export default async function LeadMagnetThankYouPage({ params }: ThankYouPageProps) {
  const { slug } = await params;
  const magnet = leadMagnets[slug];

  if (!magnet) notFound();

  // Custom paths for segmented next steps
  const nextActions: Record<string, { title: string; desc: string; href: string; label: string }> = {
    "start-here": {
      title: "Map the tests doctors miss",
      desc: "Knowing your symptoms is step 1. Step 2 is validating them with actual biological markers. Explore the testing roadmap next.",
      href: "/testing-roadmap",
      label: "View Testing Roadmap"
    },
    "testing": {
      title: "Explore the Protocol Vault",
      desc: "Now that you have the list of tests, see exactly what daily protocols and stacks look like when targeting those markers.",
      href: "/protocol-vault",
      label: "Open Protocol Vault"
    },
    "protocol": {
      title: "Read the CCI / neck stability guide",
      desc: "Often structural C1-C2 instability lies upstream of gut and immune chaos. Read why upper cervical alignment is the master brake.",
      href: "/craniocervical-instability",
      label: "Read CCI Guide"
    },
    "mold": {
      title: "Explore MCAS and Histamine paths",
      desc: "Environmental mold exposure triggers chronic mast cell degranulation. Read how to stabilize your immune shield.",
      href: "/mcas-histamine",
      label: "Read MCAS Guide"
    },
    "cci": {
      title: "Review the testing checklist",
      desc: "Identify where neck alignment fits inside the broader functional medicine testing roadmap.",
      href: "/testing-roadmap",
      label: "Map The Tests"
    }
  };

  const action = nextActions[slug] || {
    title: "Explore the Testing Roadmap",
    desc: "Check out the missing tests standard doctors fail to order.",
    href: "/testing-roadmap",
    label: "Go to Roadmap"
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[80dvh] flex flex-col justify-center py-32 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/images/textures/texture-dot-grid-1080x1080.png')", backgroundSize: "cover" }} />
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-8">
            <BrandIcon id="check" className="w-8 h-8 text-accent" />
          </div>

          <h1 className="text-4xl md:text-5xl tracking-tighter leading-tight mb-4 text-white font-black">
            Your download is ready.
          </h1>
          <p className="text-lg text-muted mb-10 max-w-xl mx-auto">
            We have sent a copy of the **{magnet.title}** directly to your inbox. You can also download it immediately using the button below.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button href={magnet.downloadUrl} target="_blank" size="lg">
              Download Resource PDF
            </Button>
            <Button href="/protocol-vault" variant="secondary" size="lg">
              Open Protocol Vault
            </Button>
          </div>

          <div className="w-full h-px bg-white/10 my-12" />

          {/* Up-sell / Next step */}
          <div className="border border-accent/20 rounded-2xl p-8 bg-accent/5 max-w-xl mx-auto text-left">
            <h3 className="text-xl font-bold text-white mb-2">{action.title}</h3>
            <p className="text-sm text-muted mb-6 leading-relaxed">
              {action.desc}
            </p>
            <Button href={action.href} className="w-full justify-center">
              {action.label} →
            </Button>
          </div>

          <p className="text-xs text-muted mt-12">
            Looking for something else? Return to the <Link href="/" className="text-accent hover:underline">Homepage</Link> or view our <Link href="/blogs" className="text-accent hover:underline">Blog</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
