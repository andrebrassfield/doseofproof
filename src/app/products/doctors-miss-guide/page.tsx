import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LemonsqueezyEmbed } from "@/components/ui/LemonsqueezyEmbed";
import { SafeImage as Image } from "@/components/ui/SafeImage";

export default async function DoctorsMissGuidePage() {
  const filePath = path.join(process.cwd(), 'src/content/products/doctor-miss-guide-copy.mdx');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const components = {
    h2: (props: any) => <h2 className="text-3xl md:text-4xl tracking-tight mb-6 mt-12 text-white font-bold" {...props} />,
    h3: (props: any) => <h3 className="text-2xl tracking-tight mb-4 mt-8 text-accent font-bold" {...props} />,
    p: (props: any) => <p className="text-lg text-muted leading-relaxed mb-6" {...props} />,
    ul: (props: any) => <ul className="list-none space-y-4 mb-8" {...props} />,
    li: (props: any) => (
      <li className="flex items-start gap-3 text-lg text-muted" {...props}>
        <span className="text-accent shrink-0 mt-1">✓</span>
        <span>{props.children}</span>
      </li>
    ),
    strong: (props: any) => <strong className="text-white font-bold" {...props} />,
    em: (props: any) => <em className="italic text-white/80" {...props} />,
    blockquote: (props: any) => (
      <blockquote className="border-l-4 border-accent pl-6 py-2 my-10 bg-accent/5 rounded-r-lg" {...props}>
        <p className="text-xl italic text-white/90 m-0">{props.children}</p>
      </blockquote>
    ),
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white font-bold">
              What Doctors Miss
            </h1>
            <p className="text-xl md:text-2xl text-accent max-w-2xl mx-auto font-medium">
              The Complete Testing Guide
            </p>
          </div>

          <div className="relative w-full max-w-lg mx-auto aspect-[4/5] rounded-2xl overflow-hidden mb-16 border border-white/10 shadow-2xl shadow-accent/5">
            <Image 
              src="/marketing-assets/what_doctors_miss_card.png" 
              alt="What Doctors Miss Guide Cover" 
              fill 
              sizes="(min-width: 768px) 512px, 100vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-invert max-w-none mb-16">
            <MDXRemote source={content} components={components} />
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full object-cover" preserveAspectRatio="none">
                <use href="/svgs/animated/animated-overlays.svg#pulse-ring-animation" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tight mb-4">Get the Guide</h3>
              <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
                Instant access to the 40-page PDF breakdown of the 26 functional tests required to prove chronic illness.
              </p>
              
              <div className="flex flex-col items-center gap-6">
                <div className="text-4xl font-bold text-white">$47</div>
                <LemonsqueezyEmbed 
                  url="https://app.lemonsqueezy.com/checkout/buy/PLACEHOLDER-doctors-miss-guide" 
                  label="Buy Now — $47"
                  className="inline-flex items-center justify-center h-14 px-8 text-lg font-medium text-black bg-white rounded-lg hover:bg-accent transition-colors"
                />
                <p className="text-sm text-muted">Secure checkout via LemonSqueezy</p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
