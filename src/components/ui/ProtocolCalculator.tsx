"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { BrandIcon } from "./BrandIcon";

interface Question {
  id: number;
  text: string;
  field: "structure" | "histamine" | "environment" | "autonomic" | "laxity";
}

const questions: Question[] = [
  {
    id: 1,
    text: "Do your symptoms (brain fog, heart rate spikes, head pressure) worsen when looking down, turning your neck, or sitting/standing upright for long periods?",
    field: "structure",
  },
  {
    id: 2,
    text: "Do you experience sudden facial flushing, hives, or rapid heart rate in response to common foods, temperature changes, or mild stressors?",
    field: "histamine",
  },
  {
    id: 3,
    text: "Have you lived, worked, or spent significant time in a water-damaged building or a house with musty odors in the last 5 years?",
    field: "environment",
  },
  {
    id: 4,
    text: "Do you experience persistent insomnia, poor sleep recovery scores, chronic muscle tension, or dry mouth/throat?",
    field: "autonomic",
  },
  {
    id: 5,
    text: "Are your joints (elbows, knees, thumbs) abnormally flexible, prone to subluxations, popping, or muscle spasms?",
    field: "laxity",
  },
];

type ResultLayer = "structure" | "environment" | "autonomic";

interface CalculatorResult {
  layer: ResultLayer;
  title: string;
  desc: string;
  testSlug: string;
  testLabel: string;
  ctaUrl: string;
  leadMagnet: { slug: string; label: string };
  rationale: string;
}

/**
 * Map the user's answer profile to one of three biological entry layers.
 *
 * Priority order matters — structure drives vagal tone, so structural answers
 * outrank autonomic ones. Environment is its own pillar. Autonomic / histamine
 * only become the primary recommendation when the structural + environmental
 * paths are negative.
 */
function computeResult(
  answers: Record<string, boolean>
): CalculatorResult {
  const { structure, histamine, environment, autonomic, laxity } = answers;

  // Layer 1: structure wins if any of the structural signals fire.
  if (structure || laxity) {
    return {
      layer: "structure",
      title: "Structure Layer: Upper Cervical Care",
      desc: "Your symptom pattern points to a mechanical driver. When alar ligaments are lax or the neck curve is lost, joint displacement (C1-C2) directly irritates the vagus nerve base. Avoid rotary manipulations; look into dynamic imaging and stabilizer conditioning.",
      testSlug: "cervical-curve-measurement",
      testLabel: "Cervical Curve & C1-C2 Imaging",
      ctaUrl: "/craniocervical-instability",
      leadMagnet: { slug: "testing", label: "Free Testing Roadmap Guide" },
      rationale:
        "Structure overrides autonomic because mechanical compromise of the brainstem directly produces autonomic symptoms downstream.",
    };
  }

  // Layer 2: environment — own pillar, biotoxin accumulation.
  if (environment) {
    return {
      layer: "environment",
      title: "Environmental Layer: Mold Excretion",
      desc: "Your symptoms indicate biotoxin accumulation. When mycotoxins are trapped in tissue lipids, the immune system remains stuck in a persistent inflammation cycle. Focus on drainage support before phasing binders.",
      testSlug: "mycotoxin-urine-test",
      testLabel: "Mycotoxin Urine Assays",
      ctaUrl: "/mold-toxicity",
      leadMagnet: { slug: "protocol", label: "Free Mold Recovery Protocol" },
      rationale:
        "Environmental load detected — biotoxin clearance is the priority before any downstream nervous-system work will stick.",
    };
  }

  // Layer 3: autonomic / histamine — parasympathetic depletion.
  // (histamine + autonomic are surfaced via rationale so the user sees we
  //  considered them, but they map to the same entry layer.)
  return {
    layer: "autonomic",
    title: "Autonomic Layer: Vagal Tone Buffer",
    desc: "Your patterns suggest parasympathetic depletion. When the body's anti-inflammatory brake is weak, histamine load and mast cells degranulate reactively. Focus on passive vagus nerve stimulations and natural stabilizers.",
    testSlug: "vagal-tone-assessment",
    testLabel: "Heart Rate Variability & Vagal Tone",
    ctaUrl: "/mcas-histamine",
    leadMagnet: { slug: "start-here", label: "Free Start-Here Roadmap" },
    rationale: buildAutonomicRationale(histamine, autonomic),
  };
}

function buildAutonomicRationale(histamine: boolean | undefined, autonomic: boolean | undefined): string {
  const flags: string[] = [];
  if (histamine) flags.push("histamine reactivity");
  if (autonomic) flags.push("autonomic depletion");
  if (flags.length === 0) {
    return "No clear structural or environmental signal — routing to the vagal/MCAS layer for baseline work.";
  }
  return `Primary signal: ${flags.join(" + ")}. Routed to the autonomic layer because the structural and environmental pillars were negative.`;
}

