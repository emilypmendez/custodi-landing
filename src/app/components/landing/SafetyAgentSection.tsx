"use client";

import { motion } from "framer-motion";

const verdicts = [
  {
    color: "green",
    dot: "bg-green-500",
    label: "GREEN",
    labelColor: "text-green-400",
    cardBorder: "border-green-900/50 bg-[#0d1f0d]",
    statusBg: "border-green-900/60 bg-[#0f2110]",
    statusText: "text-green-400",
    title: "Execution Cleared",
    description:
      "All five behavioral signals passed. The transaction proceeds immediately. Trust graph intact, no anomalies detected, AML screening clear.",
    status: "CLEARED FOR BROADCAST",
  },
  {
    color: "amber",
    dot: "bg-yellow-500",
    label: "AMBER",
    labelColor: "text-yellow-400",
    cardBorder: "border-yellow-900/40 bg-[#1a1600]",
    statusBg: "border-yellow-900/50 bg-[#1c1900]",
    statusText: "text-yellow-400",
    title: "Cooling Off Period",
    description:
      "One or more signals raised concern. The transaction is paused. You must reconfirm after a mandatory waiting period — protecting against pressure or impulsive decisions.",
    status: "PAUSED — RECONFIRM AFTER TIMER",
  },
  {
    color: "red",
    dot: "bg-red-500",
    label: "RED",
    labelColor: "text-red-400",
    cardBorder: "border-red-900/50 bg-[#1a0d0d]",
    statusBg: "border-red-900/60 bg-[#200f0f]",
    statusText: "text-red-400",
    title: "Execution Blocked",
    description:
      "A critical signal failed. The transaction is blocked with no override path. Social engineering, anomalous amounts, or AML flags triggered a hard stop.",
    status: "NO OVERRIDE EXISTS — HARD BLOCK",
  },
];

const signals = [
  "Trust Graph Integrity",
  "Amount Anomaly",
  "14-Day Rolling Baseline",
  "AML Velocity Screening",
  "Social Engineering Detection",
];

const SafetyAgentSection = () => {
  return (
    <section className="border-t border-[color:var(--border)] py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            SAFETY AGENT
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Every transaction gets a verdict.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Your on-device AI Safety Agent evaluates five behavioral signals before any transaction
            can be broadcast. The verdict is deterministic — and some cannot be undone.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {verdicts.map(({ label, labelColor, dot, cardBorder, statusBg, statusText, title, description, status }) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={`rounded-xl border p-6 ${cardBorder}`}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                <span className={`font-mono text-[11px] font-semibold tracking-[0.18em] ${labelColor}`}>
                  {label}
                </span>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[color:var(--off-white)]">{title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-[color:var(--mid)]">{description}</p>
              <div className={`rounded-lg border px-4 py-2.5 ${statusBg}`}>
                <span className={`font-mono text-[10px] tracking-[0.18em] ${statusText}`}>{status}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Signals evaluated bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-[color:var(--border)] bg-[#1e1e1ecc] px-6 py-4"
        >
          <span className="font-mono text-[10px] tracking-[0.18em] text-[color:var(--mid)]">
            SIGNALS EVALUATED:
          </span>
          {signals.map((signal) => (
            <span key={signal} className="flex items-center gap-2 text-sm text-[color:var(--mid)]">
              <span className="h-1 w-1 rounded-full bg-[color:var(--custodi-gold)]" />
              {signal}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SafetyAgentSection;
