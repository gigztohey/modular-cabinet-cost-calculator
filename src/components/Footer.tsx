import { MapPin, ShieldCheck, Phone } from "lucide-react";
import { FacebookIcon, MessengerIcon } from "../lib/icons";

export default function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-ink text-cream">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9 1.5v15M1.5 9H9" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="5.25" cy="12" r="0.9" fill="currentColor" />
                <circle cx="12.75" cy="5.25" r="0.9" fill="currentColor" />
              </svg>
            </span>
            <span className="font-display text-[17px] font-semibold">ELBI Modular</span>
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-faint">
            Custom cabinet making & professional installation for homes and businesses —
            made for your space, built for real life.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-faint mb-4">Explore</p>
          <ul className="space-y-2.5 text-[13.5px]">
            {[
              ["#approach", "Our approach"],
              ["#services", "What we do"],
              ["#estimator", "Instant estimate"],
              ["#process", "How it works"],
              ["#about", "About ELBI"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="text-ink-soft hover:text-oak-deep transition-colors">{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-faint mb-4">Connect</p>
          <ul className="space-y-2.5 text-[13.5px]">
            <li>
              <a href="https://www.facebook.com/Elbimodular" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink-soft hover:text-oak-deep transition-colors">
                <FacebookIcon size={14} /> facebook.com/Elbimodular
              </a>
            </li>
            <li>
              <a href="https://m.me/Elbimodular" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-ink-soft hover:text-oak-deep transition-colors">
                <MessengerIcon size={14} /> m.me/Elbimodular
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-faint mb-4">Details</p>
          <ul className="space-y-2.5 text-[13.5px] text-ink-soft">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-oak" />
              Los Baños, Laguna · Philippines
            </li>
            <li className="flex items-start gap-2">
              <Phone size={14} className="mt-0.5 shrink-0 text-oak" />
              <span className="flex flex-wrap gap-x-2">
                <a href="tel:09154082813" className="hover:text-oak-deep transition-colors font-medium">
                  09154082813
                </a>
                <span className="text-faint">|</span>
                <a href="tel:09936932883" className="hover:text-oak-deep transition-colors font-medium">
                  09936932883
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-oak" />
              1-year workmanship warranty
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint">
            © {new Date().getFullYear()} ELBI Modular · Estimates indicative, subject to site survey
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-faint">Made in Laguna, PH</p>
        </div>
      </div>
    </footer>
  );
}
