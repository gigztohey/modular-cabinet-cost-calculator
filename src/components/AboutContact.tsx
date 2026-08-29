import { useEffect, useState, type FormEvent } from "react";
import { Check, ClipboardCheck, Send, ArrowUpRight, ShieldCheck, ArrowRight, Phone } from "lucide-react";
import { Eyebrow, Reveal } from "../lib/ui";
import { FacebookIcon, MessengerIcon } from "../lib/icons";

function genChallenge() {
  const a = 2 + Math.floor(Math.random() * 8);
  const b = 3 + Math.floor(Math.random() * 7);
  return { a, b, answer: a + b };
}

/* --------------------------- 05 · our story + about --------------- */

const ABOUT_POINTS = [
  "Solutions planned for your actual space",
  "Material and finish guidance",
  "One team from planning through installation",
];

export function About() {
  return (
    <>
      {/* Story: garage 2010 → small corporation */}
      <section id="about" className="no-print py-20 md:py-28 bg-cream">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <Reveal>
                <Eyebrow index="05">Our story</Eyebrow>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-faint mb-4">
                  Since 2010 · Los Baños, Laguna
                </p>
                <h2 className="font-display font-medium tracking-[-0.02em] leading-[1.04] text-[clamp(2rem,4.4vw,3.5rem)]">
                  From a small garage
                  <br />
                  <em className="italic font-light text-oak">to a trusted modular cabinet maker in Laguna — since 2010 (16 years).</em>
                </h2>
              </Reveal>
              <Reveal delay={110}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand/60 px-4 py-2 font-mono text-[10.5px] tracking-wide text-ink-soft">
                    <span className="w-2 h-2 rounded-full bg-oak" /> Est. 2010 — 16 years
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand/60 px-4 py-2 font-mono text-[10.5px] tracking-wide text-ink-soft">
                    Garage → workshop → corporation
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-sand/60 px-4 py-2 font-mono text-[10.5px] tracking-wide text-ink-soft">
                    16 years · 500+ projects in Laguna
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="lg:pt-2">
              <Reveal delay={120}>
                <p className="text-[15.5px] leading-relaxed text-ink-soft">
                  ELBI Modular started in <strong className="font-semibold text-ink">2010 in a small garage</strong> — a few
                  hand tools, long days, and a commitment to do every job right. Through hard work and
                  word-of-mouth, we grew into a <strong className="font-semibold text-ink">small corporation with a streamlined workflow</strong> that
                  makes everything <em className="italic text-oak">simpler</em> for clients: clear instant estimates, guided material
                  &amp; finish choices, and one team from planning through installation.
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                  Today we specialize in <a href="#works" className="underline decoration-oak/30 hover:text-oak-deep">custom wardrobes and closets in Laguna</a> — from walk-in closets in South Forbes to built-in wardrobes in Santa Rosa condos — all made to measure.
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
                  That simplicity attracts clients — homes that feel more organized, businesses that open
                  sooner, and spaces that actually work for real life. We care about the details you see,
                  and the ones you don&apos;t: clean lines, doors that align, lasting finishes.
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
              </Reveal>

              {/* Architects / Engineers commission CTA */}
              <Reveal delay={180}>
                <div className="mt-8 rounded-3xl border border-oak/20 bg-oak-tint/40 p-6 md:p-7">
                  <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-oak-deep">For architects &amp; engineers</p>
                  <h3 className="mt-2 font-display text-[18px] font-semibold tracking-tight text-ink">
                    Let&apos;s collaborate — commission available.
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                    If you&apos;re an architect, engineer, or contractor in the same field and have a client
                    who needs modular cabinets, we&apos;d love to partner. We offer a{" "}
                    <strong className="font-semibold text-ink">commission for referred projects</strong> that move forward.
                    Just send us the details and we&apos;ll handle the rest — clean, on-spec, on time.
                  </p>
                  <a
                    href="#quote"
                    className="group mt-4 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-2.5 text-[13.5px] font-medium hover:bg-oak-deep transition-colors"
                  >
                    Partner with ELBI
                    <span className="grid place-items-center w-7 h-7 rounded-full bg-cream/15 group-hover:translate-x-0.5 transition-transform">
                      <ArrowUpRight size={14} />
                    </span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Creator: Ryan H Cuevas */}
      <section id="creator" className="no-print py-12 md:py-16 border-y border-line bg-sand/40">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 rounded-3xl border border-line bg-cream p-6 md:p-8 shadow-[0_20px_40px_-24px_rgba(31,27,20,0.18)]">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="grid place-items-center w-14 h-14 rounded-2xl bg-ink text-cream font-display font-bold text-[18px] shrink-0">
                  RC
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-faint">Creator &amp; Founder</p>
                  <h3 className="font-display text-[20px] font-semibold tracking-tight text-ink leading-none mt-1">
                    Ryan H. Cuevas
                  </h3>
                  <p className="text-[13px] text-ink-soft mt-1">ELBI Modular · Since 2010</p>
                </div>
              </div>
              <div className="flex-1 min-w-0 md:border-l md:border-line md:pl-8">
                <p className="text-[13.5px] leading-relaxed text-ink-soft">
                  Built from a garage with hard work and a focus on making things simpler for every client.
                  Reach out directly — always happy to talk builds and collaborations.
                </p>
                <a
                  href="https://www.facebook.com/ryan.h.cuevas"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-[#0866FF] text-white px-5 py-2.5 text-[13.5px] font-semibold hover:bg-[#0652cc] transition-colors"
                >
                  <FacebookIcon size={16} />
                  facebook.com/ryan.h.cuevas
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ------------------------ 06 · start a project ---------------------- */

export function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState(() => genChallenge());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  useEffect(() => {
    setCaptcha(genChallenge());
  }, []);

  function refreshCaptcha() {
    setCaptcha(genChallenge());
    setCaptchaInput("");
    setCaptchaError(null);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("bot-field") as HTMLInputElement | null)?.value;
    if (honeypot) return;

    if (parseInt(captchaInput, 10) !== captcha.answer) {
      setCaptchaError("Incorrect answer. Try again.");
      refreshCaptcha();
      return;
    }

    setFormState("submitting");
    setFormError(null);
    setCaptchaError(null);

    const dataObj: Record<string, string> = {};
    new FormData(form).forEach((v, k) => (dataObj[k] = v.toString()));

    try {
      const response = await fetch("https://formsubmit.co/ajax/ryancuevas53@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: dataObj.name,
          phone: dataObj.phone,
          email: dataObj.email || "not provided",
          project_type: dataObj["project-type"],
          location: dataObj.location,
          budget: dataObj.budget || "Not specified",
          message: dataObj.message,
          _subject: `New ELBI inquiry (Cost Calculator): ${dataObj["project-type"]} — ${dataObj.name}`,
          _template: "table",
          _captcha: "false",
          _cc: "giangowzxc@gmail.com",
        }),
      });
      const data = await response.json().catch(() => ({} as Record<string, string>));
      if (!response.ok)
        throw new Error(
          (data as { message?: string }).message ||
            (data as { error?: string }).error ||
            `Server error ${response.status}`,
        );
      form.reset();
      setCaptchaInput("");
      refreshCaptcha();
      setFormState("success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setFormError(msg);
      setFormState("error");
      console.error(err);
    }
  };

  const inputCls =
    "w-full rounded-2xl border border-line bg-cream px-5 py-4 text-[14.5px] text-ink placeholder:text-faint/70 outline-none focus:border-oak focus:ring-2 focus:ring-oak/20 transition-all";
  const darkInputCls =
    "!bg-cream/[0.06] !border-cream/15 !text-cream placeholder:!text-cream/40 focus:!ring-oak/40 focus:!border-oak";

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
                Let&apos;s build your modular kitchen
                <em className="italic font-light text-oak"> or wardrobe in Laguna.</em>
              </h2>
              <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
                Tell us a little about your project. We&apos;ll review the details and get
                back to discuss the next step — usually within the day.
              </p>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-soft">
                Planning a full <a href="#estimator" className="underline decoration-oak/30 hover:text-oak-deep">kitchen renovation in Laguna</a>? We handle 3D design, fabrication and installation — serving Laguna, Cavite and Metro Manila. <strong>16 years of modular cabinet making in Los Baños, Laguna — referenced by interior designers and contractors across Santa Rosa, Nuvali and Calamba.</strong>
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
                {/* easy call button — requested: 09154082813 | 09936932883 */}
                <a
                  href="tel:09154082813"
                  className="flex items-center gap-3.5 rounded-2xl border border-ink/10 bg-ink px-5 py-4 hover:bg-ink/90 transition-all group"
                >
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-oak text-cream group-hover:bg-oak-deep transition-colors shrink-0">
                    <Phone size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-semibold text-cream flex items-center gap-1.5">
                      <span className="grid place-items-center w-4 h-4 rounded-full border border-cream/20 text-[9px]">◉</span>
                      CONTACT
                    </span>
                    <span className="block font-mono text-[11px] font-medium text-cream tracking-wide mt-0.5">
                      <span className="hover:text-oak-tint transition-colors">09154082813</span>
                      <span className="text-cream/40 mx-1.5">|</span>
                      <span className="hover:text-oak-tint transition-colors">09936932883</span>
                    </span>
                  </span>
                  <span className="ml-auto grid place-items-center w-8 h-8 rounded-full bg-cream/10 group-hover:bg-cream/15 transition-colors shrink-0">
                    <ArrowUpRight size={14} className="text-cream" />
                  </span>
                </a>
                <div className="flex gap-2">
                  <a
                    href="tel:09154082813"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-oak text-cream px-4 py-3 text-[13px] font-semibold hover:bg-oak-deep transition-colors"
                  >
                    <Phone size={14} />
                    Call 0915 408 2813
                  </a>
                  <a
                    href="tel:09936932883"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-cream px-4 py-3 text-[13px] font-semibold hover:border-oak hover:text-oak-deep transition-all"
                  >
                    <Phone size={14} />
                    Call 0993 693 2883
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* form — now sends via email to both addresses */}
          <Reveal delay={160}>
            <div className="rounded-3xl border border-line bg-ink text-cream p-7 md:p-9">
              <p className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-cream/45 mb-7">
                Project inquiry · response within 24h
              </p>

              {formState === "success" ? (
                <div className="text-center py-8" role="status">
                  <span className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-oak text-cream mb-4">
                    <Check size={24} />
                  </span>
                  <p className="font-mono text-[10.5px] tracking-[0.26em] uppercase text-oak-tint mb-2">Inquiry received</p>
                  <h3 className="font-display text-[22px] font-medium leading-tight">Thank you. Your project is on our radar.</h3>
                  <p className="mt-2 text-[13.5px] text-cream/60 leading-relaxed">
                    We&apos;ve sent your details to our team. We&apos;ll review and get back to you — usually within the day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="mt-6 inline-flex items-center gap-2 text-[13px] text-oak-tint hover:text-cream transition-colors"
                  >
                    Send another inquiry <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* honeypot */}
                  <p className="hidden" aria-hidden="true">
                    <label>
                      Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="sr-only">Full name</span>
                      <input
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name *"
                        className={`${inputCls} ${darkInputCls}`}
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">Phone</span>
                      <input
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="Mobile / Viber *"
                        className={`${inputCls} ${darkInputCls}`}
                      />
                    </label>
                  </div>

                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email (optional)"
                    className={`${inputCls} ${darkInputCls}`}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/45 mb-1.5 block">Project type *</span>
                      <select
                        name="project-type"
                        required
                        defaultValue="Kitchen"
                        className={`${inputCls} ${darkInputCls} dark-select`}
                      >
                        <option>Kitchen</option>
                        <option>Wardrobe</option>
                        <option>TV / storage wall</option>
                        <option>Vanity / bathroom</option>
                        <option>Office / commercial</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/45 mb-1.5 block">Budget</span>
                      <select name="budget" defaultValue="" className={`${inputCls} ${darkInputCls} dark-select`}>
                        <option value="">Not sure yet</option>
                        <option>Under ₱100,000</option>
                        <option>₱100,000–₱250,000</option>
                        <option>₱250,000–₱500,000</option>
                        <option>₱500,000+</option>
                      </select>
                    </label>
                  </div>

                  <input
                    name="location"
                    required
                    placeholder="City / barangay (e.g. Los Baños, Laguna) *"
                    className={`${inputCls} ${darkInputCls}`}
                  />

                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about the space — wall size, must-haves, timeline… *"
                    className={`${inputCls} ${darkInputCls} resize-none`}
                  />

                  {/* captcha */}
                  <div className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <ShieldCheck size={14} className="text-oak-tint" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream/70">Security check</span>
                      <span className="ml-auto font-mono text-[10px] text-cream/40">Quick verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] text-cream/90">
                        What is <strong className="text-cream">{captcha.a} + {captcha.b}</strong>?
                      </span>
                      <input
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value.replace(/\D/g, ""))}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="?"
                        aria-label={`What is ${captcha.a} plus ${captcha.b}?`}
                        required
                        className="w-16 rounded-xl border border-cream/15 bg-cream/[0.06] px-3 py-2 text-center text-[14px] text-cream placeholder:text-cream/30 outline-none focus:border-oak focus:ring-1 focus:ring-oak"
                      />
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        aria-label="Get new challenge"
                        className="text-[13px] text-cream/50 hover:text-oak-tint transition-colors"
                      >
                        ↻
                      </button>
                    </div>
                    {captchaError && (
                      <p className="mt-2 text-[11px] text-red-300" role="alert">
                        {captchaError}
                      </p>
                    )}
                  </div>

                  {formState === "error" && formError && (
                    <p className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-[12.5px] text-red-200" role="alert">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-oak text-cream px-6 py-4 text-[14.5px] font-semibold hover:bg-oak-deep transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={15} />
                    {formState === "submitting" ? "Sending inquiry…" : "Send inquiry via email"}
                  </button>

                  <p className="text-center text-[11px] text-cream/40 leading-relaxed">
                    No commitments, no spam — we reply with the next step and possible survey schedule.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
