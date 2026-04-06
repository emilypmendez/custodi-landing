import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Custodi",
  description:
    "Review Custodi's Terms & Conditions governing your use of the platform, including eligibility, acceptable use, payment terms, and limitations of liability.",
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

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[color:var(--mid)]">
            These terms govern your access to and use of the Custodi platform. Please read them
            carefully before using the service.
          </p>
          <p className="mt-6 font-mono text-[11px] tracking-[0.15em] text-[color:var(--mid)]">
            Last updated: April 5, 2026
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto w-[min(800px,calc(100%-48px))] py-20">
        <div className="space-y-16">

          {/* 1. Acceptance */}
          <TermsSection label="01 — ACCEPTANCE" title="Agreement to these terms.">
            <p>
              By accessing or using the Custodi platform, website, or any associated services
              (collectively, the &quot;Service&quot;), you agree to be bound by these Terms &amp;
              Conditions (&quot;Terms&quot;). If you do not agree, you may not access or use the
              Service.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Custodi
              (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We reserve the right to update
              these Terms at any time. Material changes will be communicated to registered users via
              email.
            </p>
          </TermsSection>

          {/* 2. Eligibility */}
          <TermsSection label="02 — ELIGIBILITY" title="Who may use Custodi.">
            <p>
              You must be at least 18 years of age to use the Service. By using Custodi, you
              represent and warrant that:
            </p>
            <BulletList items={[
              "You are at least 18 years old",
              "You have the legal capacity to enter into binding contracts",
              "Your use of the Service complies with all applicable laws and regulations in your jurisdiction",
              "You are not located in a jurisdiction where cryptocurrency transactions or financial technology services of this nature are prohibited",
              "You will not use the Service for any unlawful purpose",
            ]} />
          </TermsSection>

          {/* 3. The Service */}
          <TermsSection label="03 — THE SERVICE" title="What Custodi provides.">
            <p>
              Custodi is an AI governed financial execution platform that facilitates USDC
              transactions on Base L2 and Monad blockchain networks. The platform includes a
              local-first Personal Safety Agent that evaluates transactions prior to execution,
              a zero-knowledge private transfer layer (Unlink), and a multi-agent orchestration
              architecture designed to enforce mandatory safety verdicts.
            </p>
            <HighlightBox>
              <strong className="text-[color:var(--off-white)]">Custodi is not a financial advisor, broker-dealer, or licensed financial institution.</strong>{" "}
              The platform provides execution tooling and safety infrastructure. Nothing within the
              Service constitutes financial, investment, legal, or tax advice. You are solely
              responsible for your financial decisions.
            </HighlightBox>
            <p>
              Custodi does not custody your funds. Private keys remain on your device in Tauri
              Stronghold at all times. You bear full responsibility for the security of your device
              and access credentials.
            </p>
          </TermsSection>

          {/* 4. Safety System */}
          <TermsSection label="04 — SAFETY SYSTEM" title="Understanding mandatory safety verdicts.">
            <p>
              Custodi&apos;s AI safety system evaluates every transaction and returns one of three
              verdicts:
            </p>
            <div className="space-y-3">
              {[
                { verdict: "GREEN", color: "var(--green)", desc: "Transaction is cleared for immediate execution." },
                { verdict: "AMBER", color: "var(--amber)", desc: "Transaction is flagged with a mandatory cooling-off period before execution may proceed." },
                { verdict: "RED", color: "var(--red)", desc: "Transaction is blocked. No bypass exists at the software layer." },
              ].map(({ verdict, color, desc }) => (
                <div key={verdict} className="flex items-start gap-4 rounded-lg border border-[color:var(--border)] bg-[#1e1e1e] p-4">
                  <span
                    className="mt-0.5 shrink-0 rounded px-2 py-0.5 font-mono text-[11px] font-semibold tracking-widest"
                    style={{ color, border: `1px solid ${color}`, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
                  >
                    {verdict}
                  </span>
                  <p className="text-sm text-[color:var(--mid)]">{desc}</p>
                </div>
              ))}
            </div>
            <p>
              You acknowledge that the safety system may block or delay transactions based on its
              evaluation logic. Custodi is not liable for losses arising from a transaction being
              delayed or blocked by a safety verdict.
            </p>
          </TermsSection>

          {/* 5. Acceptable Use */}
          <TermsSection label="05 — ACCEPTABLE USE" title="Permitted and prohibited conduct.">
            <p>You agree not to use the Service to:</p>
            <BulletList items={[
              "Violate any applicable law, regulation, or third-party rights",
              "Conduct, facilitate, or conceal money laundering or terrorist financing",
              "Circumvent, disable, or interfere with the safety evaluation system",
              "Attempt to reverse-engineer, decompile, or extract source code from the platform",
              "Transmit malware, viruses, or any code designed to disrupt the Service",
              "Use the Service in any manner that could damage, overburden, or impair its operation",
              "Impersonate any person or entity, or misrepresent your affiliation",
            ]} />
          </TermsSection>

          {/* 6. Payments & Subscriptions */}
          <TermsSection label="06 — PAYMENTS" title="Billing and subscription terms.">
            <p>
              Paid features of Custodi are billed on a recurring subscription basis. All payments
              are processed by Stripe, Inc. By subscribing, you authorize Stripe to charge your
              payment method on the applicable billing cycle.
            </p>
            <SubSection title="Cancellation">
              <p>
                You may cancel your subscription at any time. Cancellation takes effect at the end
                of the current billing period. We do not provide prorated refunds for partial
                subscription periods unless required by applicable law.
              </p>
            </SubSection>
            <SubSection title="Price Changes">
              <p>
                We reserve the right to modify subscription pricing. Price changes will be
                communicated with at least 30 days&apos; notice before taking effect. Continued
                use after the effective date constitutes acceptance of the new pricing.
              </p>
            </SubSection>
          </TermsSection>

          {/* 7. Blockchain & Financial Risk */}
          <TermsSection label="07 — RISK DISCLOSURE" title="Cryptocurrency and financial risk.">
            <HighlightBox>
              <strong className="text-[color:var(--off-white)]">Cryptocurrency transactions carry significant risk.</strong>{" "}
              The value of digital assets can fluctuate dramatically. Past performance is not
              indicative of future results. You may lose some or all of the value of your assets.
            </HighlightBox>
            <p>
              You further acknowledge that:
            </p>
            <BulletList items={[
              "Blockchain transactions are irreversible once confirmed — Custodi cannot reverse a broadcast transaction",
              "Smart contract interactions carry the risk of bugs, exploits, or unexpected behavior",
              "Gas fees and network costs are your responsibility and are not refunded by Custodi",
              "Regulatory frameworks governing cryptocurrency vary by jurisdiction and may change",
              "Custodi does not guarantee the availability, performance, or security of Base L2, Monad, or any third-party blockchain infrastructure",
            ]} />
          </TermsSection>

          {/* 8. Intellectual Property */}
          <TermsSection label="08 — INTELLECTUAL PROPERTY" title="Ownership of the platform.">
            <p>
              The Custodi platform, including its design, software, AI models, agent architecture,
              trade name, and all associated intellectual property, is owned by Custodi and
              protected by applicable intellectual property laws. These Terms do not grant you any
              ownership rights in the Service.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable, revocable license to
              access and use the Service solely for your personal financial use in accordance with
              these Terms.
            </p>
          </TermsSection>

          {/* 9. Disclaimers */}
          <TermsSection label="09 — DISCLAIMERS" title="Limitations on our warranties.">
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind, express or implied, including but not limited to warranties
              of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, error-free, or completely
              secure. Blockchain networks, third-party services, and underlying infrastructure
              are outside our control and may experience downtime or disruption.
            </p>
          </TermsSection>

          {/* 10. Limitation of Liability */}
          <TermsSection label="10 — LIABILITY" title="Limits on our responsibility.">
            <p>
              To the maximum extent permitted by applicable law, Custodi and its officers,
              employees, and affiliates shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to loss of funds,
              loss of data, or loss of profits, arising out of or related to your use of the
              Service — even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Our total aggregate liability to you for any claim arising from these Terms or the
              Service shall not exceed the amount you paid to Custodi in the twelve months
              preceding the claim.
            </p>
          </TermsSection>

          {/* 11. Termination */}
          <TermsSection label="11 — TERMINATION" title="Suspension and termination of access.">
            <p>
              We reserve the right to suspend or terminate your access to the Service at our
              discretion, with or without notice, if we believe you have violated these Terms or
              applicable law. You may terminate your account at any time by cancelling your
              subscription and ceasing use of the Service.
            </p>
            <p>
              Upon termination, your right to access the Service ceases immediately. Sections of
              these Terms that by their nature should survive termination (including intellectual
              property, disclaimers, and limitation of liability) will remain in effect.
            </p>
          </TermsSection>

          {/* 12. Governing Law */}
          <TermsSection label="12 — GOVERNING LAW" title="Jurisdiction and disputes.">
            <p>
              These Terms shall be governed by and construed in accordance with applicable law.
              Any disputes arising under these Terms shall be resolved through good-faith
              negotiation where possible. For unresolved disputes, you agree to binding
              arbitration in lieu of class action litigation, to the extent permitted by law.
            </p>
          </TermsSection>

          {/* 13. Contact */}
          <TermsSection label="13 — CONTACT" title="Questions about these terms.">
            <p>
              If you have questions about these Terms &amp; Conditions, please contact us:
            </p>
            <HighlightBox>
              <p className="font-mono text-sm text-[color:var(--off-white)]">Custodi Legal</p>
              <a href="mailto:legal@custodi.app" className="font-mono text-sm text-[color:var(--custodi-gold)] transition-colors hover:underline">
                legal@custodi.app
              </a>
            </HighlightBox>
          </TermsSection>

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

function TermsSection({
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
