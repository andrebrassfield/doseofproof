import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { SafeImage as Image } from "@/components/ui/SafeImage";
import { MDXRemote } from "next-mdx-remote/rsc";
import { diagnosticTests, getDiagnosticTest } from "@/lib/testing-roadmap";
import { getTestBySlug } from "@/lib/mdx";
import { DisclaimerBanner } from "@/components/ui/DisclaimerBanner";
import { AnalyticsTracker } from "@/components/ui/AnalyticsTracker";

type TestPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return diagnosticTests.map((test) => ({ slug: test.slug }));
}

export async function generateMetadata({ params }: TestPageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = getDiagnosticTest(slug);
  const testContent = getTestBySlug(slug);

  if (!test) {
    return {
      title: "Diagnostic Test",
    };
  }

  const title = `${test.name}: What It Shows and When to Use It`;
  const description = `${test.intent} Learn where ${test.name} fits in the Dose of Proof testing roadmap.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(test.name)}&category=${encodeURIComponent(test.category)}&description=${encodeURIComponent(test.intent)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/api/og?title=${encodeURIComponent(test.name)}&category=${encodeURIComponent(test.category)}&description=${encodeURIComponent(test.intent)}`],
    },
  };
}

export default async function DiagnosticTestPage({ params }: TestPageProps) {
  const { slug } = await params;
  const test = getDiagnosticTest(slug);
  const testContent = getTestBySlug(slug);

  if (!test || !testContent) notFound();

  const related = diagnosticTests.filter((item) => item.slug !== test.slug).slice(0, 3);
  const nextTest = testContent.meta.nextTestSlug ? getDiagnosticTest(testContent.meta.nextTestSlug) : null;

  // Custom components for rendering test MDX content
  const components = {
    h1: (props: any) => (
      <h1
        className="text-3xl md:text-4xl tracking-tighter mb-8 mt-12 text-white"
        {...props}
      />
    ),
    h2: (props: any) => {
      const text = typeof props.children === "string" ? props.children : "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return (
        <h2
          id={id}
          className="text-2xl md:text-3xl tracking-tight mb-6 mt-12 text-white border-t border-white/10 pt-12 scroll-mt-24"
          {...props}
        />
      );
    },
    h3: (props: any) => (
      <h3
        className="text-xl tracking-tight mb-4 mt-8 text-white"
        {...props}
      />
    ),
    p: (props: any) => (
      <p
        className="text-lg text-muted leading-relaxed mb-8"
        {...props}
      />
    ),
    ul: (props: any) => (
      <ul
        className="list-disc pl-6 text-lg text-muted leading-relaxed mb-8 space-y-2"
        {...props}
      />
    ),
    ol: (props: any) => (
      <ol
        className="list-decimal pl-6 text-lg text-muted leading-relaxed mb-8 space-y-2"
        {...props}
      />
    ),
    li: (props: any) => <li className="pl-2" {...props} />,
    strong: (props: any) => (
      <strong className="text-white font-bold" {...props} />
    ),
    a: (props: any) => (
      <a
        className="text-accent hover:underline underline-offset-4"
        {...props}
      />
    ),
    table: (props: any) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-left border-collapse" {...props} />
      </div>
    ),
    th: (props: any) => (
      <th className="border-b border-white/20 py-3 px-4 text-white font-bold text-sm uppercase tracking-wider" {...props} />
    ),
    td: (props: any) => (
      <td className="border-b border-white/5 py-3 px-4 text-muted" {...props} />
    ),
  };

  // Structured Data (JSON-LD MedicalTest + HowTo + FAQPage)
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalTest",
        "@id": `https://doseofproof.com/tests/${slug}#medical-test`,
        "name": test.name,
        "description": test.intent,
        "significance": test.whyItMatters,
        "usedToDiagnose": test.whatItCanShow.map((item) => ({
          "@type": "MedicalCondition",
          "name": item
        }))
      },
      {
        "@type": "HowTo",
        "@id": `https://doseofproof.com/tests/${slug}#howto`,
        "name": `How to Order ${test.name}`,
        "description": `Step-by-step instructions for getting the ${test.name} functional diagnostic lab.`,
        "step": [
          {
            "@type": "HowToStep",
            "name": "Order the Test Kit",
            "text": `Purchase the diagnostic kit directly online via functional diagnostic networks.`
          },
          {
            "@type": "HowToStep",
            "name": "Complete Sample Collection",
            "text": `Follow the sample preparation instructions (e.g. glutathione challenge, fasting, or cold sample handling).`
          },
          {
            "@type": "HowToStep",
            "name": "Ship and Interpret Results",
            "text": `Send the sample back to the lab and review functional ranges relative to standard reference limits.`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://doseofproof.com/tests/${slug}#faqpage`,
        "mainEntity": (testContent.meta.faqs || []).map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <AnalyticsTracker event="test_page_view" params={{ test: slug }} />
      <Navbar />
      <main id="main-content" className="flex-1 pt-28">
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
                  <Button href="/lead-magnet" variant="secondary" size="lg" className="w-full sm:w-auto">
                    Download Checklist
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

        {/* Dynamic MDX Content Area */}
        <section className="px-6 lg:px-12 py-20 bg-background border-t border-white/10">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <MDXRemote source={testContent.content} components={components} />
          </div>
        </section>

        {/* FAQs */}
        {testContent.meta.faqs && testContent.meta.faqs.length > 0 && (
          <section className="px-6 lg:px-12 py-20 bg-zinc-950 border-y border-white/10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-12 text-center text-white">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {testContent.meta.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-white/10 rounded-xl bg-black/30 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                      <span className="text-white font-medium pr-4">
                        {faq.question}
                      </span>
                      <span className="text-accent shrink-0 group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-muted leading-relaxed">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next Test / Call to Action / Related */}
        <section className="px-6 lg:px-12 py-20 bg-background">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 items-start">
            
            {/* Left: Next Sequence Action */}
            {nextTest ? (
              <div className="border border-accent/20 rounded-2xl p-8 bg-accent/5">
                <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
                  Next Test in Sequence
                </span>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                  {nextTest.name}
                </h2>
                <p className="text-muted leading-relaxed mb-8">
                  {nextTest.intent} Stabilizing the body requires systematic sequencing. Once you have mapping for {test.shortName}, look here next.
                </p>
                <Button href={`/tests/${nextTest.slug}`} size="lg">
                  Map next step: {nextTest.shortName} →
                </Button>
              </div>
            ) : (
              <div className="border border-white/10 rounded-2xl p-8 bg-zinc-950/40">
                <span className="text-accent font-mono text-xs uppercase tracking-widest block mb-4">
                  Complete the Map
                </span>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                  Get the Full Testing Guide
                </h2>
                <p className="text-muted leading-relaxed mb-8">
                  Access the complete blueprint covering all 26 diagnostic tests, reference ranges, and order configurations.
                </p>
                <Button href="/products/what-doctors-miss" size="lg">
                  Get the Guide →
                </Button>
              </div>
            )}

            {/* Right: Related Grid */}
            <div>
              <h2 className="text-3xl tracking-tight font-bold mb-6 text-white">Related Tests</h2>
              <div className="space-y-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/tests/${item.slug}`}
                    className="flex items-center justify-between gap-4 border border-white/10 rounded-xl p-6 bg-zinc-950/30 hover:border-accent/50 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-white mb-1">{item.name}</p>
                      <p className="text-xs text-muted truncate max-w-sm">{item.intent}</p>
                    </div>
                    <span className="text-accent text-sm font-bold shrink-0">Read →</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
      <DisclaimerBanner />
    </>
  );
}
