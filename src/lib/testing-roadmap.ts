export type DiagnosticTest = {
  slug: string;
  name: string;
  shortName: string;
  category: "Mold" | "Inflammation" | "Structure" | "Autonomic" | "Connective Tissue" | "Histamine";
  stage: string;
  intent: string;
  whyItMatters: string;
  whatItCanShow: string[];
  image: string;
  icon: string;
  affiliateAngle: string;
};

export const diagnosticTests: DiagnosticTest[] = [
  {
    slug: "mycotoxin-urine-test",
    name: "Mycotoxin Urine Test",
    shortName: "Mycotoxins",
    category: "Mold",
    stage: "Environmental load",
    intent: "Find hidden mold exposure when basic labs look normal.",
    whyItMatters:
      "This is the test that moves mold from a vague suspicion into something you can track, retest, and discuss with a qualified clinician.",
    whatItCanShow: ["Ochratoxin A patterns", "Trichothecene exposure", "Detox bottlenecks", "Whether remediation actually changed the load"],
    image: "/marketing-assets/images/doctors-miss-series/mycotoxin-urine-test.png",
    icon: "test-tube",
    affiliateAngle: "Diagnostic lab partner, binder guide, remediation checklist",
  },
  {
    slug: "cirs-mold-panel",
    name: "CIRS Mold Inflammation Panel",
    shortName: "CIRS Panel",
    category: "Inflammation",
    stage: "Immune response",
    intent: "Map inflammatory signaling instead of guessing from symptoms.",
    whyItMatters:
      "When symptoms are everywhere, immune markers help show whether the terrain is still inflamed, dysregulated, and reacting.",
    whatItCanShow: ["TGF-beta 1 elevation", "C4a activity", "MSH/VIP suppression", "MMP-9 and VEGF patterns"],
    image: "/marketing-assets/images/doctors-miss-series/cirs-mold-panel.png",
    icon: "lab-flask",
    affiliateAngle: "Testing guide, clinician referral, paid interpretation worksheet",
  },
  {
    slug: "mcas-histamine-panel",
    name: "MCAS and Histamine Panel",
    shortName: "MCAS",
    category: "Histamine",
    stage: "Reactive load",
    intent: "Separate anxiety, allergy, gut, and histamine overlap.",
    whyItMatters:
      "MCAS can look like panic, gut chaos, skin reactions, insomnia, and food intolerance. The panel helps anchor the pattern.",
    whatItCanShow: ["Tryptase context", "Histamine load", "Prostaglandin signals", "Leukotriene patterns"],
    image: "/marketing-assets/images/doctors-miss-series/mcas-histamine-panel.png",
    icon: "mast-cell",
    affiliateAngle: "Low-histamine stack, antihistamine tracking sheet, practitioner consult",
  },
  {
    slug: "cervical-curve-measurement",
    name: "Cervical Curve and C1-C2 Imaging",
    shortName: "Cervical Curve",
    category: "Structure",
    stage: "Mechanical root",
    intent: "Check whether the neck is driving nervous-system chaos.",
    whyItMatters:
      "For Dre, scans and X-rays were the proof that the problem was not just stress. Structure was irritating the system upstream.",
    whatItCanShow: ["Loss of cervical curve", "Upper cervical asymmetry", "Atlas/axis mechanics", "Whether structural care is worth exploring"],
    image: "/marketing-assets/images/doctors-miss-series/cervical-curve-measurement.png",
    icon: "spine-neck",
    affiliateAngle: "Upper cervical directory, imaging prep guide, consult funnel",
  },
  {
    slug: "vagal-tone-assessment",
    name: "Vagal Tone Assessment",
    shortName: "Vagal Tone",
    category: "Autonomic",
    stage: "Nervous system output",
    intent: "Track whether the body can return to calm after stress.",
    whyItMatters:
      "Symptoms get louder when the parasympathetic brake is weak. Tracking vagal tone makes recovery more objective.",
    whatItCanShow: ["HRV trend", "Stress recovery", "Sleep readiness", "Response to breathwork and neck care"],
    image: "/marketing-assets/images/doctors-miss-series/vagal-tone-assessment.png",
    icon: "heart-rate-vagal",
    affiliateAngle: "Wearables, HRV tracker, recovery protocol templates",
  },
  {
    slug: "ehlers-danlos-hypermobility-screen",
    name: "hEDS and Hypermobility Screen",
    shortName: "Hypermobility",
    category: "Connective Tissue",
    stage: "Stability context",
    intent: "Check whether ligament laxity is part of the structural story.",
    whyItMatters:
      "Hypermobility changes the recovery plan. It can explain why adjustments, stretching, and inflammation have to be sequenced carefully.",
    whatItCanShow: ["Beighton score context", "Ligament laxity", "Joint instability patterns", "Why generic mobility work can backfire"],
    image: "/marketing-assets/images/doctors-miss-series/ehlers-danlos-hypermobility-screen.png",
    icon: "dna-helix",
    affiliateAngle: "Stability program, brace/ergonomic tools, specialist referral",
  },
];

export const getDiagnosticTest = (slug: string) =>
  diagnosticTests.find((test) => test.slug === slug);
