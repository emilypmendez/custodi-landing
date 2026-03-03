import { useState } from "react";

// ── Clean technical palette — white background, precise colors ──
const T = {
  bg: "#FFFFFF",
  bgAlt: "#F7F8FA",
  bgGroup: "#F0F4FF",
  border: "#D0D5DD",
  borderDark: "#9AA3B0",
  text: "#0D1117",
  textMid: "#4B5563",
  textDim: "#9CA3AF",
  // Semantic
  gold: "#B8860B",
  goldBg: "#FFFBEB",
  goldBorder: "#D4A017",
  green: "#166534",
  greenBg: "#F0FDF4",
  greenBorder: "#22C55E",
  red: "#991B1B",
  redBg: "#FEF2F2",
  redBorder: "#EF4444",
  amber: "#92400E",
  amberBg: "#FFFBEB",
  amberBorder: "#F59E0B",
  blue: "#1E40AF",
  blueBg: "#EFF6FF",
  blueBorder: "#3B82F6",
  teal: "#0E7490",
  tealBg: "#F0FDFA",
  tealBorder: "#06B6D4",
  purple: "#5B21B6",
  purpleBg: "#F5F3FF",
  purpleBorder: "#8B5CF6",
};

const AGENT_DATA = {
  orchestrator: {
    label: "Orchestrator", sub: "with Routing Logic", tier: "Entry", color: T.gold, bg: T.goldBg, border: T.goldBorder,
    desc: "Central coordinator. Receives user intent, manages session state, embeds routing logic to determine rail (fiat / crypto / USDC) and agent sequencing. Every request starts here.",
    stores: ["Session State (in-memory)"], apis: [],
  },
  billing: {
    label: "Billing & Entitlements", sub: "Plan Gate", tier: "Gate", color: T.gold, bg: T.goldBg, border: T.goldBorder,
    desc: "Pre-checks every action against the user's subscription tier before any work is done. Outputs ALLOW / WARN / UPGRADE PROMPT / HARD BLOCK. Syncs via Stripe webhooks.",
    stores: ["Entitlement Store (SQLite)", "Usage Meter"], apis: ["Stripe Billing API", "Stripe Webhooks"],
  },
  identity: {
    label: "Identity & Auth", sub: "KYC · WebAuthn", tier: "Safety", color: T.blue, bg: T.blueBg, border: T.blueBorder,
    desc: "Handles KYC verification and session token scoping. Stateless and sandboxed — never exposes raw credentials downstream. Business tier adds SSO.",
    stores: ["Auth Token (ephemeral)"], apis: ["FIDO2 / WebAuthn", "SSO (Business)"],
  },
  safety: {
    label: "Personal Safety", sub: "Behavioral Guard", tier: "Safety", color: T.green, bg: T.greenBg, border: T.greenBorder,
    desc: "THE core differentiator. Models behavioral baselines, maintains individual trust graph, detects social engineering, enforces cooling-off timers. Absorbs signals from Risk Agent. Mandatory cooling-off for ALL crypto and USDC transactions.",
    stores: ["Behavioral Profile DB", "Trust Graph", "Incident Log"], apis: [],
  },
  risk: {
    label: "Risk & Compliance", sub: "AML · Velocity", tier: "Safety", color: T.red, bg: T.redBg, border: T.redBorder,
    desc: "Universal rule-based screening — AML thresholds, velocity checks, known fraud patterns, wallet address screening. Feeds signals INTO the Personal Safety Agent for unified decision-making.",
    stores: ["Compliance Rules DB"], apis: [],
  },
  transaction: {
    label: "Transaction", sub: "Fiat · Crypto · USDC", tier: "Execution", color: T.blue, bg: T.blueBg, border: T.blueBorder,
    desc: "Executes payment logic across three rails. Fiat via Stripe/Plaid. Crypto via Coinbase CDP + OnchainKit. USDC delegates to Wallet Agent. Idempotent by design.",
    stores: [], apis: ["Stripe API", "Plaid API", "Coinbase CDP", "OnchainKit / Base L2"],
  },
  wallet: {
    label: "Wallet Agent", sub: "USDC · Base L2", tier: "Execution", color: T.teal, bg: T.tealBg, border: T.tealBorder,
    desc: "Non-custodial USDC wallet on Base L2. Keys generated locally and stored in Tauri Stronghold vault — never transmitted. Handles deposits, withdrawals, P2P USDC sends/receives. User is always the sole keyholder.",
    stores: ["Wallet Key (Stronghold Vault)", "USDC Balance Cache"], apis: ["Coinbase CDP", "Base L2 Network", "Circle USDC"],
  },
  notification: {
    label: "Notification", sub: "Async · Fire & Forget", tier: "Output", color: T.purple, bg: T.purpleBg, border: T.purpleBorder,
    desc: "Async fire-and-forget. Confirmations, receipts, usage warnings, upgrade prompts, on-chain settlement polling, USDC confirmations. A notification failure never rolls back a valid transaction.",
    stores: [], apis: ["Email / SMS / Push", "Approver Alerts (Business)"],
  },
  ledger: {
    label: "Ledger & Reconciliation", sub: "Audit · Source of Truth", tier: "Output", color: T.purple, bg: T.purpleBg, border: T.purpleBorder,
    desc: "Source of truth for all agent actions and transaction states. Logs Coinbase TX ID + on-chain hash for crypto. Tracks USDC events as first-class records. Feeds usage metrics to Billing Agent in real time.",
    stores: ["SQLite Audit Log (local)", "Compliance Report Engine"], apis: ["CSV / PDF Export (Business)"],
  },
};

