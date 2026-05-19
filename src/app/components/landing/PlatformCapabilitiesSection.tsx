"use client";

import { motion } from "framer-motion";
import { RefreshCw, Lock, WifiOff, LayoutDashboard, SlidersHorizontal, ClipboardList } from "lucide-react";

const capabilities = [
  {
    icon: RefreshCw,
    title: "Multi-Account Synchronization",
    key: true,
    description:
      "Connect and sync balances, transactions, and history across all your banks, wallets, and financial services simultaneously. One live view, always current.",
  },
  {
    icon: Lock,
    title: "Desktop-Grade Secure Storage",
    key: true,
    description:
      "Credentials and keys are stored in an OS-level encrypted vault — isolated from the browser, inaccessible to other apps, and never written to unprotected disk.",
  },
  {
    icon: WifiOff,
    title: "Offline-First Architecture",
    key: false,
    description:
      "Your financial data is cached locally and accessible without an internet connection. Sync only happens on your terms, over secure, verified channels.",
  },
  {
    icon: LayoutDashboard,
    title: "Unified Account Dashboard",
    key: false,
    description:
      "All accounts — checking, savings, crypto wallets, investment portfolios — aggregated into a single, searchable, organized interface built for power users.",
  },
  {
    icon: SlidersHorizontal,
    title: "Granular Permission Controls",
    key: false,
    description:
      "Choose exactly what each connected account can do. Read-only, transfer-enabled, or execution-gated — you set the rules for every integration.",
  },
  {
    icon: ClipboardList,
    title: "Tamper-Evident Audit Log",
    key: false,
    description:
      "Every action — account link, sync, transfer, verdict — is written to a local append-only ledger. Nothing is overwritten. Everything is traceable.",
  },
];

const PlatformCapabilitiesSection = () => {
  return (
    <section id="features" className="border-t border-[color:var(--border)] py-24">
      <div className="mx-auto w-[min(1120px,calc(100%-48px))]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
            PLATFORM CAPABILITIES
          </span>
          <h2 className="mb-4 text-3xl font-bold text-[color:var(--off-white)] sm:text-4xl">
            Built for the desktop. Built for power.
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--mid)]">
            Features that are only possible because Custodi lives on your machine — not
            in a browser tab, not on a server.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map(({ icon: Icon, title, key, description }) => (
            <motion.div
              key={title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="rounded-xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-6 transition-all hover:border-[rgba(201,168,76,.25)] hover:shadow-lg hover:shadow-[rgba(201,168,76,.04)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
                <Icon className="h-5 w-5 text-[color:var(--custodi-gold)]" />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-base font-semibold text-[color:var(--off-white)]">{title}</h3>
                {key && (
                  <span className="rounded border border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.08)] px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-[color:var(--custodi-gold)]">
                    KEY
                  </span>
                )}
              </div>
              <p className="text-sm leading-relaxed text-[color:var(--mid)]">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformCapabilitiesSection;
