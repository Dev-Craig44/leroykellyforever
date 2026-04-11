import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, MetaTags, Navigation } from "../../components";
import FooterSection from "../../sections/Footer";

export default function ClubAccess() {
  const [code, setCode] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Read discount code and redirect param from URL
    const params = new URLSearchParams(window.location.search);
    const discountCode = params.get("code");
    const redirectParam = params.get("redirect");

    setCode(discountCode);

    // Store code in sessionStorage if present
    if (discountCode) {
      sessionStorage.setItem("clubAccessCode", discountCode);
      console.log("✅ Club access code stored:", discountCode);
    }

    // Handle automatic redirection based on redirect param
    if (discountCode && redirectParam === "share") {
      console.log("🔄 Redirect parameter detected: share");
      console.log("📍 Navigating to /submit-video...");

      // Small delay to ensure sessionStorage is written
      setTimeout(() => {
        navigate("/submit-video");
      }, 100);
    } else {
      // Trigger fade-in animation for normal page view
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  const handleClaimAllocation = () => {
    if (!code) return;

    // Store discount code in sessionStorage for the Drop page to use
    sessionStorage.setItem("clubAccessCode", code);
    console.log("✅ Club access code stored (manual claim):", code);
    console.log("📍 Navigating to /drop...");

    // Navigate to Drop page using React Router
    navigate("/drop");
  };

  return (
    <main className="bg-white text-zinc-900 min-h-screen">
      <Navigation />
      <div className="pt-16">
        <MetaTags path="/club-access" />

        <section className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-6 py-20">
          <div
            className={`max-w-2xl text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Logo */}
            <img
              src="/logos/L_Kelly_logo_master_nosquare.png"
              alt="Leroy Kelly Forever"
              className="mx-auto w-32 h-auto mb-12 opacity-90 drop-shadow-sm"
            />

            {code ? (
              <>
                {/* Edition Label */}
                <p className="text-xs tracking-[0.35em] text-zinc-500 uppercase mb-4">
                  Edition I – Controlled Access
                </p>

                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                  Your Club Allocation
                  <br />
                  Has Been Issued
                </h1>

                {/* Subtext */}
                <p className="text-lg text-zinc-600 mb-4 max-w-xl mx-auto">
                  This is not a public release. Access is controlled and
                  limited.
                </p>

                {/* Dynamic Club Text */}
                <p className="text-base text-zinc-700 mb-3 font-medium">
                  Your club ({code}) has been issued reserved access.
                </p>

                {/* Additional Context */}
                <p className="text-sm text-zinc-500 mb-10 max-w-lg mx-auto">
                  Each club has a fixed allocation. Once it's claimed, access
                  closes.
                </p>

                {/* CTA Button */}
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleClaimAllocation}
                  >
                    View Your Allocation
                    <span aria-hidden="true" className="ml-2">
                      →
                    </span>
                  </Button>

                  <p className="text-xs text-zinc-400 mt-4">
                    See what's been reserved for your club
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Invalid Access State */}
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                  Invalid Access Link
                </h1>

                <p className="text-lg text-zinc-600 mb-10 max-w-xl mx-auto">
                  This link appears to be incomplete or invalid. Please check
                  your email for the correct access link.
                </p>

                <Button variant="secondary" size="lg" disabled>
                  No Access Code Provided
                </Button>
              </>
            )}
          </div>
        </section>

        <FooterSection />
      </div>
    </main>
  );
}
