/* ------------------------------------------------------------------ */
/*  ELBI Modular — realistic PH pricing engine (2025–2026 market)      */
/*  Benchmarks: PH modular cabinetry ₱8,000–₱35,000 / linear meter     */
/*  depending on carcass, finish, hardware and accessories.            */
/* ------------------------------------------------------------------ */

export const PHP = (n: number) =>
  "₱" + Math.round(n).toLocaleString("en-PH", { maximumFractionDigits: 0 });

/* ------------------------------ types ------------------------------ */

export type ProjectType = "kitchen" | "wardrobe";
export type Layout = "straight" | "l" | "u";
export type Carcass = "mdf" | "ply" | "phenolic";
export type Finish = "pvc" | "hpl" | "acrylic" | "duco";
export type Hardware = "standard" | "softclose" | "blum";
export type Countertop = "none" | "laminate" | "granite" | "solid" | "quartz" | "sintered";

export interface KitchenState {
  layout: Layout;
  walls: number[];           // length of each run in meters
  wallCoverage: number;      // 0–1, share of runs with overhead cabinets
  tallUnits: number;         // pantry / broom / oven towers
  island: boolean;
  islandLength: number;
  carcass: Carcass;
  finish: Finish;
  hardware: Hardware;
  countertop: Countertop;
  accessories: Record<string, number>;
  area: string;
  dismantle: boolean;
}

export interface WardrobeState {
  width: number;             // linear meters of wardrobe
  height: "standard" | "full";
  doors: "swing" | "sliding" | "open";
  carcass: Carcass;
  finish: Finish;
  hardware: Hardware;
  extras: Record<string, number>;
  area: string;
}

export interface LineItem {
  group: "Cabinets" | "Countertop" | "Hardware" | "Accessories" | "Services";
  label: string;
  detail?: string;
  qty: number;
  unit: string;
  rate: number;
  total: number;
}

export interface Estimate {
  project: ProjectType;
  lines: LineItem[];
  subtotal: number;
  low: number;
  high: number;
  totalLM: number;
  blendedRate: number;
  summary: string;
}

/* ------------------------- shared multipliers ---------------------- */

export const CARCASS_MULT: Record<Carcass, number> = {
  mdf: 0.85,
  ply: 1.0,
  phenolic: 1.15,
};
export const FINISH_MULT: Record<Finish, number> = {
  pvc: 0.9,
  hpl: 1.0,
  acrylic: 1.28,
  duco: 1.4,
};
export const HARDWARE_RATE: Record<Hardware, number> = {
  standard: 0,
  softclose: 1200,   // ₱ / lm upgrade — Innotech / Häfele soft-close
  blum: 2400,        // ₱ / lm upgrade — Blum full premium
};

export const LAYOUT_MULT: Record<Layout, number> = {
  straight: 1.0,
  l: 1.05,           // corner solution + filler panels
  u: 1.08,           // two corners
};

export const COUNTERTOP_RATE: Record<Countertop, number> = {
  none: 0,
  laminate: 3800,
  granite: 6800,
  solid: 7500,
  quartz: 9800,
  sintered: 13500,
};

export const AREAS: { key: string; label: string; fee: number; note: string }[] = [
  { key: "losbanos", label: "Los Baños, Laguna & nearby", fee: 3500, note: "Home base — priority scheduling" },
  { key: "laguna-batangas", label: "Laguna · Batangas", fee: 6500, note: "Incl. San Pedro → Calamba → Lipa" },
  { key: "metro", label: "Metro Manila · Rizal · Cavite", fee: 9000, note: "Mobilization + delivery crew" },
  { key: "far", label: "Other provinces", fee: 15000, note: "Quoted & scheduled per project" },
];

/* base fabrication+install rates, marine plywood + HPL reference spec */
const RATE = {
  base: 14500,   // per lm — lower kitchen cabinets
  wall: 11500,   // per lm — overhead cabinets
  tall: 17800,   // each — full-height tower (0.6m wide)
  island: 1.14,  // island multiplier (panels finished on all sides)
  wardrobe: 12800, // per lm — 2.4m H, swing doors
};

const round50 = (n: number) => Math.round(n / 50) * 50;
const round100 = (n: number) => Math.round(n / 100) * 100;

/* --------------------------- kitchen ------------------------------- */

