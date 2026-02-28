import EmailCaptureSection from "../../sections/EmailCaptureSection";
import FooterSection from "../../sections/Footer";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";
import SealSection from "../../sections/SealSection";

export default function Drop() {
  return (
    <main className="bg-white text-zinc-900">
      <section className="px-6 pt-20 pb-10 text-center animate-fadeIn">
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
      <EmailCaptureSection />
      <SealSection />
      <LegacyStatsSection />
      <FooterSection />
    </main>
  );
}
