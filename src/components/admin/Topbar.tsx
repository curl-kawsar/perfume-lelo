import { Suspense } from "react";
import { TableSearch } from "./TableSearch";

export function Topbar({
  title,
  subtitle,
  action,
  /** Omit on pages with no table to filter. */
  searchPlaceholder,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  searchPlaceholder?: string;
}) {
  return (
    <header className="sticky top-0 z-20 border-b border-grid bg-surface/85 backdrop-blur-sm">
      <div className="flex h-14 items-center gap-4 px-5 lg:px-8">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink-1">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-[0.75rem] text-ink-3">{subtitle}</p>
          ) : null}
        </div>

        {searchPlaceholder ? (
          // useSearchParams needs a boundary so the rest of the page can still
          // be prerendered.
          <Suspense
            fallback={<div className="h-8 w-44 rounded-md border border-grid sm:w-60" />}
          >
            <TableSearch placeholder={searchPlaceholder} />
          </Suspense>
        ) : null}

        {action}
      </div>
    </header>
  );
}
