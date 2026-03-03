import { useScrollPosition } from "../../hooks/useScrollPosition";

export default function HeroSection() {
  const scrollY = useScrollPosition();

  return (
    <section className="bg-gradient-to-b from-white to-zinc-50">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-32 sm:pb-24 text-center">
        <img
          src="/logos/L_Kelly_logo_master_nosquare.png"
          alt="Leroy Kelly Forever"
          className="mx-auto w-32 h-auto mb-8 opacity-90 animate-fadeIn drop-shadow-sm"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            willChange: "transform",
          }}
        />
        <p className="text-xs tracking-[0.35em] uppercase text-zinc-400 animate-fadeIn">
          Hall of Fame Legacy
        </p>

        <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight animate-slideUp drop-shadow-sm">
          Leroy Kelly
          <span className="block text-zinc-500 font-extrabold opacity-80">
            Forever
          </span>
        </h1>

        <p
          className="mt-8 text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed animate-fadeIn"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          A limited release honoring greatness. Join the private list for first
          access to the official drop.
        </p>
      </div>
    </section>
  );
}
