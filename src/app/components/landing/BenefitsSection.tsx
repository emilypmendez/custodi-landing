import { Zap, Brain, GitBranch, BarChart3 } from "lucide-react";
import safetyTypes from "@/app/components/assets/media/custodi-safety-types.png";
import Image from "next/image";
import { motion } from "framer-motion";

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

        {/* SAFETY TYPES */}
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[rgba(201,168,76,.05)] blur-[120px]" />
        {/* Safety types (Color types) */}
        <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] flex-col gap-8 pb-12 lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-1 items-center justify-center"
          >
            <Image 
              src={safetyTypes} 
              alt="Custodi Safety Types" 
              width={600}
              height={400}
              className="relative z-10 w-auto rounded-2xl border border-[rgba(201,168,76,.35)] shadow-[0_0_40px_rgba(201,168,76,.25)] transition-transform duration-300 ease-out hover:scale-105" 
              priority
            />
          </motion.div>
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
        <br/>
      </div>
    </section>
  );
};

export default BenefitsSection;
