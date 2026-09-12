"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, navSections } from "./nav-items";

const items = navSections.flatMap((section) => section.items);

/** Below the sidebar breakpoint the same destinations become a scrollable row. */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-grid bg-plane lg:hidden">
      <div className="flex h-12 items-center gap-2.5 px-5">
        <span className="grid h-5 w-5 place-items-center rounded bg-ink-1 text-[0.625rem] font-semibold text-white">
          D
        </span>
        <span className="text-[0.8125rem] font-semibold tracking-[-0.01em] text-ink-1">
          Demo
        </span>
        <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-grid text-[0.625rem] font-medium text-ink-2">
          KA
        </span>
      </div>

      <nav aria-label="Admin" className="overflow-x-auto">
        <ul className="flex w-max gap-1 px-4 pb-2">
          {items.map((item) => {
            const active = isActive(item.href, pathname);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-[0.8125rem] transition-colors ${
                    active
                      ? "bg-ink-1 font-medium text-white"
                      : "text-ink-2 hover:bg-grid/60 hover:text-ink-1"
                  }`}
                >
                  <Icon />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
