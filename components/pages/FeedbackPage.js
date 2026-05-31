"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../visuals/Logo";
import { submitFeedback } from "@/lib/feedback";

/* ================================================================== */
/*  CONFIG                                                            */
/* ================================================================== */

const TYPES = [
  {
    id: "bug",
    glyph: "🐛",
    title: "Bug Report",
    blurb: "Something broke.",
  },
  {
    id: "feedback",
    glyph: "💡",
    title: "Feedback",
    blurb: "Loving it or hating it?",
  },
  {
    id: "feature",
    glyph: "✨",
    title: "Feature Request",
    blurb: "I wish DinoDash could…",
  },
];

const AREAS = [
  "Game",
  "Themes",
  "History",
  "Widgets",
  "Popup",
  "Search",
  "Other",
];

const VIBES = [
  { v: 1, e: "😤" },
  { v: 2, e: "😕" },
  { v: 3, e: "😐" },
  { v: 4, e: "🙂" },
  { v: 5, e: "🔥" },
];

const PRIORITIES = [
  { id: "nice", glyph: "🌱", label: "Nice to have" },
  { id: "daily", glyph: "⚡", label: "Would use daily" },
  { id: "game-changer", glyph: "🔥", label: "Game changer" },
];

/* ================================================================== */
/*  PAGE                                                              */
/* ================================================================== */

