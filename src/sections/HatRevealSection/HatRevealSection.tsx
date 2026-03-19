import { useState } from "react";
import { useInView } from "../../hooks/useInView";

const hatImages = [
  {
    src: "/images/Hero_Hat.jpg",
    alt: "Leroy Kelly Forever Hat - Hero Shot",
    label: "Hero View",
  },
  {
    src: "/images/Front_CloseUp_ Hat.jpg",
    alt: "Leroy Kelly Forever Hat - Front Close Up",
    label: "Front Detail",
  },
  {
    src: "/images/Side_Hat.jpg",
    alt: "Leroy Kelly Forever Hat - Side View",
    label: "Side View",
  },
  {
    src: "/images/Stiching_Hat.jpg",
    alt: "Leroy Kelly Forever Hat - Stitching Detail",
    label: "Craftsmanship",
  },
];

export default function HatRevealSection() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="bg-gradient-to-b from-white to-zinc-50 py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs tracking-[0.35em] uppercase text-zinc-500 mb-3">
            Edition I
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 font-display">
            Premium Craftsmanship
          </h2>
          <p className="mt-4 text-zinc-600 max-w-2xl mx-auto">
            Every detail matters. Each hat is a tribute to greatness, designed
            with the care and precision worthy of a Hall of Fame legacy.
          </p>
        </div>

        {/* Main Gallery */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Large Preview */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="aspect-square w-full overflow-hidden rounded-3xl bg-white shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] border border-zinc-200 group">
              <img
                src={hatImages[selectedImage].src}
                alt={hatImages[selectedImage].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm font-medium text-zinc-700">
                {hatImages[selectedImage].label}
              </p>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div
            className={`lg:col-span-2 grid grid-cols-2 gap-4 transition-all duration-700 delay-300 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {hatImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  selectedImage === idx
                    ? "border-browns-orange shadow-md"
                    : "border-zinc-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-8 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-browns-orange/10 mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Hall of Fame Quality
            </h3>
            <p className="text-sm text-zinc-600">
              Premium materials and construction worthy of a legend
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-browns-orange/10 mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Limited Edition Design
            </h3>
            <p className="text-sm text-zinc-600">
              Exclusive colorways and details unique to Edition I
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-browns-orange/10 mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 mb-2">
              Family Approved
            </h3>
            <p className="text-sm text-zinc-600">
              Created in partnership with the Kelly family legacy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
