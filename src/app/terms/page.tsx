import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dose of Proof",
  description: "Terms of Service for Dose of Proof.",
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-8 text-white">
            Terms of Service
          </h1>
          <p className="text-muted mb-4">Last updated: May 31, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-lg text-muted leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using doseofproof.com (the &ldquo;Site&rdquo;), you accept and agree to be bound by these Terms of Service. If you do not agree, do not use the Site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. Not Medical Advice</h2>
              <p>All content on this Site — including articles, protocols, supplement recommendations, and personal experiences — is for <strong className="text-white">educational and informational purposes only</strong>. Nothing on this Site constitutes medical advice, diagnosis, or treatment.</p>
              <p>The owner of this Site is not a licensed physician, medical professional, or healthcare provider. Always consult your doctor or a qualified healthcare provider before starting any treatment, supplement, or health protocol.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Digital Products</h2>
              <p>Digital products (PDFs, guides, courses) are delivered electronically. All sales are final. Due to the digital nature of the products, refunds are not available unless the product is defective or not delivered.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Coaching Services</h2>
              <p>Coaching sessions are educational consultations, not medical consultations. The coaching provider shares personal experience and research findings. Coaching does not create a doctor-patient relationship.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Affiliate Links</h2>
              <p>This Site contains affiliate links to third-party products. When you purchase through these links, we may earn a commission at no additional cost to you. We only recommend products we personally use and believe in. See our <a href="/affiliate-disclosure" className="text-accent hover:underline">Affiliate Disclosure</a> for full details.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Intellectual Property</h2>
              <p>All content on this Site — including text, graphics, logos, icons, and images — is the property of Dose of Proof and is protected by copyright law. You may not reproduce, distribute, or create derivative works without written permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Limitation of Liability</h2>
              <p>To the maximum extent permitted by law, Dose of Proof shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site, products, or services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Contact</h2>
              <p>Questions about these Terms? Contact us at: <a href="mailto:doseofproof@outlook.com" className="text-accent hover:underline">doseofproof@outlook.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
