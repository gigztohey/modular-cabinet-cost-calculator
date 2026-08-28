type Props = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * ELBI Modular logo — replicates the provided brand mark:
 * 3 cabinet silhouettes (short / tall / mid) + wordmark ELBI / MODULAR
 * with subtle cyan/orange edge (glitch) on ELBI like the source image.
 * Uses currentColor for ink/cream adaption.
 */
export function ElbiLogo({ variant = "light", size = "md", className = "" }: Props) {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-cream" : "text-ink";
  const faintColor = isDark ? "text-cream/60" : "text-faint";
  // sizes: height of the mark
  const sizeCls = size === "sm" ? "h-7" : size === "lg" ? "h-12 md:h-[52px]" : "h-8 md:h-9";

  return (
    <span className={`inline-flex items-center gap-3 ${sizeCls} ${textColor} ${className}`}>
      {/* icon: 3 cabinets */}
      <svg
        viewBox="0 0 90 54"
        fill="none"
        aria-hidden="true"
        className="h-full w-auto shrink-0"
      >
        {/* left - short */}
        <path
          d="M3 18 H26 V50 H3 Z"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path d="M3 42 H26" stroke="currentColor" strokeWidth="4" />
        {/* middle - tall */}
        <path
          d="M33 3 H56 V50 H33 Z"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path d="M33 42 H56" stroke="currentColor" strokeWidth="4" />
        {/* right - mid */}
        <path
          d="M63 14 H86 V50 H63 Z"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path d="M63 42 H86" stroke="currentColor" strokeWidth="4" />
      </svg>

      {/* wordmark */}
      <span className="flex flex-col leading-none justify-center">
        <span
          className="font-black tracking-[0.08em] text-[1.7em] md:text-[1.85em] leading-none"
          style={{
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            // subtle anaglyph edge like the source — cyan left, orange right
            textShadow: isDark
              ? "1.2px 0 0 #e67c2a, -1.2px 0 0 #1e90d8"
              : "1px 0 0 rgba(230,124,42,0.9), -1px 0 0 rgba(30,144,216,0.9)",
          }}
        >
          ELBI
        </span>
        <span
          className={`font-bold tracking-[0.34em] text-[0.62em] md:text-[0.64em] mt-[2px] ${faintColor} md:${isDark ? "text-cream/70" : "text-ink/60"}`}
          style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
        >
          MODULAR
        </span>
      </span>
    </span>
  );
}

export function ElbiMark({ className = "", variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  // square mark for favicon / compact use — just the 3 cabinets
  return (
    <svg viewBox="0 0 90 54" fill="none" className={className} aria-hidden="true">
      <rect width="90" height="54" rx="6" fill={variant === "dark" ? "#1f1b14" : "#faf7f0"} />
      <g stroke={variant === "dark" ? "#faf7f0" : "#1f1b14"} strokeWidth="4" fill="none" transform="translate(5,2)">
        <path d="M3 18 H26 V50 H3 Z" />
        <path d="M3 42 H26" />
        <path d="M33 3 H56 V50 H33 Z" />
        <path d="M33 42 H56" />
        <path d="M63 14 H86 V50 H63 Z" />
        <path d="M63 42 H86" />
      </g>
    </svg>
  );
}
