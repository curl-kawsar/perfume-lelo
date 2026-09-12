/** One source of truth for admin navigation, shared by the sidebar and the
 *  compact top nav so the two can never drift apart. */

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function GridIcon() {
  return (
    <svg {...base}>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

export function ReceiptIcon() {
  return (
    <svg {...base}>
      <path d="M3.5 1.8v12.4l2-1.2 2 1.2 2-1.2 2 1.2V1.8z" />
      <path d="M6 5.5h4M6 8.5h4" />
    </svg>
  );
}

export function BottleIcon() {
  return (
    <svg {...base}>
      <path d="M6.5 1.5h3v2.2l1.6 1.8v8.2a.8.8 0 0 1-.8.8H5.7a.8.8 0 0 1-.8-.8V5.5l1.6-1.8z" />
      <path d="M5 9.5h6" />
    </svg>
  );
}

export function PeopleIcon() {
  return (
    <svg {...base}>
      <circle cx="6" cy="5.5" r="2.5" />
      <path d="M1.8 14a4.2 4.2 0 0 1 8.4 0" />
      <path d="M10.5 3.6a2.4 2.4 0 0 1 0 4.5M11.4 10.4A4.2 4.2 0 0 1 14.2 14" />
    </svg>
  );
}

export function StoreIcon() {
  return (
    <svg {...base}>
      <path d="M2 6.2 3.2 2.5h9.6L14 6.2" />
      <path d="M2 6.2a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      <path d="M3 8.4V14h10V8.4" />
    </svg>
  );
}

export function SlidersIcon() {
  return (
    <svg {...base}>
      <path d="M2 4.5h5M11 4.5h3M2 11.5h3M9 11.5h5" />
      <circle cx="9" cy="4.5" r="1.8" />
      <circle cx="7" cy="11.5" r="1.8" />
    </svg>
  );
}

export type NavItem = {
  label: string;
  href: string;
  icon: () => React.ReactElement;
};

export const navSections: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Trade",
    items: [
      { label: "Dashboard", href: "/admin", icon: GridIcon },
      { label: "Orders", href: "/admin/orders", icon: ReceiptIcon },
      { label: "Products", href: "/admin/products", icon: BottleIcon },
      { label: "Customers", href: "/admin/customers", icon: PeopleIcon },
    ],
  },
  {
    heading: "Shop",
    items: [
      { label: "Storefront", href: "/", icon: StoreIcon },
      { label: "Settings", href: "/admin/settings", icon: SlidersIcon },
    ],
  },
];

/** "/admin" must match exactly, or it would light up on every child route. */
export function isActive(href: string, pathname: string) {
  if (href === "/") return false;
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}
