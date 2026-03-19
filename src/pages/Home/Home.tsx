import { Link } from "react-router-dom";
import { Button, MetaTags, Navigation } from "../../components";
import { useInView } from "../../hooks/useInView";
import FooterSection from "../../sections/Footer";
import HatRevealSection from "../../sections/HatRevealSection";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";

export default function Home() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <main className="bg-white text-zinc-900">
      <Navigation />
      <div className="pt-16">
        <MetaTags />
        <HeroSection />

        <LegacyStatsSection />

        <HatRevealSection />

        <div
          ref={ref}
          className={`bg-white px-6 py-10 text-center transition-all duration-700 ${
            isInView
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <Link to="/drop">
            <Button variant="primary" size="lg">
              Secure Access
              <span aria-hidden="true" className="ml-1">
                →
              </span>
            </Button>
          </Link>
        </div>

        <FooterSection />
      </div>
    </main>
  );
}
