import SignatureMark from "../../assets/lk-mark.svg?react";

export default function SealSection() {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-100 animate-fadeIn">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="mt-4 flex flex-col items-center">
          <div className="mt-6 w-full max-w-[280px] rounded-2xl border border-zinc-200 bg-white/60 px-6 py-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
            <p className="text-[10px] tracking-[0.35em] text-zinc-500 uppercase text-center">
              Official Legacy Release
            </p>

            <div className="mt-4 flex flex-col items-center">
              <SignatureMark className="h-22 w-auto opacity-95" />

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
