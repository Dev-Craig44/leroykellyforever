const MAILCHIMP_ACTION =
  "https://leroykellyforever.us13.list-manage.com/subscribe/post?u=4ba46dacadaa6aa938673b23d&id=4c9d7710ca&f_id=00fb53e1f0";

const BOT_FIELD_NAME = "b_4ba46dacadaa6aa938673b23d_4c9d7710ca";

export default function EmailCaptureSection() {
  return (
    <section id="email-capture" className="bg-white py-20 px-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Join the Drop</h2>
        <p className="mt-2 text-zinc-600">
          Get first access to the Leroy Kelly Forever hat release…plus legacy
          updates.
        </p>

        <form
          action={MAILCHIMP_ACTION}
          method="post"
          target="_blank"
          noValidate
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <input
            type="email"
            name="EMAIL"
            required
            placeholder="Email address"
            className="w-full sm:w-80 px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300"
          />

          <input type="hidden" name="REFCODE" value="GENERAL" />

          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name={BOT_FIELD_NAME}
              tabIndex={-1}
              defaultValue=""
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800"
          >
            Notify Me
          </button>
        </form>

        <p className="mt-3 text-sm text-zinc-500">
          No spam…just important updates.
        </p>
      </div>
    </section>
  );
}
