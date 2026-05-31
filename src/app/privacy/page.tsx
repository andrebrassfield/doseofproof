import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dose of Proof",
  description: "Privacy Policy for Dose of Proof — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-8 text-white">
            Privacy Policy
          </h1>
          <p className="text-muted mb-4">Last updated: May 31, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-lg text-muted leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Email address</strong> — when you sign up for our newsletter or download a lead magnet.</li>
                <li><strong className="text-white">Name and contact information</strong> — when you submit the coaching intake form.</li>
                <li><strong className="text-white">Condition and health information</strong> — voluntarily provided through our intake form for coaching purposes only.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deliver requested content (PDFs, checklists, guides)</li>
                <li>Send our email newsletter (which you can unsubscribe from at any time)</li>
                <li>Process coaching intake requests</li>
                <li>Respond to your inquiries</li>
                <li>Improve our website and content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Analytics</h2>
              <p>We use <strong className="text-white">Fathom Analytics</strong>, a privacy-first analytics service that does not use cookies, does not track personal data, and is fully GDPR, CCPA, and PECR compliant. No cookie consent banner is required because Fathom does not collect personally identifiable information.</p>
              <p>We may also use Cloudflare Web Analytics, which similarly does not use cookies or track personal information.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Email Communications</h2>
              <p>We use <strong className="text-white">Resend</strong> as our email service provider. When you provide your email address, it is stored securely in our Resend audience. You can unsubscribe from any email at any time by clicking the unsubscribe link at the bottom of every email.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Cloudflare</strong> — hosting and CDN</li>
                <li><strong className="text-white">Resend</strong> — email delivery</li>
                <li><strong className="text-white">Fathom Analytics</strong> — privacy-first analytics</li>
                <li><strong className="text-white">Lemonsqueezy</strong> — payment processing for digital products</li>
                <li><strong className="text-white">Calendly</strong> — scheduling for coaching sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Data Retention</h2>
              <p>We retain your email address and contact information for as long as you remain subscribed to our communications. You may request deletion of your data at any time by contacting us at doseofproof@outlook.com.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request correction or deletion of your data</li>
                <li>Unsubscribe from email communications at any time</li>
                <li>Request a copy of all data we hold about you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Contact</h2>
              <p>If you have questions about this Privacy Policy, contact us at: <a href="mailto:doseofproof@outlook.com" className="text-accent hover:underline">doseofproof@outlook.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
