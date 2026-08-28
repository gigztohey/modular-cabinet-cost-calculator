import { useMemo, useState } from "react";
import { CookingPot, DoorClosed, Check } from "lucide-react";
import {
  computeKitchen,
  computeWardrobe,
  PHP,
  type Carcass,
  type Finish,
  type Hardware,
  type Countertop,
  type Layout,
  AREAS,
} from "../lib/pricing";
import { Eyebrow, Reveal } from "../lib/ui";
import { Step, OptionGrid, OptionCard, MeterSlider, Stepper, ToggleChip } from "./estimator/controls";
import { KitchenDiagram, WardrobeDiagram } from "./estimator/Diagrams";
import { SummaryPanel } from "./estimator/SummaryPanel";

/* ------------------------------- tiers ----------------------------- */

type TierKey = "budget" | "balanced" | "premium";

const TIERS: Record<
  TierKey,
  {
    name: string;
    tagline: string;
    spec: { carcass: Carcass; finish: Finish; hardware: Hardware; countertop: Countertop };
    kitchenRate: string;
    wardrobeRate: string;
    items: string[];
  }
> = {
  budget: {
    name: "Budget",
    tagline: "Clean and practical, light on the wallet",
    spec: { carcass: "mdf", finish: "pvc", hardware: "standard", countertop: "laminate" },
    kitchenRate: "≈ ₱9,900 / lm",
    wardrobeRate: "≈ ₱9,800 / lm",
    items: ["MR board + PVC laminate", "Standard hinges & handles", "Postform laminate top"],
  },
  balanced: {
    name: "Balanced",
    tagline: "The forever-grade workhorse — most chosen",
    spec: { carcass: "ply", finish: "hpl", hardware: "softclose", countertop: "granite" },
    kitchenRate: "≈ ₱14,300 / lm",
    wardrobeRate: "≈ ₱14,000 / lm",
    items: ["18 mm marine plywood + HPL", "Soft-close hinges & slides", "Granite top included"],
  },
  premium: {
    name: "Premium",
    tagline: "Showroom finish, lifetime hardware",
    spec: { carcass: "phenolic", finish: "acrylic", hardware: "blum", countertop: "quartz" },
    kitchenRate: "≈ ₱21,800 / lm",
    wardrobeRate: "≈ ₱21,200 / lm",
    items: ["Phenolic board + gloss acrylic", "Blum hardware systems", "Engineered quartz top"],
  },
};

/* ------------------------------ helpers ---------------------------- */

const r1 = (n: number) => Math.round(n * 10) / 10;

/* ------------------------------ component -------------------------- */

