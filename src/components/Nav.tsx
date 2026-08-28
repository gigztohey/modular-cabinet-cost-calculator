import { useEffect, useState } from "react";
import { Calculator, Menu, X, Phone } from "lucide-react";
import { FacebookIcon } from "../lib/icons";
import { ElbiLogo } from "../lib/ElbiLogo";

const LINKS = [
  { href: "#approach", label: "Our approach" },
  { href: "#works", label: "Actual builds" },
  { href: "#estimator", label: "Get an estimate" },
  { href: "#process", label: "How it works" },
  { href: "#quote", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-cream/85 backdrop-blur-md border-b border-line/70" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-[74px]">
          {/* logo — new ELBI mark */}
          <a href="#top" className="flex items-center gap-3 group shrink-0">
            <ElbiLogo variant="light" size="md" className="group-hover:opacity-90 transition-opacity" />
          </a>

          {/* desktop links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13.5px] text-ink-soft hover:text-ink transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-oak after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="tel:09154082813"
              className="hidden lg:inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-full border border-ink/15 hover:border-oak hover:text-oak-deep transition-all whitespace-nowrap leading-none"
            >
              <Phone size={14} className="shrink-0" />
              <span className="font-mono text-[11px] tracking-wide">09154082813&nbsp;|&nbsp;09936932883</span>
            </a>
            <a
              href="#estimator"
              className="hidden sm:inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-full border border-ink/15 hover:border-oak hover:text-oak-deep transition-all whitespace-nowrap shrink-0 leading-none"
            >
              <Calculator size={15} strokeWidth={2.2} className="shrink-0" />
              <span className="whitespace-nowrap">Estimate now</span>
            </a>
            <a
              href="https://www.facebook.com/Elbimodular"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-full bg-ink text-cream hover:bg-oak-deep transition-all duration-300"
            >
              <FacebookIcon size={15} />
              <span className="hidden sm:inline">@Elbimodular</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 text-ink"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-line px-6 py-4 space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[15px] font-medium text-ink-soft hover:text-oak"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 mt-3 border-t border-line/60 grid grid-cols-2 gap-2">
            <a
              href="tel:09154082813"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-oak text-cream px-4 py-3 text-[13px] font-semibold"
            >
              <Phone size={14} />
              09154082813
            </a>
            <a
              href="tel:09936932883"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-[13px] font-semibold"
            >
              <Phone size={14} />
              09936932883
            </a>
          </div>
          <p className="text-center font-mono text-[10px] tracking-wide text-faint pt-1">CONTACT: Tap to call</p>
        </div>
      )}
    </header>
  );
}
