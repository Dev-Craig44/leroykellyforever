import { Link } from "react-router-dom";
import { Button, MetaTags } from "../../components";
import FooterSection from "../../sections/Footer";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";

export default function Home() {
  return (
    <main className="bg-white text-zinc-900">
      <MetaTags
        title="Leroy Kelly Forever | Hall of Fame Legacy Hat Drop"
        description="Honoring Cleveland Browns Hall of Fame RB Leroy Kelly (1964-1973, 7,274 career rushing yards) with a limited 50-hat release. Join the private list for exclusive first access to Edition I."
        path="/"
      />
      <HeroSection />

      <LegacyStatsSection />

      <div className="bg-white px-6 py-10 text-center animate-slideUp">
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
    </main>
  );
}
