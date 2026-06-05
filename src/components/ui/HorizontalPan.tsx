"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalPan({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      
      const panTween = gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",                              
          end: () => `+=${distance}`,                    
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate the proof cards horizontally as they enter the screen
      gsap.utils.toArray(".proof-card").forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: panTween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, wrap);
    
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={wrap} className="relative overflow-hidden">
      <div ref={track} className="flex h-[100dvh] items-center">
        {children}
      </div>
    </section>
  );
}
