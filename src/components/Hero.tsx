import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "../lib/ui";
import { MessengerIcon } from "../lib/icons";
import { Photo, REAL_PHOTOS } from "../lib/images";

const STRIP = [
  "Made to measure",
  "Carefully installed",
  "Clean, lasting finish",
  "Clear project guidance",
];

export default function Hero() {
  return (
    <section id="top" className="no-print relative pt-28 md:pt-36 overflow-hidden">
      {/* backdrop flourishes */}
      <div aria-hidden className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-oak-tint/70 blur-3xl" />
      <div aria-hidden className="absolute top-64 -left-52 w-[420px] h-[420px] rounded-full bg-sand/80 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-10 items-center">
          {/* copy */}
          <div className="order-1">
            <Reveal>
              <p className="inline-flex items-center gap-2 font-mono text-[10.5px] tracking-[0.28em] uppercase text-oak-deep bg-oak-tint/70 border border-oak/20 rounded-full px-4 py-2 mb-8">
                Custom cabinetry & installation · since 2010 · Los Baños, Laguna
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="font-display font-medium tracking-[-0.02em] leading-[1.0] text-[clamp(2.7rem,6.6vw,5.2rem)]">
                Made for your space.
                <br />
                <em className="text-oak font-light italic">Built for real life.</em>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="mt-7 max-w-lg text-[16px] md:text-[17px] leading-relaxed text-ink-soft">
                Thoughtful modular cabinetry, carefully made and professionally installed
                for homes and businesses — now with instant cost estimates before you even call.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#estimator"
                  className="group inline-flex items-center gap-3 bg-ink text-cream pl-6 pr-2.5 py-2.5 rounded-full text-[14.5px] font-medium hover:bg-oak-deep transition-colors duration-300"
                >
                  Start your project
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-cream/15 group-hover:translate-y-0.5 transition-transform">
                    <ArrowDown size={16} />
                  </span>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-ink/15 text-[14.5px] font-medium hover:border-oak hover:text-oak-deep transition-all"
                >
                  Explore our work
                  <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* visual */}
          <Reveal delay={200} className="relative order-2">
            <div className="overflow-hidden rounded-[200px_200px_28px_28px] border border-line shadow-[0_40px_80px_-30px_rgba(31,27,20,0.4)]">
              <Photo
                src={REAL_PHOTOS.hero.real}
                fallback={REAL_PHOTOS.hero.fallback}
                alt={REAL_PHOTOS.hero.alt}
                eager
                className="w-full h-[400px] md:h-[520px] object-cover hover:scale-[1.03] transition-transform duration-[1400ms]"
              />
            </div>
            <div className="floaty absolute -left-4 md:-left-8 bottom-16 bg-cream/95 backdrop-blur border border-line rounded-2xl px-4 py-3 shadow-xl">
              <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-faint">Instant estimate</p>
              <p className="font-display text-[19px] font-semibold mt-0.5">
                ₱8k – ₱35k <span className="text-[12px] font-sans font-normal text-faint">/ linear meter</span>
              </p>
            </div>
            <a
              href="https://m.me/Elbimodular"
              target="_blank"
              rel="noreferrer"
              className="floaty absolute -right-3 md:-right-6 top-14 grid place-items-center w-14 h-14 rounded-full bg-ink text-cream shadow-xl hover:bg-oak-deep transition-colors [animation-delay:1.1s]"
              aria-label="Message ELBI Modular on Messenger"
            >
              <MessengerIcon size={20} />
            </a>
          </Reveal>
        </div>

        {/* feature strip */}
        <Reveal delay={320}>
          <div className="grid grid-cols-2 md:grid-cols-4 border-y border-line mt-16 md:mt-20 md:divide-x md:divide-line">
            {STRIP.map((s, i) => (
              <div key={s} className="flex items-center gap-3 py-5 px-4 md:px-6">
                <span className="font-mono text-[11px] text-oak">0{i + 1}</span>
                <span className="text-[13px] md:text-[13.5px] font-medium text-ink-soft">{s}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
