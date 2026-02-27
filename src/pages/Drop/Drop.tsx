import EmailCaptureSection from "../../sections/EmailCaptureSection";
import FooterSection from "../../sections/Footer";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";

export default function Drop() {
  return (
    <main className="bg-white text-zinc-900">
      <HeroSection />
      <LegacyStatsSection />
      <HatVideoCardSection />
      <EmailCaptureSection />
      <FooterSection />
    </main>
  );
}
