import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Footer from "../../sections/Footer/Footer";

interface VideoSubmission {
  _id: string;
  name: string;
  email: string;
  message: string;
  videoFilename: string;
  videoPath: string;
  duration: number;
  status: "pending" | "approved" | "rejected" | "featured";
  instagramUrl: string | null;
  reviewedAt: string | null;
  notes: string;
  submittedAt: string;
}

interface VideoStats {
  total: number;
  byStatus: {
    pending: number;
    approved: number;
    featured: number;
    rejected: number;
  };
}

interface InventoryData {
  totals: {
    totalAvailable: number;
    variants: number;
  };
  lowStockCounts: {
    "5": number;
    "10": number;
    "20": number;
  };
}

interface EmailSubscriber {
  email: string;
  subscribedAt: string;
}

export default function Admin() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<VideoSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [stats, setStats] = useState<VideoStats | null>(null);
  const [inventory, setInventory] = useState<InventoryData | null>(null);
  const [subscribers, setSubscribers] = useState<EmailSubscriber[]>([]);
  const [showEmailList, setShowEmailList] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://api.leroykellyforever.com";

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
    fetchInventory();
    fetchSubscribers();
  }, [filter]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const url =
        filter === "all"
          ? `${API_BASE}/admin/submissions?limit=100`
          : `${API_BASE}/admin/submissions?status=${filter}&limit=100`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch submissions");

      const data = await response.json();
      setSubmissions(data.submissions || []);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await fetch(`${API_BASE}/dashboard/inventory?limit=50`);
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      }
    } catch (err) {
      console.error("Failed to fetch inventory:", err);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${API_BASE}/admin/subscribers`);
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    }
  };

  const updateStatus = async (
    id: string,
    status: "pending" | "approved" | "rejected" | "featured",
  ) => {
    try {
      const response = await fetch(`${API_BASE}/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Refresh the list
      fetchSubmissions();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const getVideoUrl = (videoPath: string) => {
    // Convert server path to API URL
    // videoPath is like: uploads/videos/1772596117459-668940901.mov
    return `${API_BASE}/${videoPath}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-100 text-emerald-800";
      case "featured":
        return "bg-purple-100 text-purple-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-amber-100 text-amber-800";
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleDownloadVideo = async (videoPath: string, filename: string) => {
    try {
      const videoUrl = getVideoUrl(videoPath);
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert("Failed to download video");
      console.error(err);
    }
  };

  const handleDeleteVideo = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete the video from ${name}? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_BASE}/admin/submissions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete video");

      alert("Video deleted successfully");
      fetchSubmissions(); // Refresh the list
    } catch (err: any) {
      alert(`Error deleting video: ${err.message}`);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-zinc-600">
                Manage submissions, inventory, and subscribers
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Video Stats */}
            {stats && (
              <>
                <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
                    Total Videos
                  </p>
                  <p className="text-3xl font-bold text-zinc-900">
                    {stats.total}
                  </p>
                </div>
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-amber-700 mb-1">
                    Pending Review
                  </p>
                  <p className="text-3xl font-bold text-amber-900">
                    {stats.byStatus.pending}
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-emerald-700 mb-1">
                    Approved
                  </p>
                  <p className="text-3xl font-bold text-emerald-900">
                    {stats.byStatus.approved}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-purple-700 mb-1">
                    Featured
                  </p>
                  <p className="text-3xl font-bold text-purple-900">
                    {stats.byStatus.featured}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Inventory & Email Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Inventory Dashboard */}
            {inventory && (
              <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-zinc-900">
                    📦 Inventory Status
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600">
                      Available Units
                    </span>
                    <span className="text-2xl font-bold text-zinc-900">
                      {inventory.totals.totalAvailable}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-600">Variants</span>
                    <span className="text-lg font-semibold text-zinc-700">
                      {inventory.totals.variants}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-zinc-200">
                    <p className="text-xs text-zinc-500 mb-2">Low Stock Alerts</p>
                    <div className="flex gap-3">
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-red-600">
                          {inventory.lowStockCounts["5"]}
                        </p>
                        <p className="text-xs text-zinc-500">≤5 units</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-amber-600">
                          {inventory.lowStockCounts["10"]}
                        </p>
                        <p className="text-xs text-zinc-500">≤10 units</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-bold text-yellow-600">
                          {inventory.lowStockCounts["20"]}
                        </p>
                        <p className="text-xs text-zinc-500">≤20 units</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Subscribers */}
            <div className="bg-white rounded-xl border border-zinc-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">
                  📧 Email Subscribers
                </h3>
                <button
                  onClick={() => setShowEmailList(!showEmailList)}
                  className="text-sm text-browns-orange hover:underline font-medium"
                >
                  {showEmailList ? "Hide" : "View All"}
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-zinc-600">Total Subscribers</span>
                <span className="text-2xl font-bold text-zinc-900">
                  {subscribers.length}
                </span>
              </div>
              {showEmailList && (
                <div className="mt-4 max-h-64 overflow-y-auto border-t border-zinc-200 pt-4">
                  {subscribers.length === 0 ? (
                    <p className="text-sm text-zinc-500 text-center py-4">
                      No subscribers yet
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {subscribers.map((sub, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm py-2 border-b border-zinc-100 last:border-0"
                        >
                          <span className="text-zinc-700 truncate flex-1">
                            {sub.email}
                          </span>
                          <span className="text-xs text-zinc-500 ml-2">
                            {new Date(sub.subscribedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Section Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              Video Submissions
            </h2>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {["all", "pending", "approved", "featured", "rejected"].map(
              (statusFilter) => (
                <button
                  key={statusFilter}
                  onClick={() => setFilter(statusFilter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === statusFilter
                      ? "bg-black text-white"
                      : "bg-white text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                </button>
              ),
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="text-zinc-600">Loading submissions...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Submissions Grid */}
          {!loading && !error && submissions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-zinc-600">No submissions found.</p>
            </div>
          )}

          {!loading && !error && submissions.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Video Preview */}
                  <div className="bg-zinc-900 aspect-video">
                    <video
                      src={getVideoUrl(submission.videoPath)}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    {/* Status Badge */}
                    <div className="mb-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(submission.status)}`}
                      >
                        {submission.status}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">
                          {submission.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {submission.email}
                        </p>
                      </div>

                      {submission.message && (
                        <p className="text-sm text-zinc-700 line-clamp-3">
                          {submission.message}
                        </p>
                      )}

                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span>⏱️ {submission.duration}s</span>
                        <span>📅 {formatDate(submission.submittedAt)}</span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() =>
                        handleDownloadVideo(
                          submission.videoPath,
                          submission.videoFilename,
                        )
                      }
                      className="w-full mb-3 px-3 py-2 bg-zinc-100 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download Video
                    </button>

                    {/* Action Buttons */}
                    {submission.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            updateStatus(submission._id, "approved")
                          }
                          className="flex-1 px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateStatus(submission._id, "rejected")
                          }
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {submission.status === "approved" && (
                      <button
                        onClick={() => updateStatus(submission._id, "featured")}
                        className="w-full px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        ⭐ Feature
                      </button>
                    )}

                    {submission.status === "rejected" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(submission._id, "pending")}
                          className="flex-1 px-3 py-2 bg-zinc-200 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-300 transition-colors"
                        >
                          ← Pending
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteVideo(submission._id, submission.name)
                          }
                          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}

                    {submission.status === "featured" && (
                      <button
                        onClick={() => updateStatus(submission._id, "pending")}
                        className="w-full px-3 py-2 bg-zinc-200 text-zinc-700 text-sm font-medium rounded-lg hover:bg-zinc-300 transition-colors"
                      >
                        ← Back to Pending
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && !error && submissions.length > 0 && (
            <div className="mt-8 text-center text-sm text-zinc-600">
              Showing {submissions.length} submission
              {submissions.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