export default function Estimator() {
  const [mode, setMode] = useState<"kitchen" | "wardrobe">("kitchen");
  const [tier, setTier] = useState<TierKey>("balanced");
  const [area, setArea] = useState("laguna-batangas");

  /* kitchen inputs */
  const [layout, setLayout] = useState<Layout>("l");
  const [length, setLength] = useState(4.0);
  const [overheads, setOverheads] = useState(true);
  const [island, setIsland] = useState(false);
  const [tower, setTower] = useState(false);
  const [countertop, setCountertop] = useState<Countertop>("granite");
  const [acc, setAcc] = useState({ cutlery: false, baskets: false, bin: false, led: false });

  /* wardrobe inputs */
  const [wWidth, setWWidth] = useState(2.4);
  const [wDoors, setWDoors] = useState<"swing" | "sliding" | "open">("swing");
  const [wFull, setWFull] = useState(false);
  const [wDrawers, setWDrawers] = useState(2);
  const [wMirror, setWMirror] = useState(false);
  const [wLed, setWLed] = useState(false);

  /* derived wall runs for the chosen layout */
  const walls = useMemo(() => {
    if (layout === "straight") return [length];
    if (layout === "l") return [r1(length * 0.62), r1(length * 0.38)];
    return [r1(length * 0.5), r1(length * 0.25), r1(length * 0.25)];
  }, [layout, length]);

  const spec = TIERS[tier].spec;

  const estimate = useMemo(() => {
    if (mode === "kitchen")
      return computeKitchen({
        layout,
        walls,
        wallCoverage: overheads ? 0.8 : 0,
        tallUnits: tower ? 1 : 0,
        island,
        islandLength: 1.8,
        carcass: spec.carcass,
        finish: spec.finish,
        hardware: spec.hardware,
        countertop,
        accessories: {
          cutlery: acc.cutlery ? 1 : 0,
          baskets: acc.baskets ? 2 : 0,
          bin: acc.bin ? 1 : 0,
          lighting: acc.led ? 3 : 0,
        },
        area,
        dismantle: false,
      });
    return computeWardrobe({
      width: wWidth,
      height: wFull ? "full" : "standard",
      doors: wDoors,
      carcass: spec.carcass,
      finish: spec.finish,
      hardware: spec.hardware,
      extras: { drawers: wDrawers, mirror: wMirror ? 1 : 0, led: wLed ? 2 : 0 },
      area,
    });
  }, [mode, layout, walls, overheads, tower, island, countertop, acc, wWidth, wFull, wDoors, wDrawers, wMirror, wLed, spec, area]);

  const pickTier = (t: TierKey) => {
    setTier(t);
    setCountertop(TIERS[t].spec.countertop);
  };

  const toggleAcc = (key: keyof typeof acc) => setAcc({ ...acc, [key]: !acc[key] });

  return (
    <section id="estimator" className="no-print relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <Eyebrow index="03">Instant estimate</Eyebrow>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-12">
          <Reveal delay={60}>
            <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
              Measure the wall. Pick a tier.
              <br />
              <em className="italic font-light text-oak">Done.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[15px] leading-relaxed text-ink-soft max-w-md lg:justify-self-end">
              Three steps and about thirty seconds — a realistic per-linear-meter estimate
              in pesos, itemized and ready to send to us on Messenger. Indicative only;
              final quotes are confirmed on site.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_430px] gap-8 items-start">
          {/* ---------------------------- controls ---------------------------- */}
          <div className="space-y-5">
            {/* STEP 1 — project */}
            <Reveal>
              <Step num="1" title="What are we building?" hint="Size along the wall">
                <div className="inline-flex rounded-full border border-line bg-paper p-1">
                  {(
                    [
                      { key: "kitchen", label: "Kitchen", icon: CookingPot },
                      { key: "wardrobe", label: "Wardrobe", icon: DoorClosed },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setMode(t.key)}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-medium transition-all duration-300 ${
                        mode === t.key ? "bg-ink text-cream shadow" : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      <t.icon size={15} />
                      {t.label}
                    </button>
                  ))}
                </div>

                {mode === "kitchen" ? (
                  <>
                    <OptionGrid cols={3}>
                      <OptionCard active={layout === "straight"} onClick={() => setLayout("straight")} title="Straight" sub="Single wall run" />
                      <OptionCard active={layout === "l"} onClick={() => setLayout("l")} title="L-shape" sub="One corner" />
                      <OptionCard active={layout === "u"} onClick={() => setLayout("u")} title="U-shape" sub="Two corners" />
                    </OptionGrid>

                    <MeterSlider
                      label={layout === "straight" ? "Wall length" : "Total wall length (all runs)"}
                      value={length}
                      min={1.8}
                      max={7}
                      hint="Tip: pace or tape-measure each wall where cabinets will go, then add them up."
                      onChange={setLength}
                    />

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <ToggleChip
                        active={overheads}
                        onClick={() => setOverheads(!overheads)}
                        label="Overhead cabinets"
                        note="≈ 80% of base runs"
                      />
                      <ToggleChip
                        active={island}
                        onClick={() => setIsland(!island)}
                        label="Kitchen island (1.8 m)"
                        note={`From ≈ ${PHP(25000)}`}
                      />
                      <ToggleChip
                        active={tower}
                        onClick={() => setTower(!tower)}
                        label="Tall pantry tower"
                        note="0.6 m wide, floor-to-ceiling"
                      />
                    </div>

                    <KitchenDiagram
                      layout={layout}
                      walls={walls}
                      wallCoverage={overheads ? 0.8 : 0}
                      island={island}
                      islandLength={1.8}
                    />
                  </>
                ) : (
                  <>
                    <OptionGrid cols={3}>
                      <OptionCard active={wDoors === "swing"} onClick={() => setWDoors("swing")} title="Swing doors" sub="Classic fit" />
                      <OptionCard active={wDoors === "sliding"} onClick={() => setWDoors("sliding")} title="Sliding doors" sub="Space-saving · +24%" />
                      <OptionCard active={wDoors === "open"} onClick={() => setWDoors("open")} title="Open shelves" sub="Walk-in style · −14%" />
                    </OptionGrid>

                    <MeterSlider
                      label="Wardrobe width"
                      value={wWidth}
                      min={0.9}
                      max={5}
                      hint="Measure the wall space the wardrobe will fill."
                      onChange={setWWidth}
                    />

                    <ToggleChip
                      active={wFull}
                      onClick={() => setWFull(!wFull)}
                      label="Floor-to-ceiling (3.0 m)"
                      note="+22% · maximum storage & no dust shelf"
                    />

                    <WardrobeDiagram
                      width={wWidth}
                      fullHeight={wFull}
                      doors={wDoors}
                      drawers={wDrawers}
                      mirrors={wMirror ? 1 : 0}
                    />
                  </>
                )}
              </Step>
            </Reveal>

            {/* STEP 2 — tier */}
            <Reveal>
              <Step num="2" title="Pick your finish tier" hint="We can fine-tune materials later">
                <div className="grid md:grid-cols-3 gap-3">
                  {(Object.keys(TIERS) as TierKey[]).map((tKey) => {
                    const t = TIERS[tKey];
                    const active = tier === tKey;
                    return (
                      <button
                        key={tKey}
                        type="button"
                        onClick={() => pickTier(tKey)}
                        className={`relative text-left rounded-3xl border p-5 md:p-6 transition-all duration-300 ${
                          active
                            ? "bg-ink text-cream border-ink shadow-[0_24px_45px_-22px_rgba(31,27,20,0.55)]"
                            : "bg-paper border-line hover:border-oak/50"
                        }`}
                      >
                        {tKey === "balanced" && (
                          <span
                            className={`absolute -top-3 left-5 rounded-full font-mono text-[9px] tracking-[0.18em] uppercase px-3 py-1.5 ${
                              active ? "bg-oak text-cream" : "bg-oak text-cream"
                            }`}
                          >
                            Most chosen
                          </span>
                        )}
                        <span
                          className={`absolute top-5 right-5 grid place-items-center w-[20px] h-[20px] rounded-full border transition-all ${
                            active ? "bg-oak border-oak" : "border-ink/25"
                          }`}
                        >
                          {active && <Check size={12} className="text-cream" strokeWidth={3} />}
                        </span>
                        <p className={`font-mono text-[10px] tracking-[0.22em] uppercase ${active ? "text-oak-tint" : "text-oak"}`}>
                          {t.name}
                        </p>
                        <p className="mt-3 font-display text-[21px] font-semibold tracking-tight leading-none">
                          {mode === "kitchen" ? t.kitchenRate : t.wardrobeRate}
                        </p>
                        <p className={`mt-1.5 text-[11.5px] ${active ? "text-cream/55" : "text-faint"}`}>{t.tagline}</p>
                        <ul className={`mt-4 space-y-2 text-[12.5px] leading-snug ${active ? "text-cream/80" : "text-ink-soft"}`}>
                          {t.items.map((it) => (
                            <li key={it} className="flex gap-2">
                              <Check size={13} strokeWidth={2.5} className={`mt-0.5 shrink-0 ${active ? "text-oak-tint" : "text-oak"}`} />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </Step>
            </Reveal>

            {/* STEP 3 — extras & location */}
            <Reveal>
              <Step num="3" title="Extras & location" hint="Optional — toggle what you need">
                {mode === "kitchen" ? (
                  <>
                    <div>
                      <p className="text-[13.5px] font-medium text-ink-soft mb-2.5">Countertop</p>
                      <OptionGrid cols={4}>
                        {(
                          [
                            ["none", "No top yet", "₱0"],
                            ["laminate", "Laminate", `${PHP(3800)}/lm`],
                            ["granite", "Granite", `${PHP(6800)}/lm`],
                            ["quartz", "Quartz", `${PHP(9800)}/lm`],
                          ] as const
                        ).map(([key, title, sub]) => (
                          <OptionCard key={key} active={countertop === key} onClick={() => setCountertop(key)} title={title} sub={sub} />
                        ))}
                      </OptionGrid>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <ToggleChip active={acc.cutlery} onClick={() => toggleAcc("cutlery")} label="Cutlery dividers" note={`+ ${PHP(2800)}`} />
                      <ToggleChip active={acc.baskets} onClick={() => toggleAcc("baskets")} label="Pull-out baskets ×2" note={`+ ${PHP(9600)}`} />
                      <ToggleChip active={acc.bin} onClick={() => toggleAcc("bin")} label="Built-in waste bin" note={`+ ${PHP(5800)}`} />
                      <ToggleChip active={acc.led} onClick={() => toggleAcc("led")} label="LED task strip (3 m)" note={`+ ${PHP(6600)}`} />
                    </div>
                  </>
                ) : (
                  <>
                    <Stepper
                      label="Internal soft-close drawers"
                      priceNote={`+ ${PHP(2600)} each · felt-lined base`}
                      value={wDrawers}
                      max={4}
                      onChange={setWDrawers}
                    />
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      <ToggleChip active={wMirror} onClick={() => setWMirror(!wMirror)} label="Mirror door panel" note={`+ ${PHP(2800)}`} />
                      <ToggleChip active={wLed} onClick={() => setWLed(!wLed)} label="Sensor LED lighting" note={`+ ${PHP(4800)}`} />
                    </div>
                  </>
                )}

                <div>
                  <p className="text-[13.5px] font-medium text-ink-soft mb-2.5">Where is the project?</p>
                  <OptionGrid cols={2}>
                    {AREAS.map((a) => (
                      <OptionCard
                        key={a.key}
                        active={area === a.key}
                        onClick={() => setArea(a.key)}
                        title={a.label}
                        sub={`${PHP(a.fee)} mobilization`}
                      />
                    ))}
                  </OptionGrid>
                </div>
              </Step>
            </Reveal>
          </div>

          {/* ---------------------------- summary ---------------------------- */}
          <Reveal delay={120} className="lg:sticky lg:top-24">
            <SummaryPanel estimate={estimate} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
