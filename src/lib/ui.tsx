import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

/* ------------------------- scroll reveal wrapper ------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

/* --------------------------- count-up hook ------------------------ */

export function useCountUp(target: number, duration = 650) {
  const [value, setValue] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    const from = prev.current;
    const to = target;
    prev.current = to;
    if (from === to) return;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

/* ------------------------ section eyebrow tag --------------------- */

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="font-mono text-[11px] tracking-[0.25em] text-oak">{index}</span>
      <span className="h-px w-10 bg-oak/40" />
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-faint">{children}</span>
    </div>
  );
}
