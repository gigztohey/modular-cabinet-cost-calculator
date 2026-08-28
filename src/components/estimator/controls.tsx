import type { ReactNode, CSSProperties } from "react";
import { Minus, Plus, Check } from "lucide-react";

/* ----------------------------- step shell -------------------------- */

export function Step({
  num,
  title,
  hint,
  children,
}: {
  num: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-line bg-cream p-6 md:p-8">
      <div className="flex items-baseline gap-3 mb-6">
        <span className="font-mono text-[11px] text-oak">{num}</span>
        <h3 className="font-display text-[19px] font-semibold">{title}</h3>
        {hint && <span className="ml-auto hidden sm:block text-[12px] text-faint">{hint}</span>}
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

/* --------------------------- option cards -------------------------- */

export function OptionGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const cls =
    cols === 2
      ? "grid-cols-2"
      : cols === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-3";
  return <div className={`grid gap-2.5 ${cls}`}>{children}</div>;
}

export function OptionCard({
  active,
  onClick,
  title,
  sub,
  swatch,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub?: string;
  swatch?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-2xl border px-4 py-3.5 transition-all duration-300 group ${
        active
          ? "border-oak bg-oak-tint/60 shadow-[0_8px_20px_-10px_rgba(162,91,46,0.5)]"
          : "border-line bg-paper hover:border-oak/50"
      }`}
    >
      <span
        className={`absolute top-3 right-3 grid place-items-center w-[18px] h-[18px] rounded-full border transition-all ${
          active ? "bg-oak border-oak" : "border-ink/25"
        }`}
      >
        {active && <Check size={11} className="text-cream" strokeWidth={3} />}
      </span>
      {swatch && (
        <span
          className="block w-full h-8 rounded-lg mb-2.5 border border-ink/10"
          style={{ background: swatch }}
        />
      )}
      <span className="block text-[13.5px] font-semibold leading-tight pr-5">{title}</span>
      {sub && <span className="block mt-1 font-mono text-[10.5px] tracking-wide text-faint">{sub}</span>}
    </button>
  );
}

/* --------------------------- meter slider -------------------------- */

export function MeterSlider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="text-[13.5px] font-medium text-ink-soft">{label}</label>
        <span className="font-mono text-[14px] font-medium text-oak-deep">
          {value.toFixed(1)} <span className="text-[11px] text-faint">m</span>
        </span>
      </div>
      <input
        type="range"
        className="lm-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
        aria-label={label}
      />
      {hint && <p className="mt-2 text-[11.5px] text-faint">{hint}</p>}
    </div>
  );
}

/* ----------------------------- stepper ----------------------------- */

export function Stepper({
  label,
  value,
  min = 0,
  max,
  onChange,
  priceNote,
}: {
  label: string;
  value: number;
  min?: number;
  max: number;
  onChange: (v: number) => void;
  priceNote?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-paper px-4 py-3">
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium leading-tight truncate">{label}</p>
        {priceNote && <p className="font-mono text-[10.5px] text-faint mt-0.5">{priceNote}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="grid place-items-center w-8 h-8 rounded-full border border-ink/15 text-ink-soft hover:border-oak hover:text-oak-deep disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink-soft transition-all"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={13} />
        </button>
        <span className="w-6 text-center font-mono text-[15px] font-medium">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="grid place-items-center w-8 h-8 rounded-full border border-ink/15 text-ink-soft hover:border-oak hover:text-oak-deep disabled:opacity-30 disabled:hover:border-ink/15 disabled:hover:text-ink-soft transition-all"
          aria-label={`Increase ${label}`}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

/* --------------------------- toggle chip --------------------------- */

export function ToggleChip({
  active,
  onClick,
  label,
  note,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  note?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 transition-all ${
        active ? "border-oak bg-oak-tint/60" : "border-line bg-paper hover:border-oak/50"
      }`}
    >
      <span className="text-left">
        <span className="block text-[13.5px] font-medium">{label}</span>
        {note && <span className="block font-mono text-[10.5px] text-faint mt-0.5">{note}</span>}
      </span>
      <span
        className={`relative w-10 h-[22px] rounded-full transition-colors ${active ? "bg-oak" : "bg-line"}`}
      >
        <span
          className={`absolute top-[3px] w-4 h-4 rounded-full bg-cream shadow transition-all ${
            active ? "left-[21px]" : "left-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

/* ----------------------------- select ------------------------------ */

export function PillSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { key: T; label: string; sub?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <OptionGrid cols={options.length > 2 ? 3 : 2}>
      {options.map((o) => (
        <OptionCard
          key={o.key}
          active={value === o.key}
          onClick={() => onChange(o.key)}
          title={o.label}
          sub={o.sub}
        />
      ))}
    </OptionGrid>
  );
}
