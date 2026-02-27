import EmailCaptureSection from "../EmailCaptureSection";

export default function CtaSection() {
  return (
    <section className="bg-gradient-to-b from-white to-zinc-100">
      <div className="mx-auto max-w-6xl px-6 pb-10 text-center">
        <div className="mt-0 w-full max-w-2xl mx-auto rounded-2xl border border-zinc-200 bg-white shadow-md px-6 sm:px-8 py-10">
          <EmailCaptureSection />
        </div>

        <div className="mt-14 h-px w-20 mx-auto bg-zinc-200" />
      </div>
    </section>
  );
}
