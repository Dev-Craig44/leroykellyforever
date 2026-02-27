import { Link } from "react-router-dom";
import FooterSection from "../../sections/Footer";
import HeroSection from "../../sections/HeroSection";
import LegacyStatsSection from "../../sections/LegacyStatsSection";

export default function Home() {
  return (
    <main className="bg-white text-zinc-900">
      <HeroSection />

      <LegacyStatsSection />

      <div className="px-6 py-16 text-center">
        <Link
          to="/drop"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-900"
        >
          View Edition I<span aria-hidden="true">→</span>
        </Link>
      </div>

      <FooterSection />
    </main>
  );
}