// ── Shared components ──────────────────────────────────────────

function AgentBox({ id, label, sub, color, bg, border, selected, onClick }) {
  const active = selected === id;
  return (
    <div onClick={() => onClick(active ? null : id)} style={{
      background: active ? bg : T.bg,
      border: `1.5px solid ${active ? color : border}`,
      borderRadius: 6, padding: "8px 10px", cursor: "pointer",
      boxShadow: active ? `0 0 0 3px ${color}22` : "0 1px 3px rgba(0,0,0,0.08)",
      transition: "all 0.15s", minWidth: 110, flex: 1,
      outline: active ? `2px solid ${color}` : "none",
      outlineOffset: 2,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: active ? color : T.text, marginBottom: 2, fontFamily: "'IBM Plex Sans','Arial',sans-serif" }}>{label}</div>
      <div style={{ fontSize: 9, color: active ? color : T.textDim, letterSpacing: 0.3 }}>{sub}</div>
    </div>
  );
}

function Arrow({ label, wide, color = T.borderDark, dashed }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, padding: "0 4px", flexShrink: 0 }}>
      {label && <div style={{ fontSize: 8, color: T.textDim, letterSpacing: 0.5, textAlign: "center", maxWidth: 70, lineHeight: 1.3 }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        <div style={{ width: wide ? 48 : 28, height: 1.5, background: dashed ? "none" : color, borderTop: dashed ? `1.5px dashed ${color}` : "none" }} />
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
          <path d="M0 1l7 4-7 4V1z" fill={color} />
        </svg>
      </div>
    </div>
  );
}

function DownArrow({ label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, margin: "4px 0" }}>
      <div style={{ width: 1.5, height: 14, background: T.borderDark }} />
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 0l4 7 4-7H1z" fill={T.borderDark} />
      </svg>
      {label && <div style={{ fontSize: 8, color: T.textDim, letterSpacing: 0.5 }}>{label}</div>}
    </div>
  );
}

function GroupBox({ label, color, bg, border, children, note }) {
  return (
    <div style={{ border: `1.5px dashed ${border || color}`, borderRadius: 8, padding: "10px 10px 8px", background: bg || "transparent", position: "relative", marginBottom: 4 }}>
      <div style={{ position: "absolute", top: -9, left: 12, background: T.bg, paddingLeft: 4, paddingRight: 4 }}>
        <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: 1, fontFamily: "'IBM Plex Sans','Arial',sans-serif" }}>{label}</span>
        {note && <span style={{ fontSize: 8, color: T.textDim, marginLeft: 6 }}>{note}</span>}
      </div>
      {children}
    </div>
  );
}

function Chip({ label, color, bg }) {
  return (
    <span style={{ display: "inline-block", fontSize: 8, fontWeight: 600, letterSpacing: 0.5, color, background: bg, border: `1px solid ${color}55`, borderRadius: 3, padding: "2px 6px", marginRight: 4, marginTop: 3 }}>{label}</span>
  );
}

