import React from "react";

type Node = {
  title: string;
  subtitle?: string;
};

const nodes: Node[] = [
  { title: "Intent", subtitle: "User action" },
  { title: "Orchestrator", subtitle: "Routing + state" },
  { title: "Entitlements", subtitle: "Plan gate" },
  { title: "Identity", subtitle: "KYC + session scope" },
  { title: "Personal Safety + Risk", subtitle: "Signals + AML velocity" },
  { title: "Wallet", subtitle: "Pre-approve + rail" },
  { title: "Ledger", subtitle: "Append-only audit" },
  { title: "Broadcast", subtitle: "On-chain execution" },
];

export default function ArchitectureDiagram() {
  // Diagram layout: stacked nodes + arrows, with side "Local evaluation" bracket.
  // Tuned for responsive width.
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[#14141466] p-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[11px] tracking-[0.20em] text-[color:var(--mid)]">
            ARCHITECTURE DIAGRAM
          </div>
          <div className="mt-1 text-sm text-[rgba(244,244,244,.78)]">
            Structured execution pipeline. No broadcast before non-RED verdict.
          </div>
        </div>

        <div className="hidden sm:block font-mono text-[11px] tracking-[0.20em] text-[color:var(--custodi-gold)]">
          v1.1
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg
          viewBox="0 0 1040 420"
          width="100%"
          height="auto"
          role="img"
          aria-label="Custodi agent execution pipeline diagram"
        >
          <defs>
            <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(201,168,76,0.75)" />
              <stop offset="100%" stopColor="rgba(201,168,76,0.25)" />
            </linearGradient>

            <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(201,168,76,0.75)" />
            </marker>

            <style>
              {`
                .node-title { font: 600 13px var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; fill: rgba(244,244,244,.92); letter-spacing: 0.06em; }
                .node-sub   { font: 400 11px var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; fill: rgba(154,154,154,.95); letter-spacing: 0.05em; }
                .small-cap  { font: 600 11px var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; fill: rgba(154,154,154,.95); letter-spacing: 0.20em; }
              `}
            </style>
          </defs>

          {/* Background panel */}
          <rect
            x="10"
            y="10"
            width="1020"
            height="400"
            rx="18"
            fill="rgba(30,30,30,0.72)"
            stroke="rgba(42,42,42,0.95)"
          />

          {/* Subtle gold rails */}
          <path
            d="M 55 55 C 260 5, 430 10, 560 60"
            stroke="rgba(201,168,76,0.12)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 90 375 C 320 430, 520 420, 820 355"
            stroke="rgba(201,168,76,0.10)"
            strokeWidth="2"
            fill="none"
          />

          {/* Local evaluation bracket */}
          <g>
            <path
              d="M 780 92 L 940 92 L 940 308 L 780 308"
              fill="none"
              stroke="rgba(201,168,76,0.35)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <text x="792" y="82" className="small-cap">
              LOCAL EVALUATION
            </text>
            <text x="792" y="332" className="node-sub">
              No external API calls during evaluation
            </text>
          </g>

          {/* Nodes */}
          {nodes.map((n, i) => {
            const x = 70 + i * 115; // horizontal flow
            const y = 165;
            const w = 108;
            const h = 90;

            // Wrap last node (Broadcast) slightly down for visual emphasis
            const yy = i === nodes.length - 1 ? y + 105 : y;
            const xx = i === nodes.length - 1 ? x - 40 : x;

            // Box styles
            return (
              <g key={n.title}>
                <rect
                  x={xx}
                  y={yy}
                  width={w}
                  height={h}
                  rx="16"
                  fill="rgba(20,20,20,0.70)"
                  stroke="rgba(42,42,42,0.95)"
                />
                <rect
                  x={xx}
                  y={yy}
                  width={w}
                  height={h}
                  rx="16"
                  fill="none"
                  stroke="url(#goldStroke)"
                  strokeWidth="1.5"
                  opacity="0.55"
                  filter="url(#softGlow)"
                />
                <text x={xx + 14} y={yy + 34} className="node-title">
                  {n.title.toUpperCase()}
                </text>
                {n.subtitle ? (
                  <text x={xx + 14} y={yy + 58} className="node-sub">
                    {n.subtitle}
                  </text>
                ) : null}
              </g>
            );
          })}

          {/* Arrows between nodes (except last) */}
          {nodes.slice(0, -1).map((_, i) => {
            const x1 = 70 + i * 115 + 108;
            const y1 = 165 + 45;
            const x2 = 70 + (i + 1) * 115;
            const y2 = 165 + 45;

            // Special arrow into Broadcast node (it is offset)
            const isToBroadcast = i === nodes.length - 2;
            const tx2 = isToBroadcast ? x2 - 40 : x2;
            const ty2 = isToBroadcast ? y2 + 105 : y2;

            return (
              <path
                key={`arrow-${i}`}
                d={`M ${x1 + 8} ${y1} L ${tx2 - 8} ${ty2}`}
                stroke="rgba(201,168,76,0.70)"
                strokeWidth="2"
                fill="none"
                markerEnd="url(#arrow)"
                opacity="0.85"
              />
            );
          })}

          {/* Constraint callout */}
          <g>
            <rect
              x="60"
              y="55"
              width="520"
              height="72"
              rx="16"
              fill="rgba(20,20,20,0.62)"
              stroke="rgba(42,42,42,0.95)"
            />
            <text x="80" y="82" className="small-cap">
              CONSTRAINT
            </text>
            <text x="80" y="105" className="node-sub">
              No broadcast until: (1) non-RED verdict (2) wallet pre-approval (3) ledger recorded
            </text>
          </g>
        </svg>
      </div>

      <p className="mt-3 text-xs text-[color:var(--mid)]">
        Diagram is illustrative. Agent boundaries and execution gates are enforced by orchestration.
      </p>
    </div>
  );
}