import { useState } from "react";

const C = {
  bg: "#141414", panel: "#1E1E1E", panelLight: "#252525",
  border: "#2E2E2E", borderLight: "#3A3A3A",
  gold: "#C9A84C", goldGlow: "rgba(201,168,76,0.25)", goldDim: "rgba(201,168,76,0.10)", goldBorder: "rgba(201,168,76,0.35)",
  green: "#2DD4A0", greenGlow: "rgba(45,212,160,0.2)", greenDim: "rgba(45,212,160,0.10)", greenBorder: "rgba(45,212,160,0.35)",
  amber: "#D4912D", amberDim: "rgba(212,145,45,0.10)", amberBorder: "rgba(212,145,45,0.35)",
  red: "#D94F4F", redDim: "rgba(217,79,79,0.10)", redBorder: "rgba(217,79,79,0.35)",
  blue: "#4A90D9", blueDim: "rgba(74,144,217,0.10)", blueBorder: "rgba(74,144,217,0.35)",
  teal: "#00C2D4", tealGlow: "rgba(0,194,212,0.25)", tealDim: "rgba(0,194,212,0.10)", tealBorder: "rgba(0,194,212,0.35)",
  purple: "#9B6DFF", purpleDim: "rgba(155,109,255,0.10)", purpleBorder: "rgba(155,109,255,0.35)",
  text: "#D8D8D8", textMid: "#9A9A9A", textDim: "#555", white: "#F4F4F4",
};

const AGENTS = [
  { id: "orchestrator", label: "Orchestrator", sub: "Routing Logic", color: C.gold, icon: "⬡", tier: "Entry" },
  { id: "billing", label: "Billing & Entitlements", sub: "Plan Gate", color: C.gold, icon: "◈", tier: "Gate" },
  { id: "identity", label: "Identity & Auth", sub: "KYC · WebAuthn", color: C.blue, icon: "◉", tier: "Safety" },
  { id: "safety", label: "Personal Safety", sub: "Behavioral Guard", color: C.green, icon: "◎", tier: "Safety" },
  { id: "risk", label: "Risk & Compliance", sub: "AML · Velocity", color: C.red, icon: "◆", tier: "Safety" },
  { id: "transaction", label: "Transaction", sub: "Fiat · Crypto · USDC", color: C.blue, icon: "◇", tier: "Execution" },
  { id: "wallet", label: "Wallet Agent", sub: "USDC · Base L2", color: C.teal, icon: "◑", tier: "Execution" },
  { id: "notification", label: "Notification", sub: "Async · Fire & Forget", color: C.purple, icon: "◑", tier: "Output" },
  { id: "ledger", label: "Ledger & Reconciliation", sub: "Audit · Source of Truth", color: C.purple, icon: "▣", tier: "Output" },
];

const RAILS = [
  { id: "fiat", label: "Fiat Rail", sub: "Stripe · Plaid", color: C.blue, icon: "◇" },
  { id: "crypto", label: "Crypto Rail", sub: "Coinbase CDP · Base L2", color: C.gold, icon: "Ξ" },
  { id: "usdc", label: "USDC Wallet", sub: "Circle · Base L2", color: C.teal, icon: "₮" },
];

const SAFETY_TIERS = [
  { label: "GREEN", sub: "All signals pass → Proceed", color: C.green },
  { label: "AMBER", sub: "Flags detected → Cooling-off", color: C.amber },
  { label: "RED", sub: "Hard block → Incident logged", color: C.red },
];