function DetailPanel({ id, onClose }) {
  const ag = AGENT_DATA[id];
  if (!ag) return null;
  return (
    <div style={{ background: ag.bg, border: `1.5px solid ${ag.border}`, borderRadius: 8, padding: "16px 18px", marginTop: 16, animation: "slideDown 0.2s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
      <style>{`@keyframes slideDown{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:none;}}`}</style>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: ag.color, fontFamily: "'IBM Plex Sans','Arial',sans-serif", marginBottom: 2 }}>{ag.label}</div>
          <div style={{ fontSize: 9, color: T.textMid, letterSpacing: 1 }}>{ag.tier.toUpperCase()} TIER</div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: T.textDim, fontSize: 14, cursor: "pointer", padding: "0 2px" }}>✕</button>
      </div>
      <p style={{ fontSize: 11, color: T.textMid, lineHeight: 1.75, marginBottom: 12, maxWidth: 640 }}>{ag.desc}</p>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {ag.stores.length > 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.textMid, letterSpacing: 1, marginBottom: 6 }}>DATA STORES</div>
            {ag.stores.map(s => <Chip key={s} label={s} color={T.textMid} bg={T.bg} />)}
          </div>
        )}
        {ag.apis.length > 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: ag.color, letterSpacing: 1, marginBottom: 6 }}>EXTERNAL APIs</div>
            {ag.apis.map(a => <Chip key={a} label={`↗ ${a}`} color={ag.color} bg={T.bg} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main diagram ───────────────────────────────────────────────

export default function CustodiDiagram() {
  const [selected, setSelected] = useState(null);

  const select = (id) => setSelected(prev => prev === id ? null : id);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'IBM Plex Sans','Arial',sans-serif", color: T.text, padding: "32px 28px", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#fff;}
        ::-webkit-scrollbar{height:5px;width:5px;}
        ::-webkit-scrollbar-thumb{background:#D0D5DD;border-radius:3px;}
      `}</style>

      {/* Title block */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          {/* Logo */}
          <div style={{ width: 36, height: 36, borderRadius: 8, border: `1.5px solid ${T.goldBorder}`, background: T.goldBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon points="12,1 21,6 21,18 12,23 3,18 3,6" stroke={T.gold} strokeWidth="1.5" fill="none" />
              <text x="12" y="16" textAnchor="middle" fill={T.gold} fontSize="9" fontFamily="'IBM Plex Sans',Arial,sans-serif" fontWeight="700">C</text>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.text, letterSpacing: -0.3 }}>Custodi: A Personal Financial Safety Platform</div>
            <div style={{ fontSize: 11, color: T.textMid, marginTop: 2 }}>Multi-agent P2P orchestration · Fiat · Crypto · USDC Wallet · Non-custodial · custodi.tech</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: T.textDim, background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 5, padding: "6px 12px", display: "inline-block", marginTop: 4 }}>
          Click any agent box to expand its detail panel
        </div>
      </div>

      {/* ── MAIN FLOW ── */}
      <div style={{ overflowX: "auto", paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 0, minWidth: 900 }}>

          {/* LEFT: SENDER */}
          <div style={{ flexShrink: 0, width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMid, letterSpacing: 1, marginBottom: 2 }}>SENDER</div>
            <PersonIcon color={T.blue} />
            <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>James</div>
            <div style={{ fontSize: 9, color: T.textDim, textAlign: "center" }}>Custodi Pro user</div>
            <div style={{ background: T.blueBg, border: `1px solid ${T.blueBorder}`, borderRadius: 6, padding: "7px 10px", width: "100%", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: T.textDim, marginBottom: 3 }}>INITIATES</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.blue }}>Send $120</div>
              <div style={{ fontSize: 9, color: T.textDim }}>to Sarah Chen</div>
            </div>
            <div style={{ fontSize: 9, color: T.textDim, textAlign: "center", lineHeight: 1.5, marginTop: 2 }}>
              Bank debited<br />$120.00
            </div>
          </div>

          {/* Arrow in */}
          <div style={{ display: "flex", alignItems: "center", paddingTop: 52, flexShrink: 0 }}>
            <Arrow label="Payment intent" wide />
          </div>

          {/* CENTER: CUSTODI */}
          <div style={{ flex: "0 0 auto", width: 560 }}>
            <GroupBox label="Custodi Agent Stack" color={T.gold} border={T.goldBorder} bg="rgba(251,243,219,0.25)" note="— Local-first · Non-custodial">

              {/* Row 1: Orchestrator */}
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 8, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TIER 0 — ENTRY</div>
                <AgentBox id="orchestrator" {...AGENT_DATA.orchestrator} selected={selected} onClick={select} />
              </div>

              <DownArrow />

              {/* Row 2: Billing */}
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 8, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TIER 1 — MONETIZATION GATE</div>
                <div style={{ display: "flex", gap: 6, alignItems: "stretch" }}>
                  <AgentBox id="billing" {...AGENT_DATA.billing} selected={selected} onClick={select} />
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 4 }}>
                    {[{label:"ALLOW",c:T.green},{label:"WARN",c:T.amber},{label:"UPGRADE",c:T.blue},{label:"BLOCK",c:T.red}].map(b => (
                      <div key={b.label} style={{ fontSize: 7, fontWeight: 700, letterSpacing: 0.8, color: b.c, border: `1px solid ${b.c}66`, borderRadius: 3, padding: "2px 6px", textAlign: "center", background: `${b.c}11` }}>{b.label}</div>
                    ))}
                  </div>
                </div>
              </div>

              <DownArrow />

              {/* Row 3: Safety Layer */}
              <GroupBox label="TIER 2 — SAFETY & COMPLIANCE LAYER" color={T.green} border={T.greenBorder} bg="rgba(240,253,244,0.5)">
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <AgentBox id="identity" {...AGENT_DATA.identity} selected={selected} onClick={select} />
                  <AgentBox id="safety" {...AGENT_DATA.safety} selected={selected} onClick={select} />
                  <AgentBox id="risk" {...AGENT_DATA.risk} selected={selected} onClick={select} />
                </div>
                {/* Safety verdicts */}
                <div style={{ display: "flex", gap: 5 }}>
                  {[
                    { label: "GREEN — Proceed", color: T.green, bg: T.greenBg, border: T.greenBorder },
                    { label: "AMBER — Cooling-off", color: T.amber, bg: T.amberBg, border: T.amberBorder },
                    { label: "RED — Hard block", color: T.red, bg: T.redBg, border: T.redBorder },
                  ].map(v => (
                    <div key={v.label} style={{ flex: 1, background: v.bg, border: `1px solid ${v.border}`, borderRadius: 4, padding: "4px 6px", textAlign: "center" }}>
                      <div style={{ fontSize: 8, fontWeight: 700, color: v.color }}>{v.label}</div>
                    </div>
                  ))}
                </div>
              </GroupBox>

              <DownArrow />

              {/* Row 4: Execution */}
              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 8, color: T.blue, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TIER 3 — EXECUTION</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <AgentBox id="transaction" {...AGENT_DATA.transaction} selected={selected} onClick={select} />
                  <AgentBox id="wallet" {...AGENT_DATA.wallet} selected={selected} onClick={select} />
                </div>
              </div>

              {/* Async divider */}
              <div style={{ borderTop: `1.5px dashed ${T.border}`, margin: "8px 0 6px", position: "relative" }}>
                <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: T.bg, padding: "0 8px", fontSize: 8, color: T.textDim, fontStyle: "italic", letterSpacing: 1 }}>async</span>
              </div>

              {/* Row 5: Output */}
              <div>
                <div style={{ fontSize: 8, color: T.purple, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TIER 4 — ASYNC OUTPUT</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <AgentBox id="notification" {...AGENT_DATA.notification} selected={selected} onClick={select} />
                  <AgentBox id="ledger" {...AGENT_DATA.ledger} selected={selected} onClick={select} />
                </div>
              </div>
            </GroupBox>
          </div>

          {/* Arrow out */}
          <div style={{ display: "flex", alignItems: "center", paddingTop: 52, flexShrink: 0 }}>
            <Arrow label="Cleared payment" wide color={T.green} />
          </div>

          {/* RIGHT: RECEIVER */}
          <div style={{ flexShrink: 0, width: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textMid, letterSpacing: 1, marginBottom: 2 }}>RECEIVER</div>
            <PersonIcon color={T.green} check />
            <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>Sarah Chen</div>
            <div style={{ fontSize: 9, color: T.textDim, textAlign: "center" }}>Trusted contact</div>
            <div style={{ background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 6, padding: "7px 10px", width: "100%", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: T.textDim, marginBottom: 3 }}>RECEIVES</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>$120.00</div>
              <div style={{ fontSize: 9, color: T.textDim }}>Fiat · Stripe</div>
            </div>
            <div style={{ fontSize: 9, color: T.textDim, textAlign: "center", lineHeight: 1.5, marginTop: 2 }}>
              Bank credited<br />$120.00
            </div>
          </div>
        </div>
      </div>

      {/* ── EXPANDABLE DETAIL PANEL ── */}
      {selected && <DetailPanel id={selected} onClose={() => setSelected(null)} />}

      {/* ── RAILS ROW ── */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.textMid, letterSpacing: 1, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />
          PAYMENT RAILS — ROUTED BY TRANSACTION + WALLET AGENTS
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "Fiat Rail", badge: "All tiers", color: T.blue, bg: T.blueBg, border: T.blueBorder, nodes: ["Sender's bank", "Plaid + Stripe", "Card network / ACH", "Receiver's bank"] },
            { label: "Crypto Rail", badge: "Pro + Business", color: T.gold, bg: T.goldBg, border: T.goldBorder, nodes: ["Coinbase CDP", "Gas estimate + dry-run", "OnchainKit sign", "Base L2 Network", "Receiver wallet"] },
            { label: "USDC Wallet", badge: "Pro + Business", color: T.teal, bg: T.tealBg, border: T.tealBorder, nodes: ["Fiat → USDC on-ramp", "Stronghold vault (local key)", "P2P USDC send", "Base L2 Network", "Any Base L2 wallet"] },
          ].map(rail => (
            <div key={rail.label} style={{ flex: "1 1 220px", background: rail.bg, border: `1.5px solid ${rail.border}`, borderRadius: 8, padding: "13px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: rail.color }}>{rail.label}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: rail.color, border: `1px solid ${rail.border}`, borderRadius: 3, padding: "1px 6px" }}>{rail.badge}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
                {rail.nodes.map((node, i) => (
                  <div key={node} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ background: T.bg, border: `1px solid ${rail.border}66`, borderRadius: 4, padding: "4px 8px", fontSize: 9, color: rail.color, fontWeight: 500, whiteSpace: "nowrap" }}>{node}</div>
                    {i < rail.nodes.length - 1 && (
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M0 4h10M7 1l3 3-3 3" stroke={rail.border} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SAFETY AGENT CALLOUT ── */}
      <div style={{ marginTop: 24, background: T.greenBg, border: `1.5px solid ${T.greenBorder}`, borderRadius: 8, padding: "14px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.green, letterSpacing: 1, marginBottom: 8 }}>PERSONAL SAFETY AGENT — THE CORE DIFFERENTIATOR</div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { label: "Behavioral baseline", desc: "14-day rolling model of how you normally transact — amounts, times, recipients" },
            { label: "Trust graph", desc: "Individual recipient trust scores based on prior payment history and frequency" },
            { label: "Social engineering detection", desc: "Flags unusual patterns consistent with scam scenarios — urgency, first contact, large amounts" },
            { label: "Mandatory cooling-off", desc: "Enforced pause on all flagged, crypto, and USDC transactions — irreversibility protection" },
            { label: "Team trust graph (Business)", desc: "Org-wide recipient network — approved vendors and teammates pre-cleared, new payees flagged" },
          ].map(item => (
            <div key={item.label} style={{ flex: "1 1 160px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: T.green, marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 9, color: T.textMid, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOCAL INFRASTRUCTURE ── */}
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.textMid, letterSpacing: 1, marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: T.border }} />
          LOCAL INFRASTRUCTURE (ON-DEVICE — NO CENTRAL SERVER FOR SENSITIVE DATA)
          <div style={{ flex: 1, height: 1, background: T.border }} />
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "Tauri (Rust + WebView)", color: T.gold, items: ["Secure IPC bridge", "Native biometrics (Touch ID / Windows Hello)", "Stronghold encrypted vault (USDC keys)"] },
            { label: "SQLite (local)", color: T.green, items: ["Behavioral Profile DB", "Trust Graph", "Audit Log", "Entitlement Store"] },
            { label: "LangGraph (Python sidecar)", color: T.amber, items: ["Agent graph orchestration", "State management", "Routing logic"] },
            { label: "scikit-learn (on-device ML)", color: T.purple, items: ["Anomaly detection (isolation forest)", "Amount pattern matching", "14-day rolling baseline"] },
          ].map(infra => (
            <div key={infra.label} style={{ flex: "1 1 180px", background: T.bgAlt, border: `1px solid ${T.border}`, borderLeft: `3px solid ${infra.color}`, borderRadius: 6, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: infra.color, marginBottom: 6 }}>{infra.label}</div>
              {infra.items.map(item => <div key={item} style={{ fontSize: 9, color: T.textMid, marginBottom: 3 }}>· {item}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 28, paddingTop: 12, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 9, color: T.textDim }}>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>Custodi · custodi.tech · "Your finances, guarded."</span>
        <span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>Free · $20/mo Pro · $50/seat Business · LangGraph · Tauri · Stripe · Plaid · Coinbase CDP · Circle USDC</span>
      </div>
    </div>
  );
}

function PersonIcon({ color, check }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect width="52" height="52" rx="10" fill={color + "18"} stroke={color + "55"} strokeWidth="1.5" />
      <circle cx="26" cy="19" r="8" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M10 44c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {check && (
        <circle cx="38" cy="12" r="7" fill={color + "22"} stroke={color} strokeWidth="1.5" />
      )}
      {check && (
        <path d="M34 12l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
