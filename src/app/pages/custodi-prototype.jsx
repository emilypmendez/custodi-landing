import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#1C1C1C", sidebar: "#161616", panel: "#242424", panelDeep: "#1A1A1A",
  border: "#333", borderLight: "#3E3E3E",
  gold: "#C9A84C", goldGlow: "rgba(201,168,76,0.2)", goldDim: "rgba(201,168,76,0.08)", goldBorder: "rgba(201,168,76,0.3)",
  green: "#2DD4A0", greenGlow: "rgba(45,212,160,0.18)", greenDim: "rgba(45,212,160,0.08)", greenBorder: "rgba(45,212,160,0.3)",
  amber: "#D4912D", amberGlow: "rgba(212,145,45,0.2)", amberDim: "rgba(212,145,45,0.08)", amberBorder: "rgba(212,145,45,0.35)",
  red: "#D94F4F", redGlow: "rgba(217,79,79,0.2)", redDim: "rgba(217,79,79,0.08)", redBorder: "rgba(217,79,79,0.35)",
  blue: "#4A90D9", blueDim: "rgba(74,144,217,0.08)", blueBorder: "rgba(74,144,217,0.3)",
  teal: "#00C2D4", tealGlow: "rgba(0,194,212,0.2)", tealDim: "rgba(0,194,212,0.08)", tealBorder: "rgba(0,194,212,0.3)",
  text: "#D8D8D8", textMid: "#9A9A9A", textDim: "#606060", white: "#F4F4F4",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#1C1C1C;font-family:'DM Mono','Courier New',monospace;}
  input::placeholder{color:#606060;} input:focus{outline:none;}
  button{font-family:'DM Mono',monospace;cursor:pointer;}
  button:not(:disabled):hover{filter:brightness(1.08);}
  ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#3E3E3E;border-radius:2px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:none;}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes stepIn{from{opacity:0;transform:translateX(10px);}to{opacity:1;transform:none;}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
  @keyframes ringExpand{from{transform:translate(-50%,-50%) scale(0.6);opacity:0;}to{transform:translate(-50%,-50%) scale(1);opacity:1;}}
  @keyframes pulseRing{0%{transform:scale(0.85);opacity:0.7;}100%{transform:scale(2);opacity:0;}}
  @keyframes breathe{0%,100%{transform:scale(1);}50%{transform:scale(0.88);}}
  @keyframes blink{0%,100%{opacity:1;}50%{opacity:0.3;}}
  @keyframes guardianBreathe{0%,100%{transform:scale(1);}50%{transform:scale(0.9);}}
  @keyframes guardianRing{0%{transform:translate(-50%,-50%) scale(1);opacity:0.5;}100%{transform:translate(-50%,-50%) scale(1.2);opacity:0;}}
  @keyframes tealPulse{0%,100%{box-shadow:0 0 0 0 rgba(0,194,212,0.4);}50%{box-shadow:0 0 0 8px rgba(0,194,212,0);}}
  .nav-item{transition:all 0.15s;} .nav-item:hover{background:rgba(201,168,76,0.06)!important;}
  .tx-row{transition:background 0.12s;} .tx-row:hover{background:#2A2A2A!important;}
  .card{transition:all 0.15s;} .card:hover{transform:translateY(-1px);}
`;

function LogoHex({ size = 76, fontSize = 28, borderRadius = 18, animate = false }) {
  return (
    <div style={{ width: size, height: size, borderRadius, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 40px ${C.goldGlow}`, animation: animate ? "float 4s ease-in-out infinite" : "none", position: "relative", flexShrink: 0 }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 48 48" fill="none">
        <polygon points="24,2 42,12 42,36 24,46 6,36 6,12" stroke={C.gold} strokeWidth="1.5" fill="none" opacity="0.6" />
        <text x="24" y="30" textAnchor="middle" fill={C.gold} fontSize="18" fontFamily="'Cormorant Garamond','Georgia',serif" fontWeight="700">C</text>
      </svg>
    </div>
  );
}