export function computeKitchen(s: KitchenState): Estimate {
  const spec = CARCASS_MULT[s.carcass] * FINISH_MULT[s.finish];
  const layoutMult = LAYOUT_MULT[s.layout];

  const baseLM = s.walls.reduce((a, b) => a + b, 0);
  const wallLM = Math.round(baseLM * s.wallCoverage * 10) / 10;
  const islandLM = s.island ? s.islandLength : 0;
  const totalLM = baseLM + wallLM + islandLM + s.tallUnits * 0.6;

  const rateBase = round50(RATE.base * spec * layoutMult);
  const rateWall = round50(RATE.wall * spec * layoutMult);
  const rateTall = round50(RATE.tall * spec);

  const lines: LineItem[] = [];

  lines.push({
    group: "Cabinets",
    label: "Base cabinets",
    detail: `${s.layout === "straight" ? "Straight" : s.layout === "l" ? "L-shape" : "U-shape"} run · ${labelCarcass(s.carcass)} + ${labelFinish(s.finish)}`,
    qty: baseLM,
    unit: "lm",
    rate: rateBase,
    total: round50(baseLM * rateBase),
  });

  if (wallLM > 0)
    lines.push({
      group: "Cabinets",
      label: "Overhead cabinets",
      detail: `${Math.round(s.wallCoverage * 100)}% coverage of base runs`,
      qty: wallLM,
      unit: "lm",
      rate: rateWall,
      total: round50(wallLM * rateWall),
    });

  if (s.tallUnits > 0)
    lines.push({
      group: "Cabinets",
      label: "Tall / pantry units",
      detail: "Floor-to-ceiling, 0.6 m wide modules",
      qty: s.tallUnits,
      unit: "pc",
      rate: rateTall,
      total: round50(s.tallUnits * rateTall),
    });

  if (islandLM > 0)
    lines.push({
      group: "Cabinets",
      label: "Kitchen island",
      detail: "Panels finished on all exposed sides",
      qty: islandLM,
      unit: "lm",
      rate: round50(rateBase * RATE.island),
      total: round50(islandLM * rateBase * RATE.island),
    });

  /* hardware upgrade beyond standard hinges */
  const hwRate = HARDWARE_RATE[s.hardware]; // hardware independent of spec
  if (hwRate > 0) {
    const hwLM = baseLM + wallLM + islandLM;
    lines.push({
      group: "Hardware",
      label: s.hardware === "blum" ? "Blum premium hardware" : "Soft-close hardware",
      detail: s.hardware === "blum" ? "Blum hinges + Tandembox slides" : "Innotech / Häfele hinges + slides",
      qty: hwLM,
      unit: "lm",
      rate: hwRate,
      total: round50(hwLM * hwRate),
    });
  }

  if (s.countertop !== "none") {
    const ctLM = baseLM + islandLM;
    lines.push({
      group: "Countertop",
      label: `${labelCountertop(s.countertop)} countertop`,
      detail: "20 mm slab, fabricated & installed",
      qty: ctLM,
      unit: "lm",
      rate: COUNTERTOP_RATE[s.countertop],
      total: round50(ctLM * COUNTERTOP_RATE[s.countertop]),
    });
  }

  for (const acc of KITCHEN_ACCESSORIES) {
    const qty = s.accessories[acc.key] ?? 0;
    if (qty > 0)
      lines.push({
        group: "Accessories",
        label: acc.label,
        detail: acc.detail,
        qty: acc.perLM ? baseLM : qty,
        unit: acc.perLM ? "lm" : acc.unit,
        rate: acc.price,
        total: round50((acc.perLM ? baseLM : qty) * acc.price),
      });
  }

  /* services */
  const area = AREAS.find((a) => a.key === s.area) ?? AREAS[0];
  lines.push({
    group: "Services",
    label: "Delivery, install & mobilization",
    detail: area.label,
    qty: 1,
    unit: "lot",
    rate: area.fee,
    total: area.fee,
  });
  if (s.dismantle)
    lines.push({
      group: "Services",
      label: "Dismantle existing cabinets",
      detail: "Removal & haul-out of old units",
      qty: 1,
      unit: "lot",
      rate: 3500,
      total: 3500,
    });

  const subtotal = lines.reduce((a, l) => a + l.total, 0);
  const low = round100(subtotal * 0.93);
  const high = round100(subtotal * 1.12);

  return {
    project: "kitchen",
    lines,
    subtotal,
    low,
    high,
    totalLM,
    blendedRate: totalLM > 0 ? subtotal / totalLM : 0,
    summary: `Kitchen · ${fmtM(baseLM)} base${wallLM ? ` + ${fmtM(wallLM)} overhead` : ""}${s.tallUnits ? ` + ${s.tallUnits} tall unit${s.tallUnits > 1 ? "s" : ""}` : ""}${islandLM ? ` + ${fmtM(islandLM)} island` : ""} · ${labelFinish(s.finish)} on ${labelCarcass(s.carcass)} · ${labelCountertop(s.countertop)} top`,
  };
}

/* --------------------------- wardrobe ------------------------------ */