export default function CustodiDiagram() {
  const [activeAgent, setActiveAgent] = useState(null);
  const [activeView, setActiveView] = useState("flow"); // flow | agents | rails

  const agent = AGENTS.find(a => a.id === activeAgent);

  const AGENT_DETAILS = {
    orchestrator: { desc: "Central coordinator. Receives user intent, manages session state, embeds routing logic to determine rail (fiat / crypto / USDC) and agent sequencing. Every request starts here.", apis: [], stores: ["Session State (in-memory)"] },
    billing: { desc: "Pre-checks every action against the user's subscription tier. Outputs ALLOW / WARN / UPGRADE PROMPT / HARD BLOCK before any work is done.", apis: ["Stripe Billing API", "Stripe Webhooks"], stores: ["Entitlement Store (SQLite)", "Usage Meter"] },
    identity: { desc: "Handles KYC verification and session token scoping. Stateless and sandboxed — never exposes raw credentials to other agents.", apis: ["FIDO2 / WebAuthn", "SSO (Business)"], stores: ["Auth Token (ephemeral)"] },
    safety: { desc: "Personal guardian agent. Models behavioral baselines, maintains trust graph, detects social engineering, enforces cooling-off timers. THE core differentiator.", apis: [], stores: ["Behavioral Profile DB", "Trust Graph", "Incident Log"] },
    risk: { desc: "Universal rule-based screening — AML thresholds, velocity checks, fraud patterns, wallet address screening. Feeds signals INTO the Personal Safety Agent.", apis: [], stores: ["Compliance Rules DB"] },
    transaction: { desc: "Executes payment logic across three rails. Fiat via Stripe/Plaid. Crypto via Coinbase CDP + OnchainKit. USDC via Wallet Agent delegation. Idempotent by design.", apis: ["Stripe API", "Plaid API", "Coinbase CDP", "OnchainKit / Base L2"], stores: [] },
    wallet: { desc: "Non-custodial USDC wallet on Base L2. Keys generated locally, stored in Tauri Stronghold vault. Handles deposits, withdrawals, P2P sends/receives. User is always sole keyholder.", apis: ["Coinbase CDP", "Base L2 Network", "Circle USDC"], stores: ["Wallet Key (Stronghold Vault)", "USDC Balance Cache"] },
    notification: { desc: "Async fire-and-forget. Confirmations, receipts, usage warnings, upgrade prompts, on-chain settlement polling. A notification failure never rolls back a valid transaction.", apis: ["Email / SMS / Push", "Approver Alerts (Business)"], stores: [] },
    ledger: { desc: "Source of truth for all agent actions and transaction states. Logs Coinbase TX ID + on-chain hash. Tracks USDC events. Feeds usage metrics to Billing Agent in real time.", apis: ["CSV / PDF Export (Business)"], stores: ["SQLite Audit Log (local)", "Compliance Report Engine"] },
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Mono','Courier New',monospace", color: C.text, padding: "32px 24px", boxSizing: "border-box" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;} body{background:#141414;}
        .agent-box{cursor:pointer;transition:all 0.18s ease;} .agent-box:hover{transform:translateY(-2px);filter:brightness(1.1);}
        .tab-btn{cursor:pointer;transition:all 0.15s;border:none;font-family:'DM Mono',monospace;}
        @keyframes flowPulse{0%{opacity:0.3;transform:scaleX(0.97);}50%{opacity:1;transform:scaleX(1);}100%{opacity:0.3;transform:scaleX(0.97);}}
        @keyframes dotMove{0%{transform:translateX(0);}100%{transform:translateX(120px);}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:none;}}
        @keyframes glow{0%,100%{opacity:0.6;}50%{opacity:1;}}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#333;border-radius:2px;}
        .rail-line{animation:flowPulse 2.4s ease-in-out infinite;}
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div style={{ position: "relative", width: 40, height: 40, flexShrink: 0 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <polygon points="20,2 35,10 35,30 20,38 5,30 5,10" stroke={C.gold} strokeWidth="1.5" fill={C.goldDim} />
              <text x="20" y="25" textAnchor="middle" fill={C.gold} fontSize="14" fontFamily="'Cormorant Garamond','Georgia',serif" fontWeight="700">C</text>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 4, color: C.textDim, marginBottom: 3 }}>CUSTODI · SYSTEM ARCHITECTURE</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: "clamp(20px,3vw,36px)", fontWeight: 700, color: C.white, letterSpacing: -0.5 }}>
              How Custodi Works
            </h1>
          </div>
        </div>
        <p style={{ fontSize: 11, color: C.textMid, maxWidth: 600, lineHeight: 1.7 }}>
          A multi-agent orchestration platform that intercepts every payment, runs it through a personal safety layer, and routes it across fiat, crypto, and USDC rails.
        </p>
      </div>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {[{ id: "flow", label: "Flow Diagram" }, { id: "agents", label: "Agent Stack" }, { id: "rails", label: "Payment Rails" }].map(t => (
          <button key={t.id} className="tab-btn" onClick={() => setActiveView(t.id)} style={{ padding: "7px 16px", borderRadius: 5, fontSize: 10, letterSpacing: 2, background: activeView === t.id ? C.gold : C.panel, color: activeView === t.id ? C.bg : C.textDim, border: `1px solid ${activeView === t.id ? C.gold : C.border}` }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── FLOW DIAGRAM ── */}
      {activeView === "flow" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          {/* Main flow row */}
          <div style={{ display: "flex", alignItems: "stretch", gap: 0, marginBottom: 24, overflowX: "auto", paddingBottom: 8 }}>

            {/* SENDER */}
            <div style={{ flexShrink: 0, width: 130, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 4 }}>SENDER</div>
              <div style={{ width: 64, height: 64, borderRadius: 14, background: C.blueDim, border: `1px solid ${C.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="10" r="6" stroke={C.blue} strokeWidth="1.5" fill="none" />
                  <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke={C.blue} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <rect x="10" y="5" width="4" height="3" rx="1" fill={C.blue} opacity="0.5" />
                </svg>
              </div>
              <div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1.4 }}>James<br /><span style={{ fontSize: 9, color: C.textDim }}>Custodi Pro user</span></div>
              <div style={{ background: C.blueDim, border: `1px solid ${C.blueBorder}`, borderRadius: 7, padding: "8px 10px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.textDim, marginBottom: 3 }}>INITIATES</div>
                <div style={{ fontSize: 10, color: C.blue }}>Send $120</div>
                <div style={{ fontSize: 8, color: C.textDim }}>to Sarah Chen</div>
              </div>
            </div>

            {/* Arrow 1 */}
            <FlowArrow label="Payment intent" color={C.gold} />

            {/* CUSTODI AGENT STACK */}
            <div style={{ flexShrink: 0, flex: "0 0 auto", width: 520, background: C.panel, border: `1px solid ${C.goldBorder}`, borderRadius: 14, padding: "18px 16px", boxShadow: `0 0 40px ${C.goldGlow}`, position: "relative" }}>
              <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" stroke={C.gold} strokeWidth="1.2" fill={C.bg} />
                  <text x="10" y="13" textAnchor="middle" fill={C.gold} fontSize="7" fontFamily="'Cormorant Garamond',serif" fontWeight="700">C</text>
                </svg>
                <div style={{ background: C.bg, border: `1px solid ${C.goldBorder}`, borderRadius: 4, padding: "3px 12px", fontSize: 9, letterSpacing: 3, color: C.gold }}>CUSTODI AGENT STACK</div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5" stroke={C.gold} strokeWidth="1.2" fill={C.bg} />
                  <text x="10" y="13" textAnchor="middle" fill={C.gold} fontSize="7" fontFamily="'Cormorant Garamond',serif" fontWeight="700">C</text>
                </svg>
              </div>

              {/* Tier rows */}
              <AgentTierRow label="ENTRY" color={C.gold} agents={[{ id: "orchestrator", label: "Orchestrator", sub: "Routing Logic", color: C.gold, icon: "⬡" }]} active={activeAgent} onClick={setActiveAgent} wide />

              <TierArrow />

              <AgentTierRow label="GATE" color={C.gold} agents={[{ id: "billing", label: "Billing & Entitlements", sub: "Plan Gate", color: C.gold, icon: "◈" }]} active={activeAgent} onClick={setActiveAgent} wide />

              <TierArrow />

              <AgentTierRow label="SAFETY LAYER" color={C.green} agents={[
                { id: "identity", label: "Identity & Auth", sub: "KYC · WebAuthn", color: C.blue, icon: "◉" },
                { id: "safety", label: "Personal Safety", sub: "Behavioral Guard", color: C.green, icon: "◎" },
                { id: "risk", label: "Risk & Compliance", sub: "AML · Velocity", color: C.red, icon: "◆" },
              ]} active={activeAgent} onClick={setActiveAgent} />

              {/* Safety verdict */}
              <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "8px 0" }}>
                {SAFETY_TIERS.map(s => (
                  <div key={s.label} style={{ flex: 1, background: `${s.color}12`, border: `1px solid ${s.color}44`, borderRadius: 5, padding: "5px 6px", textAlign: "center" }}>
                    <div style={{ fontSize: 8, letterSpacing: 1, color: s.color }}>{s.label}</div>
                    <div style={{ fontSize: 7, color: C.textDim, marginTop: 2, lineHeight: 1.4 }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <TierArrow />

              <AgentTierRow label="EXECUTION" color={C.blue} agents={[
                { id: "transaction", label: "Transaction", sub: "Fiat · Crypto · USDC", color: C.blue, icon: "◇" },
                { id: "wallet", label: "Wallet Agent", sub: "USDC · Base L2", color: C.teal, icon: "◑" },
              ]} active={activeAgent} onClick={setActiveAgent} />

              <div style={{ margin: "6px 0", borderTop: `1px dashed ${C.border}`, position: "relative" }}>
                <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: C.panel, fontSize: 8, color: C.textDim, padding: "0 8px", letterSpacing: 2 }}>ASYNC</span>
              </div>

              <AgentTierRow label="OUTPUT" color={C.purple} agents={[
                { id: "notification", label: "Notification", sub: "Confirmations", color: C.purple, icon: "◑" },
                { id: "ledger", label: "Ledger", sub: "Audit · Source of Truth", color: C.purple, icon: "▣" },
              ]} active={activeAgent} onClick={setActiveAgent} />

              {/* Click hint */}
              <div style={{ textAlign: "center", marginTop: 10, fontSize: 8, color: C.textDim, letterSpacing: 1 }}>↑ CLICK ANY AGENT TO INSPECT</div>
            </div>

            {/* Arrow 2 */}
            <FlowArrow label="Cleared payment" color={C.green} />

            {/* RECEIVER */}
            <div style={{ flexShrink: 0, width: 130, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 4 }}>RECEIVER</div>
              <div style={{ width: 64, height: 64, borderRadius: 14, background: C.greenDim, border: `1px solid ${C.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="10" r="6" stroke={C.green} strokeWidth="1.5" fill="none" />
                  <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke={C.green} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <circle cx="22" cy="6" r="4" fill={C.greenDim} stroke={C.green} strokeWidth="1" />
                  <path d="M20 6l1.5 1.5L24 4" stroke={C.green} strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ fontSize: 11, color: C.white, textAlign: "center", lineHeight: 1.4 }}>Sarah Chen<br /><span style={{ fontSize: 9, color: C.textDim }}>Trusted contact</span></div>
              <div style={{ background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: 7, padding: "8px 10px", width: "100%", textAlign: "center" }}>
                <div style={{ fontSize: 9, color: C.textDim, marginBottom: 3 }}>RECEIVES</div>
                <div style={{ fontSize: 10, color: C.green }}>$120.00</div>
                <div style={{ fontSize: 8, color: C.textDim }}>Fiat · Stripe</div>
              </div>
            </div>
          </div>

          {/* Rails row */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />PAYMENT RAILS — ROUTED BY TRANSACTION + WALLET AGENT<div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "FIAT RAIL", sub: "All tiers", color: C.blue, left: "Sender's Bank", right: "Receiver's Bank", via: ["Plaid (link)", "Stripe (process)", "ACH / card network"] },
                { label: "CRYPTO RAIL", sub: "Pro + Business", color: C.gold, left: "Sender's Wallet", right: "Receiver's Wallet", via: ["Coinbase CDP", "OnchainKit", "Base L2 Network"] },
                { label: "USDC WALLET", sub: "Pro + Business", color: C.teal, left: "Custodi Wallet", right: "Any Base L2 Wallet", via: ["Circle USDC", "Base L2 Network", "On/off-ramp (Coinbase)"] },
              ].map(rail => (
                <div key={rail.label} style={{ flex: "1 1 200px", background: C.panel, border: `1px solid ${rail.color}44`, borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: 2, color: rail.color }}>{rail.label}</div>
                      <div style={{ fontSize: 8, color: C.textDim }}>{rail.sub}</div>
                    </div>
                  </div>
                  {/* Mini flow */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                    <div style={{ fontSize: 9, color: C.textMid, background: C.bg, borderRadius: 4, padding: "3px 7px", border: `1px solid ${C.border}` }}>{rail.left}</div>
                    <div style={{ flex: 1, height: 1, background: rail.color, opacity: 0.4, animation: "flowPulse 2s ease-in-out infinite" }} />
                    <div style={{ fontSize: 9, color: rail.color }}>→</div>
                    <div style={{ flex: 1, height: 1, background: rail.color, opacity: 0.4, animation: "flowPulse 2s ease-in-out infinite 0.3s" }} />
                    <div style={{ fontSize: 9, color: C.textMid, background: C.bg, borderRadius: 4, padding: "3px 7px", border: `1px solid ${C.border}` }}>{rail.right}</div>
                  </div>
                  {rail.via.map(v => <div key={v} style={{ fontSize: 9, color: C.textDim, padding: "3px 0", borderBottom: `1px solid ${C.border}` }}>→ {v}</div>)}
                </div>
              ))}
            </div>
          </div>

          {/* External infrastructure */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />LOCAL INFRASTRUCTURE (ON-DEVICE)<div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "Tauri Shell", sub: "Rust + WebView", icon: "◈", color: C.gold, items: ["Secure IPC bridge", "Native biometrics", "Stronghold vault"] },
                { label: "SQLite", sub: "Local-first data", icon: "▣", color: C.green, items: ["Behavioral Profile DB", "Trust Graph", "Audit Log", "Entitlement Store"] },
                { label: "LangGraph", sub: "Agent orchestration", icon: "◎", color: C.amber, items: ["Agent graph state", "Routing logic", "Message passing"] },
                { label: "scikit-learn", sub: "Behavioral ML (on-device)", icon: "◉", color: C.purple, items: ["Anomaly detection", "Pattern matching", "14-day rolling baseline"] },
              ].map(infra => (
                <div key={infra.label} style={{ flex: "1 1 150px", background: C.panel, border: `1px solid ${C.border}`, borderLeft: `3px solid ${infra.color}`, borderRadius: 8, padding: "11px 13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
                    <span style={{ fontSize: 14, color: infra.color }}>{infra.icon}</span>
                    <div>
                      <div style={{ fontSize: 10, color: C.white }}>{infra.label}</div>
                      <div style={{ fontSize: 8, color: infra.color }}>{infra.sub}</div>
                    </div>
                  </div>
                  {infra.items.map(item => <div key={item} style={{ fontSize: 9, color: C.textDim, marginBottom: 3 }}>· {item}</div>)}
                </div>
              ))}
            </div>
          </div>

          {/* Agent detail panel */}
          {agent && (
            <div style={{ marginTop: 20, background: C.panel, border: `1px solid ${agent.color}55`, borderRadius: 12, padding: "18px 20px", animation: "fadeIn 0.25s ease", boxShadow: `0 0 30px ${agent.color}18` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 20, color: agent.color }}>{agent.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.white }}>{agent.label}</div>
                  <div style={{ fontSize: 9, color: agent.color, letterSpacing: 2 }}>{agent.tier.toUpperCase()} TIER</div>
                </div>
                <button onClick={() => setActiveAgent(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: C.textDim, fontSize: 14, cursor: "pointer", padding: 4 }}>✕</button>
              </div>
              <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.8, marginBottom: 14 }}>{AGENT_DETAILS[agent.id]?.desc}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                {AGENT_DETAILS[agent.id]?.apis?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: C.textDim, marginBottom: 7 }}>EXTERNAL APIS</div>
                    {AGENT_DETAILS[agent.id].apis.map(a => <div key={a} style={{ fontSize: 10, color: agent.color, marginBottom: 4 }}>↗ {a}</div>)}
                  </div>
                )}
                {AGENT_DETAILS[agent.id]?.stores?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: C.textDim, marginBottom: 7 }}>DATA STORES</div>
                    {AGENT_DETAILS[agent.id].stores.map(s => <div key={s} style={{ fontSize: 10, color: C.textMid, marginBottom: 4 }}>▪ {s}</div>)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── AGENTS VIEW ── */}
      {activeView === "agents" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 760 }}>
            {[
              { tier: "TIER 0 — ENTRY POINT", color: C.gold, ids: ["orchestrator"] },
              { tier: "TIER 1 — MONETIZATION GATE", color: C.gold, ids: ["billing"] },
              { tier: "TIER 2 — SAFETY & COMPLIANCE", color: C.green, ids: ["identity", "safety", "risk"] },
              { tier: "TIER 3 — EXECUTION", color: C.blue, ids: ["transaction", "wallet"] },
              { tier: "TIER 4 — ASYNC OUTPUT", color: C.purple, ids: ["notification", "ledger"] },
            ].map(tier => (
              <div key={tier.tier}>
                <div style={{ fontSize: 8, letterSpacing: 3, color: tier.color, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 16, height: 1, background: tier.color }} />{tier.tier}<div style={{ flex: 1, height: 1, background: C.border }} />
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {tier.ids.map(id => {
                    const ag = AGENTS.find(a => a.id === id);
                    const det = AGENT_DETAILS[id];
                    return (
                      <div key={id} style={{ flex: "1 1 220px", background: C.panel, border: `1px solid ${ag.color}44`, borderLeft: `3px solid ${ag.color}`, borderRadius: 8, padding: "13px 15px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <span style={{ fontSize: 16, color: ag.color }}>{ag.icon}</span>
                          <div>
                            <div style={{ fontSize: 11, color: C.white }}>{ag.label}</div>
                            <div style={{ fontSize: 8, color: ag.color, letterSpacing: 1 }}>{ag.sub}</div>
                          </div>
                        </div>
                        <p style={{ fontSize: 10, color: C.textDim, lineHeight: 1.7, marginBottom: det.apis.length || det.stores.length ? 10 : 0 }}>{det.desc}</p>
                        {det.apis.length > 0 && <div style={{ marginBottom: 4 }}>{det.apis.map(a => <span key={a} style={{ display: "inline-block", marginRight: 4, marginTop: 3, fontSize: 8, color: ag.color, background: `${ag.color}14`, border: `1px solid ${ag.color}33`, borderRadius: 3, padding: "2px 5px" }}>↗ {a}</span>)}</div>}
                        {det.stores.length > 0 && <div>{det.stores.map(s => <span key={s} style={{ display: "inline-block", marginRight: 4, marginTop: 3, fontSize: 8, color: C.textDim, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 3, padding: "2px 5px" }}>▪ {s}</span>)}</div>}
                      </div>
                    );
                  })}
                </div>
                <div style={{ textAlign: "center", margin: "6px 0", color: C.textDim, fontSize: 11 }}>↓</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RAILS VIEW ── */}
      {activeView === "rails" && (
        <div style={{ animation: "fadeIn 0.3s ease" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "FIAT RAIL", badge: "ALL TIERS", color: C.blue, desc: "Standard card and bank transfers. Stripe handles card processing; Plaid handles bank account linking. The most familiar rail for most users.", flow: ["User initiates send", "Transaction Agent calls Stripe/Plaid", "Bank debit processed", "Bank credit to receiver", "Ledger logs confirmation"], apis: ["Stripe API (processing)", "Plaid API (bank linking)", "ACH / card network"] },
              { label: "CRYPTO RAIL", badge: "PRO + BUSINESS", color: C.gold, desc: "On-chain transactions via Coinbase CDP and OnchainKit on Base L2. Gas estimation, dry-run simulation, and signing before submission. Mandatory cooling-off on all crypto sends.", flow: ["User initiates send", "Safety Agent: mandatory cooling-off", "Transaction Agent: gas estimate + dry-run", "User confirms", "OnchainKit signs + submits to Base L2", "Ledger logs TX ID + on-chain hash"], apis: ["Coinbase CDP", "OnchainKit", "Base L2 Network"] },
              { label: "USDC WALLET RAIL", badge: "PRO + BUSINESS", color: C.teal, desc: "Non-custodial USDC on Base L2. Keys live in Tauri Stronghold vault on the user's device. Deposit via Coinbase on-ramp, withdraw via off-ramp. P2P sends to any Base L2 address.", flow: ["User deposits fiat → USDC (Coinbase on-ramp)", "USDC held in local wallet (Stronghold key)", "User initiates P2P USDC send", "Safety Agent: trust graph + cooling-off", "Wallet Agent signs + submits to Base L2", "Ledger logs USDC event + on-chain hash"], apis: ["Circle USDC", "Coinbase CDP (on/off-ramp)", "Base L2 Network"] },
            ].map(rail => (
              <div key={rail.label} style={{ background: C.panel, border: `1px solid ${rail.color}44`, borderRadius: 12, padding: "20px 22px", boxShadow: `inset 0 0 30px ${rail.color}08` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: rail.color }}>{rail.label}</div>
                  <div style={{ fontSize: 8, letterSpacing: 2, color: C.bg, background: rail.color, borderRadius: 3, padding: "2px 7px" }}>{rail.badge}</div>
                </div>
                <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.75, marginBottom: 16, maxWidth: 600 }}>{rail.desc}</p>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: "1 1 260px" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: C.textDim, marginBottom: 10 }}>TRANSACTION FLOW</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                      {rail.flow.map((step, i) => (
                        <div key={step} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", background: `${rail.color}18`, border: `1px solid ${rail.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: rail.color, flexShrink: 0 }}>{i + 1}</div>
                            {i < rail.flow.length - 1 && <div style={{ width: 1, height: 14, background: rail.color, opacity: 0.2, margin: "2px 0" }} />}
                          </div>
                          <div style={{ fontSize: 10, color: C.textMid, paddingBottom: 8, lineHeight: 1.5 }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ flex: "0 1 200px" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: C.textDim, marginBottom: 10 }}>EXTERNAL APIs</div>
                    {rail.apis.map(api => (
                      <div key={api} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 0", borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: rail.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 10, color: C.textMid }}>{api}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 36, paddingTop: 14, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 8, color: C.textDim, letterSpacing: 1 }}>
        <span>CUSTODI · custodi.tech · Your finances, guarded.</span>
        <span>LangGraph · Tauri · SQLite · Stripe · Plaid · Coinbase CDP · Circle USDC · Base L2</span>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────

function AgentBox({ id, label, sub, color, icon, active, onClick }) {
  const isSel = active === id;
  return (
    <div className="agent-box" onClick={() => onClick(isSel ? null : id)} style={{ flex: 1, minWidth: 100, background: isSel ? `${color}18` : "#1A1A1A", border: `1px solid ${isSel ? color : color + "33"}`, borderRadius: 7, padding: "9px 10px", boxShadow: isSel ? `0 0 16px ${color}33` : "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 13, color }}>{icon}</span>
        <div style={{ fontSize: 9, color: isSel ? color : C.text, lineHeight: 1.3 }}>{label}</div>
      </div>
      <div style={{ fontSize: 8, color: isSel ? color : C.textDim, letterSpacing: 0.5 }}>{sub}</div>
    </div>
  );
}

function AgentTierRow({ label, color, agents, active, onClick, wide }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 7, letterSpacing: 3, color, marginBottom: 6, opacity: 0.7 }}>{label}</div>
      <div style={{ display: "flex", gap: 7 }}>
        {agents.map(ag => <AgentBox key={ag.id} {...ag} active={active} onClick={onClick} />)}
      </div>
    </div>
  );
}

function TierArrow() {
  return <div style={{ textAlign: "center", margin: "3px 0", color: "#444", fontSize: 12 }}>↓</div>;
}

function FlowArrow({ label, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 8px", flexShrink: 0, gap: 4, minWidth: 70 }}>
      <div style={{ fontSize: 8, letterSpacing: 1, color: color, textAlign: "center", lineHeight: 1.4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
        <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${color}44, ${color})`, animation: "flowPulse 2s ease-in-out infinite" }} />
        <div style={{ fontSize: 14, color, lineHeight: 1 }}>›</div>
      </div>
    </div>
  );
}