function LogoHexSmall({ size = 22, borderRadius = 6 }) {
  return (
    <div style={{ width: size, height: size, borderRadius, background: C.goldDim, border: `1px solid ${C.goldBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 24 24" fill="none">
        <polygon points="12,1 21,6 21,18 12,23 3,18 3,6" stroke={C.gold} strokeWidth="1.2" fill="none" opacity="0.7" />
        <text x="12" y="16" textAnchor="middle" fill={C.gold} fontSize="9" fontFamily="'Cormorant Garamond','Georgia',serif" fontWeight="700">C</text>
      </svg>
    </div>
  );
}

function Pulse({ color, size = 44, rings = 2, speed = "normal" }) {
  const dur = speed === "fast" ? 1.2 : speed === "slow" ? 3 : 2.2;
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {Array.from({ length: rings }).map((_, i) => (
        <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${color}`, opacity: 0, animation: `pulseRing ${dur}s ease-out ${i * 0.7}s infinite` }} />
      ))}
      <div style={{ width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}`, animation: `breathe ${dur}s ease-in-out infinite` }} />
    </div>
  );
}

function FInput({ label, placeholder, type = "text", value, onChange, prefix }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 9, letterSpacing: 2, color: C.textDim, marginBottom: 6 }}>{label}</div>}
      <div style={{ position: "relative" }}>
        {prefix && <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: C.textDim, fontFamily: "'Cormorant Garamond','Georgia',serif" }}>{prefix}</span>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: "100%", background: C.panelDeep, border: `1px solid ${focused ? C.gold : C.border}`, borderRadius: 7, padding: `11px 13px 11px ${prefix ? "26px" : "13px"}`, color: C.white, fontSize: 13, fontFamily: "'DM Mono',monospace", boxShadow: focused ? `0 0 0 3px ${C.goldDim}` : "none", transition: "border-color 0.15s, box-shadow 0.15s" }} />
      </div>
    </div>
  );
}

function PBtn({ label, onClick, disabled, color = C.gold, tc = C.bg, glow }) {
  return <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "13px 0", borderRadius: 8, background: disabled ? "#2A2A2A" : color, border: "none", color: disabled ? C.textDim : tc, fontSize: 10, letterSpacing: 2, fontWeight: 600, boxShadow: disabled ? "none" : `0 0 22px ${glow || C.goldGlow}`, transition: "all 0.18s", marginTop: 8 }}>{label}</button>;
}
function GBtn({ label, onClick }) {
  return <button onClick={onClick} style={{ width: "100%", padding: "11px 0", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, fontSize: 10, letterSpacing: 2, marginTop: 8 }}>{label}</button>;
}

// ── PROTO NAV ─────────────────────────────────────────────────────
function ProtoNav({ screen, setScreen }) {
  const screens = [
    { id: "onboarding", label: "Onboarding" },
    { id: "dashboard", label: "Dashboard" },
    { id: "wallet", label: "Wallet" },
    { id: "safety-green", label: "Safety · Green" },
    { id: "safety-amber", label: "Safety · Amber" },
    { id: "safety-red", label: "Safety · Red" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5, background: "rgba(20,20,20,0.96)", border: `1px solid ${C.borderLight}`, borderRadius: 40, padding: "8px 12px", zIndex: 9999, backdropFilter: "blur(12px)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", flexWrap: "wrap", justifyContent: "center" }}>
      <div style={{ fontSize: 8, letterSpacing: 2, color: C.textDim, display: "flex", alignItems: "center", paddingRight: 8, borderRight: `1px solid ${C.border}` }}>CUSTODI</div>
      {screens.map(s => (
        <button key={s.id} onClick={() => setScreen(s.id)} style={{ padding: "5px 11px", borderRadius: 20, fontSize: 9, letterSpacing: 1, background: screen === s.id ? C.teal : "transparent", border: `1px solid ${screen === s.id ? C.teal : "transparent"}`, color: screen === s.id ? C.bg : C.textDim, transition: "all 0.15s", fontFamily: "'DM Mono',monospace" }}>{s.label}</button>
      ))}
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────
const ACTIVATION_AGENTS = [
  { label: "Identity Agent", sub: "Securing session token", color: C.blue, icon: "◉" },
  { label: "Behavioral Profile", sub: "Initializing baseline model", color: C.gold, icon: "◈" },
  { label: "Trust Graph", sub: "Creating recipient network", color: C.gold, icon: "⬡" },
  { label: "Risk & Compliance", sub: "Loading screening rules", color: C.amber, icon: "◆" },
  { label: "Wallet Agent", sub: "Generating USDC wallet on Base L2", color: C.teal, icon: "◑" },
  { label: "Ledger Agent", sub: "Preparing audit log", color: C.green, icon: "▣" },
  { label: "Personal Safety Agent", sub: "Guardian online — all signals active", color: C.green, icon: "◎" },
];

function OShell({ left, step, children }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div style={{ width: "38%", minWidth: 240, background: C.panelDeep, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 30px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "none" }}>
          {[200, 300, 400].map((s, i) => <div key={s} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `1px solid ${C.gold}${["18","0E","07"][i]}`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />)}
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>{left}</div>
      </div>
      <div style={{ flex: 1, background: C.bg, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 44px", overflowY: "auto", position: "relative" }}>
          <div style={{ position: "absolute", top: 22, right: 28, display: "flex", alignItems: "center", gap: 8 }}>
          <LogoHexSmall size={22} borderRadius={6} />
          <span style={{ fontSize: 10, letterSpacing: 2, color: C.gold }}>CUSTODI</span>
        </div>
        <div style={{ maxWidth: 380, width: "100%", animation: "stepIn 0.3s ease" }}>{children}</div>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [pass, setPass] = useState("");
  const [cardMethod, setCardMethod] = useState(null); const [plan, setPlan] = useState("pro");
  const [biometric, setBiometric] = useState(false); const [cooldown, setCooldown] = useState(true);
  const [activStep, setActivStep] = useState(-1); const [activDone, setActivDone] = useState(false);

  useEffect(() => {
    if (step !== 5) return;
    setActivStep(-1); setActivDone(false);
    let i = 0;
    const go = () => { setActivStep(i); i++; if (i < ACTIVATION_AGENTS.length) setTimeout(go, 600); else setTimeout(() => setActivDone(true), 700); };
    setTimeout(go, 400);
  }, [step]);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  if (step === 0) return (
    <div style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "none" }}>
        {[480, 680, 880].map((s, i) => <div key={s} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `1px solid ${C.gold}${["14","0A","06"][i]}`, top: "50%", left: "50%", animation: `ringExpand 0.8s ease ${i * 0.2}s both`, transform: "translate(-50%,-50%)" }} />)}
      </div>
      <div style={{ marginBottom: 28, position: "relative", zIndex: 1 }}><LogoHex size={76} borderRadius={18} animate={true} /></div>
      <div style={{ textAlign: "center", maxWidth: 460, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, color: C.gold, marginBottom: 12 }}>WELCOME TO</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: "clamp(44px,6vw,72px)", fontWeight: 700, color: C.white, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>Custodi</h1>
        <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.gold, fontStyle: "italic", marginBottom: 20 }}>Your finances, guarded.</div>
        <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.85, marginBottom: 36 }}>Intelligent P2P payments, personal fraud protection, and a non-custodial USDC wallet — all guarded by your personal Safety Agent.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={next} style={{ padding: "13px 32px", borderRadius: 8, background: C.gold, border: "none", color: C.bg, fontSize: 10, letterSpacing: 2, fontWeight: 600, boxShadow: `0 0 24px ${C.goldGlow}` }}>GET STARTED →</button>
          <button style={{ padding: "13px 22px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, color: C.textMid, fontSize: 10, letterSpacing: 2 }}>SIGN IN</button>
        </div>
        <div style={{ marginTop: 20, fontSize: 9, color: C.textDim }}>custodi.tech · Free to start · No credit card required</div>
      </div>
    </div>
  );

  if (step === 1) return (
    <OShell step={step} left={<>
      <div style={{ fontSize: 44, color: C.blue, animation: "float 4s ease-in-out infinite", marginBottom: 18 }}>◉</div>
      <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.white, marginBottom: 10 }}>Your Identity</div>
      <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.8 }}>Custodi's Identity Agent handles authentication — sandboxed, scoped, never shared downstream.</p>
    </>}>
      <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 7 }}>STEP 1 OF 4</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 28, color: C.white, marginBottom: 5 }}>Create your account</h2>
      <p style={{ fontSize: 11, color: C.textMid, marginBottom: 22, lineHeight: 1.7 }}>Your guardian starts here.</p>
      <FInput label="FULL NAME" placeholder="James Donovan" value={name} onChange={setName} />
      <FInput label="EMAIL ADDRESS" placeholder="james@example.com" type="email" value={email} onChange={setEmail} />
      <FInput label="PASSWORD" placeholder="Min. 12 characters" type="password" value={pass} onChange={setPass} />
      <PBtn label="CREATE ACCOUNT →" onClick={next} disabled={!name || !email || !pass} />
      <GBtn label="← BACK" onClick={back} />
    </OShell>
  );

  if (step === 2) return (
    <OShell step={step} left={<>
      <div style={{ fontSize: 44, color: C.teal, animation: "float 4s ease-in-out infinite", marginBottom: 18 }}>◇</div>
      <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.white, marginBottom: 10 }}>Payment Rails</div>
      <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.8 }}>Custodi routes over fiat, crypto, and USDC wallet rails. Connect your card or bank to activate the fiat side.</p>
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 7 }}>
        {["Stripe / Plaid", "Coinbase CDP", "USDC on Base L2"].map(r => <div key={r} style={{ fontSize: 10, color: C.textDim, padding: "5px 10px", background: C.goldDim, border: `1px solid ${C.border}`, borderRadius: 5 }}>→ {r}</div>)}
      </div>
    </>}>
      <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 7 }}>STEP 2 OF 4</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 28, color: C.white, marginBottom: 5 }}>Connect a payment method</h2>
      <p style={{ fontSize: 11, color: C.textMid, marginBottom: 20, lineHeight: 1.7 }}>Your Transaction Agent needs at least one fiat rail.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
        {[
          { id: "plaid", label: "Connect via Plaid", sub: "Securely link your bank account", icon: "🏦", color: C.blue },
          { id: "manual", label: "Enter card manually", sub: "Visa, Mastercard, Amex", icon: "◇", color: C.gold },
          { id: "skip", label: "Skip for now", sub: "Connect later in Settings", icon: "→", color: C.textDim },
        ].map(c => (
          <div key={c.id} onClick={() => setCardMethod(c.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, cursor: "pointer", background: cardMethod === c.id ? C.goldDim : C.panelDeep, border: `1px solid ${cardMethod === c.id ? C.goldBorder : C.border}`, transition: "all 0.14s" }}>
            <span style={{ fontSize: 18, color: c.color }}>{c.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: cardMethod === c.id ? C.gold : C.white }}>{c.label}</div>
              <div style={{ fontSize: 9, color: C.textDim }}>{c.sub}</div>
            </div>
            {cardMethod === c.id && <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: C.bg }}>✓</div>}
          </div>
        ))}
      </div>
      <PBtn label="CONTINUE →" onClick={next} disabled={!cardMethod} />
      <GBtn label="← BACK" onClick={back} />
    </OShell>
  );

  if (step === 3) return (
    <OShell step={step} left={<>
      <div style={{ fontSize: 44, color: C.gold, animation: "float 4s ease-in-out infinite", marginBottom: 18 }}>◈</div>
      <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.white, marginBottom: 10 }}>Your Plan</div>
      <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.8 }}>Pro and Business include the USDC Wallet on Base L2 plus full Safety Agent intelligence.</p>
    </>}>
      <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 7 }}>STEP 3 OF 4</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 28, color: C.white, marginBottom: 5 }}>Choose your plan</h2>
      <p style={{ fontSize: 11, color: C.textMid, marginBottom: 18, lineHeight: 1.7 }}>Upgrade or downgrade any time.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 18 }}>
        {[
          { id: "free", label: "FREE", price: "$0", color: C.textMid, features: ["Fiat P2P up to $500/mo", "Basic Safety Agent"], note: null },
          { id: "pro", label: "PRO", price: "$20/mo", color: C.gold, features: ["Unlimited fiat + crypto", "USDC Wallet on Base L2", "Full Safety Agent"], badge: "RECOMMENDED" },
          { id: "business", label: "BUSINESS", price: "$50/seat", color: C.green, features: ["Everything in Pro", "Team controls + compliance reports"], note: null },
        ].map(p => (
          <div key={p.id} onClick={() => setPlan(p.id)} style={{ padding: "12px 14px", borderRadius: 8, cursor: "pointer", position: "relative", background: plan === p.id ? `${p.color}0D` : C.panelDeep, border: `1px solid ${plan === p.id ? p.color + "55" : C.border}`, transition: "all 0.14s" }}>
            {p.badge && <div style={{ position: "absolute", top: -7, right: 12, fontSize: 7, letterSpacing: 2, background: C.gold, color: C.bg, borderRadius: 3, padding: "2px 6px" }}>{p.badge}</div>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: 2, color: plan === p.id ? p.color : C.textMid }}>{p.label}</span>
              <span style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 17, color: plan === p.id ? p.color : C.text }}>{p.price}</span>
            </div>
            {p.features.map(f => <div key={f} style={{ fontSize: 9, color: C.textDim }}>· {f}</div>)}
          </div>
        ))}
      </div>
      <PBtn label="CONTINUE →" onClick={next} />
      <GBtn label="← BACK" onClick={back} />
    </OShell>
  );

  if (step === 4) return (
    <OShell step={step} left={<>
      <div style={{ fontSize: 44, color: C.green, animation: "float 4s ease-in-out infinite", marginBottom: 18 }}>◎</div>
      <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.white, marginBottom: 10 }}>Security First</div>
      <p style={{ fontSize: 11, color: C.textMid, lineHeight: 1.8 }}>Your USDC wallet key will be generated and stored in your local Stronghold vault — never transmitted.</p>
    </>}>
      <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 7 }}>STEP 4 OF 4</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 28, color: C.white, marginBottom: 5 }}>Security setup</h2>
      <p style={{ fontSize: 11, color: C.textMid, marginBottom: 22, lineHeight: 1.7 }}>Configure your Safety Agent's behavior.</p>
      {[
        { label: "Biometric Authentication", sub: "Face ID or fingerprint to confirm transactions", icon: "◉", active: biometric, toggle: () => setBiometric(v => !v), badge: "RECOMMENDED" },
        { label: "Cooling-Off Timers", sub: "30-second pause on flagged transactions", icon: "◎", active: cooldown, toggle: () => setCooldown(v => !v), badge: "RECOMMENDED" },
      ].map(item => (
        <div key={item.label} onClick={item.toggle} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 8, cursor: "pointer", background: item.active ? C.greenDim : C.panelDeep, border: `1px solid ${item.active ? C.greenBorder : C.border}`, marginBottom: 10, position: "relative" }}>
          {item.badge && <div style={{ position: "absolute", top: -7, right: 12, fontSize: 7, letterSpacing: 2, background: C.green, color: C.bg, borderRadius: 3, padding: "2px 6px" }}>{item.badge}</div>}
          <span style={{ fontSize: 17, color: item.active ? C.green : C.textDim }}>{item.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: item.active ? C.white : C.textMid }}>{item.label}</div>
            <div style={{ fontSize: 9, color: C.textDim }}>{item.sub}</div>
          </div>
          <div style={{ width: 34, height: 19, borderRadius: 10, background: item.active ? C.green : C.border, position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
            <div style={{ position: "absolute", top: 2.5, left: item.active ? 16 : 2.5, width: 14, height: 14, borderRadius: "50%", background: C.white, transition: "left 0.2s" }} />
          </div>
        </div>
      ))}
      <div style={{ padding: "11px 13px", background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: 7, marginBottom: 6, marginTop: 4 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: C.teal, marginBottom: 3 }}>USDC WALLET</div>
        <div style={{ fontSize: 10, color: C.textMid, lineHeight: 1.65 }}>Your wallet key will be generated locally during activation and stored in your encrypted Stronghold vault. You are the sole keyholder.</div>
      </div>
      <PBtn label="ACTIVATE MY GUARDIAN →" onClick={next} color={C.green} tc={C.bg} glow={C.greenGlow} />
      <GBtn label="← BACK" onClick={back} />
    </OShell>
  );

  if (step === 5) return (
    <div style={{ height: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "none" }}>
        {[300, 450, 600].map((s, i) => <div key={s} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: `1px solid ${activDone ? C.green : C.gold}${["20","12","08"][i]}`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", transition: "border-color 1s", animation: activDone ? `guardianRing ${1.8 + i * 0.4}s ease-out ${i * 0.3}s infinite` : "none" }} />)}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: activDone ? C.greenDim : C.goldDim, border: `2px solid ${activDone ? C.green : C.gold}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, color: activDone ? C.green : C.gold, boxShadow: `0 0 ${activDone ? 44 : 22}px ${activDone ? C.greenGlow : C.goldGlow}`, transition: "all 0.7s", animation: activDone ? "guardianBreathe 2.4s ease-in-out infinite" : "none", position: "relative", zIndex: 1 }}>{activDone ? "◎" : "⬡"}</div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 24, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: activDone ? C.green : C.gold, marginBottom: 8, transition: "color 0.5s" }}>{activDone ? "GUARDIAN ACTIVE" : "ACTIVATING GUARDIAN"}</div>
        <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: "clamp(22px,4vw,38px)", color: C.white }}>{activDone ? "You're protected." : "Starting your agents..."}</div>
        {activDone && <p style={{ fontSize: 12, color: C.textMid, lineHeight: 1.8, marginTop: 8, animation: "fadeUp 0.5s ease" }}>Your USDC wallet is ready on Base L2. Your Safety Agent is online.</p>}
      </div>
      <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 20px", marginBottom: 20, width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        {ACTIVATION_AGENTS.map((ag, i) => {
          const isActive = i === activStep;
          const isComplete = i < activStep || (activDone && i <= activStep);
          return (
            <div key={ag.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < ACTIVATION_AGENTS.length - 1 ? `1px solid ${C.border}` : "none", opacity: i > activStep + 1 ? 0.3 : 1, transition: "opacity 0.4s" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: isComplete ? ag.color + "22" : isActive ? C.goldDim : "transparent", border: `1px solid ${isComplete ? ag.color + "55" : isActive ? C.goldBorder : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isComplete ? 9 : 10, color: isComplete ? ag.color : isActive ? C.gold : C.textDim, animation: isActive ? "blink 0.8s ease-in-out infinite" : "none" }}>
                {isComplete ? "✓" : isActive ? ag.icon : "·"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: isComplete ? C.white : isActive ? C.gold : C.textDim, transition: "color 0.3s" }}>{ag.label}</div>
                <div style={{ fontSize: 9, color: C.textDim }}>{ag.sub}</div>
              </div>
              {isComplete && <span style={{ fontSize: 8, letterSpacing: 1, color: ag.color }}>ONLINE</span>}
              {isActive && <span style={{ fontSize: 8, letterSpacing: 1, color: C.gold, animation: "blink 0.8s infinite" }}>LOADING</span>}
            </div>
          );
        })}
      </div>
      {activDone && <div style={{ width: "100%", maxWidth: 440, animation: "fadeUp 0.5s ease 0.2s both", position: "relative", zIndex: 1 }}><PBtn label="ENTER CUSTODI →" onClick={onComplete} color={C.green} tc={C.bg} glow={C.greenGlow} /></div>}
    </div>
  );
  return null;
}

// ── DASHBOARD ─────────────────────────────────────────────────────
const TXS = [
  { id: 1, name: "Sarah Chen", amount: -120, type: "fiat", status: "cleared", time: "2m ago", avatar: "SC", safe: true, note: "Trusted · 14 prior payments" },
  { id: 2, name: "Marcus Webb", amount: -850, type: "fiat", status: "flagged", time: "18m ago", avatar: "MW", safe: false, note: "⚠ 4× your usual amount" },
  { id: 3, name: "Priya Nair", amount: 400, type: "fiat", status: "cleared", time: "1h ago", avatar: "PN", safe: true, note: "Trusted · 6 prior payments" },
  { id: 4, name: "USDC Transfer", amount: -50, type: "usdc", status: "cleared", time: "2h ago", avatar: "₮", safe: true, note: "Base L2 · Confirmed on-chain" },
  { id: 5, name: "ETH Transfer", amount: -0.42, type: "crypto", status: "pending", time: "3h ago", avatar: "Ξ", safe: true, note: "Base L2 · Confirming" },
];

const AGENTS = [
  { label: "Orchestrator", status: "active", color: C.gold },
  { label: "Personal Safety", status: "active", color: C.green },
  { label: "Risk & Compliance", status: "active", color: C.green },
  { label: "Wallet Agent", status: "active", color: C.teal },
  { label: "Billing & Entitlements", status: "active", color: C.green },
  { label: "Transaction", status: "idle", color: C.textDim },
  { label: "Ledger", status: "active", color: C.green },
];

const NAV = [
  { id: "dashboard", icon: "⬡", label: "Home" },
  { id: "wallet", icon: "◑", label: "Wallet" },
  { id: "send", icon: "↑", label: "Send" },
  { id: "activity", icon: "◎", label: "Activity" },
  { id: "settings", icon: "◇", label: "Settings" },
];

function SendModal({ onClose }) {
  const [s, setS] = useState(1);
  const [amount, setAmount] = useState(""); const [recipient, setRecipient] = useState(""); const [rail, setRail] = useState("fiat");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(16,16,16,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }}>
      <div style={{ background: C.panel, border: `1px solid ${C.borderLight}`, borderRadius: 14, padding: "26px 24px", width: 400, maxWidth: "92vw", boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 3 }}>NEW TRANSACTION</div>
            <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: C.white }}>Send Payment</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textDim, fontSize: 16, padding: 4 }}>✕</button>
        </div>
        {s === 1 && <div style={{ animation: "fadeIn 0.2s ease" }}>
          <FInput label="RECIPIENT" placeholder="Name, email, or wallet address" value={recipient} onChange={setRecipient} />
          <FInput label="AMOUNT" placeholder="0.00" value={amount} onChange={setAmount} prefix="$" />
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: C.textDim, marginBottom: 7 }}>RAIL</div>
            <div style={{ display: "flex", gap: 7 }}>
              {[{ id: "fiat", label: "FIAT" }, { id: "crypto", label: "CRYPTO" }, { id: "usdc", label: "USDC" }].map(r => (
                <button key={r.id} onClick={() => setRail(r.id)} style={{ flex: 1, padding: "8px 0", borderRadius: 6, background: rail === r.id ? (r.id === "usdc" ? C.tealDim : C.goldDim) : "transparent", border: `1px solid ${rail === r.id ? (r.id === "usdc" ? C.tealBorder : C.goldBorder) : C.border}`, color: rail === r.id ? (r.id === "usdc" ? C.teal : C.gold) : C.textDim, fontSize: 9, letterSpacing: 2, transition: "all 0.14s" }}>
                  {r.label}
                </button>
              ))}
            </div>
            {rail === "usdc" && <div style={{ marginTop: 8, fontSize: 9, color: C.teal, background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: 5, padding: "6px 10px" }}>Wallet balance: 1,240.00 USDC · Base L2</div>}
          </div>
          <PBtn label="REVIEW WITH SAFETY AGENT →" onClick={() => setS(2)} disabled={!recipient || !amount} />
          <GBtn label="CANCEL" onClick={onClose} />
        </div>}
        {s === 2 && <div style={{ animation: "fadeIn 0.2s ease" }}>
          <div style={{ background: C.greenDim, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "11px 13px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <Pulse color={C.green} size={26} rings={1} speed="slow" />
            <div>
              <div style={{ fontSize: 10, color: C.green, marginBottom: 2 }}>Safety Agent — Cleared</div>
              <div style={{ fontSize: 9, color: C.textMid }}>Recipient in trust graph · Amount within baseline</div>
            </div>
          </div>
          {rail === "usdc" && <div style={{ background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: 7, padding: "9px 12px", marginBottom: 12, fontSize: 9, color: C.teal, lineHeight: 1.65 }}>⚠ USDC transactions on Base L2 are irreversible. Mandatory cooling-off period applies.</div>}
          <div style={{ background: C.panelDeep, borderRadius: 8, padding: "11px 13px", marginBottom: 14 }}>
            {[["To", recipient || "Sarah Chen"], ["Amount", `$${amount || "120.00"}${rail === "usdc" ? " USDC" : ""}`], ["Rail", rail === "fiat" ? "Fiat — Stripe" : rail === "usdc" ? "USDC — Base L2" : "Crypto — Base L2"], ["Fee", "Included in Pro plan"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 9, color: C.textDim }}>{l}</span><span style={{ fontSize: 9, color: C.text }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <GBtn label="BACK" onClick={() => setS(1)} />
            <PBtn label="CONFIRM & SEND" onClick={onClose} color={rail === "usdc" ? C.teal : C.gold} glow={rail === "usdc" ? C.tealGlow : C.goldGlow} tc={C.bg} />
          </div>
        </div>}
      </div>
    </div>
  );
}

function Dashboard({ onWallet, onSafety }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [showSend, setShowSend] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, overflow: "hidden" }}>
      <div style={{ width: 62, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", flexShrink: 0 }}>
        <div style={{ marginBottom: 26, display: "flex", justifyContent: "center" }}><LogoHexSmall size={30} borderRadius={8} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", padding: "0 7px" }}>
          {NAV.map(item => (
            <div key={item.id} className="nav-item" onClick={() => { setActiveNav(item.id); if (item.id === "send") setShowSend(true); if (item.id === "wallet") onWallet(); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "8px 0", borderRadius: 7, gap: 3, background: activeNav === item.id ? (item.id === "wallet" ? C.tealDim : C.goldDim) : "transparent", border: `1px solid ${activeNav === item.id ? (item.id === "wallet" ? C.tealBorder : C.goldBorder) : "transparent"}`, cursor: "pointer" }}>
              <span style={{ fontSize: 13, color: activeNav === item.id ? (item.id === "wallet" ? C.teal : C.gold) : C.textDim }}>{item.icon}</span>
              <span style={{ fontSize: 7, letterSpacing: 1, color: activeNav === item.id ? (item.id === "wallet" ? C.teal : C.gold) : C.textDim }}>{item.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.blueDim, border: `1px solid ${C.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: C.blue }}>JD</div>
          <div style={{ fontSize: 7, letterSpacing: 1, color: C.textDim }}>PRO</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ height: 54, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", flexShrink: 0 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim }}>CUSTODI · DASHBOARD</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <Pulse color={C.green} size={18} rings={1} speed="slow" />
              <div><div style={{ fontSize: 8, letterSpacing: 2, color: C.green }}>GUARDIAN ACTIVE</div><div style={{ fontSize: 7, color: C.textDim }}>All agents operational</div></div>
            </div>
            <button onClick={() => setShowSend(true)} style={{ background: C.gold, border: "none", color: C.bg, padding: "7px 16px", borderRadius: 6, fontSize: 9, letterSpacing: 2, fontWeight: 600, boxShadow: `0 0 16px ${C.goldGlow}` }}>↑ SEND</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "22px" }}>
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 25, color: C.white, marginBottom: 3 }}>Good morning, James.</div>
            <div style={{ fontSize: 10, color: C.textDim }}>Your finances are guarded. 4 agents active, 0 incidents today.</div>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
            {/* USDC Wallet mini card — first */}
            <div onClick={onWallet} className="card" style={{ flex: "1 1 110px", background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderTop: `2px solid ${C.teal}`, borderRadius: 9, padding: "12px 14px", cursor: "pointer", boxShadow: `inset 0 0 20px ${C.tealDim}` }}>
              <div style={{ fontSize: 8, letterSpacing: 2, color: C.teal, marginBottom: 6 }}>USDC WALLET</div>
              <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 19, color: C.white, marginBottom: 2 }}>1,240.00</div>
              <div style={{ fontSize: 9, color: C.teal }}>USDC · Base L2 →</div>
            </div>
            {[
              { label: "MONTHLY SENT", value: "$2,840", sub: "$10k remaining", color: C.gold },
              { label: "SAFETY SCORE", value: "98 / 100", sub: "No anomalies", color: C.green },
              { label: "INCIDENTS CAUGHT", value: "1 this month", sub: "$850 protected", color: C.amber },
            ].map(s => (
              <div key={s.label} style={{ flex: "1 1 110px", background: C.panel, border: `1px solid ${C.border}`, borderTop: `2px solid ${s.color}`, borderRadius: 9, padding: "12px 14px" }}>
                <div style={{ fontSize: 8, letterSpacing: 2, color: C.textDim, marginBottom: 6 }}>{s.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 19, color: C.white, marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: s.color }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Main grid */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "13px 17px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim }}>RECENT ACTIVITY</div>
                <div style={{ fontSize: 9, color: C.gold }}>VIEW ALL →</div>
              </div>
              {TXS.map(tx => (
                <div key={tx.id} className="tx-row" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 17px", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: tx.type === "usdc" ? C.tealDim : tx.type === "crypto" ? C.amberDim : tx.safe ? C.blueDim : C.redDim, border: `1px solid ${tx.type === "usdc" ? C.tealBorder : tx.type === "crypto" ? C.amberBorder : tx.safe ? C.blueBorder : C.redBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: tx.type === "usdc" ? C.teal : tx.type === "crypto" ? C.amber : tx.safe ? C.blue : C.red, flexShrink: 0 }}>{tx.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ fontSize: 11, color: C.white }}>{tx.name}</span>
                      <span style={{ fontSize: 11, color: tx.amount > 0 ? C.green : C.text, fontFamily: "'Cormorant Garamond','Georgia',serif" }}>
                        {tx.amount > 0 ? "+" : ""}{tx.type === "crypto" ? `${tx.amount}Ξ` : tx.type === "usdc" ? `$${Math.abs(tx.amount)} USDC` : `$${Math.abs(tx.amount).toFixed(2)}`}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 9, color: tx.safe ? C.textDim : C.amber }}>{tx.note}</span>
                      <span style={{ fontSize: 8, color: C.textDim }}>{tx.time}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 8, padding: "2px 6px", borderRadius: 3, color: tx.status === "cleared" ? C.green : tx.status === "flagged" ? C.amber : C.textDim, background: tx.status === "cleared" ? C.greenDim : tx.status === "flagged" ? C.amberDim : "transparent", border: `1px solid ${tx.status === "cleared" ? C.greenBorder : tx.status === "flagged" ? C.amberBorder : C.border}` }}>
                    {tx.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ flex: "0 1 240px", minWidth: 200, display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 15px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 11 }}>GUARDIAN STATUS</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <Pulse color={C.green} size={38} rings={2} speed="slow" />
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 16, color: C.white }}>All Clear</div>
                    <div style={{ fontSize: 9, color: C.green }}>No active threats</div>
                  </div>
                </div>
                <button onClick={onSafety} style={{ width: "100%", padding: "7px 0", borderRadius: 6, background: C.amberDim, border: `1px solid ${C.amberBorder}`, color: C.amber, fontSize: 9, letterSpacing: 2, cursor: "pointer" }}>VIEW SAFETY DEMO →</button>
              </div>
              <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "13px 15px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 10 }}>AGENT STACK</div>
                {AGENTS.map(ag => (
                  <div key={ag.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 9, color: ag.status === "active" ? C.textMid : C.textDim }}>{ag.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: ag.color, boxShadow: ag.status === "active" ? `0 0 5px ${ag.color}` : "none" }} />
                      <span style={{ fontSize: 7, letterSpacing: 1, color: ag.color }}>{ag.status.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.gold, marginBottom: 5 }}>CUSTODI PRO</div>
                <div style={{ fontSize: 10, color: C.textMid, lineHeight: 1.65, marginBottom: 6 }}>All rails + USDC Wallet + Full Safety Agent active.</div>
                <div style={{ fontSize: 9, color: C.textDim }}>Renews Mar 18 · $20.00/mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSend && <SendModal onClose={() => setShowSend(false)} />}
    </div>
  );
}

