"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { MonthPoint } from "@/lib/mock-data";

const HEIGHT = 268;
const PAD = { top: 18, right: 20, bottom: 30, left: 56 };

const shortGbp = (n: number) =>
  n >= 1000 ? `£${Math.round(n / 1000)}k` : `£${n}`;
const fullGbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/**
 * Revenue over twelve months. One series, so there is no legend — the heading
 * names it — and the latest point carries the only direct label.
 */
export function RevenueChart({ data }: { data: MonthPoint[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(880);
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const gradientId = useId();

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.max(320, entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const geom = useMemo(() => {
    const innerW = width - PAD.left - PAD.right;
    const innerH = HEIGHT - PAD.top - PAD.bottom;
    const max = Math.max(...data.map((d) => d.revenue));
    // Round the ceiling up to a clean 20k so the ticks read as round numbers.
    const ceiling = Math.ceil(max / 20000) * 20000;

    const x = (i: number) =>
      PAD.left + (data.length === 1 ? 0 : (innerW * i) / (data.length - 1));
    const y = (v: number) => PAD.top + innerH - (v / ceiling) * innerH;

    const points = data.map((d, i) => ({ ...d, cx: x(i), cy: y(d.revenue) }));
    const line = points.map((p) => `${p.cx},${p.cy}`).join(" ");
    const area = `M${points[0].cx},${PAD.top + innerH} L${line
      .split(" ")
      .join(" L")} L${points[points.length - 1].cx},${PAD.top + innerH} Z`;

    const ticks = Array.from({ length: 5 }, (_, i) => {
      const v = (ceiling / 4) * i;
      return { v, y: y(v) };
    });

    return { points, line, area, ticks, innerH };
  }, [data, width]);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * width;
    let nearest = 0;
    let best = Infinity;
    geom.points.forEach((p, i) => {
      const d = Math.abs(p.cx - px);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHover(nearest);
  };

  const active = hover === null ? null : geom.points[hover];
  const latest = geom.points[geom.points.length - 1];

  return (
    <section className="rounded-lg border border-grid bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-grid px-4 py-3">
        <div>
          <h2 className="text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">
            Revenue
          </h2>
          <p className="text-[0.75rem] text-ink-3">Last twelve months</p>
        </div>

        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          className="rounded-md border border-grid px-2.5 py-1 text-[0.75rem] font-medium text-ink-2 transition-colors hover:bg-plane hover:text-ink-1"
          aria-expanded={showTable}
        >
          {showTable ? "Show chart" : "Show table"}
        </button>
      </div>

      {showTable ? (
        <div className="max-h-[268px] overflow-y-auto p-4">
          <table className="w-full text-[0.8125rem]">
            <caption className="sr-only">
              Revenue and orders by month, last twelve months
            </caption>
            <thead>
              <tr className="border-b border-grid text-left text-ink-2">
                <th scope="col" className="pb-2 font-medium">
                  Month
                </th>
                <th scope="col" className="pb-2 text-right font-medium">
                  Revenue
                </th>
                <th scope="col" className="pb-2 text-right font-medium">
                  Orders
                </th>
              </tr>
            </thead>
            <tbody className="tnum">
              {data.map((d) => (
                <tr key={d.month} className="border-b border-grid/70 last:border-0">
                  <td className="py-1.5 text-ink-1">{d.month}</td>
                  <td className="py-1.5 text-right text-ink-1">
                    {fullGbp.format(d.revenue)}
                  </td>
                  <td className="py-1.5 text-right text-ink-2">{d.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div ref={wrap} className="relative p-2">
          <svg
            width="100%"
            viewBox={`0 0 ${width} ${HEIGHT}`}
            height={HEIGHT}
            role="img"
            aria-label="Revenue by month for the last twelve months, rising from £41,200 in October to £78,200 in September"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
            style={{ touchAction: "pan-y" }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a78d6" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#2a78d6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Gridlines and ticks stay recessive. */}
            {geom.ticks.map((t) => (
              <g key={t.v}>
                <line
                  x1={PAD.left}
                  x2={width - PAD.right}
                  y1={t.y}
                  y2={t.y}
                  stroke="#e1e0d9"
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 10}
                  y={t.y + 4}
                  textAnchor="end"
                  className="tnum"
                  fontSize="11"
                  fill="#898781"
                >
                  {shortGbp(t.v)}
                </text>
              </g>
            ))}

            <line
              x1={PAD.left}
              x2={width - PAD.right}
              y1={PAD.top + geom.innerH}
              y2={PAD.top + geom.innerH}
              stroke="#c3c2b7"
              strokeWidth="1"
            />

            <path d={geom.area} fill={`url(#${gradientId})`} />
            <polyline
              points={geom.line}
              fill="none"
              stroke="#2a78d6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {geom.points.map((p) => (
              <text
                key={p.month}
                x={p.cx}
                y={HEIGHT - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#898781"
              >
                {p.month}
              </text>
            ))}

            {/* The only direct label: where the series ends up. */}
            {hover === null && (
              <>
                <circle
                  cx={latest.cx}
                  cy={latest.cy}
                  r="4.5"
                  fill="#2a78d6"
                  stroke="#fcfcfb"
                  strokeWidth="2"
                />
                <text
                  x={latest.cx}
                  y={latest.cy - 12}
                  textAnchor="end"
                  className="tnum"
                  fontSize="11.5"
                  fontWeight="600"
                  fill="#0b0b0b"
                >
                  {fullGbp.format(latest.revenue)}
                </text>
              </>
            )}

            {active && (
              <>
                <line
                  x1={active.cx}
                  x2={active.cx}
                  y1={PAD.top}
                  y2={PAD.top + geom.innerH}
                  stroke="#c3c2b7"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={active.cx}
                  cy={active.cy}
                  r="5"
                  fill="#2a78d6"
                  stroke="#fcfcfb"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {active && (
            <div
              className="pointer-events-none absolute top-4 z-10 -translate-x-1/2 rounded-md border border-grid bg-surface px-2.5 py-1.5 shadow-sm"
              style={{
                left: `${(active.cx / width) * 100}%`,
              }}
            >
              <p className="text-[0.75rem] font-medium text-ink-1">
                {active.month}
              </p>
              <p className="tnum text-[0.8125rem] font-semibold text-ink-1">
                {fullGbp.format(active.revenue)}
              </p>
              <p className="tnum text-[0.75rem] text-ink-2">
                {active.orders} orders
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
