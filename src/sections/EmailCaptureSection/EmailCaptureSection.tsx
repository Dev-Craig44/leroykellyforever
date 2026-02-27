import { useMemo, useState } from "react";

export default function EmailCaptureSection() {
  const API_BASE = useMemo(() => {
    return import.meta.env.VITE_API_BASE_URL || "";
  }, []);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cleaned = email.trim().toLowerCase();
    if (!cleaned) {
      setStatus("error");
      setMessage("Please enter an email.");
      return;
    }

    if (!API_BASE) {
      setStatus("error");
      setMessage("Missing API base URL. Check Vercel env vars.");
      return;
    }

    try {
      setStatus("loading");
      setMessage("");

      const res = await fetch(`${API_BASE}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleaned }),
      });

      // Your API returns { ok: true } on success
      if (!res.ok) {
        let errMsg = "Something went wrong. Try again.";
        try {
          const data = await res.json();
          if (data?.error) errMsg = String(data.error);
        } catch {
          // ignore
        }
        throw new Error(errMsg);
      }

      setStatus("success");
      setMessage("You’re in. Check your email soon.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Try again.");
    }
  }

  const isLoading = status === "loading";

  return (
    <section id="email-capture" className="bg-white py-20 px-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">Join the Drop</h2>
        <p className="mt-2 text-zinc-600">
          Get first access to the Leroy Kelly Forever hat release…plus legacy
          updates.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            placeholder="Email address"
            className="w-full sm:w-80 px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-300"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting…" : "Notify Me"}
          </button>
        </form>

        <p className="mt-3 text-sm text-zinc-500">
          No spam…just important updates.
        </p>

        {message ? (
          <p
            className={`mt-4 text-sm ${
              status === "success" ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
