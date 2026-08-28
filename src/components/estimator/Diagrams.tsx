import type { Layout } from "../../lib/pricing";

/* Live plan-view (top-down) diagram of the kitchen being configured.
   Units are meters inside the group; it is auto-scaled to fit.        */

export function KitchenDiagram({
  layout,
  walls,
  wallCoverage,
  island,
  islandLength,
}: {
  layout: Layout;
  walls: number[];
  wallCoverage: number;
  island: boolean;
  islandLength: number;
}) {
  const A = walls[0] ?? 3;
  const B = walls[1] ?? 0;
  const C = walls[2] ?? 0;
  const BASE_D = 0.6;
  const WALL_T = 0.05;
  const cov = wallCoverage;

  /* scene extents in meters */
  const sceneW = layout === "straight" ? Math.max(A, island ? islandLength + 1.6 : 0) : layout === "l" ? A + 0.8 : A;
  const sceneH =
    layout === "straight"
      ? 0.6 + (island ? 1.8 : 0.35)
      : layout === "l"
        ? Math.max(B + 1, island ? B * 0.5 + 1.6 : 0)
        : Math.max(B, C) + 0.9;

  const padX = 0.7;
  const padY = 0.7;
  const W = 340;
  const H = layout === "straight" ? 150 : 200;
  const s = Math.min((W - padX * 20) / sceneW, (H - padY * 20) / sceneH, 68);
  const ox = (W - sceneW * s) / 2 + WALL_T * s;
  const oy = (H - sceneH * s) / 2 + WALL_T * s * 2 - (island && layout === "straight" ? -8 : 0);

  const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), Math.max(lo, hi));
  const islandX =
    layout === "straight"
      ? clamp(A / 2 - islandLength / 2, 0, A - islandLength + 0.6)
      : layout === "l"
        ? clamp(A * 0.62 - islandLength / 2, 0.75, A - islandLength + 0.2)
        : clamp(A / 2 - islandLength / 2, 0.72, A - islandLength - 0.72);
  const islandY =
    layout === "straight"
      ? 0.6 + 1.05
      : layout === "l"
        ? clamp(B * 0.55, 0.75, B - 0.85)
        : clamp(Math.max(B, C) / 2 + 0.3, 0.75, Math.max(B, C, 1.2) - 0.85);

  return (
    <div className="rounded-2xl border border-line bg-paper p-3">
      <div className="flex items-center justify-between px-2 pt-1 pb-2">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-faint">Plan view · live</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-oak">
          {layout === "straight" ? "I-shape" : layout === "l" ? "L-shape" : "U-shape"}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {/* floor dot grid */}
        <defs>
          <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#ddd3c0" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#dots)" rx="12" />

        <g transform={`translate(${ox},${oy}) scale(${s})`}>
          {/* -------------------- walls -------------------- */}
          <g stroke="#1f1b14" strokeWidth={WALL_T} strokeLinecap="square">
            {layout === "straight" && <line x1={0} y1={0} x2={A} y2={0} />}
            {layout === "l" && (
              <>
                <line x1={0} y1={0} x2={A} y2={0} />
                <line x1={0} y1={0} x2={0} y2={B} />
              </>
            )}
            {layout === "u" && (
              <>
                <line x1={0} y1={0} x2={A} y2={0} />
                <line x1={0} y1={0} x2={0} y2={B} />
                <line x1={A} y1={0} x2={A} y2={C} />
              </>
            )}
          </g>

          {/* ------------------ base cabinets ------------------ */}
          <g fill="#f0ddc4" stroke="#a25b2e" strokeWidth={0.03}>
            {layout === "straight" && <rect x={0} y={0} width={A} height={BASE_D} rx={0.03} />}
            {layout === "l" && (
              <>
                <rect x={0} y={0} width={A} height={BASE_D} rx={0.03} />
                <rect x={0} y={0} width={BASE_D} height={B} rx={0.03} />
              </>
            )}
            {layout === "u" && (
              <>
                <rect x={0} y={0} width={A} height={BASE_D} rx={0.03} />
                <rect x={0} y={0} width={BASE_D} height={B} rx={0.03} />
                <rect x={A - BASE_D} y={0} width={BASE_D} height={C} rx={0.03} />
              </>
            )}
          </g>

          {/* ---------------- overhead (dashed, per coverage) ---------------- */}
          {cov > 0.02 && (
            <g fill="#faf7f0" fillOpacity={0.85} stroke="#7c4a24" strokeWidth={0.02} strokeDasharray="0.14 0.1">
              {layout === "straight" && <rect x={0} y={0.02} width={A * cov} height={0.34} rx={0.02} />}
              {layout === "l" && (
                <>
                  <rect x={0} y={0.02} width={A * cov} height={0.34} rx={0.02} />
                  <rect x={0.02} y={0} width={0.34} height={B * cov} rx={0.02} />
                </>
              )}
              {layout === "u" && (
                <>
                  <rect x={0} y={0.02} width={A * cov} height={0.34} rx={0.02} />
                  <rect x={0.02} y={0} width={0.34} height={B * cov} rx={0.02} />
                  <rect x={A - 0.36} y={0} width={0.34} height={C * cov} rx={0.02} />
                </>
              )}
            </g>
          )}

          {/* ----------------------- island ----------------------- */}
          {island && (
            <g>
              <rect
                x={islandX}
                y={islandY}
                width={islandLength}
                height={0.85}
                rx={0.06}
                fill="#e3c39c"
                stroke="#7c4a24"
                strokeWidth={0.03}
              />
              <text
                x={islandX + islandLength / 2}
                y={islandY + 0.46}
                textAnchor="middle"
                fontSize={0.2}
                fill="#7c4a24"
                fontFamily="IBM Plex Mono, monospace"
              >
                island {islandLength.toFixed(1)} m
              </text>
            </g>
          )}

          {/* ------------------- dimension labels ------------------- */}
          <g fill="#57503f" fontFamily="IBM Plex Mono, monospace" fontSize={0.19}>
            <text x={A / 2} y={-0.16} textAnchor="middle">
              A · {A.toFixed(1)} m
            </text>
            {layout === "l" && (
              <text x={-0.14} y={B / 2} textAnchor="middle" transform={`rotate(-90 ${-0.14} ${B / 2})`}>
                B · {B.toFixed(1)} m
              </text>
            )}
            {layout === "u" && (
              <>
                <text x={-0.14} y={B / 2} textAnchor="middle" transform={`rotate(-90 ${-0.14} ${B / 2})`}>
                  B · {B.toFixed(1)} m
                </text>
                <text x={A + 0.16} y={C / 2} textAnchor="middle" transform={`rotate(90 ${A + 0.16} ${C / 2})`}>
                  C · {C.toFixed(1)} m
                </text>
              </>
            )}
          </g>
        </g>

        {/* compass-ish nose */}
        <text x={W - 14} y={18} textAnchor="end" fontSize={9} fill="#8a8171" fontFamily="IBM Plex Mono, monospace">
          ≈60 cm deep
        </text>
      </svg>
      <p className="flex flex-wrap gap-x-4 gap-y-1 px-2 pt-2 pb-1 font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
        <span className="flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-[3px] bg-[#f0ddc4] border border-oak" /> Base</span>
        <span className="flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-[3px] bg-cream border border-dashed border-[#7c4a24]" /> Overhead</span>
        <span className="flex items-center gap-1.5"><i className="inline-block w-2.5 h-2.5 rounded-[3px] bg-[#e3c39c] border border-[#7c4a24]" /> Island</span>
      </p>
    </div>
  );
}

