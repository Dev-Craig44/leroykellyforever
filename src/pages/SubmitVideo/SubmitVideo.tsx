import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MetaTags, Navigation } from "../../components";
import FooterSection from "../../sections/Footer";
import VideoSubmissionSection from "../../sections/VideoSubmissionSection";

export default function SubmitVideo() {
  const [hasClubAccess, setHasClubAccess] = useState(false);

  useEffect(() => {
    // Check if user came from club access link
    const clubCode = sessionStorage.getItem("clubAccessCode");
    setHasClubAccess(!!clubCode);
  }, []);

  return (
    <main className="bg-white text-zinc-900">
      <Navigation />
      <div className="pt-16">
        <MetaTags
          title="Submit Your Video | Leroy Kelly Forever"
          description="Share your Leroy Kelly story. Submit a 15-60 second video for a chance to be featured on Instagram and help us give Leroy his flowers."
          path="/submit-video"
        />

        {/* Header */}
        <section className="bg-gradient-to-b from-white to-zinc-50 px-6 pt-12 pb-10 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-zinc-400 animate-fadeIn">
            Give Leroy His Flowers
          </p>

          {/* Club Access Acknowledgment */}
          {hasClubAccess && (
            <p className="mt-6 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg py-2 px-4 max-w-xl mx-auto">
              You're here to send Leroy a message. Your club access is already active.
            </p>
          )}

          <h1 className="mt-4 text-4xl sm:text-5xl font-display font-bold tracking-tight text-zinc-900 drop-shadow-sm animate-slideUp">
            Share Your Story
          </h1>

          <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Tell us what Leroy Kelly means to you. Submit a 15–60 second video
            and we may feature it on Instagram.
          </p>
        </section>

        <VideoSubmissionSection />

        {/* Secondary CTA for Club Members */}
        {hasClubAccess && (
          <section className="px-6 py-12 text-center bg-zinc-50 border-t border-zinc-100">
            <p className="text-sm text-zinc-600 mb-4">
              Want to see what's been reserved for your club?
            </p>
            <Link
              to="/drop"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 hover:border-zinc-400 transition-all duration-200 shadow-sm"
            >
              Explore Your Club Allocation
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </section>
        )}

        <FooterSection />
      </div>
    </main>
  );
}
