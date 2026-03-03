"use client";

type Node = {
  title: string;
  subtitle: string;
};

// Row 1: Intent → Orchestrator → Entitlements → Identity
// Row 2: Safety → Wallet → Ledger → Broadcast
const row1: Node[] = [
  { title: "Intent", subtitle: "User action" },
  { title: "Orchestrator", subtitle: "Routing + state" },
  { title: "Entitlements", subtitle: "Plan gate" },
  { title: "Identity", subtitle: "KYC + session" },
];

const row2: Node[] = [
  { title: "Safety + Risk", subtitle: "Signals + AML" },
  { title: "Wallet", subtitle: "Pre-approve" },
  { title: "Ledger", subtitle: "Audit trail" },
  { title: "Broadcast", subtitle: "On-chain exec" },
];

export default function ArchitectureDiagram() {
  const boxW = 130;
  const boxH = 70;
  const gapX = 40;
  const gapY = 50;
  const startX = 40;
  const row1Y = 40;
  const row2Y = row1Y + boxH + gapY;

  // Calculate positions for each node
  const getPos = (row: number, col: number) => ({
    x: startX + col * (boxW + gapX),
    y: row === 0 ? row1Y : row2Y,
  });

  return (
    <section className="mx-auto w-[min(1120px,calc(100%-48px))] py-16">
      <div className="rounded-2xl border border-[rgba(42,42,42,.85)] bg-[#14141466] p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.20em] text-[color:var(--custodi-gold)]">
              Architecture
            </span>
            <p className="mt-1 text-sm text-[rgba(244,244,244,.75)]">
              Structured execution pipeline. No broadcast before non-RED verdict.
            </p>
          </div>
          <span className="hidden sm:block font-mono text-[11px] tracking-[0.20em] text-[color:var(--mid)]">
            v1.1
          </span>
        </div>

        {/* SVG Diagram - scrollable on mobile */}
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <svg
            viewBox="0 0 720 230"
            className="min-w-[600px] w-full max-w-[720px] mx-auto"
            role="img"
            aria-label="Custodi agent execution pipeline"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(201,168,76,0.6)" />
                <stop offset="100%" stopColor="rgba(201,168,76,0.2)" />
              </linearGradient>
              <marker
                id="arrowHead"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(201,168,76,0.8)" />
              </marker>
            </defs>

            {/* Background */}
            <rect
              x="0"
              y="0"
              width="720"
              height="230"
              rx="16"
              fill="rgba(20,20,20,0.5)"
            />

            {/* Row 1 nodes */}
            {row1.map((node, i) => {
              const pos = getPos(0, i);
              return (
                <g key={node.title}>
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={boxW}
                    height={boxH}
                    rx="12"
                    fill="rgba(20,20,20,0.8)"
                    stroke="url(#goldGrad)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={pos.x + boxW / 2}
                    y={pos.y + 28}
                    textAnchor="middle"
                    fill="rgba(244,244,244,0.92)"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="ui-monospace, monospace"
                    letterSpacing="0.05em"
                  >
                    {node.title.toUpperCase()}
                  </text>
                  <text
                    x={pos.x + boxW / 2}
                    y={pos.y + 48}
                    textAnchor="middle"
                    fill="rgba(154,154,154,0.9)"
                    fontSize="10"
                    fontFamily="ui-monospace, monospace"
                  >
                    {node.subtitle}
                  </text>
                </g>
              );
            })}

            {/* Row 1 horizontal arrows */}
            {[0, 1, 2].map((i) => {
              const from = getPos(0, i);
              const to = getPos(0, i + 1);
              return (
                <line
                  key={`r1-arrow-${i}`}
                  x1={from.x + boxW}
                  y1={from.y + boxH / 2}
                  x2={to.x - 6}
                  y2={to.y + boxH / 2}
                  stroke="rgba(201,168,76,0.7)"
                  strokeWidth="2"
                  markerEnd="url(#arrowHead)"
                />
              );
            })}

            {/* Vertical arrow from row 1 to row 2 (Identity → Safety) */}
            <path
              d={`M ${getPos(0, 3).x + boxW / 2} ${getPos(0, 3).y + boxH}
                  L ${getPos(0, 3).x + boxW / 2} ${row2Y - 10}
                  L ${getPos(1, 0).x + boxW / 2} ${row2Y - 10}
                  L ${getPos(1, 0).x + boxW / 2} ${row2Y - 6}`}
              stroke="rgba(201,168,76,0.7)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowHead)"
            />

            {/* Row 2 nodes */}
            {row2.map((node, i) => {
              const pos = getPos(1, i);
              const isBroadcast = i === 3;
              return (
                <g key={node.title}>
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={boxW}
                    height={boxH}
                    rx="12"
                    fill={isBroadcast ? "rgba(201,168,76,0.1)" : "rgba(20,20,20,0.8)"}
                    stroke={isBroadcast ? "rgba(201,168,76,0.5)" : "url(#goldGrad)"}
                    strokeWidth={isBroadcast ? "2" : "1.5"}
                  />
                  <text
                    x={pos.x + boxW / 2}
                    y={pos.y + 28}
                    textAnchor="middle"
                    fill={isBroadcast ? "rgba(201,168,76,1)" : "rgba(244,244,244,0.92)"}
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="ui-monospace, monospace"
                    letterSpacing="0.05em"
                  >
                    {node.title.toUpperCase()}
                  </text>
                  <text
                    x={pos.x + boxW / 2}
                    y={pos.y + 48}
                    textAnchor="middle"
                    fill="rgba(154,154,154,0.9)"
                    fontSize="10"
                    fontFamily="ui-monospace, monospace"
                  >
                    {node.subtitle}
                  </text>
                </g>
              );
            })}

            {/* Row 2 horizontal arrows */}
            {[0, 1, 2].map((i) => {
              const from = getPos(1, i);
              const to = getPos(1, i + 1);
              return (
                <line
                  key={`r2-arrow-${i}`}
                  x1={from.x + boxW}
                  y1={from.y + boxH / 2}
                  x2={to.x - 6}
                  y2={to.y + boxH / 2}
                  stroke="rgba(201,168,76,0.7)"
                  strokeWidth="2"
                  markerEnd="url(#arrowHead)"
                />
              );
            })}
          </svg>
        </div>

        {/* Constraint text - moved outside SVG for proper wrapping */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-2 gap-y-1 text-center">
          <span className="font-mono text-[10px] sm:text-xs tracking-wide text-[rgba(154,154,154,0.8)]">
            NO BROADCAST UNTIL:
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-wide text-[color:var(--custodi-gold)]">
            NON-RED VERDICT
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-[rgba(154,154,154,0.5)]">•</span>
          <span className="font-mono text-[10px] sm:text-xs tracking-wide text-[color:var(--custodi-gold)]">
            WALLET PRE-APPROVAL
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-[rgba(154,154,154,0.5)]">•</span>
          <span className="font-mono text-[10px] sm:text-xs tracking-wide text-[color:var(--custodi-gold)]">
            LEDGER RECORDED
          </span>
        </div>

        <p className="mt-3 text-xs text-[color:var(--mid)] text-center mt-14">
          Diagram is illustrative. Agent boundaries and execution gates are enforced by orchestration.
        </p>
      </div>
    </section>
  );
}