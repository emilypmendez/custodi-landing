"use client";

import { motion } from "framer-motion";
import { Banknote, Wallet, ArrowRightLeft } from "lucide-react";
import FloatingOrbs from "@/app/components/decorative/FloatingOrbs";
import GhostlyWatermark from "@/app/components/decorative/GhostlyWatermark";
import GradientAccent from "@/app/components/decorative/GradientAccent";

const UnifiedAccountsSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative border-t border-[color:var(--border)] py-24 overflow-hidden">
      <GradientAccent variant="subtle" direction="horizontal" />
      <FloatingOrbs count={2} intensity="light" />
      <GhostlyWatermark opacity={0.06} scale={0.7} position="top-left" />
      <GhostlyWatermark opacity={0.04} scale={0.5} position="bottom-right" />

      <div className="mx-auto w-[min(1120px,calc(100%-48px))] relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            Unified Dashboard
          </span>
          <h2 className="mb-6 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Fiat and crypto, <span className="text-[color:var(--custodi-gold)]">side by side.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Connect all your bank accounts, crypto wallets, and financial services to one synchronized dashboard.
            See your complete financial picture across traditional and digital assets — all protected by AI-governed safety.
          </p>
        </motion.div>

        {/* Account Types */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 grid gap-6 md:grid-cols-2"
        >
          {/* Fiat Accounts */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-8 transition-all hover:border-[rgba(201,168,76,.25)] hover:shadow-lg hover:shadow-[rgba(201,168,76,.04)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
              <Banknote className="h-6 w-6 text-[color:var(--custodi-gold)]" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[color:var(--off-white)]">
              Traditional Accounts
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[color:var(--mid)]">
              Connect your checking, savings, and investment accounts through bank-grade OAuth integrations.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                  <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-[color:var(--mid)]">Banks & credit unions</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                  <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-[color:var(--mid)]">Investment brokerages</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                  <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-[color:var(--mid)]">Real-time balance sync</span>
              </div>
            </div>
          </motion.div>

          {/* Crypto Accounts */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-8 transition-all hover:border-[rgba(201,168,76,.25)] hover:shadow-lg hover:shadow-[rgba(201,168,76,.04)]"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
              <Wallet className="h-6 w-6 text-[color:var(--custodi-gold)]" />
            </div>
            <h3 className="mb-3 text-lg font-semibold text-[color:var(--off-white)]">
              Crypto Wallets
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-[color:var(--mid)]">
              Connect your self-custodied wallets and trading accounts with read-only access and encrypted key storage.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                  <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-[color:var(--mid)]">Self-custodied wallets</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                  <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-[color:var(--mid)]">Exchange trading accounts</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                  <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-[color:var(--mid)]">Live price conversion</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-2xl border border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.06)] p-8"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
            <ArrowRightLeft className="h-6 w-6 text-[color:var(--custodi-gold)]" />
          </div>

          <h3 className="mb-4 text-lg font-semibold text-[color:var(--off-white)]">
            One Dashboard, Complete Control
          </h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--custodi-gold)]">Cross-Asset Visibility</p>
              <p className="text-sm leading-relaxed text-[color:var(--mid)]">
                See your complete financial position in one place. Compare fiat holdings against crypto exposure,
                and understand your total asset allocation at a glance.
              </p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--custodi-gold)]">Unified Safety Gating</p>
              <p className="text-sm leading-relaxed text-[color:var(--mid)]">
                Every transaction — whether moving dollars or digital assets — flows through the same AI Safety Agent.
                Consistent evaluation across all account types.
              </p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--custodi-gold)]">Synchronized Audit Trail</p>
              <p className="text-sm leading-relaxed text-[color:var(--mid)]">
                All actions across fiat and crypto accounts are recorded in one append-only ledger.
                Complete, traceable history of every move.
              </p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-[color:var(--custodi-gold)]">No Third-Party Custody</p>
              <p className="text-sm leading-relaxed text-[color:var(--mid)]">
                Custodi never holds or moves your assets. We only govern the decisions about them —
                leaving execution to you and your providers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnifiedAccountsSection;
