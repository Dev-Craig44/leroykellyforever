import { Link, useLocation } from "react-router-dom";

export default function FooterSection() {
  const location = useLocation();
  const isSubmitVideoPage = location.pathname === "/submit-video";

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="space-y-6 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-zinc-500">
            Leroy Kelly Forever
          </p>

          {!isSubmitVideoPage && (
            <div className="space-y-3 pb-6">
              <p className="text-sm text-zinc-600">
                Want to give Leroy his flowers? Send a short story video
                (15–60s) and we may feature it on Instagram.
              </p>
              <Link
                to="/submit-video"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Submit Your Video
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}

          <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5">
            <p className="text-[11px] tracking-[0.35em] uppercase text-zinc-500">
              Mail / Returns
            </p>
            <p className="mt-2 text-sm text-zinc-700">PO Box (coming soon)</p>
            <p className="mt-1 text-xs text-zinc-500">
              We’ll publish the official PO Box here after the first email
              unlock.
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Leroy Kelly Forever. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
