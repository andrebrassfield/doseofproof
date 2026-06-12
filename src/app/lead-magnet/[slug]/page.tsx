import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Button } from "@/components/ui/Button";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import type { Metadata } from "next";
import LeadMagnetForm from "./LeadMagnetForm";

type LeadMagnetData = {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
  downloadUrl: string;
  metaTitle: string;
  metaDesc: string;
};

export const leadMagnets: Record<string, LeadMagnetData> = {
  "start-here": {
    title: "30-Day Symptom Mapping Checklist",
    subtitle: "Start stabilizing your terrain objectively.",
    description: "Get the exact 30-day mapping template to record your physiological baselines and identify pattern deviations.",
    benefits: [
      "Objective symptom scoring tools",
      "Morning vs. evening HRV variance tracking",
      "Histamine food reaction log grids",
      "Daily activity to symptom correlation matrices"
    ],
    image: "/marketing-assets/lead_magnet_card.png",
    downloadUrl: "/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    metaTitle: "30-Day Symptom Mapping Checklist | Dose of Proof",
    metaDesc: "Download the free 30-day symptom mapping checklist to objectively map your physiological baselines."
  },
  "testing": {
    title: "The Tests Your Doctor Won't Order",
    subtitle: "PDF + Notion Lab Tracking Template",
    description: "The complete checklist of 26 blood, urine, and environmental tests, functional ranges, and ready-to-use Notion tracker database.",
    benefits: [
      "CIRS Panel, MCAS Panel, and Mycotoxin test checklists",
      "Functional vs. conventional range cheat sheet",
      "Pre-loaded CPT billing codes for insurance requests",
      "Click-and-clone Notion Lab Results database template"
    ],
    image: "/marketing-assets/what_doctors_miss_card.png",
    downloadUrl: "/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    metaTitle: "The Tests Your Doctor Won't Order | Dose of Proof",
    metaDesc: "Download the free guide and Notion template for advanced chronic illness lab tests and tracking."
  },
  "protocol": {
    title: "Protocol Vault Starter Kit",
    subtitle: "Notion + Airtable Tracking Bases",
    description: "Get the exact spreadsheet templates, database schemas, and daily logs used to monitor supplement stacks, medication timing, and biomarker shifts.",
    benefits: [
      "Complete supplement stack tracking database schema",
      "Daily HPA-axis and autonomic output logging bases",
      "Dosing titration logs for sensitive immune systems",
      "Click-to-clone Airtable and Notion workspaces"
    ],
    image: "/marketing-assets/color_palette_sheet.png",
    downloadUrl: "/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    metaTitle: "Protocol Vault Starter Kit | Dose of Proof",
    metaDesc: "Download the free Notion and Airtable bases to track your daily health protocols and biomarkers."
  },
  "mold": {
    title: "Mold Exposure Audit Workbook",
    subtitle: "Environmental Evaluation Workbook",
    description: "The exact workbook to systematically inspect your living environment, audit air quality, and prepare for professional ERMI testing.",
    benefits: [
      "Room-by-room water damage and humidity audits",
      "ERMI dust sampling protocol checklist",
      "Professional remediator vetting questionnaires",
      "Mycotoxin excretion binders reference chart"
    ],
    image: "/marketing-assets/images/proof-cards/proof-mycotoxin-card-1080x1080.png",
    downloadUrl: "/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    metaTitle: "Mold Exposure Audit Workbook | Dose of Proof",
    metaDesc: "Download the free mold exposure audit workbook to evaluate your home for water damage and toxic mold."
  },
  "cci": {
    title: "Cervical Imaging Decision Tree",
    subtitle: "Neurological Symptom Evaluation Tree",
    description: "A clinical decision tree mapping upper cervical symptoms to dynamic imaging requests (X-Ray, DMX, Upright MRI).",
    benefits: [
      "Flexion/extension dynamic X-Ray requirements",
      "Open-mouth views alignment parameters",
      "Grabb-Oakes and CXA angle measurement reference ranges",
      "Practitioner reference letters for ordering scans"
    ],
    image: "/marketing-assets/scans/tytron-scan.png",
    downloadUrl: "/marketing-assets/The_First_30_Days_Mold_Detox_Checklist.pdf",
    metaTitle: "Cervical Imaging Decision Tree | Dose of Proof",
    metaDesc: "Download the free cervical imaging decision tree to guide your upper neck diagnostics."
  }
};

type ParamsProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(leadMagnets).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { slug } = await params;
  const magnet = leadMagnets[slug];
  if (!magnet) return {};

  return {
    title: magnet.metaTitle,
    description: magnet.metaDesc,
    openGraph: {
      title: magnet.metaTitle,
      description: magnet.metaDesc,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(magnet.title)}&category=GUIDE&description=${encodeURIComponent(magnet.subtitle)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: magnet.metaTitle,
      description: magnet.metaDesc,
      images: [`/api/og?title=${encodeURIComponent(magnet.title)}&category=GUIDE&description=${encodeURIComponent(magnet.subtitle)}`],
    },
  };
}

export default async function SegmentedLeadMagnetPage({ params }: ParamsProps) {
  const { slug } = await params;
  const magnet = leadMagnets[slug];

  if (!magnet) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-[100dvh] flex flex-col justify-center py-32 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('/marketing-assets/images/textures/texture-noise-grain-1080x1080.png')", backgroundSize: "cover" }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          <div className="flex-1 w-full max-w-xl">
             <Image 
                src={magnet.image}
                alt={`${magnet.title} Cover`}
                width={1080}
                height={1350}
                sizes="(min-width: 768px) 50vw, 100vw"
                wrapperClassName="rounded-2xl border border-white/20 shadow-2xl shadow-accent/5 w-full"
                className="w-full h-auto"
                priority
             />
          </div>

          <div className="flex-1 w-full">
            <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-6 block">
              Free Segmented Resource
            </span>
            <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6 text-white font-black">
              {magnet.title}
            </h1>
            <p className="text-accent font-mono text-sm uppercase tracking-widest block mb-6">
              {magnet.subtitle}
            </p>
            
            <p className="text-lg text-muted mb-8 leading-relaxed">
              {magnet.description}
            </p>

            <ul className="space-y-4 mb-10">
              {magnet.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90">
                  <BrandIcon id="check" className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="bg-black/50 border border-white/10 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full object-cover" preserveAspectRatio="none">
                  <use href="/svgs/animated/animated-overlays.svg#pulse-ring-animation" />
                </svg>
              </div>
              <h3 className="font-bold text-white mb-4 relative z-10">Send it to my inbox</h3>
              
              <LeadMagnetForm slug={slug} downloadUrl={magnet.downloadUrl} />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 relative z-10">
                <p className="text-xs text-muted">Free download. No spam, just proof.</p>
                <a 
                  href={magnet.downloadUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-accent hover:underline font-medium"
                >
                  Download Sample Pages
                </a>
              </div>
            </div>
          </div>

        </div>
        
        {/* Shop CTA Banner */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-32 relative z-10">
          <div className="bg-zinc-900 border border-white/10 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Want the full operating system?</h2>
              <p className="text-muted text-lg max-w-xl">
                Skip the guesswork. Get the exact supplements, peptides, and advanced testing guides I use to maintain remission.
              </p>
            </div>
            <Button href="/shop" size="lg" className="shrink-0">
              Shop the Protocol →
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
