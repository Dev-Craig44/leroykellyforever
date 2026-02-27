import EmailCaptureSection from "../../sections/EmailCaptureSection";
import FooterSection from "../../sections/Footer";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";
import SealSection from "../../sections/SealSection";

export default function Home() {
  return (
    <main className="bg-white text-zinc-900">
      <HeroSection />
      <EmailCaptureSection />
      <SealSection />
      <LegacyStatsSection />
      <HatVideoCardSection />
      <FooterSection />
    </main>
  );
}
