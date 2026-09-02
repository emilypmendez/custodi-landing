"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingOrbs from "@/app/components/decorative/FloatingOrbs";
import GhostlyWatermark from "@/app/components/decorative/GhostlyWatermark";
import GridBackground from "@/app/components/decorative/GridBackground";

const AppDescriptionSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const scrollArrow = {
    initial: { y: 0 },
    animate: { y: [0, 8, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <section className="relative border-t border-[color:var(--border)] py-24 overflow-hidden">
      <GridBackground opacity={0.02} />
      <FloatingOrbs count={2} intensity="light" />
      <GhostlyWatermark opacity={0.05} scale={0.8} position="top-right" />
      <GhostlyWatermark opacity={0.04} scale={0.6} position="bottom-left" />

      <div className="mx-auto w-[min(1120px,calc(100%-48px))] relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            What Custodi Is
          </span>
          <h2 className="mb-6 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Not a bank.{" "}
            <span className="text-[color:var(--custodi-gold)]">A safety layer for your finances.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Custodi is autonomous financial governance — independent of banks, brokerages, and custody providers.
            We don't hold your money. We protect your financial decisions through AI-enforced safety and encryption,
            locally on your machine.
          </p>
        </motion.div>

        {/* Personas Section */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid gap-8 md:grid-cols-2">
            {/* Individual - Active */}
            <motion.div
              variants={item}
              className="relative group"
            >
              {/* Glow effect for active persona */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,.15)] to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative rounded-2xl border border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.06)] p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-[rgba(201,168,76,.55)] group-hover:bg-[rgba(201,168,76,.10)]">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.10)] px-3 py-1">
                  <div className="h-2 w-2 rounded-full bg-[color:var(--custodi-gold)] animate-pulse" />
                  <span className="font-mono text-xs text-[color:var(--custodi-gold)]">AVAILABLE NOW</span>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-[color:var(--off-white)]">
                  For Individuals
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-[color:var(--mid)]">
                  Take control of your finances with AI-governed execution. Connect all your accounts, view unified balances,
                  and execute transactions with safety built in — not bolted on.
                </p>

                {/* Features list */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                      <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[color:var(--mid)]">Unified view of all your accounts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                      <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[color:var(--mid)]">AI-enforced safety on every transaction</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                      <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[color:var(--mid)]">Military-grade encryption, locally on your machine</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(201,168,76,.20)]">
                      <svg className="h-2.5 w-2.5 text-[color:var(--custodi-gold)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[color:var(--mid)]">Zero data leaves your device</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Business - Disabled/Coming Soon */}
            <motion.div
              variants={item}
              className="relative opacity-50 pointer-events-none"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[rgba(100,100,100,.1)] to-transparent blur-xl" />

              <div className="relative rounded-2xl border border-[rgba(255,255,255,.1)] bg-[#1a1a1a] p-8">
                {/* Coming Soon Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,.15)] bg-[rgba(255,255,255,.05)] px-3 py-1">
                  <span className="font-mono text-xs text-[rgba(255,255,255,.4)]">COMING SOON</span>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-[rgba(255,255,255,.4)]">
                  For Businesses
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-[rgba(255,255,255,.3)]">
                  Govern organizational spend with policy-based execution and multi-signature approvals.
                  Deploy autonomous financial controls across your team.
                </p>

                {/* Features list - grayed out */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(255,255,255,.05)]">
                      <svg className="h-2.5 w-2.5 text-[rgba(255,255,255,.2)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[rgba(255,255,255,.3)]">Policy-based spend governance</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(255,255,255,.05)]">
                      <svg className="h-2.5 w-2.5 text-[rgba(255,255,255,.2)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[rgba(255,255,255,.3)]">Multi-signature approvals</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(255,255,255,.05)]">
                      <svg className="h-2.5 w-2.5 text-[rgba(255,255,255,.2)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[rgba(255,255,255,.3)]">Team access controls</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[rgba(255,255,255,.05)]">
                      <svg className="h-2.5 w-2.5 text-[rgba(255,255,255,.2)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8l2 2 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-[rgba(255,255,255,.3)]">Comprehensive audit trails</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center justify-center gap-2"
        >
          <p className="text-xs text-[color:var(--mid)]">Scroll to discover features</p>
          <motion.div
            animate={scrollArrow.animate}
            initial={scrollArrow.initial}
            transition={scrollArrow.transition}
          >
            <ChevronDown className="h-5 w-5 text-[color:var(--custodi-gold)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AppDescriptionSection;