export function computeWardrobe(s: WardrobeState): Estimate {
  const spec = CARCASS_MULT[s.carcass] * FINISH_MULT[s.finish];
  const doorMult = s.doors === "sliding" ? 1.24 : s.doors === "open" ? 0.86 : 1.0;
  const heightMult = s.height === "full" ? 1.22 : 1.0;

  const rate = round50(RATE.wardrobe * spec * doorMult * heightMult);
  const lines: LineItem[] = [];

  lines.push({
    group: "Cabinets",
    label: "Wardrobe carcass & doors",
    detail: `${s.doors === "sliding" ? "Sliding" : s.doors === "open" ? "Open" : "Swing"} panels · ${s.height === "full" ? "floor-to-ceiling" : "2.4 m standard"} · ${labelFinish(s.finish)} on ${labelCarcass(s.carcass)}`,
    qty: s.width,
    unit: "lm",
    rate,
    total: round50(s.width * rate),
  });

  const hwRate = HARDWARE_RATE[s.hardware];
  if (hwRate > 0)
    lines.push({
      group: "Hardware",
      label: s.hardware === "blum" ? "Blum premium hardware" : "Soft-close hardware",
      detail: s.hardware === "blum" ? "Blum hinges + drawer slides" : "Häfele soft-close system",
      qty: s.width,
      unit: "lm",
      rate: hwRate,
      total: round50(s.width * hwRate),
    });

  for (const ex of WARDROBE_EXTRAS) {
    const qty = s.extras[ex.key] ?? 0;
    if (qty > 0)
      lines.push({
        group: "Accessories",
        label: ex.label,
        detail: ex.detail,
        qty,
        unit: ex.unit,
        rate: ex.price,
        total: round50(qty * ex.price),
      });
  }

  const area = AREAS.find((a) => a.key === s.area) ?? AREAS[0];
  lines.push({
    group: "Services",
    label: "Delivery, install & mobilization",
    detail: area.label,
    qty: 1,
    unit: "lot",
    rate: area.fee,
    total: area.fee,
  });

  const subtotal = lines.reduce((a, l) => a + l.total, 0);
  return {
    project: "wardrobe",
    lines,
    subtotal,
    low: round100(subtotal * 0.93),
    high: round100(subtotal * 1.12),
    totalLM: s.width,
    blendedRate: s.width > 0 ? subtotal / s.width : 0,
    summary: `Wardrobe · ${fmtM(s.width)} ${s.doors} door · ${s.height === "full" ? "full height" : "2.4 m"} · ${labelFinish(s.finish)} on ${labelCarcass(s.carcass)}`,
  };
}

/* ------------------------- option metadata ------------------------- */

export const KITCHEN_ACCESSORIES = [
  { key: "cutlery", label: "Cutlery & drawer organizers", detail: "Solid wood insert trays", price: 2800, unit: "set", max: 3, perLM: false },
  { key: "baskets", label: "Pull-out basket (2-tier)", detail: "Wire / tandem, heavy duty", price: 4800, unit: "pc", max: 6, perLM: false },
  { key: "spice", label: "Slim spice pull-out", detail: "150 mm base module insert", price: 6500, unit: "pc", max: 2, perLM: false },
  { key: "corner", label: "Corner carousel / magic corner", detail: "Reclaims L-U dead corners", price: 9800, unit: "pc", max: 2, perLM: false },
  { key: "bin", label: "Built-in waste bin system", detail: "Soft-close, segregated", price: 5800, unit: "set", max: 2, perLM: false },
  { key: "tall", label: "Tall pantry pull-out", detail: "Tandem larder, 5–6 tiers", price: 14500, unit: "pc", max: 2, perLM: false },
  { key: "lighting", label: "LED task lighting", detail: "Under-cabinet, 3000 K strip", price: 2200, unit: "lm", max: 8, perLM: false },
];

export const WARDROBE_EXTRAS = [
  { key: "drawers", label: "Internal soft-close drawer", detail: "Felt-lined base", price: 2600, unit: "pc", max: 8 },
  { key: "mirror", label: "Mirror door panel", detail: "Ultraclear, per panel", price: 2800, unit: "pc", max: 4 },
  { key: "shoe", label: "Pull-out shoe rack", detail: "Angled, 600 mm module", price: 3600, unit: "pc", max: 4 },
  { key: "led", label: "LED internal lighting", detail: "Sensor-activated strip", price: 2400, unit: "lm", max: 6 },
  { key: "island", label: "Vanity / dresser island", detail: "Per linear meter", price: 13500, unit: "lm", max: 3 },
];

export const labelCarcass = (c: Carcass) =>
  c === "ply" ? "18 mm marine plywood" : c === "phenolic" ? "phenolic / moisture-proof board" : "MR particle board";

export const labelFinish = (f: Finish) =>
  f === "pvc" ? "PVC laminate" : f === "hpl" ? "HPL high-pressure laminate" : f === "acrylic" ? "high-gloss acrylic" : "Duco / PU paint";

export const labelCountertop = (c: Countertop) =>
  c === "none" ? "no countertop" : c === "laminate" ? "laminate" : c === "granite" ? "granite" : c === "solid" ? "solid-surface" : c === "quartz" ? "engineered quartz" : "sintered stone";

export const fmtM = (n: number) => `${Number.isInteger(n) ? n : n.toFixed(1)} m`;
