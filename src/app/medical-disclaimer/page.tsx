import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import { BrandIcon } from "@/components/ui/BrandIcon";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Dose of Proof",
  description: "Full medical disclaimer for Dose of Proof. This website is not medical advice.",
};

export default function MedicalDisclaimer() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 text-red-500 mb-8">
            <BrandIcon id="warning" className="w-8 h-8" />
          </div>

          <h1 className="text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-8 text-white">
            Medical Disclaimer
          </h1>
          <p className="text-muted mb-4">Last updated: May 31, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8 text-lg text-muted leading-relaxed">
            <section>
              <div className="p-8 border border-red-500/20 rounded-xl bg-red-500/5 my-8">
                <p className="text-white text-xl font-medium leading-relaxed">
                  The content on this website is for <strong>educational and informational purposes only</strong> and is not intended as a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Not a Medical Professional</h2>
              <p>I (Dre, the owner and author of Dose of Proof) am <strong className="text-white">not a licensed physician, medical professional, nurse, nutritionist, or dietitian</strong>. I am a researcher and patient who is documenting my personal experience with chronic illness, including but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Craniocervical instability (CCI)</li>
                <li>Mast Cell Activation Syndrome (MCAS)</li>
                <li>Chronic Inflammatory Response Syndrome (CIRS / mold toxicity)</li>
                <li>Dysautonomia</li>
                <li>Peptide therapy</li>
                <li>Upper cervical chiropractic care</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">No Doctor-Patient Relationship</h2>
              <p>Viewing this website, purchasing products, downloading resources, or engaging in coaching sessions does not create a doctor-patient relationship. The information provided is general in nature and cannot account for your individual medical history, conditions, or circumstances.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Always Consult Your Doctor</h2>
              <p>Before starting, changing, or stopping any medical treatment, supplement regimen, peptide therapy, exercise program, or health protocol discussed on this website, <strong className="text-white">always consult with your physician or a qualified healthcare provider</strong>.</p>
              <p>This includes but is not limited to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Peptide protocols (BPC-157, GHK-Cu, TB-500, etc.)</li>
                <li>Mold detox protocols and binder regimens</li>
                <li>Supplement stacks and dosing recommendations</li>
                <li>Upper cervical chiropractic techniques</li>
                <li>Dietary changes and elimination diets</li>
                <li>Any exercise or stretching protocols</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">No Guarantees</h2>
              <p>Individual results will vary. What worked for me may not work for you. My experience is not a guarantee of any specific outcome. Chronic illness is complex and multi-factorial, and no single protocol works for everyone.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Emergency Situations</h2>
              <p>If you are experiencing a medical emergency, call 911 (or your local emergency number) immediately. Do not rely on information from this website in an emergency situation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">External Links</h2>
              <p>This website may contain links to external websites and third-party products. I am not responsible for the content, accuracy, or safety of any linked websites or products.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mt-12 mb-4">Contact</h2>
              <p>Questions about this disclaimer? Contact: <a href="mailto:doseofproof@outlook.com" className="text-accent hover:underline">doseofproof@outlook.com</a></p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
