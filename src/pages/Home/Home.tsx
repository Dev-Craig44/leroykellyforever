import { Link } from "react-router-dom";
import { Button } from "../../components";
import FooterSection from "../../sections/Footer";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";

export default function Home() {
  return (
    <main className="bg-white text-zinc-900">
      <HeroSection />

      <LegacyStatsSection />

      <div className="px-6 py-16 text-center animate-slideUp">
        <Link to="/drop">
          <Button variant="primary" size="lg">
            View Edition I
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </Button>
        </Link>
      </div>

      <FooterSection />
    </main>
  );
}
