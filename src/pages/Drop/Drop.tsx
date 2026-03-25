import { useEffect, useState } from "react";
import { MetaTags, Navigation } from "../../components";
import { useInventory } from "../../hooks/useInventory";
import EmailCaptureSection from "../../sections/EmailCaptureSection";
import FooterSection from "../../sections/Footer";
import HatRevealSection from "../../sections/HatRevealSection";
import HatVideoCardSection from "../../sections/HatVideoCardSection";
import ProductDetailSection from "../../sections/ProductDetailSection";
import SealSection from "../../sections/SealSection";

export default function Drop() {
  const { available, loading } = useInventory({
    limit: 50,
    ttlMs: 30_000,
    fallbackAvailable: 50,
  });

  const [clubAccessCode, setClubAccessCode] = useState<string | null>(null);

  useEffect(() => {
    // Check for club access code from sessionStorage
    const code = sessionStorage.getItem("clubAccessCode");
    if (code) {
      setClubAccessCode(code);
    }
  }, []);

  return (
    <main className="bg-white text-zinc-900">
      <Navigation />
      <div className="pt-16">
        <MetaTags path="/drop" />

        <section className="bg-white px-6 pt-20 pb-10 text-center">
          <img
            src="/logos/L_Kelly_logo_master_nosquare.png"
            alt="Leroy Kelly Forever"
            className="mx-auto w-32 h-auto mb-8 opacity-90 drop-shadow-sm animate-fadeIn"
          />

          <p
            className="text-xs tracking-[0.35em] text-zinc-500 uppercase animate-fadeIn"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            {clubAccessCode ? "Club Access Verified" : "Edition I"}
          </p>

          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight drop-shadow-sm animate-slideUp"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            The First 50
          </h1>

          {clubAccessCode && (
            <div
              className="mt-3 px-4 py-2 mx-auto max-w-md rounded-lg bg-emerald-50 border border-emerald-200 animate-fadeIn"
              style={{ animationDelay: "0.25s", animationFillMode: "both" }}
            >
              <p className="text-sm font-medium text-emerald-800">
                ✓ Your club allocation is ready to claim
              </p>
            </div>
          )}

          <p
            className="mx-auto mt-4 max-w-md text-zinc-600 animate-fadeIn"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            {available > 0 ? (
              <>
                A controlled release. {available}{" "}
                {available === 1 ? "hat" : "hats"}. Private access required.
              </>
            ) : (
              <>Allocation complete. Join the list for the next release.</>
            )}
          </p>

          <div
            className="mt-3 text-xs text-zinc-500 animate-fadeIn"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            {loading
              ? "Checking allocation…"
              : available > 0
                ? "Allocation verified."
                : "Edition I fully allocated."}
          </div>
        </section>

        <HatRevealSection />
        <HatVideoCardSection clubAccessCode={clubAccessCode} />
        <ProductDetailSection />
        <EmailCaptureSection />
        <SealSection />
        <FooterSection />
      </div>
    </main>
  );
}
