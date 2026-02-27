export default function HatVideoCardSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="mt-4 text-zinc-600 leading-relaxed">
            This first release is capped at 50. Join the list to unlock first
            access.
          </p>
        </div>

        <div className="mt-10 mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm">
          {/* video placeholder (we’ll swap in your actual clip next) */}
          <div className="aspect-[9/11] w-full overflow-hidden rounded-2xl bg-zinc-200" />

          <div className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">
                Leroy Kelly Forever Hat
              </p>
              <p className="text-xs tracking-[0.35em] uppercase text-zinc-500">
                Drop #1
              </p>
            </div>

            <p className="mt-2 text-sm text-zinc-600">
              Product video + photos coming next. This card will show the
              rotating hat clip.
            </p>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("email-capture")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-5 w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
            >
              Request First Access
            </button>

            <p className="mt-3 text-xs text-zinc-500 text-center">
              Brooklyn… Leroy’s granddaughter… is helping lead this legacy drop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
