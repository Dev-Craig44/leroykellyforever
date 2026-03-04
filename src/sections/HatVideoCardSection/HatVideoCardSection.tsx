import { Button, Card, ScarcityBadge } from "../../components";
import { useInView } from "../../hooks/useInView";

export default function HatVideoCardSection() {
  const SHOPIFY_PRODUCT_URL =
    "https://shop.leroykellyforever.com/products/leroy-kelly-forever-hat-edition-i";

  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="bg-zinc-50" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Scarcity Block */}
        <div
          className={`mx-auto max-w-xl text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <ScarcityBadge />
        </div>

        {/* Product Card */}
        <Card
          variant="elevated"
          padding="sm"
          rounded="3xl"
          className={`mx-auto max-w-xl transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Product Video */}
          <div className="aspect-[9/11] w-full overflow-hidden rounded-2xl bg-zinc-900 relative shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] group">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium text-xs shadow-sm">
                Edition I
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-zinc-600 text-xs">Limited to 50</span>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              href={SHOPIFY_PRODUCT_URL}
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
