import { Navbar } from "./Navbar";
import { SceneLayer } from "./SceneLayer";

const notes = [
  { stage: "Top", accord: "Bergamot, pink pepper" },
  { stage: "Heart", accord: "Iris, cashmere leather" },
  { stage: "Base", accord: "Oud, vetiver, ambrette" },
];

export function Hero() {
  return (
    <section className="cyclorama relative min-h-svh overflow-hidden">
      <Navbar />

      <div className="relative mx-auto flex min-h-svh max-w-[1240px] flex-col px-6 pb-12 pt-28 md:px-10 md:pt-32">
        {/* Layer 1 — type. The bottle stands in front of the last line. */}
        <h1
          className="rise relative z-10 text-center font-display text-[clamp(2.25rem,6.4vw,4.75rem)] font-normal leading-[1.06] tracking-[-0.018em] text-ink"
          style={{ animationDelay: "120ms" }}
        >
          <span className="block">Elevate your senses</span>
          <span className="block">with an exquisite</span>
          <span className="block">selection of fragrances</span>
        </h1>

        {/* Layer 2 — the bottle. It overlaps the headline above it by the
            negative margin, and stops short of the copy below. */}
        <div className="relative z-20 -mt-[clamp(2rem,5vw,4rem)] h-[clamp(15rem,33vh,21rem)] w-full">
          <SceneLayer />
        </div>

        {/* Layer 3 — everything you can act on, clear of the glass. */}
        <div
          className="rise relative z-30 mx-auto max-w-[34ch] text-center"
          style={{ animationDelay: "320ms" }}
        >
          <p className="text-[0.9375rem] font-light leading-relaxed text-mist">
            Six compositions, distilled in Grasse and aged twelve weeks before
            bottling.
          </p>

          <a
            href="#fragrances"
            className="mt-6 inline-block rounded-full bg-ink px-8 py-3.5 text-[0.8125rem] font-medium tracking-[0.01em] text-porcelain transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#0d1114]"
          >
            Discover our fragrances
          </a>
        </div>

        {/* The one piece of glass chrome on the page, carrying real data. */}
        <aside
          className="rise relative z-30 mt-10 w-full max-w-[17.5rem] self-center rounded-2xl border border-white/70 bg-white/40 p-5 shadow-[0_1px_2px_rgba(23,28,31,0.04),0_12px_40px_-12px_rgba(23,28,31,0.14)] backdrop-blur-xl backdrop-saturate-150 lg:absolute lg:bottom-14 lg:right-10 lg:mt-0 lg:self-auto"
          style={{ animationDelay: "560ms" }}
          aria-label="Featured fragrance"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-display text-[1.0625rem] leading-none text-ink">
              Noir Absolu
            </h2>
            <span className="text-[0.8125rem] font-light text-mist">
              100&nbsp;ml
            </span>
          </div>

          <dl className="mt-4 space-y-1.5 border-t border-hairline/70 pt-4">
            {notes.map((note) => (
              <div key={note.stage} className="flex gap-3 text-[0.8125rem]">
                <dt className="w-11 shrink-0 font-light text-mist">
                  {note.stage}
                </dt>
                <dd className="font-light text-ink">{note.accord}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 border-t border-hairline/70 pt-4 text-[0.9375rem] text-ink">
            £180
          </p>
        </aside>
      </div>
    </section>
  );
}
