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

export default function Admin() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<VideoSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL ||
    "https://api.leroykellyforever.com";

  // Check authentication
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchSubmissions();
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

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-zinc-50 py-12 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-2">
                Video Submissions
              </h1>
              <p className="text-zinc-600">
                Review and manage fan tribute videos
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Logout
            </button>
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

                    {(submission.status === "rejected" ||
                      submission.status === "featured") && (
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
