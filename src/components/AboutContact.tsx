import { useState, type FormEvent } from "react";
import { Check, ClipboardCheck, Send, ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal } from "../lib/ui";
import { FacebookIcon, MessengerIcon } from "../lib/icons";

/* --------------------------- 05 · about ELBI ------------------------ */

const ABOUT_POINTS = [
  "Solutions planned for your actual space",
  "Material and finish guidance",
  "One team from planning through installation",
];

export function About() {
  return (
    <section id="about" className="no-print py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <Reveal>
              <Eyebrow index="05">About ELBI</Eyebrow>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-faint mb-4">
                Craftsmanship meets function
              </p>
              <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
                We care about the details you see —
                <em className="italic font-light text-oak"> and the ones you don&apos;t.</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:pt-24">
            <Reveal delay={120}>
              <p className="text-[15.5px] leading-relaxed text-ink-soft">
                From clean cabinet lines to doors that align properly, we approach every job
                with practical thinking and careful workmanship. The goal is simple: cabinetry
                that fits the room, supports your routine, and feels finished.
              </p>
              <ul className="mt-7 space-y-3.5">
                {ABOUT_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[14.5px] text-ink">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-oak-tint text-oak-deep shrink-0">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                className="group mt-9 inline-flex items-center gap-3 bg-ink text-cream pl-6 pr-2.5 py-2.5 rounded-full text-[14px] font-medium hover:bg-oak-deep transition-colors duration-300"
              >
                Request a consultation
                <span className="grid place-items-center w-9 h-9 rounded-full bg-cream/15 group-hover:translate-x-0.5 transition-transform">
                  <ArrowUpRight size={15} />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------ 06 · start a project ---------------------- */

export function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("Kitchen");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const text = [
      "Hi ELBI Modular! I'd like to start a project.",
      "",
      `Name: ${name || "—"}`,
      `Contact: ${contact || "—"}`,
      `Location: ${city || "—"}`,
      `Project: ${type}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard unavailable — still open Messenger */
    }
    window.open("https://m.me/Elbimodular", "_blank", "noopener");
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const inputCls =
    "w-full rounded-2xl border border-line bg-cream px-5 py-4 text-[14.5px] text-ink placeholder:text-faint/70 outline-none focus:border-oak focus:ring-2 focus:ring-oak/20 transition-all";

  return (
    <section id="quote" className="no-print py-20 md:py-28 bg-sand/50 border-t border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16">
          {/* left copy */}
          <div>
            <Reveal>
              <Eyebrow index="06">Start a project</Eyebrow>
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-faint mb-4">
                Project inquiry · response within 24h
              </p>
              <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
                Let&apos;s build a space that works
                <em className="italic font-light text-oak"> better for you.</em>
              </h2>
              <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
                Tell us a little about your project. We&apos;ll review the details and get
                back to discuss the next step — usually within the day.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-9 space-y-3 max-w-sm">
                <a
                  href="https://m.me/Elbimodular"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-cream px-5 py-4 hover:border-oak transition-all group"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-ink text-cream group-hover:bg-oak transition-colors shrink-0">
                    <MessengerIcon size={18} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold">Messenger (fastest)</span>
                    <span className="block font-mono text-[10.5px] text-faint mt-0.5">m.me/Elbimodular</span>
                  </span>
                </a>
                <a
                  href="https://www.facebook.com/Elbimodular"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 rounded-2xl border border-line bg-cream px-5 py-4 hover:border-oak transition-all group"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-full border border-line text-ink group-hover:bg-oak group-hover:text-cream group-hover:border-oak transition-colors shrink-0">
                    <FacebookIcon size={18} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold">Facebook page</span>
                    <span className="block font-mono text-[10.5px] text-faint mt-0.5">facebook.com/Elbimodular</span>
                  </span>
                </a>
                <a
                  href="#estimator"
                  className="flex items-center gap-3.5 rounded-2xl border border-dashed border-oak/50 bg-oak-tint/40 px-5 py-4 hover:bg-oak-tint/70 transition-all"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-oak text-cream shrink-0">
                    <ClipboardCheck size={17} />
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold">Prefer a number first?</span>
                    <span className="block font-mono text-[10.5px] text-oak-deep/80 mt-0.5">Get an instant estimate above</span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={160}>
            <form onSubmit={submit} className="rounded-3xl border border-line bg-ink text-cream p-7 md:p-9">
              <p className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-cream/45 mb-7">
                Project inquiry · sent via Messenger
              </p>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={`${inputCls} !bg-cream/[0.06] !border-cream/15 !text-cream placeholder:!text-cream/40 focus:!ring-oak/40 focus:!border-oak`}
                  />
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Mobile / Viber"
                    className={`${inputCls} !bg-cream/[0.06] !border-cream/15 !text-cream placeholder:!text-cream/40 focus:!ring-oak/40 focus:!border-oak`}
                  />
                </div>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City / barangay (e.g. Los Baños, Laguna)"
                  className={`${inputCls} !bg-cream/[0.06] !border-cream/15 !text-cream placeholder:!text-cream/40 focus:!ring-oak/40 focus:!border-oak`}
                />

                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/45 mb-2.5">Project type</p>
                  <div className="flex flex-wrap gap-2">
                    {["Kitchen", "Wardrobe", "TV / storage wall", "Other"].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setType(t)}
                        className={`rounded-full px-4 py-2 text-[13px] border transition-all ${
                          type === t
                            ? "bg-oak border-oak text-cream"
                            : "border-cream/20 text-cream/70 hover:border-oak-tint hover:text-oak-tint"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about the space — wall size, must-haves, timeline…"
                  rows={4}
                  className={`${inputCls} !bg-cream/[0.06] !border-cream/15 !text-cream placeholder:!text-cream/40 focus:!ring-oak/40 focus:!border-oak resize-none`}
                />

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-oak text-cream px-6 py-4 text-[14.5px] font-semibold hover:bg-oak-deep transition-colors"
                >
                  <Send size={15} />
                  Send inquiry via Messenger
                </button>

                {sent && (
                  <p className="flex items-center gap-2 justify-center text-[12.5px] text-oak-tint">
                    <Check size={14} />
                    Message copied! Paste it in the Messenger chat that just opened.
                  </p>
                )}

                <p className="text-center text-[11px] text-cream/40 leading-relaxed">
                  No commitments, no spam — we reply with the next step and possible survey schedule.
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