export default function FeedbackPage() {
  const [type, setType] = useState("bug");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // bug-specific
  const [bug, setBug] = useState({
    description: "",
    expected: "",
    areas: [],
    screenshot: null,
  });
  // feedback-specific
  const [fb, setFb] = useState({ message: "", areas: [], vibe: 0 });
  // feature-specific
  const [feat, setFeat] = useState({
    description: "",
    why: "",
    areas: [],
    priority: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const formRef = useRef(null);

  const payload = useMemo(() => {
    const base = { type, name, email };
    if (type === "bug") return { ...base, ...bug };
    if (type === "feedback") return { ...base, ...fb };
    if (type === "feature") return { ...base, ...feat };
    return base;
  }, [type, name, email, bug, fb, feat]);

  const onSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (submitting) return;
    setError(null);

    const validationError = validatePayload(type, name, email, bug, fb, feat);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      // file payload — convert to base64 for transport
      const finalPayload = await materializeFiles(payload);
      await submitFeedback(finalPayload);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Ctrl/Cmd + Enter submits
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        onSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSubmit]);

  if (submitted) {
    return (
      <SuccessScreen
        onAnother={() => {
          setSubmitted(false);
          setError(null);
          setBug({ description: "", expected: "", areas: [], screenshot: null });
          setFb({ message: "", areas: [], vibe: 0 });
          setFeat({ description: "", why: "", areas: [], priority: "" });
          setName("");
          setEmail("");
          formRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    );
  }

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-paper">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-3xl px-5 pb-32 pt-14 sm:px-8 sm:pt-20">
        {/* SECTION 1 — entry header */}
        <header className="text-center">
          <div className="mx-auto inline-flex items-center justify-center">
            <a href="/" aria-label="DinoDash home">
              <Logo
                size={36}
                wordmarkClass="hidden"
                withWordmark={false}
              />
            </a>
          </div>
          <h1 className="mt-6 font-mono text-3xl uppercase tracking-tight text-white sm:text-4xl">
            Talk to the Runner
          </h1>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.2em] text-white/60 sm:text-[13px]">
            bug, idea, or just a thought — admin reads every single one.
          </p>
        </header>

        {/* SECTION 2 — type selector */}
        <section className="mt-12 sm:mt-16" aria-label="What kind of message?">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
            01 · pick a lane
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {TYPES.map((t) => (
              <TypeCard
                key={t.id}
                t={t}
                active={type === t.id}
                onClick={() => setType(t.id)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 3 — form */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="mt-12 space-y-5 sm:mt-16"
        >
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/45">
            02 · the details
          </div>

          {/* shared identity fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Your name" required>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="who's reporting"
                required
                className={INPUT_CLS}
              />
            </Field>
            <Field label="Your email" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="for a reply"
                required
                className={INPUT_CLS}
              />
            </Field>
          </div>

          {/* type-specific fields */}
          <AnimatePresence mode="wait">
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {type === "bug" && (
                <BugFields value={bug} onChange={setBug} />
              )}
              {type === "feedback" && (
                <FeedbackFields value={fb} onChange={setFb} />
              )}
              {type === "feature" && (
                <FeatureFields value={feat} onChange={setFeat} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* SECTION 4 — submit */}
          <div className="pt-6">
            <SubmitAction submitting={submitting} />
            {error && (
              <p className="mt-3 font-mono text-[12px] text-white/80">
                <span className="text-red-300/90">!</span>{" "}
                couldn't send — {error}
              </p>
            )}
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              press <Keycap>ctrl</Keycap> + <Keycap>enter</Keycap> to send
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

/* ================================================================== */
/*  TYPE CARD                                                         */
/* ================================================================== */

function TypeCard({ t, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group relative overflow-hidden border bg-white/[0.02] p-5 text-left transition-all ${
        active
          ? "border-white bg-white/[0.05]"
          : "border-white/15 hover:-translate-y-0.5 hover:border-white/45"
      }`}
    >
      {/* corner ticks */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t border-white/40" />
      <span className="pointer-events-none absolute right-1.5 top-1.5 h-2 w-2 border-r border-t border-white/40" />
      <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-2 w-2 border-b border-l border-white/40" />
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r border-white/40" />

      <div className="text-2xl">{t.glyph}</div>
      <div className="mt-3 font-mono text-[15px] uppercase tracking-[0.18em] text-white">
        {t.title}
      </div>
      <div className="mt-1.5 font-mono text-[11px] text-white/55">
        “{t.blurb}”
      </div>

      {active && (
        <span className="absolute right-3 top-3 inline-flex h-2 w-2 rounded-full bg-white" />
      )}
    </button>
  );
}

/* ================================================================== */
/*  FIELDS PER TYPE                                                   */
/* ================================================================== */

function BugFields({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch });
  return (
    <>
      <Field label="What broke?" required>
        <textarea
          rows={4}
          value={value.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="describe what happened…"
          required
          className={INPUT_CLS}
        />
      </Field>
      <Field label="What did you expect to happen?" required>
        <textarea
          rows={3}
          value={value.expected}
          onChange={(e) => update({ expected: e.target.value })}
          placeholder="describe the expected behaviour…"
          required
          className={INPUT_CLS}
        />
      </Field>
      <Field label="Where did it happen?" required>
        <AreaTags
          value={value.areas}
          onChange={(areas) => update({ areas })}
        />
      </Field>
      <Field label="Screenshot" required>
        <ScreenshotDrop
          value={value.screenshot}
          onChange={(screenshot) => update({ screenshot })}
        />
      </Field>
    </>
  );
}

function FeedbackFields({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch });
  return (
    <>
      <Field label="What's on your mind?" required>
        <textarea
          rows={5}
          value={value.message}
          onChange={(e) => update({ message: e.target.value })}
          placeholder="tell us anything…"
          required
          className={INPUT_CLS}
        />
      </Field>
      <Field label="Which part of DinoDash?" required>
        <AreaTags value={value.areas} onChange={(areas) => update({ areas })} />
      </Field>
      <Field label="Overall vibe?" required>
        <VibeRow value={value.vibe} onChange={(vibe) => update({ vibe })} />
      </Field>
    </>
  );
}

function FeatureFields({ value, onChange }) {
  const update = (patch) => onChange({ ...value, ...patch });
  return (
    <>
      <Field label="Describe the feature" required>
        <textarea
          rows={4}
          value={value.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="what should it do?"
          required
          className={INPUT_CLS}
        />
      </Field>
      <Field label="Why would it help you?" required>
        <textarea
          rows={3}
          value={value.why}
          onChange={(e) => update({ why: e.target.value })}
          placeholder="paint the use case…"
          required
          className={INPUT_CLS}
        />
      </Field>
      <Field label="Which area is it for?" required>
        <AreaTags value={value.areas} onChange={(areas) => update({ areas })} />
      </Field>
      <Field label="Priority feel?" required>
        <PriorityRow
          value={value.priority}
          onChange={(priority) => update({ priority })}
        />
      </Field>
    </>
  );
}

/* ================================================================== */
/*  SHARED PIECES                                                     */
/* ================================================================== */

const INPUT_CLS =
  "block w-full resize-y border border-white/20 bg-white/[0.02] px-3 py-2.5 font-mono text-[13px] text-white placeholder:text-white/30 focus:border-white focus:outline-none";

function Field({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
        {label}
        {required && <span className="ml-1 text-white/85">*</span>}
      </span>
      {children}
    </label>
  );
}

function AreaTags({ value, onChange }) {
  const toggle = (a) =>
    onChange(value.includes(a) ? value.filter((x) => x !== a) : [...value, a]);
  return (
    <div className="flex flex-wrap gap-2">
      {AREAS.map((a) => {
        const active = value.includes(a);
        return (
          <button
            type="button"
            key={a}
            onClick={() => toggle(a)}
            aria-pressed={active}
            className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
              active
                ? "border-white bg-white text-black"
                : "border-white/30 bg-transparent text-white/65 hover:border-white/60 hover:text-white"
            }`}
          >
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${
                active ? "bg-black" : "bg-white/70"
              }`}
            />
            {a}
          </button>
        );
      })}
    </div>
  );
}

function ScreenshotDrop({ value, onChange }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const onFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    onChange(file);
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          onFile(e.dataTransfer.files?.[0]);
        }}
        onClick={(e) => {
          // The screenshot field is wrapped in a <label>, which auto-
          // forwards clicks to the hidden file input. Without this
          // preventDefault the picker opens twice.
          e.preventDefault();
          inputRef.current?.click();
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-8 text-center transition-colors ${
          drag ? "border-white bg-white/[0.05]" : "border-white/30 bg-white/[0.02] hover:border-white/55"
        }`}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/65">
          {value ? "✓ attached" : "drop a screenshot"}
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {value ? value.name : "or click to choose"}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55 hover:text-white"
        >
          remove
        </button>
      )}
    </div>
  );
}

function VibeRow({ value, onChange }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {VIBES.map((v) => {
        const active = value === v.v;
        return (
          <button
            type="button"
            key={v.v}
            onClick={() => onChange(active ? 0 : v.v)}
            aria-pressed={active}
            className={`flex h-12 w-12 items-center justify-center border text-2xl transition-all ${
              active
                ? "scale-105 border-white bg-white/10"
                : "border-white/20 bg-white/[0.02] opacity-65 hover:opacity-100"
            }`}
          >
            <span aria-hidden>{v.e}</span>
          </button>
        );
      })}
    </div>
  );
}

function PriorityRow({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {PRIORITIES.map((p) => {
        const active = value === p.id;
        return (
          <button
            type="button"
            key={p.id}
            onClick={() => onChange(active ? "" : p.id)}
            aria-pressed={active}
            className={`flex items-center gap-3 border px-4 py-3 text-left transition-all ${
              active
                ? "border-white bg-white/[0.06]"
                : "border-white/20 bg-white/[0.02] hover:border-white/55"
            }`}
          >
            <span className="text-xl">{p.glyph}</span>
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-white">
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Keycap({ children }) {
  return (
    <kbd className="inline-flex min-w-[28px] items-center justify-center border border-white/45 bg-white/5 px-1 py-px text-[9px] tracking-[0.2em] text-white">
      {children}
    </kbd>
  );
}

/* ================================================================== */
/*  SUBMIT                                                            */
/* ================================================================== */

function SubmitAction({ submitting }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="btn-press group relative inline-flex w-full items-center justify-between gap-4 overflow-hidden border border-white bg-white px-5 py-4 font-mono text-[12px] uppercase tracking-[0.3em] text-black transition-colors disabled:cursor-not-allowed disabled:opacity-60 hover:bg-black hover:text-white"
    >
      <span className="flex items-center gap-3">
        <span className="inline-flex h-9 min-w-[80px] items-center justify-center border border-current bg-black/5 px-3 font-mono text-[11px] tracking-[0.3em] group-hover:bg-white/10">
          SPACE
        </span>
        <span>{submitting ? "sending…" : "send it"}</span>
      </span>
      <span className="transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}

/* ================================================================== */
/*  SUCCESS SCREEN                                                    */
/* ================================================================== */

function SuccessScreen({ onAnother }) {
  return (
    <main className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink px-5 text-paper">
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      <div className="relative w-full max-w-md text-center">
        {/* dino doing a small jump */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: [30, -16, 0], opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto h-[120px] w-[120px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/dino/idle-dino.webp"
            alt=""
            className="h-full w-full object-contain object-bottom"
            draggable={false}
          />
        </motion.div>
        <div className="mx-auto mt-1 h-px w-[180px] bg-white/25" />

        <h2 className="mt-8 font-mono text-2xl uppercase leading-[1.1] tracking-[0.04em] text-white sm:text-3xl">
          got it. keep running.
        </h2>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.25em] text-white/50">
          admin will read this personally.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onAnother}
            className="btn-press group inline-flex items-center gap-2 border border-white bg-white px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-black hover:bg-black hover:text-white"
          >
            submit another
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <a
            href="/"
            className="btn-press inline-flex items-center gap-2 border border-white/40 bg-black/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm hover:border-white hover:text-white"
          >
            back to home
          </a>
        </div>
      </div>
    </main>
  );
}

/* ================================================================== */
/*  helpers                                                            */
/* ================================================================== */

function validatePayload(type, name, email, bug, fb, feat) {
  if (!name.trim()) return "please add your name.";
  if (!email.trim()) return "please add your email.";

  if (type === "bug") {
    if (!bug.description.trim()) return "tell us what broke.";
    if (!bug.expected.trim()) return "tell us what you expected to happen.";
    if (!bug.areas.length) return "pick at least one area where it happened.";
    if (!bug.screenshot) return "attach a screenshot.";
    return null;
  }

  if (type === "feedback") {
    if (!fb.message.trim()) return "tell us what's on your mind.";
    if (!fb.areas.length) return "pick at least one area.";
    if (!fb.vibe) return "pick an overall vibe.";
    return null;
  }

  if (type === "feature") {
    if (!feat.description.trim()) return "describe the feature.";
    if (!feat.why.trim()) return "tell us why it would help.";
    if (!feat.areas.length) return "pick at least one area.";
    if (!feat.priority) return "pick a priority.";
    return null;
  }

  return null;
}

async function materializeFiles(payload) {
  // walk the payload and convert any File to { name, type, size, base64 }
  const out = { ...payload };
  for (const [k, v] of Object.entries(out)) {
    if (v instanceof File) {
      out[k] = await fileToBase64(v);
    }
  }
  return out;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () =>
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        base64: String(r.result || ""),
      });
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
