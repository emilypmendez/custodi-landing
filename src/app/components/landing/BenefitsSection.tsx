import { Zap, Brain, GitBranch, BarChart3 } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Governed Execution",
    description:
      "Every transaction passes through deterministic safety gates. No override exists. No path from RED verdict to execution.",
  },
  {
    icon: Brain,
    title: "Local AI Evaluation",
    description:
      "The Personal Safety Agent runs entirely on your device. No remote scoring, no external API calls, no data leaves your machine.",
  },
  {
    icon: GitBranch,
    title: "Modular Architecture",
    description:
      "10 specialized AI agents with strict separation of concern. Orchestrator routing, append-only ledger, structured pipeline.",
  },
  {
    icon: BarChart3,
    title: "Explainable Decisions",
    description:
      "No opaque risk scores. Every verdict includes structured reasoning from five behavioral signals. Fully traceable.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="border-y border-[color:var(--border)] py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            WHY CUSTODI
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Safety as infrastructure.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Transform financial execution with mandatory safety enforcement at every layer.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,168,76,.22)] bg-[rgba(201,168,76,.06)]">
                <b.icon className="h-7 w-7 text-[color:var(--custodi-gold)]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[color:var(--off-white)]">{b.title}</h3>
              <p className="text-sm text-[rgba(244,244,244,.65)]">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
