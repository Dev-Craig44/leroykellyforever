import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check password against environment variable
    const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    if (password === correctPassword) {
      // Store in sessionStorage (cleared when browser closes)
      sessionStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/logos/L_Kelly_logo_master_nosquare.png"
            alt="Leroy Kelly Forever"
            className="w-16 h-auto mx-auto mb-4 opacity-90"
          />
          <h1 className="text-3xl font-display font-bold text-kelly-brown mb-2">Admin Login</h1>
          <p className="text-kelly-brown/70">
            Enter password to access video submissions
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl border border-kelly-brown/10 shadow-sm p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-kelly-brown mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border border-kelly-brown/20 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-browns-orange/30 focus:shadow-md transition-all duration-200 hover:border-kelly-brown/30"
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-xl bg-kelly-brown text-white font-semibold hover:bg-kelly-brown/90 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Login
          </button>

          <p className="mt-6 text-xs text-center text-kelly-brown/50">
            Access restricted to authorized administrators only
          </p>
        </form>
      </div>
    </div>
  );
}
