"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Search lives in the URL rather than component state: the result is
 * linkable, survives a reload, and the page filters on the server.
 */
export function TableSearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";

  const [value, setValue] = useState(urlQuery);

  // Keep the field honest when the URL changes underneath it — back button,
  // or the clear control below.
  useEffect(() => {
    setValue(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (value === urlQuery) return;
    const id = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (value.trim()) next.set("q", value);
      else next.delete("q");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 200);
    return () => clearTimeout(id);
  }, [value, urlQuery, params, pathname, router]);

  return (
    <div className="relative">
      <label className="sr-only" htmlFor="admin-search">
        {placeholder}
      </label>
      <svg
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-3"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="6" cy="6" r="4.3" stroke="currentColor" strokeWidth="1.4" />
        <path
          d="m9.4 9.4 3 3"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>

      <input
        id="admin-search"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-44 rounded-md border border-grid bg-surface pl-8 pr-7 text-[0.8125rem] text-ink-1 placeholder:text-ink-3 focus:border-rule focus:outline-none sm:w-60"
      />

      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-ink-3 transition-colors hover:bg-plane hover:text-ink-1"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="m3 3 6 6M9 3l-6 6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
