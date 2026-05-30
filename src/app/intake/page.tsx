"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function IntakePage() {
  const [formData, setFormData] = useState({ 
    name: "", email: "", condition: "", symptoms: "", labs_done: "", what_tried: "", goals: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
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
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl tracking-tighter leading-none mb-6 text-white font-bold">
              Client Intake
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Please provide as much detail as possible. This saves us time on the call so we can jump straight into strategy.
            </p>
          </div>

          {!success ? (
            <form className="space-y-8 bg-zinc-950/80 border border-white/10 rounded-2xl p-8 md:p-12" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-white block">Full Name</label>
                  <input 
                    type="text" id="name" required disabled={loading}
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-white block">Email Address</label>
                  <input 
                    type="email" id="email" required disabled={loading}
                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="condition" className="text-sm font-bold text-white block">Primary Condition or Suspected Root Cause</label>
                <input 
                  type="text" id="condition" required disabled={loading}
                  value={formData.condition} onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="w-full h-12 bg-black border border-white/20 rounded-md px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                  placeholder="e.g., Toxic Mold, CCI, MCAS, Lyme"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="symptoms" className="text-sm font-bold text-white block">Top 3 Most Debilitating Symptoms</label>
                <textarea 
                  id="symptoms" rows={3} required disabled={loading}
                  value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                  className="w-full bg-black border border-white/20 rounded-md p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="labs_done" className="text-sm font-bold text-white block">What functional labs or imaging have you already done?</label>
                <textarea 
                  id="labs_done" rows={3} disabled={loading}
                  value={formData.labs_done} onChange={(e) => setFormData({...formData, labs_done: e.target.value})}
                  className="w-full bg-black border border-white/20 rounded-md p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="what_tried" className="text-sm font-bold text-white block">What treatments or protocols have you tried so far?</label>
                <textarea 
                  id="what_tried" rows={3} required disabled={loading}
                  value={formData.what_tried} onChange={(e) => setFormData({...formData, what_tried: e.target.value})}
                  className="w-full bg-black border border-white/20 rounded-md p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="goals" className="text-sm font-bold text-white block">What is your primary goal for this session?</label>
                <textarea 
                  id="goals" rows={3} required disabled={loading}
                  value={formData.goals} onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  className="w-full bg-black border border-white/20 rounded-md p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-accent disabled:opacity-50"
                ></textarea>
              </div>

              <Button size="lg" className="w-full rounded-md h-14 text-lg" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          ) : (
            <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 text-center animate-in fade-in duration-500">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-accent">Application Received.</h2>
              <p className="text-lg text-muted mb-8">
                Your intake has been sent directly to my inbox. If I believe I can help you, please use the calendar below to book your session.
              </p>
              
              {/* Calendly Inline Widget */}
              <div className="calendly-inline-widget" data-url="https://calendly.com/doseofproof/consultation" style={{ minWidth: '320px', height: '700px' }}></div>
              <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
