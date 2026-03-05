import { useScrollPosition } from "../../hooks/useScrollPosition";

export default function HeroSection() {
  const scrollY = useScrollPosition();

  return (
    <section className="relative overflow-hidden min-h-[85vh] sm:min-h-screen">
      {/* Background Video Layer */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-[2px] grayscale-[30%] scale-150"
          style={{ 
            filter: "blur(2px) grayscale(30%)",
            objectPosition: "center center"
          }}
        >
          <source src="/video/LKad (2).MP4" type="video/mp4" />
        </video>
        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-32 sm:pb-24 text-center flex flex-col justify-center min-h-[85vh] sm:min-h-screen">
        <img
          src="/logos/L_Kelly_logo_master_nosquare.png"
          alt="Leroy Kelly Forever"
          className="mx-auto w-32 h-auto mb-8 opacity-90 animate-fadeIn drop-shadow-lg"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
            willChange: "transform",
          }}
        />
        <p className="text-xs tracking-[0.35em] uppercase text-white/80 animate-fadeIn drop-shadow-md">
          Hall of Fame Legacy
        </p>

        <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight animate-slideUp text-white drop-shadow-2xl font-display">
          Leroy Kelly
          <span className="block text-white/90 font-extrabold font-display">
            Forever
          </span>
        </h1>

        <p
          className="mt-8 text-xl text-white/90 max-w-2xl mx-auto leading-relaxed animate-fadeIn drop-shadow-lg"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          A limited release honoring greatness. Join the private list for first
          access to the official drop.
        </p>
      </div>
    </section>
  );
}
