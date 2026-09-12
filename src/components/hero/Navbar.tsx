const links = [
  { label: "Fragrances", href: "#fragrances" },
  { label: "The house", href: "#house" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hairline/50 bg-white/40 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-8 px-6 py-4 md:px-10">
        <a
          href="/"
          className="font-display text-[1.0625rem] leading-none tracking-[0.02em] text-ink"
        >
          Demo
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[0.8125rem] font-light tracking-[0.01em] text-mist transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="Search fragrances"
            className="text-mist transition-colors duration-300 hover:text-ink"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="7.2"
                cy="7.2"
                r="5.4"
                stroke="currentColor"
                strokeWidth="1.15"
              />
              <path
                d="m11.4 11.4 3.9 3.9"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 text-[0.8125rem] font-light text-mist transition-colors duration-300 hover:text-ink"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 3h2.1l1.9 8.4h7.3L15 5.4H5"
                stroke="currentColor"
                strokeWidth="1.15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7.1" cy="14" r="1.05" fill="currentColor" />
              <circle cx="12.6" cy="14" r="1.05" fill="currentColor" />
            </svg>
            Bag<span className="text-ink">&nbsp;(0)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
