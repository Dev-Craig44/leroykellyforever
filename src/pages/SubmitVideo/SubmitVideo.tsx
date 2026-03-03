import { Link } from "react-router-dom";
import { MetaTags } from "../../components";
import FooterSection from "../../sections/Footer";
import VideoSubmissionSection from "../../sections/VideoSubmissionSection";

export default function SubmitVideo() {
  return (
    <main className="bg-white text-zinc-900">
      <MetaTags
        title="Submit Your Video | Leroy Kelly Forever"
        description="Share your Leroy Kelly story. Submit a 15-60 second video for a chance to be featured on Instagram and help us give Leroy his flowers."
        path="/submit-video"
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-white to-zinc-50 px-6 pt-16 pb-10 text-center">
        <Link to="/" className="inline-block">
          <img
            src="/logos/L_Kelly_logo_master_nosquare.png"
            alt="Leroy Kelly Forever"
            className="mx-auto w-24 h-auto mb-6 opacity-90 drop-shadow-sm hover:opacity-100 transition-opacity duration-200"
          />
        </Link>

        <p className="text-xs tracking-[0.35em] uppercase text-zinc-400 animate-fadeIn">
          Give Leroy His Flowers
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-sm animate-slideUp">
          Share Your Story
        </h1>

        <p className="mt-4 text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
          Tell us what Leroy Kelly means to you. Submit a 15–60 second video and
          we may feature it on Instagram.
        </p>
      </section>

      <VideoSubmissionSection />

      <FooterSection />
    </main>
  );
}
