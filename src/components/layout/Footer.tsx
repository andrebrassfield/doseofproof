import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background pt-16 pb-8 px-6 lg:px-12 mt-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <use href="/svgs/decorative/decorative-elements.svg#noise-texture" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 pointer-events-none">
        <svg className="w-full h-full text-accent" preserveAspectRatio="none" fill="currentColor">
          <use href="/svgs/decorative/decorative-elements.svg#line-accent" />
        </svg>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div>
          <Link href="/" className="font-sans font-bold text-xl tracking-tight text-white flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-muted" viewBox="0 0 24 24" fill="currentColor">
              <use href="/svgs/logos/logo-variants.svg#logo-monochrome" />
            </svg>
            Dose of Proof
          </Link>
          <p className="text-muted max-w-sm text-sm">
            Not selling. Just proving. I got tired of vague wellness advice and broken healthcare incentives.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex flex-col gap-4">
            <Link href="/about" className="text-sm font-medium text-white/80 hover:text-accent">About Dre</Link>
            <Link href="/content" className="text-sm font-medium text-white/80 hover:text-accent">Articles</Link>
            <Link href="/contact" className="text-sm font-medium text-white/80 hover:text-accent">Contact</Link>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
        <p>© {new Date().getFullYear()} Dose of Proof. All rights reserved.</p>
        <p className="italic max-w-md text-center md:text-right">
          This is my experience. Not medical advice. Always consult a professional before starting any protocol.
        </p>
      </div>
    </footer>
  );
}
