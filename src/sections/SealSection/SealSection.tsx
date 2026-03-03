import SignatureMark from "../../assets/lk-mark.svg?react";
import { useInView } from "../../hooks/useInView";

export default function SealSection() {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section className="bg-white" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mt-4 flex flex-col items-center">
          <div
            className={`mt-6 w-full max-w-[280px] rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-sm px-6 py-6 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-700 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.15)] hover:-translate-y-1 ${
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <p className="text-[10px] tracking-[0.35em] text-zinc-500 uppercase text-center">
              Official Legacy Release
            </p>

            <div className="mt-4 flex flex-col items-center group/mark">
              <SignatureMark className="h-22 w-auto opacity-95 transition-transform duration-300 group-hover/mark:scale-110" />

              <p className="mt-4 text-[10px] tracking-[0.35em] text-zinc-500 uppercase">
                Signed Authentication
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 h-px w-20 mx-auto bg-zinc-200" />
      </div>
    </section>
  );
}
