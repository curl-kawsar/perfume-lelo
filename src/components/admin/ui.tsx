import Link from "next/link";
import type { Route } from "next";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 rounded-lg border border-grid bg-surface ${className}`}>
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-grid px-4 py-3">
      <div className="min-w-0">
        <h2 className="truncate text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">
          {title}
        </h2>
        {meta ? <p className="truncate text-[0.75rem] text-ink-3">{meta}</p> : null}
      </div>
      {action}
    </div>
  );
}

/** Label above value, the shape most detail facts take. */
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[0.75rem] text-ink-3">{label}</dt>
      <dd className="mt-0.5 text-[0.8125rem] text-ink-1">{children}</dd>
    </div>
  );
}

export function BackLink({
  href,
  children,
}: {
  href: Route;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-2 transition-colors hover:text-ink-1"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M8.5 3 4.5 7l4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </Link>
  );
}

/** Decorative row affordance — the row itself carries the link. */
export function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-ink-3"
    >
      <path
        d="m5.5 3 4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EmptyRow({ colSpan, query }: { colSpan: number; query: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-10 text-center">
        <p className="text-[0.8125rem] text-ink-1">
          Nothing matches “{query}”.
        </p>
        <p className="mt-1 text-[0.75rem] text-ink-3">
          Try a name, an email, a SKU, or a status.
        </p>
      </td>
    </tr>
  );
}
