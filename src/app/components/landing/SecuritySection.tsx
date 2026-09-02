"use client";

import { motion } from "framer-motion";
import { Lock, Key, EyeOff, BookOpen, UserCheck, Shield } from "lucide-react";
import FloatingOrbs from "@/app/components/decorative/FloatingOrbs";
import GhostlyWatermark from "@/app/components/decorative/GhostlyWatermark";

const securityFeatures = [
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description:
      "All credentials, keys, and account data are encrypted at rest using AES-256 — the same standard used by governments and military institutions worldwide.",
  },
  {
    icon: Key,
    title: "Encrypted Key Vault",
    description:
      "Private keys are stored in a Tauri Stronghold vault, isolated from the OS filesystem. Keys are never exposed in memory beyond their immediate use.",
  },
  {
    icon: EyeOff,
    title: "Zero Data Exfiltration",
    description:
      "No financial data ever leaves your machine. There are no telemetry calls, no remote logging, and no server-side storage of your account information.",
  },
  {
    icon: BookOpen,
    title: "Append-Only Ledger",
    description:
      "Every action is recorded in a tamper-evident, append-only local ledger. Nothing is overwritten — creating a complete, auditable history of all activity.",
  },
  {
    icon: UserCheck,
    title: "Identity-Backed Sessions",
    description:
      "Sessions are gated by identity verification and KYC checks before any execution is permitted. Your identity protects your finances.",
  },
  {
    icon: Shield,
    title: "TLS in Transit",
    description:
      "All external connections use TLS 1.3 with certificate pinning. When Custodi does talk to an external service, it does so securely and verifiably.",
  },
];

const SecuritySection = () => {
  return (
    <section className="relative border-t border-[color:var(--border)] py-24 overflow-hidden">
      <FloatingOrbs count={2} intensity="light" />
      <GhostlyWatermark opacity={0.06} scale={0.75} position="bottom-right" />

      <div className="mx-auto w-[min(1120px,calc(100%-48px))] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            SECURITY
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Enterprise-grade security standards.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Built on protocols trusted by financial institutions, governments, and security
            researchers. Your money is guarded at every layer.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {securityFeatures.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="flex items-start gap-4 rounded-xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-6 transition-all hover:border-[rgba(201,168,76,.25)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
                <Icon className="h-5 w-5 text-[color:var(--custodi-gold)]" />
              </div>
              <div>
                <h3 className="mb-2 text-base font-semibold text-[color:var(--off-white)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--mid)]">{description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SecuritySection;
