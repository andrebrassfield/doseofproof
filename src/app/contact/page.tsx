"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Failed to submit.");
    }
    setLoading(false);
  };
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          
          <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6">
            Work with me
          </h1>
          <p className="text-xl text-muted mb-8 max-w-2xl">
            I accept enquiries for speaking engagements, brand collaborations, and consulting. 
            While I read every health story sent my way, I cannot and will not give medical advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <a href="mailto:doseofproof@outlook.com" className="text-white hover:text-accent transition-colors font-medium text-lg">
              doseofproof@outlook.com
            </a>
            <div className="hidden sm:block text-white/20">•</div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted hover:text-white transition-colors" aria-label="X (Twitter)">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 4.076H5.036z" />
                </svg>
              </a>
              <a href="#" className="text-muted hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-white block">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                placeholder="John Doe"
                required
                disabled={loading || success}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-white block">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                placeholder="john@example.com"
                required
                disabled={loading || success}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold text-white block">Message</label>
              <textarea 
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-black border border-white/20 rounded-md p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-y disabled:opacity-50"
                placeholder="Tell me what's going on..."
                required
                disabled={loading || success}
              ></textarea>
            </div>

            <Button size="lg" className="w-full md:w-auto rounded-md" disabled={loading || success}>
              {loading ? "Sending..." : success ? "Message Sent!" : "Send Message"}
            </Button>
            
          </form>

        </div>
      </main>
      <Footer />
    </>
  );
}
