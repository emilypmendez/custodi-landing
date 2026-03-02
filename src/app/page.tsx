"use client";

import EarlyAccessForm from "@/components/EarlyAccessForm";
import SafetyScreenshots from "@/components/SafetyScreenshots";
import CoolingOffDemo from "@/components/CoolingOffDemo";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.20em] text-[color:var(--mid)]">
      <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--custodi-gold)] opacity-70" />
      {children}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-5 sm:p-8">
      {children}
    </div>
  );
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold" | "green" | "amber" | "red";
}) {
  const styles =
    tone === "gold"
      ? "border-[rgba(201,168,76,.35)] bg-[rgba(201,168,76,.10)] text-[color:var(--off-white)]"
      : tone === "green"
      ? "border-[rgba(45,212,160,.30)] bg-[rgba(45,212,160,.10)] text-[color:var(--green)]"
      : tone === "amber"
      ? "border-[rgba(212,145,45,.30)] bg-[rgba(212,145,45,.10)] text-[color:var(--amber)]"
      : tone === "red"
      ? "border-[rgba(224,87,87,.30)] bg-[rgba(224,87,87,.10)] text-[color:var(--red)]"
      : "border-[color:var(--border)] bg-[#14141466] text-[color:var(--mid)]";

  return (
    <span className={`rounded-full border px-3 py-1 font-mono text-[11px] tracking-[0.20em] ${styles}`}>
      {children}
    </span>
  );
}

