import { Eyebrow, Reveal } from "../lib/ui";

const FAQS = [
  {
    q: "How much do modular kitchen cabinets cost in Laguna?",
    a: "Modular kitchen cabinets in Laguna cost ₱9,900–₱21,800 per linear meter at ELBI Modular, depending on material (MDF vs marine plywood) and finish. A typical L-shaped kitchen (4 meters) ranges ₱120,000–₱280,000 including countertop. Get an instant estimate on our page and we confirm final price after free site measurement in Santa Rosa, Biñan or Calamba.",
  },
  {
    q: "How long does a kitchen renovation take in Laguna?",
    a: "Most modular kitchen projects in Laguna take 3–4 weeks from 3D approval to handover, plus 1–3 days for installation. Wardrobes and vanities are 2–3 weeks. Timeline depends on size and material availability, confirmed after site visit in Los Baños or nearby areas.",
  },
  {
    q: "What materials do you use — MDF, marine plywood, HDF or laminate?",
    a: "We build with 18mm marine plywood for kitchens (water-resistant), MDF/HDF with HPL or acrylic for wardrobes, and phenolic board for premium. Finishes include PVC, HPL, acrylic and laminate with soft-close or Blum hardware and granite or quartz tops. We recommend the best mix for your budget and Laguna humidity.",
  },
  {
    q: "Do you do built-in wardrobes and custom closets in Laguna condos?",
    a: "Yes — we specialize in custom built-in wardrobes and closets in Laguna for homes and condos in Santa Rosa, Nuvali, South Forbes and Calamba. Made to measure with swing, sliding or walk-in options, floor-to-ceiling up to 3m, with drawers, mirrors and LED. Free 3D design included.",
  },
  {
    q: "Do you provide 3D design before fabrication?",
    a: "Yes, every project includes free 3D modular kitchen design. You see your kitchen, TV wall unit or bathroom vanity in 3D before we cut. Revisions are included until you approve.",
  },
  {
    q: "Which areas do you serve around Laguna?",
    a: "Based in Los Baños, Laguna, we serve Santa Rosa, Biñan, Cabuyao, Calamba, San Pedro, Nuvali, South Forbes, Alabang and Metro Manila for modular cabinets, kitchen renovation and office cabinets. Mobilization fee depends on location — shown in the estimator.",
  },
  {
    q: "What is included in the installation?",
    a: "Professional installation is included — delivery, fitting, alignment, handles, hinges and clean turnover. We measure to ±2mm precision, install on-site and check every door before handover.",
  },
  {
    q: "How do I get a quote for modular cabinets in Laguna?",
    a: "Measure your wall length, use our instant cost calculator or message us on Facebook with photos and location. We reply within 24 hours with a realistic per-linear-meter estimate and schedule a free site visit in Laguna.",
  },
];

export default function FAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="no-print py-20 md:py-28 bg-cream border-y border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow index="05b">FAQ</Eyebrow>
          <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
            Modular cabinets in Laguna
            <br />
            <em className="italic font-light text-oak">— your questions, answered.</em>
          </h2>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-ink-soft">
            Pricing, materials and timelines for kitchens, wardrobes &amp; renovations — from our 16 years serving Laguna homeowners.
          </p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-4 md:gap-5">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 80}>
              <details className="group h-full rounded-3xl border border-line bg-sand/30 open:bg-cream p-6 md:p-7 transition-colors">
                <summary className="list-none flex items-start justify-between gap-4 cursor-pointer">
                  <h3 className="font-display text-[17px] font-semibold leading-snug pr-2">{f.q}</h3>
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full border border-line bg-cream group-open:bg-ink group-open:text-cream group-open:border-ink transition-colors text-ink-soft">
                    <span className="group-open:hidden text-[18px] leading-none">+</span>
                    <span className="hidden group-open:block text-[18px] leading-none">−</span>
                  </span>
                </summary>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </div>
    </section>
  );
}
