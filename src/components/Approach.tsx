import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "../lib/ui";
import { Photo, REAL_PHOTOS } from "../lib/images";

const SERVICES = [
  {
    n: "01",
    t: "Custom kitchens",
    d: "Purpose-built cabinetry that makes cooking, storage, and everyday movement feel effortless.",
  },
  {
    n: "02",
    t: "Wardrobes & storage",
    d: "Smart built-ins, closets, and storage systems designed to use every available centimeter well.",
  },
  {
    n: "03",
    t: "Professional installation",
    d: "Careful on-site fitting, clean finishes, and dependable coordination from delivery to handover.",
  },
];

/* ------------------------- 01 · our approach ------------------------ */

export default function Approach() {
  return (
    <>
      <section id="approach" className="no-print py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Reveal>
                <Eyebrow index="01">Our approach</Eyebrow>
              </Reveal>
              <Reveal delay={60}>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-faint mb-4">
                  Beautifully practical
                </p>
                <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
                  Good cabinetry should make
                  <br />
                  your space feel <em className="italic font-light text-oak">simpler.</em>
                </h2>
                <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
                  ELBI Modular turns underused rooms and difficult corners into organized,
                  comfortable spaces. Every project starts with your needs — not a
                  one-size-fits-all catalog.
                </p>
                <a
                  href="#about"
                  className="group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-oak-deep"
                >
                  ELBI Modular
                  <span className="grid place-items-center w-7 h-7 rounded-full border border-oak/30 group-hover:bg-oak group-hover:text-cream group-hover:border-oak transition-all">
                    <ArrowRight size={13} />
                  </span>
                </a>
              </Reveal>
            </div>
            <Reveal delay={150}>
              <div className="relative">
                <div className="overflow-hidden rounded-[28px] border border-line shadow-[0_30px_60px_-28px_rgba(31,27,20,0.4)]">
                  <Photo
                    src={REAL_PHOTOS.approach.real}
                    fallback={REAL_PHOTOS.approach.fallback}
                    alt={REAL_PHOTOS.approach.alt}
                    className="w-full h-[320px] md:h-[440px] object-cover hover:scale-[1.04] transition-transform duration-[1400ms]"
                  />
                </div>
                <p className="absolute -bottom-5 left-6 bg-ink text-cream rounded-2xl px-5 py-3.5 shadow-xl font-display text-[16px]">
                  From first measurement <em className="italic font-light text-oak-tint">to final installation.</em>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------- 02 · what we do ------------------------ */}
      <section id="services" className="no-print py-20 md:py-28 bg-sand/50 border-y border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <Reveal>
              <Eyebrow index="02">What we do</Eyebrow>
              <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
                Cabinetry that works
                <br />
                <em className="italic font-light text-oak">as beautifully as it looks.</em>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="group h-full rounded-3xl border border-line bg-cream p-7 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-oak/50 hover:shadow-[0_24px_50px_-24px_rgba(162,91,46,0.35)]">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[12px] text-oak">{s.n}</span>
                    <span className="grid place-items-center w-9 h-9 rounded-full border border-line text-ink-soft group-hover:bg-ink group-hover:text-cream group-hover:border-ink transition-all duration-300">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                  <h3 className="mt-14 font-display text-[22px] font-semibold tracking-tight">{s.t}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <a
              href="#estimator"
              className="group mt-10 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-ink text-cream px-7 md:px-9 py-6 md:py-7 hover:bg-oak-deep transition-colors duration-300"
            >
              <p className="font-display text-[19px] md:text-[22px]">
                Have a space in mind?{" "}
                <em className="italic font-light text-oak-tint">Get an instant cost estimate.</em>
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-[13px] font-medium group-hover:bg-cream group-hover:text-ink transition-all">
                Estimate in ~30 seconds
                <ArrowRight size={14} />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
