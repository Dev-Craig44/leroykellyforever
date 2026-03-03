const legacyHighlights = [
  { label: "Career Rushing Yards", value: <span>7,274</span> },
  { label: "Career Rushing TDs", value: <span>74</span> },
  { label: "Scrimmage Yards", value: <span>9,555</span> },
  {
    label: "Hall of Fame",
    value: (
      <span className="leading-[0.95]">
        <span className="block">1994</span>
        <span className="block text-[0.48em] tracking-[0.35em]">
          HALL OF FAME
        </span>
      </span>
    ),
  },
  {
    label: "Pro Bowls",
    value: (
      <span className="leading-[0.95]">
        <span className="block">6</span>
        <span className="block text-[0.48em] tracking-[0.35em]">PRO BOWLS</span>
      </span>
    ),
  },
];

const marqueeItems = [
  "NFL Rushing Leader (1967, 1968)",
  "Enshrined July 30, 1994",
  "All-NFL honors (5x)",
  "Browns legend",
];

export default function LegacyStatsSection() {
  // Duplicate items for seamless loop
  const loopItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Stat cards */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {legacyHighlights.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-6xl font-medium tracking-tight text-zinc-900 drop-shadow-sm">
                {stat.value}
              </div>
              {stat.label !== "Pro Bowls" && stat.label !== "Hall of Fame" && (
                <div className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
                  {stat.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Marquee...luxury version */}
        <div className="mt-10 relative overflow-hidden border-y border-gray-100 bg-gradient-to-b from-white to-zinc-100 shadow-inner">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max items-center gap-8 px-6 py-6 animate-marquee whitespace-nowrap motion-reduce:animate-none">
            {loopItems.map((item, idx) => (
              <div key={`${item}-${idx}`} className="flex items-center gap-6">
                <span className="text-[16px] tracking-[0.22em] uppercase text-gray-800">
                  {item}
                </span>
                {/* hairline divider */}
                <span className="h-3 w-px bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
