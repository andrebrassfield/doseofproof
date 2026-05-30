"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link href="/" className="font-sans font-bold text-xl tracking-tight text-white flex items-center gap-3 relative z-50">
          <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <use href="/svgs/logos/logo-variants.svg#logo-icon-only" />
          </svg>
          Dose of Proof
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/content" className="hover:text-accent transition-colors">Content</Link>
          <Link href="/lead-magnet" className="hover:text-accent transition-colors">The First 30 Days</Link>
        </nav>
        <div className="flex items-center gap-4 relative z-50">
          <Button href="/contact" variant="ghost" className="hidden md:inline-flex">Contact</Button>
          <Button href="/lead-magnet" className="hidden md:inline-flex">Get Checklist</Button>
          
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950 flex flex-col items-center justify-center pt-20 px-6">
          <nav className="flex flex-col items-center gap-8 text-2xl font-bold text-white w-full">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">About</Link>
            <Link href="/content" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">Content</Link>
            <Link href="/lead-magnet" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">The First 30 Days</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">Contact</Link>
            <div className="w-full max-w-xs h-px bg-white/10 my-4" />
            <Button href="/lead-magnet" className="w-full max-w-xs" onClick={() => setIsOpen(false)}>Get Checklist</Button>
          </nav>
        </div>
      )}
    </>
  );
}
