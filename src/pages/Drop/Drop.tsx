import { MetaTags } from "../../components";
import { useInventory } from "../../hooks/useInventory";
import EmailCaptureSection from "../../sections/EmailCaptureSection";
import FooterSection from "../../sections/Footer";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";
import SealSection from "../../sections/SealSection";

export default function Drop() {
  const { available, loading } = useInventory({
    limit: 50,
    ttlMs: 30_000,
    fallbackAvailable: 50,
  });

  return (
    <main className="bg-white text-zinc-900">
      <MetaTags
        title="Edition I - The First 50 | Leroy Kelly Forever"
        description="Secure your Leroy Kelly Forever Hat. Limited to 50 pieces. Official legacy release honoring the Hall of Fame running back. Ships within 48 hours."
        path="/drop"
      />

      <section className="bg-white px-6 pt-20 pb-10 text-center animate-fadeIn">
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
          {available > 0 ? (
            <>
              A controlled release. {available}{" "}
              {available === 1 ? "hat" : "hats"}. Private access required.
            </>
          ) : (
            <>Allocation complete. Join the list for the next release.</>
          )}
        </p>

        <div className="mt-3 text-xs text-zinc-500">
          {loading
            ? "Checking allocation…"
            : available > 0
              ? "Allocation verified."
              : "Edition I fully allocated."}
        </div>
      </section>

      <HatVideoCardSection />
      <LegacyStatsSection />
      <EmailCaptureSection />
      <SealSection />
      <FooterSection />
    </main>
  );
}
