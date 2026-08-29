import { Eyebrow, Reveal } from "../lib/ui";
import { Photo, REAL_PHOTOS } from "../lib/images";

const STEPS = [
  {
    n: "01",
    t: "Tell us about your space",
    d: "Share your location, measurements, inspiration, and project goals — a message on Facebook is enough to start.",
    span: "Day 0",
  },
  {
    n: "02",
    t: "Plan the right solution",
    d: "We align on layout, finishes, functionality, scope, and budget — matched to your on-page estimate.",
    span: "Day 1 – 3",
  },
  {
    n: "03",
    t: "Build with precision",
    d: "Your cabinetry is fabricated to suit the approved design and dimensions.",
    span: "Week 2 – 4",
  },
  {
    n: "04",
    t: "Install and hand over",
    d: "We fit, align, finish, and check every detail before completion.",
    span: "1 – 3 days",
  },
];

export default function Process() {
  return (
    <>
      <section id="process" className="no-print py-20 md:py-28 bg-sand/50 border-y border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-10 lg:gap-16">
            {/* sticky intro */}
            <div className="lg:sticky lg:top-28 self-start">
              <Reveal>
                <Eyebrow index="04">How it works</Eyebrow>
                <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
                  A clear process.
                  <br />
                  <em className="italic font-light text-oak">No guesswork.</em>
                </h2>
                <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
                  We keep every stage understandable, collaborative, and focused on a finish
                  you&apos;ll be proud to live with. Over 16 years, we&apos;ve refined a 4-step workflow — from 3D design to fitted installation — so homeowners from Manila to nearby Laguna and across Luzon, Visayas &amp; Mindanao know exactly what happens next.
                </p>
                <div className="mt-9 flex gap-8 max-w-md">
                  {[
                    { k: "3 – 4 wks", v: "typical lead time to handover" },
                    { k: "Fitted on site", v: "aligned & checked before turnover" },
                  ].map((s) => (
                    <div key={s.k} className="border-t border-ink/15 pt-4 flex-1">
                      <p className="font-display text-[22px] font-semibold">{s.k}</p>
                      <p className="mt-1 text-[12px] leading-snug text-faint">{s.v}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* steps */}
            <ol className="relative border-l border-line ml-2 lg:ml-6 space-y-12 py-2">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 80}>
                  <li className="relative pl-10">
                    <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-oak border-4 border-sand" />
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-[11px] text-oak">{s.n}</span>
                      <h3 className="font-display text-[21px] font-semibold tracking-tight">{s.t}</h3>
                      <span className="ml-auto font-mono text-[10px] tracking-[0.18em] uppercase text-faint">{s.span}</span>
                    </div>
                    <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink-soft">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* full-bleed quote band */}
      <section className="no-print relative h-[380px] md:h-[460px] overflow-hidden">
        <Photo
          src={REAL_PHOTOS.band.real}
          fallback={REAL_PHOTOS.band.fallback}
          alt={REAL_PHOTOS.band.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/20" />
        <div className="relative h-full mx-auto max-w-7xl px-5 md:px-8 flex items-end pb-12 md:pb-16">
          <Reveal>
              <p className="font-display text-cream text-[clamp(1.6rem,3.8vw,2.8rem)] leading-[1.15] max-w-2xl">
                Built in Laguna. Installed with care
                <br />
                <em className="italic font-light text-oak-tint">Manila, nearby Laguna &amp; across Luzon, Visayas &amp; Mindanao.</em>
              </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
