export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-100">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-32 sm:pb-24 text-center">
        <img
          src="/logos/L_Kelly_logo_master_nosquare.png"
          alt="Leroy Kelly Forever"
          className="mx-auto w-32 h-auto mb-8 opacity-90 animate-fadeIn"
        />
        <p className="text-xs tracking-[0.35em] uppercase text-zinc-400 animate-fadeIn">
          Hall of Fame Legacy
        </p>

        <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight animate-slideUp">
          Leroy Kelly
          <span className="block text-zinc-300 font-extrabold opacity-80">
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
