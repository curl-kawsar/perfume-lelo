"use client";

import { useRouter } from "next/navigation";
import type { Route } from "next";

/**
 * A table row that behaves like a link for the mouse. Keyboard users still
 * reach the destination through the real <Link> in the row's first cell, so
 * this adds convenience without adding a second tab stop.
 */
export function LinkRow({
  href,
  children,
}: {
  href: Route;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <tr
      onClick={(e) => {
        // Let a genuine click on the inner link do its own navigation, and
        // leave text selection alone.
        if ((e.target as HTMLElement).closest("a")) return;
        if (window.getSelection()?.toString()) return;
        router.push(href);
      }}
      className="cursor-pointer border-b border-grid/70 last:border-0 hover:bg-plane"
    >
      {children}
    </tr>
  );
}
