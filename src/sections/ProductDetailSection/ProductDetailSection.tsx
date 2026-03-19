import { useState } from "react";
import { Card } from "../../components";
import { useInView } from "../../hooks/useInView";

const productDetails = [
  {
    image: "/images/lkWithHat.jpg",
    title: "Legacy in Action",
    description:
      "Leroy Kelly representing generations of greatness. This hat connects past and future.",
  },
  {
    image: "/images/hatPackage.JPEG",
    title: "Premium Packaging",
    description:
      "Unbox excellence. Each hat arrives in custom packaging designed for a Hall of Fame experience.",
  },
  {
    image: "/images/Stiching_Hat.jpg",
    title: "Detail Matters",
    description:
      "Precision stitching and materials selected for durability and style. Built to last.",
  },
];

export default function ProductDetailSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % productDetails.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + productDetails.length) % productDetails.length,
    );
  };

  return (
    <section className="bg-white py-16" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 font-display">
            Every Detail Tells a Story
          </h2>
          <p className="mt-3 text-zinc-600 max-w-xl mx-auto">
            From packaging to stitching, Edition I represents commitment to
            excellence.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Card variant="elevated" padding="sm" rounded="3xl">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-2xl bg-zinc-100">
                <img
                  src={productDetails[activeSlide].image}
                  alt={productDetails[activeSlide].title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 text-zinc-700 font-medium text-xs mb-4">
                    {activeSlide + 1} of {productDetails.length}
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3 font-display">
                    {productDetails[activeSlide].title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {productDetails[activeSlide].description}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    onClick={prevSlide}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-zinc-300 hover:border-browns-orange hover:bg-browns-orange/5 transition-all duration-200"
                    aria-label="Previous slide"
                  >
                    <span className="text-xl">←</span>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-zinc-300 hover:border-browns-orange hover:bg-browns-orange/5 transition-all duration-200"
                    aria-label="Next slide"
                  >
                    <span className="text-xl">→</span>
                  </button>

                  {/* Dots */}
                  <div className="flex gap-2 ml-4">
                    {productDetails.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === activeSlide
                            ? "bg-browns-orange w-6"
                            : "bg-zinc-300 hover:bg-zinc-400"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Supporting Info */}
        <div
          className={`mt-12 grid sm:grid-cols-2 gap-6 transition-all duration-700 delay-400 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Card variant="default" padding="lg">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-zinc-900 mb-2">
                Fast Shipping
              </h4>
              <p className="text-sm text-zinc-600">
                Ships within 48 hours. Secure packaging guaranteed.
              </p>
            </div>
          </Card>

          <Card variant="default" padding="lg">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-zinc-900 mb-2">
                Family Legacy
              </h4>
              <p className="text-sm text-zinc-600">
                Brooklynn Kelly helping lead this initiative with care.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
