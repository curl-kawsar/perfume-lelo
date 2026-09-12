"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive, navSections } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-grid bg-plane lg:flex lg:flex-col">
      <div className="flex h-14 items-center gap-2.5 border-b border-grid px-5">
        <span className="grid h-6 w-6 place-items-center rounded bg-ink-1 text-[0.6875rem] font-semibold text-white">
          D
        </span>
        <span className="text-[0.875rem] font-semibold tracking-[-0.01em] text-ink-1">
          Demo
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Admin">
        {navSections.map((section) => (
          <div key={section.heading} className="mb-6 last:mb-0">
            <h2 className="px-2 pb-2 text-[0.6875rem] font-medium text-ink-3">
              {section.heading}
            </h2>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href, pathname);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[0.8125rem] transition-colors ${
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
          </div>
        ))}
      </nav>

      <div className="border-t border-grid p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-grid text-[0.6875rem] font-medium text-ink-2">
            KA
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.8125rem] font-medium text-ink-1">
              Kawsar Ahmed
            </p>
            <p className="truncate text-[0.75rem] text-ink-3">Owner</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
