"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import StepsSection from "@/app/components/landing/StepsSection";
import SecuritySection from "@/app/components/landing/SecuritySection";
import SafetyAgentSection from "@/app/components/landing/SafetyAgentSection";
import PlatformCapabilitiesSection from "@/app/components/landing/PlatformCapabilitiesSection";
import FeaturesSection from "@/app/components/landing/FeaturesSection";
import DemoSection from "@/app/components/landing/DemoSection";
import PricingSection from "@/app/components/landing/PricingSection";
import FAQSection from "@/app/components/landing/FAQSection";
import heroMockup from "@/app/components/assets/media/screens/custodi-unlink-demo.png";
import ArchitectureDiagram from "./components/assets/ArchitectureDiagram";
import AppDescriptionSection from "./components/landing/AppDescriptionSection";
import UnifiedAccountsSection from "./components/landing/UnifiedAccountsSection";
import AnimatedDivider from "./components/decorative/AnimatedDivider";
import FloatingOrbs from "./components/decorative/FloatingOrbs";
import GhostlyWatermark from "./components/decorative/GhostlyWatermark";
import PlatformBadges from "./components/landing/PlatformBadges";

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
            <svg className="h-[22px] w-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21V2Z" fill="rgba(201,168,76,0.25)"/>
              <path d="M11 2L20 5.5V12C2 16.5 6 19.5 11 21C6 19.5 2 16.5 2 12V5.5L11 2Z" stroke="var(--custodi-gold)" strokeWidth="0.8" fill="none"/>
              <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21L11 2Z" stroke="var(--custodi-gold)" strokeWidth="0.6" fill="none"/>
              <path d="M2.25 14 Q2 7.5 20 5.5" stroke="var(--custodi-gold)" strokeWidth="0.9" fill="none"/>
            </svg>
            <span className="font-serif text-[16px] font-bold tracking-[0.18em] text-[color:var(--custodi-white)]">
              CUSTODI {" "}{" | "}{" "}
              <span className="font-serif text-[12px] font-light tracking-[0.18em] text-white">
              Your finances. Guarded.
              </span>
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
        <FloatingOrbs count={2} intensity="medium" />
        <GhostlyWatermark opacity={0.07} scale={1.2} position="top-left" />

        <div className="mx-auto flex min-h-[calc(100vh-73px)] w-[min(1120px,calc(100%-48px))] flex-col gap-12 py-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-1 flex-col"
          >
            {/* Desktop-only badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.08)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Desktop Application Only
              </span>
            </div>

            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[color:var(--off-white)] sm:text-4xl md:text-5xl lg:text-[56px]">
              Your financial privacy,{" "}
              <span className="text-[color:var(--custodi-gold)]">protected by design.</span>
            </h1>

            <p className="mb-8 max-w-xl text-base leading-relaxed text-[color:var(--mid)] sm:text-lg">
              Custodi is a <strong className="text-[color:var(--off-white)]">desktop application</strong> for individuals and businesses.
              Connect your external accounts, view all your financial details in one place, and let military-grade
              encryption and AI-governed safety protect every transaction — locally, on your machine.
            </p>

            {/* Download info box */}
            <div className="mb-8 flex items-start gap-4 rounded-xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(201,168,76,.10)]">
                <svg className="h-5 w-5 text-[color:var(--custodi-gold)]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3v10M6 9l4 4 4-4M4 16h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-[color:var(--off-white)]">Download. Connect. Control.</p>
                <p className="text-xs leading-relaxed text-[color:var(--mid)]">
                  Install the Custodi desktop app, link your external financial accounts, and get a unified, encrypted view
                  of your entire financial infrastructure — with zero data leaving your machine.
                </p>
                <PlatformBadges className="mt-4 border-t border-[color:var(--border)] pt-3" />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://forms.gle/7oQbghFgYigpJPZW9"
                target="_blank"
                className="inline-flex items-center justify-center rounded-lg bg-[color:var(--custodi-gold)] px-6 py-3 text-sm font-semibold text-[color:var(--custodi-dark)] transition-colors hover:bg-[#d4b85c]"
              >
                Request Early Access →
              </Link>
            </div>

            <p className="mt-4 text-xs text-[color:var(--mid)]">
              No spam. Just release updates and early access instructions.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>DESKTOP ONLY</Pill>
              <Pill>AI GOVERNED EXECUTION</Pill>
              <Pill>BANK-GRADE ENCRYPTION</Pill>
              <Pill>LOCAL BY DESIGN</Pill>
            </div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-1 items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] lg:max-w-[560px]">
              <div className="absolute inset-0 rounded-2xl bg-[rgba(201,168,76,.08)] blur-3xl" />
              <Image
                src={heroMockup}
                alt="Custodi dashboard — account balances and agent stack"
                className="relative z-10 w-full rounded-2xl border border-[rgba(201,168,76,.35)] shadow-[0_0_40px_rgba(201,168,76,.25)] transition-transform duration-300 ease-out hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* APP DESCRIPTION */}
      <AppDescriptionSection />

      {/* UNIFIED ACCOUNTS */}
      <UnifiedAccountsSection />

      {/* HOW IT WORKS */}
      <StepsSection />

      {/* SECURITY */}
      <div className="px-8">
        <AnimatedDivider variant="gradient" />
      </div>
      <SecuritySection />

      {/* SAFETY AGENT */}
      <SafetyAgentSection />

      {/* DEMO */}
      <DemoSection />

      {/* PLATFORM CAPABILITIES */}
      <PlatformCapabilitiesSection />

      {/* SAFETY IS STRUCTURAL */}
      <div className="px-8">
        <AnimatedDivider variant="shimmer" />
      </div>
      <FeaturesSection />

      {/* ARCHITECTURE */}
      <section id="architecture" className="py-16">
        <div className="mb-8">
          <AnimatedDivider variant="glow" />
        </div>
        <ArchitectureDiagram />
      </section>

      {/* PRICING */}
      <PricingSection />

      {/* FAQ */}
      <div className="px-8">
        <AnimatedDivider variant="gradient" />
      </div>
      <FAQSection />

      {/* CTA / VISION */}
      <section className="relative overflow-hidden py-24">
        <div className="mb-12">
          <AnimatedDivider variant="shimmer" />
        </div>
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
            <svg className="h-[22px] w-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21V2Z" fill="rgba(201,168,76,0.25)"/>
              <path d="M11 2L20 5.5V12C2 16.5 6 19.5 11 21C6 19.5 2 16.5 2 12V5.5L11 2Z" stroke="var(--custodi-gold)" strokeWidth="0.8" fill="none"/>
              <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21L11 2Z" stroke="var(--custodi-gold)" strokeWidth="0.6" fill="none"/>
              <path d="M2.25 14 Q2 7.5 20 5.5" stroke="var(--custodi-gold)" strokeWidth="0.9" fill="none"/>
            </svg>
            <span className="font-serif text-sm font-semibold tracking-wide text-[color:var(--off-white)]">
              CUSTODI {" "}{" | "}{" "}
              <span className="font-serif text-[12px] font-light tracking-[0.18em] text-white">
              Your finances. Guarded.
              </span>
            </span>
          </div>
          <p className="text-xs text-[color:var(--mid)]">
            AI governed financial execution. Safety is mandatory.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-[color:var(--mid)]">Desktop app for</span>
            <PlatformBadges variant="icons" />
          </div>
          <div className="flex items-center gap-6 text-xs text-[color:var(--mid)]">
            <Link href="/privacy" className="transition-colors hover:text-[color:var(--custodi-gold)]">
              Privacy Policy
            </Link>
            <span className="opacity-30">|</span>
            <Link href="/terms" className="transition-colors hover:text-[color:var(--custodi-gold)]">
              Terms &amp; Conditions
            </Link>
          </div>
          <p className="text-xs text-[color:var(--mid)]">
            © {new Date().getFullYear()} Custodi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}