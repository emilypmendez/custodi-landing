"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BenefitsSection from "@/app/components/landing/BenefitsSection";
import DemoSection from "@/app/components/landing/DemoSection";
import StepsSection from "@/app/components/landing/StepsSection";
import PricingSection from "@/app/components/landing/PricingSection";
import FAQSection from "@/app/components/landing/FAQSection";
import heroMockup from "@/app/components/assets/media/screens/custodi-unlink-demo.png";
import { Shield, Lock, Cpu, Wallet, Eye, FileCheck } from "lucide-react";
import ArchitectureDiagram from "./components/assets/ArchitectureDiagram";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
      {children}
    </span>
  );
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold";
}) {
  const styles =
    tone === "gold"
      ? "border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.10)] text-[color:var(--off-white)]"
      : "border-[color:var(--border)] bg-[#14141466] text-[color:var(--mid)]";

  return (
    <span className={`rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.20em] ${styles}`}>
      {children}
    </span>
  );
}

export default function Page() {
  return (
    <div className="bg-custodi min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[rgba(42,42,42,.85)] bg-[#141414e6] backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-[22px] w-[22px] rounded-lg border border-[rgba(201,168,76,.55)] bg-[radial-gradient(circle_at_35%_30%,rgba(201,168,76,.55),transparent_55%),linear-gradient(135deg,rgba(201,168,76,.18),rgba(201,168,76,.02))]" />
            <span className="font-serif text-[16px] font-bold tracking-[0.18em] text-[color:var(--custodi-gold)]">
              CUSTODI
            </span>
          </Link>

          {/* Center Nav Links */}
          <nav aria-label="Main navigation" className="hidden flex-wrap gap-1 text-sm text-[color:var(--mid)] md:flex">
            <a className="rounded-lg px-3 py-2 transition-colors hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#features">
              Features
            </a>
            <a className="rounded-lg px-3 py-2 transition-colors hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#architecture">
              Architecture
            </a>
            <a className="rounded-lg px-3 py-2 transition-colors hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#pricing">
              Pricing
            </a>
            <a className="rounded-lg px-3 py-2 transition-colors hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#faq">
              FAQ
            </a>
          </nav>

          {/* CTA Button */}
          <Link
            href="https://forms.gle/7oQbghFgYigpJPZW9"
            target="_blank"
            className="shrink-0 whitespace-nowrap rounded-lg border border-[color:var(--custodi-gold)] px-3 py-2 text-xs font-medium text-[color:var(--custodi-gold)] transition-colors hover:bg-[rgba(201,168,76,.10)] sm:px-4 sm:text-sm"
          >
            Request early access →
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[rgba(201,168,76,.05)] blur-[120px]" />

        <div className="mx-auto flex min-h-[calc(100vh-73px)] w-[min(1120px,calc(100%-48px))] flex-col gap-12 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-1 flex-col"
          >

            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[color:var(--off-white)] sm:text-4xl md:text-5xl lg:text-[56px]">
              Privacy is a human right.{" "}
              <span className="text-[color:var(--custodi-gold)]">Protection is a responsibility.</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[color:var(--mid)] sm:text-lg">
              Custodi is an AI governed financial execution platform where safety is
              mandatory and privacy is preserved. Every transaction is evaluated
              before it can be executed. There is no bypass.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://forms.gle/7oQbghFgYigpJPZW9"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg border border-[color:var(--custodi-gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--custodi-gold)] transition-colors hover:bg-[rgba(201,168,76,.10)]"
              >
                Request Early Access →
              </Link>
            </div>

            <p className="mt-4 text-xs text-[color:var(--mid)]">
              No spam. Just release updates and early access instructions.
            </p>
            <br/>
             <div className="mb-6 flex flex-wrap gap-2">
              <Pill tone="gold">AI GOVERNED EXECUTION</Pill>
              <Pill tone="gold">MANDATORY SAFETY</Pill>
              <Pill tone="gold">LOCAL BY DESIGN</Pill>
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[550px]">
              <div className="absolute inset-0 rounded-2xl bg-[rgba(201,168,76,.08)] blur-3xl" />
              <Image
                src={heroMockup}
                alt="Custodi safety evaluation dashboard"
                className="relative z-10 w-full rounded-2xl border border-[rgba(201,168,76,.35)] shadow-[0_0_40px_rgba(201,168,76,.25)] transition-transform duration-300 ease-out hover:scale-105"
                priority
              />
              <br/>
              <div className="mb-6 flex flex-wrap gap-2 justify-center">
                  <Pill tone="neutral">AVOID LOSSES. PROTECT YOURSELF.</Pill>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative border-t border-[color:var(--border)] py-24">
        {/* Architecture anchor for nav link */}
        <div id="architecture" className="absolute -top-20" />

        <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <SectionLabel>SAFETY IS STRUCTURAL</SectionLabel>
            <h2 className="mb-4 mt-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
              Safety is enforced, not suggested.
            </h2>
            <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
              Before any transfer is broadcast: behavioral signals are evaluated, risk and compliance checks run,
              execution is gated by orchestration, and ledger state is recorded.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { icon: Shield, title: "Personal Safety Agent", description: "On-device ML evaluation with trust graph, social engineering detection, and mandatory cooling off periods.", bullets: ["No remote behavioral scoring", "No external API calls during evaluation", "No network broadcast until cleared", "Runs entirely on your machine"] },
              { icon: Lock, title: "Execution Guarantee", description: "Safety is enforced at the orchestration layer, not at the interface. A RED verdict blocks all downstream execution.", bullets: ["GREEN proceeds", "AMBER pauses with cooling off", "RED blocks — no bypass exists", "Deterministic gate enforcement"] },
              { icon: Cpu, title: "Agent Architecture", description: "Modular AI agents with strict separation of concern. Every request begins and ends with the Orchestrator.", bullets: ["10 specialized AI agents", "Append-only ledger state", "Structured execution pipeline", "Orchestrator routing logic"] },
              { icon: Wallet, title: "Wallet Execution", description: "USDC wallet execution on Base L2 and Monad. Keys stored in Tauri Stronghold with pre-approval gates.", bullets: ["Base L2 and Monad support", "Tauri Stronghold key storage", "Idempotent by design", "Pre-approve + rail pattern"] },
              { icon: Eye, title: "Unlink Privacy", description: "ZK private transfer wrapper for approved USDC sends. Activated only after GREEN or AMBER post-timer.", bullets: ["Zero-knowledge proofs", "Privacy preserving transfers", "Activated post-verdict only", "Revenue neutral safety"] },
              { icon: FileCheck, title: "Explainable Verdicts", description: "Every GREEN, AMBER, or RED decision includes structured reasoning derived from five behavioral signals.", bullets: ["Trust graph integrity", "Transaction amount anomaly", "14-day rolling baseline", "AML velocity screening"] },
            ].map(({ icon: Icon, title, description, bullets }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group rounded-xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-6 transition-all hover:border-[rgba(201,168,76,.30)] hover:shadow-lg hover:shadow-[rgba(201,168,76,.05)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
                  <Icon className="h-6 w-6 text-[color:var(--custodi-gold)]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[color:var(--off-white)]">{title}</h3>
                <p className="mb-4 text-sm text-[color:var(--mid)]">{description}</p>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-[color:var(--mid)]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--custodi-gold)]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <ArchitectureDiagram />
      </section>

      {/* BENEFITS */}
      <BenefitsSection />

      {/* DEMO */}
      <DemoSection />

      {/* GETTING STARTED */}
      <StepsSection />

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* CTA / VISION */}
      <section className="relative overflow-hidden border-t border-[color:var(--border)] py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(201,168,76,.05)] to-transparent" />
        <div className="relative mx-auto w-[min(1120px,calc(100%-48px))] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionLabel>VISION</SectionLabel>
            <h2 className="mb-4 mt-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
              Building toward governed financial infrastructure.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[color:var(--mid)]">
              Custodi is evolving into a managed financial environment with identity-backed recovery,
              policy-based execution, multi-sig business governance, and integrated fiat rails.
              Safety will remain mandatory.
            </p>
            <Link
              href="https://forms.gle/7oQbghFgYigpJPZW9"
              target="_blank"
              className="inline-flex items-center justify-center rounded-xl bg-[color:var(--custodi-gold)] px-6 py-3 text-sm font-semibold text-[color:var(--custodi-dark)] transition-colors hover:bg-[#d4b85c]"
            >
              Request Early Access →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--border)] bg-[#111111] py-12">
        <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[color:var(--custodi-gold)]" />
            <span className="font-mono text-sm font-semibold tracking-wide text-[color:var(--off-white)]">
              CUSTODI
            </span>
          </div>
          <p className="text-xs text-[color:var(--mid)]">
            AI governed financial execution. Safety is mandatory.
          </p>
          <p className="text-xs text-[color:var(--mid)]">
            © {new Date().getFullYear()} Custodi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}