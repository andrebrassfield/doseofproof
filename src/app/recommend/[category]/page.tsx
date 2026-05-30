import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BrandIcon } from "@/components/ui/BrandIcon";

// Static categories for export
export function generateStaticParams() {
  return [
    { category: 'peptides' },
    { category: 'mold-detox' },
    { category: 'diagnostics' },
  ];
}

const CATEGORY_DATA: Record<string, { title: string, description: string, products: any[] }> = {
  'peptides': {
    title: 'Peptide Protocols',
    description: 'The specific systemic signaling molecules I used for tissue repair, immune modulation, and nervous system recovery.',
    products: [
      {
        name: 'BPC-157 (Systemic Repair)',
        brand: 'PSPeptides',
        mechanism: 'Up-regulates angiogenesis, repairs gut lining, and rapidly heals connective tissue (crucial for CCI).',
        take: 'This was the foundation of my repair phase. It stopped the rapid tissue degradation.',
        link: 'https://pspeptides.com?ref=dre',
        icon: 'injection'
      },
      {
        name: 'GHK-Cu (Copper Peptide)',
        brand: 'PSPeptides',
        mechanism: 'Gene expression reset and collagen remodeling post-inflammation.',
        take: 'Used in cycle with BPC-157. Warning: it stings, but the systemic anti-inflammatory effect was profound.',
        link: 'https://pspeptides.com?ref=dre',
        icon: 'drops'
      }
    ]
  },
  'mold-detox': {
    title: 'Mold Detox Framework',
    description: 'The precise binders, liposomal supports, and drainage activators that worked without crashing me.',
    products: [
      {
        name: 'Liposomal Glutathione',
        brand: 'CellCore / QuickSilver',
        mechanism: 'Replenishes the master antioxidant depleted by mycotoxin oxidative stress.',
        take: 'Standard pills get destroyed in the gut. Liposomal is non-negotiable here.',
        link: '#',
        icon: 'pill'
      },
      {
        name: 'Broad Spectrum Binder',
        brand: 'Various',
        mechanism: 'Charcoal, Bentonite, and Chlorella blend to bind multiple mycotoxin structures in the GI tract.',
        take: 'Start slow. If you don\'t bind, the toxins just recirculate.',
        link: '#',
        icon: 'capsule'
      }
    ]
  },
  'diagnostics': {
    title: 'Functional Diagnostics',
    description: 'The lab tests that actually provided proof when standard medicine said "everything looks normal."',
    products: [
      {
        name: 'Urine Mycotoxin Panel',
        brand: 'RealTime Labs / Great Plains',
        mechanism: 'Detects excreted mycotoxin metabolites via mass spectrometry.',
        take: 'The definitive proof you need to know exactly which fungi you are fighting.',
        link: '#',
        icon: 'flask'
      },
      {
        name: 'GI Map (Stool Analysis)',
        brand: 'Diagnostic Solutions',
        mechanism: 'Quantitative PCR to measure gut pathogens, commensal bacteria, and secretory IgA.',
        take: 'Shows exactly how the mold has destroyed your gut barrier function.',
        link: '#',
        icon: 'microscope'
      }
    ]
  }
};

export default async function RecommendCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const data = CATEGORY_DATA[resolvedParams.category];

  if (!data) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          <div className="mb-16">
            <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
              Verified Arsenal
            </span>
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white font-bold">
              {data.title}
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              {data.description}
            </p>
          </div>

          <div className="grid gap-8 mb-24">
            {data.products.map((product, i) => (
              <div key={i} className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row gap-8 hover:border-white/20 transition-all">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <BrandIcon id={product.icon as any} className="w-8 h-8 text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-white">{product.name}</h3>
                      <span className="text-sm font-mono text-muted uppercase tracking-wider">{product.brand}</span>
                    </div>
                    <a 
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 px-6 text-sm font-bold text-black bg-white rounded-lg hover:bg-accent transition-colors shrink-0"
                    >
                      View Source
                    </a>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-white/50 block mb-1">Mechanism of Action</span>
                      <p className="text-muted">{product.mechanism}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-1">Dre's Take</span>
                      <p className="text-white/90">{product.take}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-xs text-muted max-w-2xl mx-auto">
              <strong>Disclosure:</strong> Some of the links on this page may be affiliate links. I may earn a small commission if you purchase through them, at no extra cost to you. I only recommend products I have personally used and vetted in my own recovery protocol.
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
