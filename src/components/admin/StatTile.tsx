import type { Kpi } from "@/lib/mock-data";

/**
 * A bare stat tile: one figure, one comparison. No sparkline, so no hover
 * layer — the caption carries the comparison in words.
 */
export function StatTile({ kpi }: { kpi: Kpi }) {
  const up = kpi.deltaPct >= 0;

  return (
    <div className="rounded-lg border border-grid bg-surface p-4">
      <p className="text-[0.75rem] font-medium text-ink-2">{kpi.label}</p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-ink-1">
          {kpi.value}
        </span>
        {/* Direction is carried by the arrow and the sign, not by hue alone. */}
        <span
          className={`flex items-center gap-0.5 text-[0.75rem] font-medium tnum ${
            up ? "text-success-ink" : "text-critical"
          }`}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path
              d={up ? "M5 8.5V2M2 5l3-3 3 3" : "M5 1.5V8M2 5l3 3 3-3"}
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          {up ? "+" : ""}
          {kpi.deltaPct.toFixed(1)}%
        </span>
      </div>

      <p className="mt-2 text-[0.75rem] text-ink-3">{kpi.caption}</p>
    </div>
  );
}
