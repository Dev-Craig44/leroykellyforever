import FooterSection from "../../sections/Footer";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";

export default function Home() {
  return (
    <main className="bg-white text-zinc-900">
      <HeroSection />
      <LegacyStatsSection />
      <HatVideoCardSection />
      <FooterSection />
    </main>
  );
}
