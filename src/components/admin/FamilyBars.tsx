import { gbp } from "@/lib/mock-data";

/**
 * Magnitude by olfactory family. Horizontal bars because the categories are
 * words, one hue because there is one measure, and every bar is directly
 * labelled — so no legend and no tooltip to hunt for.
 */
export function FamilyBars({
  data,
}: {
  data: { family: string; revenue: number }[];
}) {
  const max = Math.max(...data.map((d) => d.revenue));

  return (
    <section className="rounded-lg border border-grid bg-surface">
      <div className="border-b border-grid px-4 py-3">
        <h2 className="text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">
          Revenue by family
        </h2>
        <p className="text-[0.75rem] text-ink-3">September</p>
      </div>

      <ul className="space-y-3.5 p-4">
        {data.map((d) => (
          <li key={d.family}>
            <div className="flex items-baseline justify-between gap-3 pb-1.5">
              <span className="text-[0.8125rem] text-ink-1">{d.family}</span>
              <span className="tnum text-[0.8125rem] font-medium text-ink-1">
                {gbp.format(d.revenue)}
              </span>
            </div>
            {/* Track is the plane, not a tinted version of the series hue. */}
            <div className="h-2 w-full rounded-[4px] bg-plane">
              <div
                className="h-2 rounded-r-[4px] bg-series"
                style={{ width: `${(d.revenue / max) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