function AppFrame({ label, caption, children }: { label: string; caption: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[#111111]">
        <div className="flex items-center gap-2 border-b border-[color:var(--border)] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="ml-3 font-mono text-[11px] tracking-[0.15em] text-[color:var(--mid)]">{label}</span>
        </div>
        <div>{children}</div>
      </div>
      <p className="mt-3 text-sm text-[color:var(--mid)]">{caption}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="bg-custodi min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[rgba(42,42,42,.85)] bg-[#141414a6] backdrop-blur">
        <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-[22px] w-[22px] rounded-lg border border-[rgba(201,168,76,.55)] bg-[radial-gradient(circle_at_35%_30%,rgba(201,168,76,.55),transparent_55%),linear-gradient(135deg,rgba(201,168,76,.18),rgba(201,168,76,.02))]" />
            <div className="font-serif text-[16px] font-bold tracking-[0.18em] text-[color:var(--custodi-gold)]">
              CUSTODI
            </div>
          </div>

          <nav aria-label="Main navigation" className="hidden flex-wrap gap-1 text-sm text-[color:var(--mid)] md:flex">
            <a className="rounded-lg px-3 py-2 hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#architecture">
              Architecture
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#verdicts">
              Verdicts
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#proof">
              Proof
            </a>
            <a className="rounded-lg px-3 py-2 hover:bg-[#1e1e1e] hover:text-[color:var(--off-white)]" href="#pricing">
              Pricing
            </a>
          </nav>

          <a
            href="#early-access"
            className="shrink-0 whitespace-nowrap rounded-xl bg-[color:var(--custodi-gold)] px-3 py-2 text-xs font-semibold text-[color:var(--custodi-dark)] sm:px-4 sm:text-sm"
          >
            Request early access →
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="w-full">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] py-20 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Pill tone="gold">AI GOVERNED EXECUTION</Pill>
                <Pill tone="neutral">MANDATORY SAFETY</Pill>
                <Pill tone="neutral">LOCAL BY DESIGN</Pill>
              </div>

              <h1 className="font-serif mt-8 text-[clamp(38px,5vw,68px)] font-bold leading-[1.05] tracking-[-0.03em] sm:mt-10 sm:leading-[1.02]">
                Privacy is a human right.
                <br />
                Protection is a responsibility.
              </h1>

              <p className="mt-6 max-w-[70ch] text-[17px] leading-relaxed text-[rgba(244,244,244,.82)] sm:mt-8">
                Custodi is an AI governed financial execution platform where safety is mandatory and privacy is preserved.
                Every transaction is evaluated before it can be executed. There is no bypass.
              </p>

              <div id="early-access" className="mt-8 max-w-xl sm:mt-10">
                <EarlyAccessForm source="hero_system_led" />
                <p className="mt-4 text-xs text-[color:var(--mid)]">
                  Early access is currently for Individuals only.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-[rgba(201,168,76,.22)] bg-[linear-gradient(180deg,rgba(201,168,76,.10),transparent_70%),#1e1e1e] p-5 sm:mt-14 sm:p-8">
                <SectionLabel>EXECUTION GUARANTEE</SectionLabel>
                <div className="mt-4 text-xl font-semibold">No path from RED verdict to execution.</div>
                <p className="mt-4 text-[17px] leading-relaxed text-[rgba(244,244,244,.88)]">
                  Safety is enforced at the orchestration layer, not at the interface. A RED verdict blocks broadcast and
                  prevents downstream execution steps.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Pill tone="green">GREEN PROCEEDS</Pill>
                  <Pill tone="amber">AMBER PAUSES</Pill>
                  <Pill tone="red">RED BLOCKS</Pill>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[#14141466]">
                  <div className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-2 text-xs text-[color:var(--mid)]">
                    <div className="font-mono tracking-[0.20em]">orchestrator.guard()</div>
                    <div className="font-mono">illustrative</div>
                  </div>
                  <pre className="font-mono max-w-full overflow-auto p-4 text-[12.5px] leading-6 text-[rgba(244,244,244,.90)]">
{`verdict = personal_safety.evaluate(intent, signals)

if verdict == RED:
  abort("No broadcast. No execution. No bypass.")

if verdict == AMBER:
  enforce_cooling_off(30s)

wallet_orchestrator.pre_approve(intent)
broadcast(intent)`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Right rail: Demo video */}
            <div className="lg:pt-6">
              <AppFrame label="Custodi — Product Demo" caption="See how Custodi evaluates and governs every transaction">
                <div className="flex aspect-video items-center justify-center bg-[#0d0d0d]">
                  <div className="text-center">
                    <div className="font-mono text-[11px] tracking-[0.20em] text-[color:var(--mid)]">DEMO COMING SOON</div>
                    <p className="mt-2 text-sm text-[color:var(--mid)] opacity-60">Custodi — Governed execution in action</p>
                  </div>
                </div>
              </AppFrame>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY IS STRUCTURAL */}
      <section className="w-full border-t border-[color:var(--border)] bg-section-alt">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] py-16 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <SectionLabel>SAFETY IS STRUCTURAL</SectionLabel>
              <h2 className="font-serif mt-6 text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em]">
                Safety is enforced, not suggested.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                Before any transfer is broadcast:
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>Behavioral signals are evaluated</li>
                <li>Risk and compliance checks run</li>
                <li>Execution is gated by orchestration</li>
                <li>Ledger state is recorded</li>
              </ul>
              <p className="mt-5 text-[15px] text-[color:var(--mid)]">
                Safety is mandatory. No override exists.
              </p>
            </Card>

            <Card>
              <SectionLabel>LOCAL AI. GOVERNED EXECUTION.</SectionLabel>
              <h3 className="font-serif mt-6 text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em]">Local safety evaluation</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                The Personal Safety Agent runs entirely on your machine.
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>No remote behavioral scoring</li>
                <li>No external API calls during evaluation</li>
                <li>No local HTTP exposure</li>
                <li>No network broadcast until execution is cleared</li>
              </ul>
              <p className="mt-5 text-[15px] text-[color:var(--mid)]">
                Protection happens locally. Execution happens deliberately.
              </p>
            </Card>

            <Card>
              <SectionLabel>EXECUTION GUARANTEE</SectionLabel>
              <h3 className="font-serif mt-6 text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em]">No path from RED verdict to execution.</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                Safety is enforced at the orchestration layer, not at the interface. A RED verdict blocks broadcast and
                prevents downstream execution steps.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill tone="green">GREEN PROCEEDS</Pill>
                <Pill tone="amber">AMBER PAUSES</Pill>
                <Pill tone="red">RED BLOCKS</Pill>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section id="architecture" className="w-full border-t border-[color:var(--border)]">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] py-16 lg:py-28">
          <div className="mb-12 lg:mb-20">
            <SectionLabel>STRUCTURED BY AI AGENTS</SectionLabel>
            <h2 className="font-serif mt-6 text-[clamp(28px,3.5vw,42px)] font-bold tracking-[-0.02em]">
              Orchestrated by design.
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-[color:var(--mid)]">
              Custodi operates through modular AI agents with strict separation of concern. Every request begins and ends
              with the Orchestrator. State transitions are recorded in an append only ledger.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <AppFrame label="Custodi — Agent Architecture" caption="Modular AI agents with strict separation of concern">
              <ArchitectureDiagram />
            </AppFrame>
          </div>

          {/* Numbered agent steps */}
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
            {[
              { n: "01", name: "Orchestrator", desc: "Routing logic and session state. Every request starts here and every response returns here." },
              { n: "02", name: "Billing & Entitlements", desc: "Plan gate. Outputs ALLOW, WARN, UPGRADE PROMPT, or HARD BLOCK." },
              { n: "03", name: "Identity & Auth", desc: "KYC and session scoping. Sandboxed credentials. Business tier adds SSO and delegation." },
              { n: "04", name: "Personal Safety", desc: "Behavioral guard. On device ML, trust graph, social engineering detection, mandatory cooling off." },
              { n: "05", name: "Risk & Compliance", desc: "AML thresholds, velocity checks, fraud pattern screening. Feeds unified signals to safety." },
              { n: "06", name: "Transaction", desc: "Fiat, crypto, USDC execution across rails. Idempotent by design." },
              { n: "07", name: "Wallet Agent", desc: "USDC wallet execution on Base L2 and Monad. Keys stored in Tauri Stronghold." },
              { n: "08", name: "Unlink Privacy", desc: "ZK private transfer wrapper for approved Monad USDC sends. Activated only after GREEN or AMBER post timer." },
              { n: "09", name: "Notification", desc: "Async confirmations, receipts, usage warnings, settlement polling. Never rolls back a valid transaction." },
              { n: "10", name: "Ledger & Reconciliation", desc: "Append only source of truth. Logs hashes and IDs. Feeds usage to billing." },
            ].map(({ n, name, desc }) => (
              <div key={n} className="flex gap-4">
                <div className="font-mono text-[13px] text-[color:var(--custodi-gold)] opacity-70 pt-0.5 shrink-0">{n}</div>
                <div>
                  <div className="font-semibold text-[15px] text-[color:var(--off-white)]">{name}</div>
                  <p className="mt-1 text-[14px] leading-relaxed text-[rgba(244,244,244,.70)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Proof sub-grid */}
          <div id="proof" className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20">
            <AppFrame label="Custodi — Safety Review" caption="Real-time safety evaluation before every transaction">
              <SafetyScreenshots />
            </AppFrame>
            <AppFrame label="Custodi — Cooling Off" caption="Mandatory pause enforced before AMBER-flagged execution">
              <CoolingOffDemo seconds={30} />
            </AppFrame>
          </div>
        </div>
      </section>

      {/* VERDICTS */}
      <section id="verdicts" className="w-full border-t border-[color:var(--border)] bg-section-alt">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] py-16 lg:py-28">
          <div className="mb-12 lg:mb-20">
            <SectionLabel>EXPLAINABLE VERDICTS</SectionLabel>
            <h2 className="font-serif mt-6 text-[clamp(28px,3.5vw,42px)] font-bold tracking-[-0.02em]">
              Every verdict is traceable.
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-[color:var(--mid)]">
              Custodi does not produce opaque risk scores. Each GREEN, AMBER, or RED decision includes structured
              reasoning derived from five signals.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <SectionLabel>FIVE SIGNALS</SectionLabel>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>Trust graph integrity</li>
                <li>Transaction amount anomaly</li>
                <li>14 day rolling time of day baseline</li>
              </ul>
            </Card>

            <Card>
              <SectionLabel>MANDATORY COOLING OFF</SectionLabel>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>Device continuity</li>
                <li>AML velocity screening</li>
              </ul>
              <p className="mt-5 text-[15px] text-[color:var(--mid)]">
                AMBER enforces a mandatory cooling off period. Currently 30 seconds.
              </p>
            </Card>

            <Card>
              <SectionLabel>REVENUE NEUTRAL SAFETY</SectionLabel>
              <h3 className="font-serif mt-6 text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em]">Verdicts are independent of fees</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[rgba(244,244,244,.88)]">
                Safety decisions are revenue neutral. Fees do not influence verdict outcomes. Enforcement remains
                consistent regardless of plan tier.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill tone="neutral">NO BYPASS</Pill>
                <Pill tone="neutral">NO OVERRIDE</Pill>
                <Pill tone="neutral">DETERMINISTIC GATES</Pill>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="w-full border-t border-[color:var(--border)]">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] py-16 lg:py-28">
          <div className="mb-12 lg:mb-20">
            <SectionLabel>PRICING</SectionLabel>
            <h2 className="font-serif mt-6 text-[clamp(28px,3.5vw,42px)] font-bold tracking-[-0.02em]">
              Transparent plans.
            </h2>
            <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-[color:var(--mid)]">
              The Safety Agent remains mandatory across all tiers. Plans affect privacy and governance capabilities.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card>
              <SectionLabel>FREE</SectionLabel>
              <div className="mt-6 text-4xl font-semibold">$0</div>
              <div className="mt-2 text-sm text-[color:var(--mid)]">2.99% processing fee per transaction</div>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-[17px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>Safety Agent enforcement</li>
                <li>Public transfers</li>
                <li>Explainable verdicts</li>
              </ul>
            </Card>

            <div className="rounded-2xl border border-[rgba(201,168,76,.22)] bg-[linear-gradient(180deg,rgba(201,168,76,.10),transparent_70%),#1e1e1e] p-5 sm:p-8">
              <SectionLabel>PRO</SectionLabel>
              <div className="mt-6 text-4xl font-semibold">$20<span className="text-base font-normal text-[color:var(--mid)]">/mo</span></div>
              <div className="mt-2 text-sm text-[color:var(--mid)]">2.99% processing fee per transaction</div>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-[17px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>Private transfers via Unlink</li>
                <li>AMBER cooling off protection</li>
                <li>Priority updates</li>
              </ul>
              <a
                href="#early-access"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[color:var(--custodi-gold)] px-4 py-3 text-sm font-semibold text-[color:var(--custodi-dark)]"
              >
                Request early access →
              </a>
            </div>

            <Card>
              <SectionLabel>BUSINESS</SectionLabel>
              <div className="mt-6 text-4xl font-semibold">$50<span className="text-base font-normal text-[color:var(--mid)]">/mo</span></div>
              <div className="mt-2 text-sm text-[color:var(--mid)]">2.99% processing fee per transaction</div>
              <ul className="mt-6 list-disc space-y-3 pl-5 text-[17px] leading-relaxed text-[rgba(244,244,244,.88)]">
                <li>Multi sig approvals</li>
                <li>Admin level risk thresholds</li>
                <li>Audit exports</li>
                <li>Managed recovery coming soon</li>
              </ul>
            </Card>
          </div>

          <p className="mt-8 text-sm text-[color:var(--mid)]">
            Safety decisions are revenue neutral.
          </p>
        </div>
      </section>

      {/* VISION */}
      <section className="w-full border-t border-[color:var(--border)] bg-section-alt">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] py-16 lg:py-28">
          <SectionLabel>VISION</SectionLabel>
          <h2 className="font-serif mt-6 text-[clamp(28px,3.5vw,42px)] font-bold tracking-[-0.02em]">
            Building toward governed financial infrastructure.
          </h2>
          <p className="mt-8 max-w-[80ch] text-[17px] leading-relaxed text-[rgba(244,244,244,.88)]">
            Custodi is evolving into a managed financial environment with identity backed recovery, policy based
            execution, multi sig business governance, and integrated fiat rails. Safety will remain mandatory.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Pill tone="neutral">IDENTITY BACKED RECOVERY</Pill>
            <Pill tone="neutral">POLICY BASED EXECUTION</Pill>
            <Pill tone="neutral">MULTI SIG GOVERNANCE</Pill>
            <Pill tone="neutral">FIAT RAILS</Pill>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-[color:var(--border)] bg-[#111111] py-10 lg:py-16">
        <div className="mx-auto w-[min(1120px,calc(100%-48px))] text-sm text-[color:var(--mid)]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="font-serif font-bold tracking-[0.18em] text-[color:var(--custodi-gold)]">CUSTODI</div>
            <div className="flex flex-wrap gap-5">
              <a href="#architecture">Architecture</a>
              <a href="#verdicts">Verdicts</a>
              <a href="#pricing">Pricing</a>
              <a href="#early-access">Early access</a>
            </div>
          </div>
          <div className="mt-8 text-xs text-[color:var(--mid)]">
            Safety colors are semantic (GREEN, AMBER, RED) and not used decoratively.
          </div>
          <div className="mt-2 text-xs text-[color:var(--mid)]">
            Version 1.1 — Agent architecture documented. Safety evaluation operates locally.
          </div>
        </div>
      </footer>
    </div>
  );
}