// ── WALLET SCREEN ─────────────────────────────────────────────────
const WALLET_TXS = [
  { id: 1, type: "receive", label: "Received from Alex Kim", amount: 200, time: "Today, 9:14 AM", hash: "0x3a4f...d82c", status: "confirmed" },
  { id: 2, type: "send", label: "Sent to Sarah Chen", amount: -50, time: "Today, 8:02 AM", hash: "0x7c2b...e31a", status: "confirmed" },
  { id: 3, type: "deposit", label: "Deposited from bank", amount: 500, time: "Yesterday", hash: "On-ramp via Coinbase", status: "confirmed" },
  { id: 4, type: "send", label: "Sent to Marcus Webb", amount: -180, time: "Feb 22", hash: "0x9d1e...f44b", status: "confirmed" },
  { id: 5, type: "withdraw", label: "Withdrawn to bank", amount: -300, time: "Feb 20", hash: "Off-ramp via Coinbase", status: "confirmed" },
];

function WalletScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [depositAmt, setDepositAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [sendAmt, setSendAmt] = useState("");
  const [sendAddr, setSendAddr] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const walletAddr = "0x4a9F...3c7E";

  const copyAddr = () => { setShowCopied(true); setTimeout(() => setShowCopied(false), 2000); };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Mono','Courier New',monospace", color: C.text, display: "flex", flexDirection: "column", overflow: "hidden", height: "100vh" }}>
      {/* Topbar */}
      <div style={{ height: 54, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: C.textDim, fontSize: 10, letterSpacing: 1, cursor: "pointer", padding: 0 }}>← DASHBOARD</button>
          <div style={{ width: 1, height: 16, background: C.border }} />
          <div style={{ fontSize: 9, letterSpacing: 3, color: C.teal }}>CUSTODI · USDC WALLET</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, boxShadow: `0 0 6px ${C.teal}`, animation: "tealPulse 2s infinite" }} />
          <span style={{ fontSize: 9, color: C.teal, letterSpacing: 1 }}>BASE L2 · CONNECTED</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 80px" }}>
        {/* Hero balance */}
        <div style={{ background: `linear-gradient(135deg, ${C.tealDim}, ${C.panel})`, border: `1px solid ${C.tealBorder}`, borderRadius: 14, padding: "28px 26px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: C.teal + "0A", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ fontSize: 9, letterSpacing: 3, color: C.teal, marginBottom: 8 }}>USDC BALANCE · BASE L2</div>
          <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: "clamp(32px,5vw,52px)", color: C.white, letterSpacing: -1, marginBottom: 4 }}>
            1,240.00 <span style={{ fontSize: "0.4em", color: C.teal, letterSpacing: 2 }}>USDC</span>
          </div>
          <div style={{ fontSize: 11, color: C.textMid, marginBottom: 20 }}>≈ $1,240.00 USD · 1 USDC = $1.00</div>
          {/* Wallet address */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.bg + "88", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 8, letterSpacing: 2, color: C.textDim, marginBottom: 3 }}>WALLET ADDRESS</div>
              <div style={{ fontSize: 11, color: C.teal, fontFamily: "'DM Mono',monospace" }}>{walletAddr}</div>
            </div>
            <button onClick={copyAddr} style={{ padding: "6px 12px", borderRadius: 5, background: showCopied ? C.greenDim : C.tealDim, border: `1px solid ${showCopied ? C.greenBorder : C.tealBorder}`, color: showCopied ? C.green : C.teal, fontSize: 9, letterSpacing: 1, transition: "all 0.2s" }}>
              {showCopied ? "COPIED ✓" : "COPY"}
            </button>
          </div>
          {/* Non-custodial badge */}
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 9, color: C.textDim }}>Non-custodial · Keys stored in Stronghold vault · You are the sole keyholder</span>
          </div>
        </div>

        {/* Action tabs */}
        <div style={{ display: "flex", gap: 7, marginBottom: 20, flexWrap: "wrap" }}>
          {[{ id: "overview", label: "Overview" }, { id: "deposit", label: "Deposit" }, { id: "withdraw", label: "Withdraw" }, { id: "send", label: "Send USDC" }, { id: "receive", label: "Receive" }].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 9, letterSpacing: 2, background: activeTab === t.id ? C.tealDim : "transparent", border: `1px solid ${activeTab === t.id ? C.tealBorder : C.border}`, color: activeTab === t.id ? C.teal : C.textDim, transition: "all 0.14s" }}>
              {t.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeIn 0.25s ease" }}>
          {activeTab === "overview" && <>
            {/* Transaction list */}
            <div style={{ flex: "1 1 300px", background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
              <div style={{ padding: "13px 17px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim }}>WALLET TRANSACTIONS</div>
              </div>
              {WALLET_TXS.map(tx => (
                <div key={tx.id} className="tx-row" style={{ padding: "12px 17px", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: tx.amount > 0 ? C.greenDim : C.tealDim, border: `1px solid ${tx.amount > 0 ? C.greenBorder : C.tealBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: tx.amount > 0 ? C.green : C.teal }}>
                        {tx.amount > 0 ? "↓" : "↑"}
                      </div>
                      <span style={{ fontSize: 11, color: C.white }}>{tx.label}</span>
                    </div>
                    <span style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 14, color: tx.amount > 0 ? C.green : C.text }}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount} USDC
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 36 }}>
                    <span style={{ fontSize: 9, color: C.textDim, fontFamily: "'DM Mono',monospace" }}>{tx.hash}</span>
                    <span style={{ fontSize: 8, color: C.textDim }}>{tx.time}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Info panel */}
            <div style={{ flex: "0 1 240px", minWidth: 200, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 11 }}>WALLET STATS</div>
                {[["Total received", "+$1,990 USDC"], ["Total sent", "-$750 USDC"], ["Net flow", "+$1,240 USDC"], ["Transactions", "5 total"], ["Network", "Base L2"], ["Avg. fee", "~$0.001"]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 9, color: C.textDim }}>{l}</span>
                    <span style={{ fontSize: 9, color: C.teal }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 10 }}>SAFETY COVERAGE</div>
                {[["Cooling-off", "Mandatory on all sends"], ["Trust graph", "Wallet addresses included"], ["New address", "Always AMBER min."], ["Irreversibility", "Warning on every send"]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 9, color: C.textDim }}>{l}</span>
                    <span style={{ fontSize: 9, color: C.green }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {activeTab === "deposit" && (
            <div style={{ flex: "1 1 300px", maxWidth: 420 }}>
              <div style={{ background: C.panel, border: `1px solid ${C.tealBorder}`, borderRadius: 12, padding: "22px 22px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.teal, marginBottom: 16 }}>DEPOSIT USDC</div>
                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.75, marginBottom: 20 }}>Convert USD from your linked bank account to USDC on Base L2 via Coinbase on-ramp. Settles in ~2 seconds.</div>
                <FInput label="AMOUNT (USD)" placeholder="0.00" value={depositAmt} onChange={setDepositAmt} prefix="$" />
                {depositAmt && <div style={{ background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: 7, padding: "10px 12px", marginBottom: 8, fontSize: 10, color: C.teal }}>
                  You will receive ≈ {depositAmt} USDC on Base L2
                  <div style={{ fontSize: 9, color: C.textDim, marginTop: 3 }}>Fee: ~$0.001 · Settles in ~2 seconds</div>
                </div>}
                <PBtn label="DEPOSIT VIA COINBASE →" onClick={() => {}} disabled={!depositAmt} color={C.teal} tc={C.bg} glow={C.tealGlow} />
              </div>
            </div>
          )}

          {activeTab === "withdraw" && (
            <div style={{ flex: "1 1 300px", maxWidth: 420 }}>
              <div style={{ background: C.panel, border: `1px solid ${C.tealBorder}`, borderRadius: 12, padding: "22px 22px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.teal, marginBottom: 16 }}>WITHDRAW USDC</div>
                <div style={{ fontSize: 11, color: C.textMid, lineHeight: 1.75, marginBottom: 20 }}>Convert USDC back to USD and transfer to your linked bank account via Coinbase off-ramp.</div>
                <FInput label="AMOUNT (USDC)" placeholder="0.00" value={withdrawAmt} onChange={setWithdrawAmt} prefix="$" />
                <div style={{ fontSize: 10, color: C.textDim, marginBottom: 12 }}>Available: 1,240.00 USDC</div>
                {withdrawAmt && <div style={{ background: C.goldDim, border: `1px solid ${C.goldBorder}`, borderRadius: 7, padding: "10px 12px", marginBottom: 8, fontSize: 10, color: C.gold }}>
                  You will receive ≈ ${withdrawAmt} USD in your bank account
                  <div style={{ fontSize: 9, color: C.textDim, marginTop: 3 }}>Processing time: 1–2 business days</div>
                </div>}
                <PBtn label="WITHDRAW TO BANK →" onClick={() => {}} disabled={!withdrawAmt} color={C.gold} tc={C.bg} />
              </div>
            </div>
          )}

          {activeTab === "send" && (
            <div style={{ flex: "1 1 300px", maxWidth: 420 }}>
              <div style={{ background: C.panel, border: `1px solid ${C.tealBorder}`, borderRadius: 12, padding: "22px 22px" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.teal, marginBottom: 16 }}>SEND USDC</div>
                <div style={{ background: C.amberDim, border: `1px solid ${C.amberBorder}`, borderRadius: 7, padding: "10px 12px", marginBottom: 18, fontSize: 10, color: C.amber, lineHeight: 1.65 }}>
                  ⚠ USDC transactions on Base L2 are irreversible. Your Safety Agent will review this before submission.
                </div>
                <FInput label="RECIPIENT ADDRESS OR NAME" placeholder="0x... or custodi username" value={sendAddr} onChange={setSendAddr} />
                <FInput label="AMOUNT (USDC)" placeholder="0.00" value={sendAmt} onChange={setSendAmt} prefix="$" />
                <div style={{ fontSize: 10, color: C.textDim, marginBottom: 12 }}>Available: 1,240.00 USDC · Fee: ~$0.001</div>
                <PBtn label="REVIEW WITH SAFETY AGENT →" onClick={() => {}} disabled={!sendAddr || !sendAmt} color={C.teal} tc={C.bg} glow={C.tealGlow} />
              </div>
            </div>
          )}

          {activeTab === "receive" && (
            <div style={{ flex: "1 1 300px", maxWidth: 420 }}>
              <div style={{ background: C.panel, border: `1px solid ${C.tealBorder}`, borderRadius: 12, padding: "22px 22px", textAlign: "center" }}>
                <div style={{ fontSize: 9, letterSpacing: 3, color: C.teal, marginBottom: 16 }}>RECEIVE USDC</div>
                {/* QR placeholder */}
                <div style={{ width: 160, height: 160, borderRadius: 12, background: C.panelDeep, border: `2px solid ${C.tealBorder}`, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.textDim, flexDirection: "column", gap: 8 }}>
                  <div style={{ transform: "scale(0.9)" }}><LogoHexSmall size={36} borderRadius={8} /></div>
                  <div>QR Code</div>
                  <div style={{ fontSize: 9 }}>Base L2</div>
                </div>
                <div style={{ fontSize: 11, color: C.textMid, marginBottom: 14 }}>Share your address to receive USDC on Base L2 from any wallet.</div>
                <div style={{ background: C.tealDim, border: `1px solid ${C.tealBorder}`, borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
                  <div style={{ fontSize: 9, color: C.textDim, marginBottom: 4 }}>YOUR WALLET ADDRESS</div>
                  <div style={{ fontSize: 11, color: C.teal, wordBreak: "break-all" }}>{walletAddr}</div>
                </div>
                <button onClick={copyAddr} style={{ width: "100%", padding: "11px 0", borderRadius: 8, background: showCopied ? C.greenDim : C.tealDim, border: `1px solid ${showCopied ? C.greenBorder : C.tealBorder}`, color: showCopied ? C.green : C.teal, fontSize: 10, letterSpacing: 2, transition: "all 0.2s" }}>
                  {showCopied ? "ADDRESS COPIED ✓" : "COPY ADDRESS"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SAFETY SCREEN ─────────────────────────────────────────────────
const SCENARIOS = {
  green: { id: "green", label: "GREEN", accent: C.green, accentDim: C.greenDim, accentGlow: C.greenGlow, accentBorder: C.greenBorder, verdict: "Transaction Cleared", verdictSub: "All signals passed. Safe to proceed.", recipient: "Sarah Chen", amount: "$120.00", rail: "Fiat — Stripe", signals: [{ label: "Recipient trust graph", result: "Known contact · 14 prior payments", pass: true }, { label: "Amount baseline", result: "Within your normal range ($50–$200)", pass: true }, { label: "Time of day", result: "Consistent with your activity hours", pass: true }, { label: "Device fingerprint", result: "Recognized device — MacBook Pro", pass: true }, { label: "AML / velocity check", result: "No flags", pass: true }], actions: [{ label: "CONFIRM & SEND", primary: true }, { label: "CANCEL", primary: false }] },
  amber: { id: "amber", label: "AMBER", accent: C.amber, accentDim: C.amberDim, accentGlow: C.amberGlow, accentBorder: C.amberBorder, verdict: "Unusual Transaction Detected", verdictSub: "Your Safety Agent flagged 2 signals.", recipient: "Marcus Webb", amount: "$850.00", rail: "Fiat — Stripe", cooldown: 20, signals: [{ label: "Recipient trust graph", result: "Known contact · 2 prior payments only", pass: true }, { label: "Amount baseline", result: "4.2× your usual amount to this recipient", pass: false }, { label: "Time of day", result: "Consistent with your activity hours", pass: true }, { label: "Device fingerprint", result: "Recognized device — MacBook Pro", pass: true }, { label: "AML / velocity check", result: "3rd transaction today — approaching limit", pass: false }], actions: [{ label: "OVERRIDE & SEND ANYWAY", primary: true, override: true }, { label: "CANCEL TRANSACTION", primary: false }] },
  red: { id: "red", label: "RED", accent: C.red, accentDim: C.redDim, accentGlow: C.redGlow, accentBorder: C.redBorder, verdict: "Transaction Blocked", verdictSub: "Hard block. Incident logged.", recipient: "Unknown Wallet", amount: "$3,200.00", rail: "Crypto — Base L2", signals: [{ label: "Recipient trust graph", result: "Never transacted with this address", pass: false }, { label: "Amount baseline", result: "26× your largest single transaction", pass: false }, { label: "Time of day", result: "3:47 AM — outside all prior activity", pass: false }, { label: "Device fingerprint", result: "New device — not previously recognized", pass: false }, { label: "AML / velocity check", result: "Wallet flagged in fraud database", pass: false }], actions: [{ label: "APPEAL THIS BLOCK", primary: false, appeal: true }, { label: "CANCEL TRANSACTION", primary: false }] },
};

function SafetyScreen({ initialScenario = "amber", onBack }) {
  const [active, setActive] = useState(initialScenario);
  const [phase, setPhase] = useState("analyzing");
  const [countdown, setCountdown] = useState(20);
  const [cooldownDone, setCooldownDone] = useState(false);
  const timerRef = useRef(null);
  const s = SCENARIOS[active];

  useEffect(() => {
    setPhase("analyzing"); setCooldownDone(false); setCountdown(s.cooldown || 20);
    clearInterval(timerRef.current);
    const t = setTimeout(() => setPhase("analyzed"), 1800);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    if (phase !== "analyzed" || active !== "amber") return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown(c => { if (c <= 1) { clearInterval(timerRef.current); setCooldownDone(true); return 0; } return c - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, active]);

  const canAct = active !== "amber" || cooldownDone;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "26px 24px 80px", fontFamily: "'DM Mono','Courier New',monospace", color: C.text }}>
      <div style={{ marginBottom: 22, borderBottom: `1px solid ${C.border}`, paddingBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <button onClick={onBack} style={{ background: "none", border: "none", color: C.textDim, fontSize: 10, letterSpacing: 1, cursor: "pointer", padding: 0, marginBottom: 6, display: "block" }}>← DASHBOARD</button>
            <div style={{ fontSize: 9, letterSpacing: 4, color: C.textDim, marginBottom: 4 }}>CUSTODI · PERSONAL SAFETY AGENT</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: "clamp(20px,3vw,30px)", color: C.white }}>Transaction Safety Review</h1>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {Object.values(SCENARIOS).map(sc => (
              <button key={sc.id} onClick={() => setActive(sc.id)} style={{ padding: "7px 13px", borderRadius: 6, background: active === sc.id ? `${sc.accent}18` : "transparent", border: `1px solid ${active === sc.id ? sc.accentBorder : C.border}`, color: active === sc.id ? sc.accent : C.textDim, fontSize: 9, letterSpacing: 2, transition: "all 0.14s" }}>{sc.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <div style={{ background: C.panel, border: `1px solid ${s.accentBorder}`, borderRadius: 12, padding: "18px 20px", marginBottom: 13, boxShadow: `0 0 32px ${s.accentGlow}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: s.accent + "0A", filter: "blur(20px)", pointerEvents: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 14 }}>
              <Pulse color={s.accent} size={46} rings={active === "red" ? 3 : 2} speed={active === "red" ? "fast" : active === "green" ? "slow" : "normal"} />
              <div>
                <div style={{ fontSize: 9, letterSpacing: 3, color: s.accent, marginBottom: 4 }}>PERSONAL SAFETY AGENT · {s.label}</div>
                <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 19, color: C.white, lineHeight: 1.2 }}>{s.verdict}</div>
                <div style={{ fontSize: 10, color: C.textMid, marginTop: 3 }}>{s.verdictSub}</div>
              </div>
            </div>
            <div style={{ background: C.panelDeep, borderRadius: 8, padding: "10px 13px" }}>
              {[["Recipient", s.recipient], ["Amount", s.amount], ["Rail", s.rail], ["Initiated", "Just now"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 9, color: C.textDim }}>{l}</span><span style={{ fontSize: 9, color: C.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "15px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 11 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim }}>SIGNAL ANALYSIS</div>
              {phase === "analyzing" && <div style={{ fontSize: 8, color: C.gold, animation: "blink 1s infinite" }}>SCANNING...</div>}
              {phase === "analyzed" && <div style={{ fontSize: 8, color: s.accent }}>{s.signals.filter(x => !x.pass).length} FLAG(S)</div>}
            </div>
            {s.signals.map((sig, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 0", borderBottom: `1px solid ${C.border}`, opacity: phase === "analyzed" ? 1 : 0.4, transition: `opacity 0.3s ease ${i * 0.15}s` }}>
                <div style={{ width: 15, height: 15, borderRadius: "50%", flexShrink: 0, marginTop: 1, background: phase === "analyzed" ? (sig.pass ? C.greenDim : C.redDim) : "transparent", border: `1px solid ${phase === "analyzed" ? (sig.pass ? C.greenBorder : C.redBorder) : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: phase === "analyzed" ? (sig.pass ? C.green : C.red) : C.textDim }}>
                  {phase === "analyzed" ? (sig.pass ? "✓" : "✕") : "·"}
                </div>
                <div>
                  <div style={{ fontSize: 9, color: C.textMid, marginBottom: 2 }}>{sig.label}</div>
                  <div style={{ fontSize: 10, color: phase === "analyzed" ? (sig.pass ? C.text : C.red) : C.textDim }}>{sig.result}</div>
                </div>
              </div>
            ))}
            {phase === "analyzed" && (
              <div style={{ marginTop: 11, padding: "9px 11px", borderRadius: 7, background: s.accentDim, border: `1px solid ${s.accentBorder}`, fontSize: 10, color: s.accent, lineHeight: 1.65, animation: "fadeUp 0.4s ease" }}>
                {active === "green" && "All 5 signals passed. Safe to send."}
                {active === "amber" && "2 of 5 signals flagged. Unusual but not conclusive."}
                {active === "red" && "All 5 signals failed. Pattern consistent with fraud or compromise."}
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: "0 1 250px", minWidth: 220, display: "flex", flexDirection: "column", gap: 11 }}>
          {active === "red" && phase === "analyzed" && (
            <div style={{ background: C.redDim, border: `1px solid ${C.redBorder}`, borderRadius: 10, padding: "13px 15px", animation: "fadeUp 0.4s ease 0.2s both" }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.red, marginBottom: 9 }}>INCIDENT LOGGED</div>
              {[["Incident ID", "#INC-2024-0847"], ["Timestamp", "Feb 18, 3:47 AM"], ["Severity", "Critical"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 9, color: C.textDim }}>{l}</span><span style={{ fontSize: 9, color: l === "Severity" ? C.red : C.text }}>{v}</span>
                </div>
              ))}
            </div>
          )}
          {active === "amber" && phase === "analyzed" && (
            <div style={{ background: C.amberDim, border: `1px solid ${C.amberBorder}`, borderRadius: 10, padding: "13px 15px", animation: "fadeUp 0.4s ease 0.1s both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: C.amber }}>COOLING-OFF</div>
                <div style={{ fontFamily: "'Cormorant Garamond','Georgia',serif", fontSize: 20, color: cooldownDone ? C.green : C.amber }}>{cooldownDone ? "Ready" : `${countdown}s`}</div>
              </div>
              <div style={{ height: 3, background: C.border, borderRadius: 2, marginBottom: 7 }}>
                <div style={{ height: "100%", borderRadius: 2, background: cooldownDone ? C.green : C.amber, width: `${cooldownDone ? 100 : ((20 - countdown) / 20) * 100}%`, transition: "width 1s linear, background 0.3s" }} />
              </div>
              <div style={{ fontSize: 9, color: C.textDim, lineHeight: 1.6 }}>{cooldownDone ? "Timer complete. Proceed or cancel." : "Safety Agent requires a brief pause on flagged transactions."}</div>
            </div>
          )}
          {phase === "analyzed" && (
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "13px 15px", animation: "fadeUp 0.4s ease 0.15s both" }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 9 }}>WHAT THIS MEANS</div>
              <div style={{ fontSize: 10, color: C.textMid, lineHeight: 1.75 }}>
                {active === "green" && "Your Safety Agent verified this payment against your trust graph and behavioral baseline."}
                {active === "amber" && "Something is unusual. Your agent wants you to pause before committing. This cannot be reversed once sent."}
                {active === "red" && "Every monitored signal failed. This is consistent with account compromise or social engineering."}
              </div>
            </div>
          )}
          {phase === "analyzed" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 7, animation: "fadeUp 0.4s ease 0.3s both" }}>
              {s.actions.map(action => {
                const disabled = action.override && !canAct;
                return (
                  <button key={action.label} disabled={disabled} style={{ width: "100%", padding: "11px 0", borderRadius: 8, fontSize: 9, letterSpacing: 2, fontWeight: 600, transition: "all 0.15s", opacity: disabled ? 0.35 : 1, cursor: disabled ? "not-allowed" : "pointer", background: action.primary && !action.appeal ? (active === "green" ? C.green : active === "amber" ? C.amber : "transparent") : "transparent", color: action.primary && !action.appeal ? C.bg : action.appeal ? C.red : C.textMid, border: action.primary && !action.appeal ? "none" : action.appeal ? `1px solid ${C.redBorder}` : `1px solid ${C.border}`, boxShadow: action.primary && !disabled ? `0 0 16px ${active === "green" ? C.greenGlow : C.amberGlow}` : "none" }}>
                    {disabled ? `WAIT ${countdown}s TO OVERRIDE` : action.label}
                  </button>
                );
              })}
            </div>
          )}
          {phase === "analyzing" && (
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 15px" }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.textDim, marginBottom: 11 }}>SAFETY AGENT</div>
              {["Checking trust graph...", "Analyzing amount...", "Verifying device...", "Compliance scan..."].map((t, i) => (
                <div key={t} style={{ fontSize: 10, color: C.textDim, marginBottom: 7, animation: `blink 1.2s ease ${i * 0.3}s infinite` }}>◌ {t}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────
export default function CustodiApp() {
  const [screen, setScreen] = useState("onboarding");

  return (
    <div style={{ fontFamily: "'DM Mono','Courier New',monospace", background: C.bg, minHeight: "100vh" }}>
      <style>{CSS}</style>
      {screen === "onboarding" && <Onboarding onComplete={() => setScreen("dashboard")} />}
      {screen === "dashboard" && <Dashboard onWallet={() => setScreen("wallet")} onSafety={() => setScreen("safety-amber")} />}
      {screen === "wallet" && <WalletScreen onBack={() => setScreen("dashboard")} />}
      {(screen === "safety-green" || screen === "safety-amber" || screen === "safety-red") && (
        <SafetyScreen initialScenario={screen.replace("safety-", "")} onBack={() => setScreen("dashboard")} />
      )}
      <ProtoNav screen={screen} setScreen={setScreen} />
    </div>
  );
}
