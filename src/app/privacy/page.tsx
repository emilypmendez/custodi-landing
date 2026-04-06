import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Custodi",
  description:
    "Custodi is built on a foundational principle: your financial data belongs to you. Learn how our local-first architecture protects your privacy by design.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
      {children}
    </span>
  );
}

const ShieldLogo = () => (
  <svg className="h-[22px] w-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21V2Z" fill="#c9a84c" />
    <path d="M11 2L2 5.5V12C2 16.5 6 19.5 11 21C6 19.5 2 16.5 2 12V5.5L11 2Z" stroke="#c9a84c" strokeWidth="1.5" />
    <path d="M11 2L20 5.5V12C20 16.5 16 19.5 11 21L11 2Z" stroke="#c9a84c" strokeWidth="1.5" />
  </svg>
);

export default function PrivacyPage() {
  return (
    <div className="bg-custodi min-h-screen">

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-[rgba(42,42,42,.85)] bg-[#141414e6] backdrop-blur-md">
        <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <ShieldLogo />
            <span className="font-serif text-[16px] font-bold tracking-[0.18em] text-[color:var(--off-white)]">
              CUSTODI{" "}
              <span className="font-serif text-[12px] font-light tracking-[0.18em] text-[color:var(--mid)]">
                | Your finances. Guarded.
              </span>
            </span>
          </Link>
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
      <section className="relative overflow-hidden border-b border-[color:var(--border)] py-20">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[rgba(201,168,76,.04)] blur-[120px]" />
        <div className="relative mx-auto w-[min(1120px,calc(100%-48px))] text-center">
          <SectionLabel>LEGAL</SectionLabel>
          <h1 className="mb-4 mt-4 text-3xl font-bold leading-tight text-[color:var(--off-white)] sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[color:var(--mid)]">
            Your financial data belongs to you. This policy explains what we collect, what we
            deliberately do not collect, and how our architecture makes privacy a structural guarantee
            — not just a promise.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.15em] text-[color:var(--mid)]">
            Last updated: April 5, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto w-[min(800px,calc(100%-48px))] py-20">
        <div className="space-y-16">

          {/* 1. Introduction */}
          <PolicySection label="01 — INTRODUCTION" title="Built for privacy from the ground up.">
            <p>
              Custodi is an AI governed financial execution platform where safety is mandatory and
              privacy is preserved. Unlike traditional financial applications, Custodi&apos;s core
              evaluation engine runs entirely on your device. Your transaction activity, behavioral
              signals, and financial history are never transmitted to our servers — because our
              architecture never needs them to be.
            </p>
            <p>
              This Privacy Policy describes the limited personal information we collect in order to
              operate the service (such as a billing relationship and communications), and clearly
              documents what we do not collect by design.
            </p>
          </PolicySection>

          {/* 2. Local-First Architecture */}
          <PolicySection label="02 — ARCHITECTURE" title="Privacy as a structural guarantee.">
            <p>
              Custodi&apos;s Personal Safety Agent operates entirely on your machine. Before any
              transaction is broadcast to a blockchain network, it is evaluated locally using
              on-device machine learning — no behavioral data is sent to external servers during
              this process.
            </p>
            <HighlightBox>
              <strong className="text-[color:var(--off-white)]">This is an architectural guarantee, not a policy commitment.</strong>{" "}
              The system is designed so that evaluation cannot occur remotely. There are no API calls
              to Custodi servers during transaction evaluation. Your financial activity does not leave
              your device until you authorize a transaction and it is cleared for broadcast.
            </HighlightBox>
            <BulletList items={[
              "Transaction history and financial activity remain on your device",
              "Behavioral signals and trust graph computations are evaluated locally",
              "ML model inference runs on-device — no cloud scoring",
              "No telemetry, usage analytics, or financial metadata is transmitted",
              "Private keys are stored exclusively in Tauri Stronghold on your local machine",
            ]} />
          </PolicySection>

          {/* 3. What We Collect */}
          <PolicySection label="03 — DATA COLLECTION" title="The limited information we do collect.">
            <p>
              Custodi collects only the minimum information necessary to provide the service and
              communicate with you.
            </p>

            <SubSection title="Early Access Waitlist">
              <p>
                When you request early access via our waitlist form (hosted on Google Forms), we
                collect your email address. This is used solely to notify you of product updates,
                your access status, and Custodi release announcements. We do not sell, rent, or
                share waitlist data with third parties for marketing purposes.
              </p>
            </SubSection>

            <SubSection title="Payment Information">
              <p>
                Subscription payments are processed by{" "}
                <ExternalLink href="https://stripe.com/privacy">Stripe, Inc.</ExternalLink> When you
                subscribe to a Custodi plan, Stripe collects and processes your payment card details
                directly in a PCI-compliant environment. Custodi does not receive, store, or have
                access to your full card number, CVV, or bank account details.
              </p>
              <p>
                We receive only a Stripe customer ID, subscription tier, and subscription status —
                the minimum required to manage your account and enforce access to paid features.
              </p>
            </SubSection>

            <SubSection title="Account Data">
              <p>
                If you create a Custodi account, we store your email address and encrypted account
                credentials necessary for authentication. We do not link your account identity to
                any on-chain wallet addresses or transaction history.
              </p>
            </SubSection>
          </PolicySection>

          {/* 4. What We Do NOT Collect */}
          <PolicySection label="04 — WHAT WE DO NOT COLLECT" title="Your financial life stays yours.">
            <p>
              The following data is never collected, transmitted to, or stored by Custodi:
            </p>
            <BulletList items={[
              "Transaction history, amounts, or destinations",
              "Wallet addresses or on-chain identifiers linked to your identity",
              "Behavioral signals, risk scores, or ML evaluation outputs",
              "Trust graph data or social engineering detection results",
              "Private keys or seed phrases (stored exclusively in Tauri Stronghold on your device)",
              "Zero-knowledge proof inputs or outputs from Unlink private transfers",
              "USDC balances or on-chain portfolio data",
              "App usage patterns, session recordings, or crash telemetry",
            ]} />
          </PolicySection>

          {/* 5. Blockchain Activity */}
          <PolicySection label="05 — BLOCKCHAIN ACTIVITY" title="On-chain data is public by nature.">
            <p>
              Custodi facilitates USDC transactions on Base L2 and Monad blockchain networks.
              Blockchain transactions are, by their nature, publicly recorded on an immutable
              distributed ledger once broadcast. Custodi has no control over the public visibility
              of confirmed on-chain transactions.
            </p>
            <p>
              The <strong className="text-[color:var(--off-white)]">Unlink</strong> feature uses
              zero-knowledge proofs to preserve privacy at the transfer layer, obscuring the
              connection between sender and recipient. However, Custodi cannot guarantee the
              anonymity of on-chain data in all circumstances, and we make no representations about
              the privacy properties of public blockchain infrastructure.
            </p>
            <p>
              Unlink transfers are only activated after a transaction receives a GREEN or AMBER
              (post-cooling-off) verdict from the Personal Safety Agent.
            </p>
          </PolicySection>

          {/* 6. Third-Party Services */}
          <PolicySection label="06 — THIRD PARTIES" title="Services we rely on.">
            <p>
              Custodi uses a minimal set of third-party services. We do not use advertising
              networks, behavioral analytics platforms, or data brokers.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--border)]">
                    <th className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--custodi-gold)]">Service</th>
                    <th className="py-3 pr-6 text-left font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--custodi-gold)]">Purpose</th>
                    <th className="py-3 text-left font-mono text-[11px] uppercase tracking-[0.15em] text-[color:var(--custodi-gold)]">Data Shared</th>
                  </tr>
                </thead>
                <tbody className="text-[color:var(--mid)]">
                  {[
                    ["Stripe", "Subscription payment processing", "Billing info only"],
                    ["Google Forms", "Early access waitlist", "Email address only"],
                    ["Base L2", "USDC transaction broadcast", "Signed transaction data (public)"],
                    ["Monad", "USDC transaction broadcast", "Signed transaction data (public)"],
                  ].map(([service, purpose, data]) => (
                    <tr key={service} className="border-b border-[color:var(--border)]">
                      <td className="py-3 pr-6 text-[color:var(--off-white)]">{service}</td>
                      <td className="py-3 pr-6">{purpose}</td>
                      <td className="py-3">{data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PolicySection>

          {/* 7. Data Security */}
          <PolicySection label="07 — SECURITY" title="How we protect what we do hold.">
            <p>
              Account credentials and subscription metadata are protected using
              industry-standard TLS 1.3 encryption in transit and AES-256 encryption at rest.
              Access to production systems is restricted and logged.
            </p>
            <p>
              Your private keys are stored in{" "}
              <strong className="text-[color:var(--off-white)]">Tauri Stronghold</strong> — an
              encrypted, memory-safe vault on your local device. They are never transmitted to
              Custodi servers under any circumstances. If Custodi&apos;s servers were compromised,
              your keys and financial assets would remain unaffected.
            </p>
          </PolicySection>

          {/* 8. Your Rights */}
          <PolicySection label="08 — YOUR RIGHTS" title="Control over your personal data.">
            <p>
              Depending on your jurisdiction, you may have the following rights regarding the
              limited personal data we hold (email address and subscription status):
            </p>
            <BulletList items={[
              "Access — request a copy of the personal data we hold about you",
              "Correction — request correction of inaccurate or incomplete data",
              "Deletion — request erasure of your personal data (subject to legal obligations)",
              "Portability — receive your data in a structured, machine-readable format",
              "Objection — object to processing where we rely on legitimate interests",
              "Withdrawal of consent — unsubscribe from communications at any time",
            ]} />
            <p>
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:privacy@custodi.app" className="text-[color:var(--custodi-gold)] transition-colors hover:underline">
                privacy@custodi.app
              </a>
              . We will respond within 30 days.
            </p>
          </PolicySection>

          {/* 9. Children */}
          <PolicySection label="09 — CHILDREN'S PRIVACY" title="Not for minors.">
            <p>
              Custodi is a financial platform intended for users aged 18 and older. We do not
              knowingly collect personal information from individuals under 18. If you believe a
              minor has provided us with personal data, please contact us immediately at{" "}
              <a href="mailto:privacy@custodi.app" className="text-[color:var(--custodi-gold)] transition-colors hover:underline">
                privacy@custodi.app
              </a>{" "}
              and we will promptly delete it.
            </p>
          </PolicySection>

          {/* 10. Policy Changes */}
          <PolicySection label="10 — POLICY CHANGES" title="How we handle updates.">
            <p>
              As Custodi evolves, this Privacy Policy may be updated. Material changes — such as
              new data collection practices — will be communicated via the email address associated
              with your account or waitlist entry before they take effect.
            </p>
            <p>
              The &quot;Last updated&quot; date at the top of this page reflects the most recent
              revision. Continued use of Custodi after the effective date of any changes constitutes
              acceptance of the updated policy.
            </p>
          </PolicySection>

          {/* 11. Contact */}
          <PolicySection label="11 — CONTACT" title="Questions about your privacy.">
            <p>
              If you have questions, concerns, or requests related to this Privacy Policy or your
              personal data, please reach out:
            </p>
            <HighlightBox>
              <p className="font-mono text-sm text-[color:var(--off-white)]">Custodi Privacy</p>
              <a href="mailto:privacy@custodi.app" className="font-mono text-sm text-[color:var(--custodi-gold)] transition-colors hover:underline">
                privacy@custodi.app
              </a>
            </HighlightBox>
          </PolicySection>

        </div>

        {/* Back to home */}
        <div className="mt-20 border-t border-[color:var(--border)] pt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] px-5 py-2.5 text-sm text-[color:var(--mid)] transition-colors hover:border-[rgba(201,168,76,.30)] hover:text-[color:var(--off-white)]"
          >
            ← Back to Custodi
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}

/* ─── Shared sub-components ─────────────────────────────────── */

function PolicySection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mb-5 mt-3 text-xl font-semibold text-[color:var(--off-white)] sm:text-2xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-relaxed text-[color:var(--mid)]">
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-[color:var(--off-white)]">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function HighlightBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[rgba(201,168,76,.20)] bg-[rgba(201,168,76,.05)] p-5 text-sm leading-relaxed text-[color:var(--mid)]">
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--custodi-gold)]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[color:var(--custodi-gold)] transition-colors hover:underline"
    >
      {children}
    </a>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[#111111] py-12">
      <div className="mx-auto flex w-[min(1120px,calc(100%-48px))] flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <ShieldLogo />
          <span className="font-serif text-sm font-semibold tracking-wide text-[color:var(--off-white)]">
            CUSTODI{" "}
            <span className="font-serif text-[12px] font-light tracking-[0.18em] text-[color:var(--mid)]">
              | Your finances. Guarded.
            </span>
          </span>
        </div>
        <p className="text-xs text-[color:var(--mid)]">
          AI governed financial execution. Safety is mandatory.
        </p>
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
  );
}
