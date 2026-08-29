import { ArrowUpRight, Ruler, ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";
import { Reveal } from "../lib/ui";
import { Photo } from "../lib/images";
import { WORKS } from "../lib/images";
import { FacebookIcon } from "../lib/icons";

const TRUST = [
  { icon: BadgeCheck, label: "Crafting cabinets since 2010 — 16 years" },
  { icon: Ruler, label: "Made to measure · ±2 mm precision" },
  { icon: ShieldCheck, label: "Checked & fitted before turnover" },
  { icon: BadgeCheck, label: "500+ projects — Laguna to Luzon, Visayas & Mindanao" },
];

export default function Works() {
  return (
    <section id="works" className="no-print py-20 md:py-28 bg-sand/50 border-y border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
          <Reveal>
            <p className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-moss" />
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-moss">
                Actual builds · photographed on site
              </span>
            </p>
            <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
              Modular cabinets & built-in wardrobes
              <br />
              <em className="italic font-light text-oak">real builds from our sites.</em>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="text-[15px] leading-relaxed text-ink-soft max-w-md lg:justify-self-end">
              Every image below is a real ELBI Modular project, photographed by our own team — based in Laguna, now serving <strong>Manila, nearby Laguna and projects across Luzon, Visayas &amp; Mindanao</strong>. From <a href="#services" className="underline decoration-oak/30 hover:text-oak-deep">built-in cabinets and TV wall units</a> to shoe and office cabinets — what you see is the standard you can expect, wherever you are in the Philippines.
            </p>
          </Reveal>
        </div>

        {/* photo grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {WORKS.map((w, i) => (
            <Reveal key={w.src} delay={(i % 3) * 80}>
              <figure className="group relative overflow-hidden rounded-3xl border border-line bg-cream">
                <Photo
                  src={w.src}
                  fallback="/images/project-island.jpg"
                  alt={`${w.kind} by ELBI Modular — completed ${w.date}`}
                  className="w-full h-[300px] md:h-[340px] object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                />
                {/* hover veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* caption chip */}
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="rounded-full bg-cream/95 backdrop-blur px-4 py-2 text-[12px] font-medium text-ink">
                    {w.kind}
                  </span>
                  <span className="rounded-full bg-cream/95 backdrop-blur px-3.5 py-2 font-mono text-[10px] text-ink-soft">
                    {w.date}
                  </span>
                </figcaption>
                {/* index tag — always visible */}
                <span className="absolute top-4 left-4 rounded-full bg-ink/55 backdrop-blur px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] uppercase text-cream/90">
                  ELBI · {String(i + 1).padStart(2, "0")}
                </span>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* trust + CTA row */}
        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {TRUST.map((t) => (
              <p key={t.label} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                <t.icon size={15} className="text-oak shrink-0" />
                {t.label}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://www.facebook.com/Elbimodular/photos"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-ink text-cream pl-6 pr-2.5 py-2.5 rounded-full text-[14px] font-medium hover:bg-oak-deep transition-colors duration-300"
            >
              <FacebookIcon size={15} />
              More builds on Facebook
              <span className="grid place-items-center w-9 h-9 rounded-full bg-cream/15 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight size={15} />
              </span>
            </a>
            <a
              href="#estimator"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-ink/15 text-[14px] font-medium hover:border-oak hover:text-oak-deep transition-all"
            >
              Price a build like these
              <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
