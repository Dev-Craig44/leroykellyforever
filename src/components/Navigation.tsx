import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-kelly-brown/10 shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logos/L_Kelly_logo_master_nosquare.png"
            alt="Leroy Kelly Forever"
            className="w-8 h-auto"
          />
          <span className="text-sm font-display font-semibold tracking-tight text-kelly-brown">
            Leroy Kelly Forever
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/"
            className={`font-medium transition-colors hover:text-kelly-brown ${
              isActive("/")
                ? "text-kelly-brown border-b-2 border-browns-orange pb-1"
                : "text-kelly-brown/60"
            }`}
          >
            Home
          </Link>
          <Link
            to="/drop"
            className={`font-medium transition-colors hover:text-kelly-brown ${
              isActive("/drop")
                ? "text-kelly-brown border-b-2 border-browns-orange pb-1"
                : "text-kelly-brown/60"
            }`}
          >
            Drop
          </Link>
          <Link
            to="/submit-video"
            className={`font-medium transition-colors hover:text-kelly-brown ${
              isActive("/submit-video")
                ? "text-kelly-brown border-b-2 border-browns-orange pb-1"
                : "text-kelly-brown/60"
            }`}
          >
            Share Story
          </Link>
          {isAuthenticated && (
            <Link
              to="/admin"
              className={`font-medium transition-colors hover:text-kelly-brown ${
                isActive("/admin")
                  ? "text-kelly-brown border-b-2 border-browns-orange pb-1"
                  : "text-kelly-brown/60"
              }`}
            >
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
