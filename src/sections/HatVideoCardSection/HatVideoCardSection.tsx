import { Button, Card, ScarcityBadge } from "../../components";

export default function HatVideoCardSection() {
  // Phase 2: Replace with actual Shopify variant ID
  // const VARIANT_ID = "YOUR_VARIANT_ID_HERE";
  const SHOPIFY_CART_URL =
    "https://3u8jjdepw0t4gs3x-98493432090.shopifypreview.com/cart/YOUR_VARIANT_ID:1?discount=BACKERS50";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Scarcity Block */}
        <div className="mx-auto max-w-xl text-center mb-12 animate-fadeIn">
          <ScarcityBadge />
        </div>

        {/* Product Card */}
        <Card
          variant="elevated"
          padding="sm"
          rounded="3xl"
          className="mx-auto max-w-xl animate-slideUp"
        >
          {/* Product Video */}
          <div className="aspect-[9/11] w-full overflow-hidden rounded-2xl bg-zinc-900 relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video/hat-loop.mp4" type="video/mp4" />
              <img
                src="/images/lkWithHat.jpg"
                alt="Leroy Kelly Forever Hat"
                className="w-full h-full object-cover"
              />
            </video>
          </div>

          <div className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-zinc-900">
                Leroy Kelly Forever Hat
              </h3>
              <span className="text-[10px] tracking-[0.35em] uppercase text-zinc-500">
                Drop #1
              </span>
            </div>

            {/* Edition Info */}
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium text-xs">
                Edition I
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-600 text-xs">Limited to 50</span>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              href={SHOPIFY_CART_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Secure Now
            </Button>

            {/* Microcopy */}
            <p className="text-xs text-center text-zinc-500">
              Ships within 48 hours
            </p>

            {/* Family Story */}
            <div className="pt-3 border-t border-zinc-200">
              <p className="text-xs text-zinc-600 text-center leading-relaxed">
                Brooklynn, Leroy's granddaughter, is helping lead this legacy
                drop.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