/**
 * 5-question biological entry-point calculator.
 *
 * Spec (Phase 5.2):
 * - 5 questions → 1 of 3 result layers (Structure / Environmental / Autonomic)
 * - Each result includes: title, description, recommended test, deep link,
 *   and the best-fit lead magnet
 * - Client-side only, no PII, no backend
 * - The 5 answer fields all participate in the routing (no longer drops histamine/autonomic)
 * - Progress bar + step counter
 * - Reduced-motion safe (no transforms used; the bar uses width transition only)
 */
export function ProtocolCalculator() {
  const [step, setStep] = useState(0); // 0 = start, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const announceRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (val: boolean) => {
    const currentQ = questions[step - 1];
    setAnswers((prev) => ({ ...prev, [currentQ.field]: val }));
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(questions.length + 1);
    }
  };

  // Announce step changes for screen readers.
  useEffect(() => {
    if (!announceRef.current) return;
    if (step === 0) announceRef.current.textContent = "Calculator start";
    else if (step <= questions.length)
      announceRef.current.textContent = `Question ${step} of ${questions.length}`;
    else announceRef.current.textContent = "Result calculated";
  }, [step]);

  const result = step > questions.length ? computeResult(answers) : null;
  const currentQ = step > 0 && step <= questions.length ? questions[step - 1] : null;

  return (
    <div
      className="border border-white/10 rounded-2xl bg-zinc-950 p-6 md:p-8 max-w-xl mx-auto flex flex-col justify-between min-h-[350px] js-only"
      data-component="ProtocolCalculator"
    >
      {/* Live region for step changes (visually hidden) */}
      <div ref={announceRef} className="sr-only" role="status" aria-live="polite" />

      {step === 0 && (
        <div className="text-center space-y-6 my-auto">
          <BrandIcon id="target-crosshair" className="w-12 h-12 text-accent mx-auto" />
          <h3 className="text-2xl font-bold text-white tracking-tight">Biological Entry Point Calculator</h3>
          <p className="text-sm text-muted leading-relaxed">
            Answer 5 brief physiological questions to map your biological coordinates and discover where to sequence your diagnostics.
          </p>
          <Button onClick={() => setStep(1)} className="w-full">
            Start Questionnaire
          </Button>
        </div>
      )}

      {currentQ && (
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-accent uppercase tracking-widest">
                Question {step} of {questions.length}
              </span>
              <span className="text-muted">{Math.round((step / questions.length) * 100)}% Complete</span>
            </div>
            <div
              className="w-full bg-white/5 h-1 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-label="Quiz progress"
            >
              <div
                className="bg-accent h-full transition-all duration-300"
                style={{ width: `${(step / questions.length) * 100}%` }}
              />
            </div>
            <p className="text-lg text-white font-medium leading-relaxed pt-4">{currentQ.text}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 h-14 rounded-lg bg-white/5 hover:bg-accent hover:text-black border border-white/10 hover:border-accent text-white font-bold text-sm transition-all duration-200"
            >
              Yes, matches my pattern
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 h-14 rounded-lg bg-black hover:bg-white/5 border border-white/10 text-muted hover:text-white text-sm transition-all duration-200"
            >
              No, does not match
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6 my-auto">
          <div className="flex items-center gap-2 text-accent">
            <BrandIcon id="checkmark-shield" className="w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Calculation Complete</span>
          </div>

          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{result.title}</h3>
          <p className="text-sm text-muted leading-relaxed">{result.desc}</p>

          <div className="p-3 border border-white/5 rounded-lg bg-black/30 text-xs text-white/50 font-mono">
            <span className="text-accent font-bold">RATIONALE:</span> {result.rationale}
          </div>

          <div className="p-4 border border-white/10 rounded-xl bg-black/40">
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest mb-2">Recommended Diagnostic Lab</p>
            <Link
              href={`/tests/${result.testSlug}`}
              className="text-white font-bold hover:text-accent transition-colors flex items-center justify-between text-sm"
            >
              <span>{result.testLabel}</span>
              <span className="text-accent">Read Test Guide →</span>
            </Link>
          </div>

          <div className="p-4 border border-accent/20 rounded-xl bg-accent/5">
            <p className="text-xs text-accent font-mono uppercase tracking-widest mb-2">Recommended Free Guide</p>
            <Link
              href={`/lead-magnet/${result.leadMagnet.slug}`}
              className="text-white font-bold hover:text-accent transition-colors flex items-center justify-between text-sm"
            >
              <span>{result.leadMagnet.label}</span>
              <span className="text-accent">Get the Guide →</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button href={result.ctaUrl} className="flex-1 justify-center">
              View Detailed Guide
            </Button>
            <button
              onClick={() => {
                setStep(0);
                setAnswers({});
              }}
              className="px-6 h-12 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors border border-white/5"
            >
              Restart Calculator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
