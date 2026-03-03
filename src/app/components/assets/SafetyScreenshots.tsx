"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Tab = "green" | "amber" | "red";

const tabs: { key: Tab; title: string; subtitle: string; badge: string; color: string }[] = [
  { key: "green", title: "GREEN verdict", subtitle: "Execution cleared", badge: "GREEN", color: "var(--green)" },
  {
    key: "amber",
    title: "AMBER verdict",
    subtitle: "Cooling off enforced (30s)",
    badge: "AMBER",
    color: "var(--amber)",
  },
  { key: "red", title: "RED verdict", subtitle: "Execution blocked", badge: "RED", color: "var(--red)" },
];

export default function SafetyScreenshots() {
  const [active, setActive] = useState<Tab>("green");

  const activeMeta = useMemo(() => tabs.find((t) => t.key === active)!, [active]);

  const src =
    active === "green"
      ? "/screens/safety-green.png"
      : active === "amber"
      ? "/screens/safety-amber.png"
      : "/screens/safety-red.png";

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[#1e1e1ecc] p-5">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left column - Toggle controls */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <div>
            <div className="font-mono text-[11px] tracking-[0.20em] text-[color:var(--mid)]">
              SAFETY REVIEW UI
            </div>
            <h3 className="mt-2 text-xl font-semibold">{activeMeta.title}</h3>
            <p className="mt-1 text-sm text-[color:var(--mid)]">{activeMeta.subtitle}</p>
          </div>

          <div className="flex flex-col gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all ${
                  active === t.key
                    ? "border-[rgba(201,168,76,.45)] bg-[#14141466] text-[color:var(--off-white)]"
                    : "border-[color:var(--border)] bg-[#14141433] text-[color:var(--mid)] hover:bg-[#14141466]"
                }`}
              >
                <span>{t.title}</span>
                <span
                  className="rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-[0.15em]"
                  style={{
                    color: t.color,
                    borderColor: `color-mix(in srgb, ${t.color} 35%, transparent)`,
                    background: `color-mix(in srgb, ${t.color} 12%, transparent)`,
                  }}
                >
                  {t.badge}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-auto text-xs text-[color:var(--mid)]">
            Verdict colors are semantic and reflect execution state.
          </p>
        </div>

        {/* Right column - Screenshot */}
        <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[#14141466] md:w-2/3">
          <Image
            src={src}
            alt={`Custodi Safety Review ${activeMeta.badge} screenshot`}
            width={980}
            height={1100}
            className="h-auto w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}