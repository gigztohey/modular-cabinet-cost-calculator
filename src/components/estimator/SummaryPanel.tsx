import { useEffect, useMemo, useState } from "react";
import { Copy, Check, Printer } from "lucide-react";
import { PHP, type Estimate } from "../../lib/pricing";
import { useCountUp } from "../../lib/ui";
import { MessengerIcon } from "../../lib/icons";

export function SummaryPanel({ estimate }: { estimate: Estimate }) {
  const animated = useCountUp(estimate.subtotal);
  const [copied, setCopied] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => setPulseKey((k) => k + 1), [estimate.subtotal]);

  const shareText = useMemo(() => buildShareText(estimate), [estimate]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  };

  const groups = useMemo(() => {
    const order = ["Cabinets", "Countertop", "Hardware", "Accessories", "Services"];
    return order
      .map((g) => ({ name: g, lines: estimate.lines.filter((l) => l.group === g) }))
      .filter((g) => g.lines.length > 0);
  }, [estimate]);

  return (
    <div className="rounded-3xl border border-ink/10 bg-ink text-cream overflow-hidden shadow-[0_30px_60px_-20px_rgba(31,27,20,0.45)]">
      {/* header */}
      <div className="px-6 md:px-7 pt-6 pb-5 border-b border-cream/10">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-cream/50">
            Live estimate · {estimate.project}
          </p>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-oak-tint opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-oak-tint" />
          </span>
        </div>

        <div key={pulseKey} className="total-pulse mt-3">
          <p className="font-display font-semibold tracking-tight text-[clamp(2.4rem,4.6vw,3.4rem)] leading-none text-oak-tint">
            {PHP(animated)}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <p className="text-[12.5px] text-cream/60">
            likely range after on-site survey:{" "}
            <span className="text-cream/90 font-medium">
              {PHP(estimate.low)} – {PHP(estimate.high)}
            </span>
          </p>
          <p className="font-mono text-[11px] text-cream/45">
            ≈ {PHP(estimate.blendedRate)}/lm · {estimate.totalLM.toFixed(1)} lm total
          </p>
        </div>
      </div>

      {/* breakdown */}
      <div className="max-h-[300px] md:max-h-[340px] overflow-y-auto slim-scroll px-6 md:px-7 py-5 space-y-5">
        {groups.map((g) => (
          <div key={g.name}>
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-cream/40 mb-2">{g.name}</p>
            <div className="space-y-2.5">
              {g.lines.map((l, i) => (
                <div key={i} className="flex items-start justify-between gap-4 text-[13px] leading-snug">
                  <div className="min-w-0">
                    <p className="text-cream/90">{l.label}</p>
                    <p className="font-mono text-[10px] text-cream/40 mt-0.5">
                      {l.qty} {l.unit} × {PHP(l.rate)}
                      {l.detail ? ` — ${l.detail}` : ""}
                    </p>
                  </div>
                  <p className="font-mono text-[12.5px] text-oak-tint whitespace-nowrap">{PHP(l.total)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* actions */}
      <div className="px-6 md:px-7 pb-6 pt-4 border-t border-cream/10 space-y-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-cream text-ink px-4 py-3 text-[13px] font-semibold hover:bg-oak-tint transition-colors"
          >
            {copied ? <Check size={15} className="text-moss" /> : <Copy size={15} />}
            {copied ? "Copied!" : "Copy estimate"}
          </button>
          <a
            href="https://m.me/Elbimodular"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-oak text-cream px-4 py-3 text-[13px] font-semibold hover:bg-oak-deep transition-colors"
          >
            <MessengerIcon size={15} />
            Send to ELBI
          </a>
        </div>
        <button
          onClick={() => window.print()}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 px-4 py-2.5 text-[12.5px] text-cream/70 hover:border-oak-tint hover:text-oak-tint transition-all"
        >
          <Printer size={14} />
          Print / save as PDF
        </button>
        <p className="pt-2 text-[10.5px] leading-relaxed text-cream/40">
          Indicative estimate only — excludes appliances, sink & tap, plumbing and electrical
          works. Final quotation is confirmed after an on-site survey.
        </p>
      </div>

      <PrintSheet estimate={estimate} />
    </div>
  );
}

/* ------------------- plain-text shareable summary ------------------ */

function buildShareText(e: Estimate) {
  const rows = e.lines
    .map((l) => `• ${l.label} — ${l.qty} ${l.unit} × ${PHP(l.rate)} = ${PHP(l.total)}`)
    .join("\n");
  return [
    "ELBI MODULAR — CABINET ESTIMATE (indicative)",
    "----------------------------------------",
    e.summary,
    "",
    rows,
    "----------------------------------------",
    `ESTIMATED TOTAL: ${PHP(e.subtotal)}`,
    `Likely range after on-site survey: ${PHP(e.low)} – ${PHP(e.high)}`,
    `Blended rate: ≈ ${PHP(e.blendedRate)} per linear meter`,
    "",
    "Excludes appliances, sink/tap, plumbing & electrical. Final quotation confirmed after an on-site survey.",
    "Contact: facebook.com/Elbimodular",
  ].join("\n");
}

/* ----------------------- print-only estimate sheet ----------------- */

export function PrintSheet({ estimate }: { estimate: Estimate }) {
  return (
    <div className="hidden print-sheet bg-white text-black font-sans">
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
        <div>
          <p className="font-display text-[26px] font-semibold">ELBI Modular</p>
          <p className="text-[12px] text-neutral-600">Custom cabinets & professional installation · Philippines</p>
        </div>
        <div className="text-right text-[12px] text-neutral-600">
          <p>facebook.com/Elbimodular</p>
          <p>{new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</p>
        </div>
      </div>

      <p className="text-[13px] mb-1 font-semibold uppercase tracking-wider text-neutral-500">Project configuration</p>
      <p className="text-[14px] mb-6">{estimate.summary}</p>

      <table className="w-full text-[12.5px] mb-6">
        <thead>
          <tr className="border-b border-black text-left">
            <th className="py-2 font-semibold">Description</th>
            <th className="py-2 font-semibold text-right">Qty</th>
            <th className="py-2 font-semibold text-right">Rate</th>
            <th className="py-2 font-semibold text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {estimate.lines.map((l, i) => (
            <tr key={i} className="border-b border-neutral-300">
              <td className="py-2 pr-4">
                <p className="font-medium">{l.label}</p>
                {l.detail && <p className="text-neutral-500 text-[11px]">{l.detail}</p>}
              </td>
              <td className="py-2 text-right">{l.qty} {l.unit}</td>
              <td className="py-2 text-right">{PHP(l.rate)}</td>
              <td className="py-2 text-right font-medium">{PHP(l.total)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-black">
            <td className="py-3 font-semibold" colSpan={3}>Estimated total (indicative)</td>
            <td className="py-3 text-right font-bold text-[15px]">{PHP(estimate.subtotal)}</td>
          </tr>
          <tr>
            <td className="pb-3 text-neutral-600" colSpan={3}>Likely range after on-site survey</td>
            <td className="pb-3 text-right text-neutral-800">{PHP(estimate.low)} – {PHP(estimate.high)}</td>
          </tr>
        </tfoot>
      </table>

      <div className="text-[11px] text-neutral-600 space-y-1.5 border-t border-neutral-300 pt-4">
        <p>1. Indicative estimate based on configured specifications and current Philippine market rates (2025–2026).</p>
        <p>2. Excludes appliances, sink & faucet, plumbing and electrical relocation, wall repairs, and painting.</p>
        <p>3. Final quotation is subject to an on-site survey and approved design. Estimate valid for 30 days.</p>
        <p>4. Payment schedule: 50% down payment, 40% upon delivery, 10% upon completion.</p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-10">
        <div className="border-t border-black pt-2 text-[11px] text-neutral-600">Client signature over printed name</div>
        <div className="border-t border-black pt-2 text-[11px] text-neutral-600">Authorized representative — ELBI Modular</div>
      </div>
    </div>
  );
}
