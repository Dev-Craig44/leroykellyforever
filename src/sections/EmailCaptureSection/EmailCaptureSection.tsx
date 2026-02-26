const MAILCHIMP_ACTION =
  "https://leroykellyforever.us13.list-manage.com/subscribe/post?u=4ba46dacadaa6aa938673b23d&id=4c9d7710ca&f_id=00fb53e1f0";

const BOT_FIELD_NAME = "b_4ba46dacadaa6aa938673b23d_4c9d7710ca";

export default function EmailCaptureSection() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-semibold">Join the Drop</h2>
        <p className="mt-3 text-gray-600">
          Get first access to the Leroy Kelly Forever hat release…plus legacy
          updates.
        </p>

        <form
          action={MAILCHIMP_ACTION}
          method="post"
          target="_blank"
          noValidate
          className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <input
            type="email"
            name="EMAIL"
            required
            placeholder="Email address"
            className="w-full sm:w-80 px-4 py-3 border rounded-lg"
          />

          <input type="hidden" name="REFCODE" value="GENERAL" />

          {/* Mailchimp bot-trap (leave this exactly like this) */}
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
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black text-white font-semibold hover:opacity-90 transition"
          >
            Notify Me
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          No spam…just important updates.
        </p>
      </div>
    </section>
  );
}