/* ----------------------- wardrobe elevation ----------------------- */

export function WardrobeDiagram({
  width,
  fullHeight,
  doors,
  drawers,
  mirrors,
}: {
  width: number;
  fullHeight: boolean;
  doors: "swing" | "sliding" | "open";
  drawers: number;
  mirrors: number;
}) {
  const H_M = fullHeight ? 3.0 : 2.4;
  const W = 340;
  const H = 210;
  const bodyH = H - 44;
  const scale = Math.min(bodyH / H_M, (W - 90) / width);
  const wPx = width * scale;
  const hPx = H_M * scale;
  const x0 = (W - wPx) / 2;
  const y0 = H - 30 - hPx;

  const doorCount = Math.max(1, Math.round(width / (doors === "sliding" ? 0.85 : 0.55)));
  const doorW = width / doorCount;
  const drawerRows = Math.min(drawers, 4);
  const drawerH = ln2px(0.18, scale);

  function ln2px(m: number, s: number) {
    return m * s;
  }

  return (
    <div className="rounded-2xl border border-line bg-paper p-3">
      <div className="flex items-center justify-between px-2 pt-1 pb-2">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-faint">Elevation · live</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-oak">
          {doorCount} doors · {H_M.toFixed(1)} m high
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <pattern id="dots2" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="#ddd3c0" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#dots2)" rx="12" />

        {/* plinth */}
        <rect x={x0} y={H - 33} width={wPx} height={3} fill="#1f1b14" opacity={0.8} />

        {/* carcass */}
        <rect x={x0} y={y0} width={wPx} height={hPx} rx={4} fill="#f0ddc4" stroke="#a25b2e" strokeWidth={1.4} />

        {/* doors */}
        {Array.from({ length: doorCount }).map((_, i) => {
          const dx = x0 + i * doorW * scale;
          const isMirror = mirrors > 0 && i >= doorCount - mirrors;
          return (
            <g key={i}>
              <rect
                x={dx + 2}
                y={y0 + 2}
                width={doorW * scale - 4}
                height={hPx - 4}
                rx={3}
                fill={isMirror ? "#dfe6e4" : doors === "open" ? "none" : "#f6e7d1"}
                stroke={doors === "open" ? "#8a8171" : "#a25b2e"}
                strokeWidth={isMirror ? 1.2 : 0.8}
                strokeDasharray={doors === "open" ? "4 3" : "none"}
              />
              {isMirror && (
                <line x1={dx + 8} y1={y0 + 12} x2={dx + doorW * scale - 18} y2={y0 + 42} stroke="#ffffff" strokeWidth={3} opacity={0.9} strokeLinecap="round" />
              )}
              {doors !== "open" && !isMirror && (
                <circle
                  cx={dx + (i === 0 ? doorW * scale - 7 : 7)}
                  cy={y0 + hPx / 2}
                  r={2.4}
                  fill="#7c4a24"
                />
              )}
              {doors === "sliding" && (
                <line x1={dx + doorW * scale - 6} y1={y0 + 8} x2={dx + doorW * scale - 6} y2={y0 + hPx - 8} stroke="#7c4a24" strokeWidth={1} opacity={0.5} />
              )}
            </g>
          );
        })}

        {/* inside for open wardrobes */}
        {doors === "open" && (
          <g stroke="#8a8171" strokeWidth={0.8}>
            {Array.from({ length: doorCount }).map((_, i) => (
              <g key={i}>
                <line x1={x0 + i * doorW * scale + 5} y1={y0 + 16} x2={x0 + (i + 1) * doorW * scale - 5} y2={y0 + 16} />
                <line x1={x0 + i * doorW * scale + 5} y1={y0 + hPx * 0.62} x2={x0 + (i + 1) * doorW * scale - 5} y2={y0 + hPx * 0.62} opacity={0.6} />
              </g>
            ))}
          </g>
        )}

        {/* drawers */}
        {drawerRows > 0 && (
          <g>
            {Array.from({ length: drawerRows }).map((_, r) => (
              <rect
                key={r}
                x={x0 + 4}
                y={y0 + hPx - 4 - (r + 1) * (drawerH + 2)}
                width={wPx - 8}
                height={drawerH}
                rx={2.5}
                fill="#e3c39c"
                stroke="#7c4a24"
                strokeWidth={0.7}
              />
            ))}
          </g>
        )}

        {/* dimension lines */}
        <g stroke="#8a8171" strokeWidth={0.8}>
          <line x1={x0} y1={H - 14} x2={x0 + wPx} y2={H - 14} />
          <line x1={x0} y1={H - 18} x2={x0} y2={H - 10} />
          <line x1={x0 + wPx} y1={H - 18} x2={x0 + wPx} y2={H - 10} />
        </g>
        <text x={W / 2} y={H - 3} textAnchor="middle" fontSize={9.5} fill="#57503f" fontFamily="IBM Plex Mono, monospace">
          {width.toFixed(1)} m
        </text>

        {/* human scale figure */}
        <g transform={`translate(${x0 + wPx + 22}, ${H - 33})`} stroke="#8a8171" strokeWidth={1.3} strokeLinecap="round" fill="none">
          {(() => {
            const fh = 1.7 * scale;
            return (
              <>
                <circle cx={8} cy={-fh + 6} r={5.5} />
                <path d={`M8 ${-fh + 12} v ${fh - 30} m -7 ${-0.62 * fh} l 7 6 7 -6 M8 ${-16} l -6 15 M8 ${-16} l 6 15`} />
              </>
            );
          })()}
        </g>
      </svg>
    </div>
  );
}
