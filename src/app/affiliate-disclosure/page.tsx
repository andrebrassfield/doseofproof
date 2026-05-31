import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | Dose of Proof",
  description: "FTC-compliant affiliate disclosure for Dose of Proof.",
};

export default function AffiliateDisclosure() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-8 text-white">
            Affiliate Disclosure
          </h1>
          <p className="text-muted mb-4">Last updated: May 31, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-lg text-muted leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Disclosure Statement</h2>
              <p>In accordance with the Federal Trade Commission&apos;s 16 CFR Part 255, &ldquo;Guides Concerning the Use of Endorsements and Testimonials in Advertising,&rdquo; I want to make the following disclosure:</p>
              <p className="text-white font-medium text-xl my-8 border-l-2 border-accent pl-6">This website contains affiliate links. When you click on a product link and make a purchase, I may receive a small commission at no additional cost to you.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">What This Means</h2>
              <p>Some of the links on doseofproof.com are affiliate links. This means if you click on the link and purchase the item, I will receive a commission. The price you pay remains the same whether you use the affiliate link or go directly to the vendor&apos;s website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why I Use Affiliate Links</h2>
              <p>I use affiliate links to help support the cost of running this website and creating free content. I only recommend products and services that I personally use, have tested, and genuinely believe provide value. I will never recommend a product solely for the purpose of earning a commission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Current Affiliate Relationships</h2>
              <p>I currently have affiliate relationships with the following companies:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">PSPeptides</strong> — Research-grade peptides (BPC-157, GHK-Cu, TB-500)</li>
              </ul>
              <p>This list may be updated as new relationships are established.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">My Commitment</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>I will always disclose when a link is an affiliate link</li>
                <li>I will never let affiliate relationships influence my recommendations</li>
                <li>I only recommend products I have personally used or thoroughly researched</li>
                <li>If a product I previously recommended no longer meets my standards, I will update or remove the recommendation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Contact</h2>
              <p>If you have questions about our affiliate relationships, contact: <a href="mailto:doseofproof@outlook.com" className="text-accent hover:underline">doseofproof@outlook.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
