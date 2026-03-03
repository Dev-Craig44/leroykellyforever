import { Link } from "react-router-dom";
import { Button, MetaTags } from "../../components";
import { useInView } from "../../hooks/useInView";
import FooterSection from "../../sections/Footer";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";
import VideoSubmissionSection from "../../sections/VideoSubmissionSection";

export default function Home() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <main className="bg-white text-zinc-900">
      <MetaTags
        title="Leroy Kelly Forever | Hall of Fame Legacy Hat Drop"
        description="Honoring Cleveland Browns Hall of Fame RB Leroy Kelly (1964-1973, 7,274 career rushing yards) with a limited 50-hat release. Join the private list for exclusive first access to Edition I."
        path="/"
      />
      <HeroSection />

      <LegacyStatsSection />

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

      <VideoSubmissionSection />

      <FooterSection />
    </main>
  );
}
