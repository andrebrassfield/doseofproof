import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { diagnosticTests, getDiagnosticTest } from "@/lib/testing-roadmap";

type TestPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return diagnosticTests.map((test) => ({ slug: test.slug }));
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = getDiagnosticTest(slug);

  if (!test) {
    return {
      title: "Diagnostic Test",
    };
  }

  return {
    title: `${test.name}: What It Shows and When to Use It`,
    description: `${test.intent} Learn where ${test.name} fits in the Dose of Proof testing roadmap.`,
  };
}

export default async function DiagnosticTestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const test = getDiagnosticTest(slug);

  if (!test) notFound();

  const related = diagnosticTests.filter((item) => item.slug !== test.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28">
        <article className="px-6 lg:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-muted mb-10">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <Link href="/testing-roadmap" className="hover:text-accent transition-colors">Testing Roadmap</Link>
              <span>/</span>
              <span className="text-white/60 truncate">{test.shortName}</span>
            </nav>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-12 items-start min-w-0">
              <div className="min-w-0">
                <span className="text-accent font-mono text-[10.5px] uppercase tracking-[0.22em] mb-6 block">
                  {test.category} / {test.stage}
                </span>
                <h1 className="text-5xl md:text-7xl tracking-tighter leading-[1.05] mb-8">
                  {test.name}
                  <span className="block text-white/50">What it can prove.</span>
                </h1>
                <p className="text-lg text-muted leading-relaxed max-w-2xl mb-10">
                  {test.whyItMatters}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button href="/products/what-doctors-miss" size="lg" className="w-full sm:w-auto">
                    Get the Full Testing Guide
                  </Button>
                  <Button href="/intake" variant="secondary" size="lg" className="w-full sm:w-auto">
                    Apply for Help
                  </Button>
                </div>
              </div>
              <div className="relative w-full min-w-0 aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <Image
                  src={test.image}
                  alt={`${test.name} testing visual`}
                  fill
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </article>

        <section className="px-6 lg:px-12 py-20 bg-zinc-950 border-y border-white/10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
            <div>
              <BrandIcon id={test.icon} className="w-10 h-10 text-accent mb-8" />
              <h2 className="text-4xl tracking-tighter mb-6">Why this belongs in the map</h2>
              <p className="text-muted leading-relaxed">{test.intent}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {test.whatItCanShow.map((item) => (
                <div key={item} className="border border-white/10 rounded-2xl p-6 bg-black/40">
                  <BrandIcon id="checkmark-shield" className="w-5 h-5 text-accent mb-6" />
                  <p className="text-white font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 lg:px-12 py-20 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
            <div className="border border-accent/20 rounded-2xl p-8 bg-accent/5">
              <h2 className="text-3xl tracking-tight font-bold mb-4">Monetization path</h2>
              <p className="text-muted leading-relaxed mb-6">
                {test.affiliateAngle}. This page should stay useful first, commercial second: clear disclosure, medical disclaimer, and no diagnosis claims.
              </p>
              <Button href="/affiliate-disclosure" variant="secondary">
                Read Affiliate Disclosure
              </Button>
            </div>
            <div>
              <h2 className="text-3xl tracking-tight font-bold mb-6">Related tests</h2>
              <div className="space-y-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/tests/${item.slug}`}
                    className="flex items-center justify-between gap-4 border border-white/10 rounded-xl p-4 hover:border-accent/50 transition-colors"
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-accent text-sm">Read</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
