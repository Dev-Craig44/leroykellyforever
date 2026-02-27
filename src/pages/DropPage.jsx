export default function DropPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase text-zinc-500">
          First Edition
        </p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
          50 Authenticated Pieces
        </h1>

        <p className="mt-4 text-zinc-600 leading-relaxed">
          You’re on the early access list. This page will unlock the purchase
          link when the drop goes live.
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm text-left">
          <p className="text-sm font-semibold">Next step</p>
          <p className="mt-2 text-sm text-zinc-600">
            We’ll place the hat video + the “Buy” button here (Shopify link) and
            an edition note: “Edition I — 50 pieces.”
          </p>
        </div>
      </div>
    </div>
  );
}
