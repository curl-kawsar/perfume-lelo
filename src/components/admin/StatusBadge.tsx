import type { OrderStatus, ProductStatus } from "@/lib/mock-data";

type Tone = "good" | "warning" | "serious" | "critical" | "neutral";

const tone: Record<Tone, string> = {
  good: "border-good/35 bg-good/10 text-success-ink",
  warning: "border-warning/45 bg-warning/15 text-[#7a5300]",
  serious: "border-serious/45 bg-serious/15 text-[#8c3d17]",
  critical: "border-critical/35 bg-critical/10 text-critical",
  neutral: "border-grid bg-plane text-ink-2",
};

const orderTone: Record<OrderStatus, { tone: Tone; label: string }> = {
  paid: { tone: "good", label: "Paid" },
  fulfilled: { tone: "neutral", label: "Fulfilled" },
  pending: { tone: "warning", label: "Pending" },
  refunded: { tone: "serious", label: "Refunded" },
  cancelled: { tone: "critical", label: "Cancelled" },
};

const productTone: Record<ProductStatus, { tone: Tone; label: string }> = {
  live: { tone: "good", label: "Live" },
  low: { tone: "warning", label: "Low stock" },
  out: { tone: "critical", label: "Out of stock" },
  draft: { tone: "neutral", label: "Draft" },
};

/**
 * Status always ships as a dot plus a word — hue never carries the meaning on
 * its own, which matters most for warning and serious on a light surface.
 */
function Badge({ t, label }: { t: Tone; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.75rem] font-medium ${tone[t]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {label}
    </span>
  );
}

export function OrderBadge({ status }: { status: OrderStatus }) {
  const { tone: t, label } = orderTone[status];
  return <Badge t={t} label={label} />;
}

export function ProductBadge({ status }: { status: ProductStatus }) {
  const { tone: t, label } = productTone[status];
  return <Badge t={t} label={label} />;
}
