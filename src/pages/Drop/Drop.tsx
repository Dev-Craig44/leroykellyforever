import { MetaTags } from "../../components";
import EmailCaptureSection from "../../sections/EmailCaptureSection";
import FooterSection from "../../sections/Footer";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";
import SealSection from "../../sections/SealSection";

export default function Drop() {
  return (
    <main className="bg-white text-zinc-900">
      <MetaTags
        title="Edition I - The First 50 | Leroy Kelly Forever"
        description="Secure your Leroy Kelly Forever Hat. Limited to 50 pieces. Official legacy release honoring the Hall of Fame running back. Ships within 48 hours."
        path="/drop"
      />
      <section className="px-6 pt-20 pb-10 text-center animate-fadeIn">
        <img
          src="/logos/L_Kelly_logo_master_nosquare.png"
          alt="Leroy Kelly Forever"
          className="mx-auto w-32 h-auto mb-8 opacity-90"
        />
        <p className="text-xs tracking-[0.35em] text-zinc-500 uppercase">
          Edition I
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          The First 50
        </h1>
        <p className="mx-auto mt-4 max-w-md text-zinc-600">
          A controlled release. 50 hats. Private access required.
        </p>
      </section>
      <HatVideoCardSection />
      <LegacyStatsSection />
      <EmailCaptureSection />
      <SealSection />
      <FooterSection />
    </main>
  );
}
