import { useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

interface VideoSubmissionFormData {
  name: string;
  email: string;
  message: string;
  video: File | null;
}

export default function VideoSubmissionSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const videoInputRef = useRef<HTMLInputElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const [formData, setFormData] = useState<VideoSubmissionFormData>({
    name: "",
    email: "",
    message: "",
    video: null,
  });

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [status, setStatus] = useState<
    "idle" | "validating" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setErrorMessage("Please select a valid video file");
      setStatus("error");
      return;
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      setErrorMessage("Video file must be less than 100MB");
      setStatus("error");
      return;
    }

    setStatus("validating");
    setErrorMessage("");

    // Create video element to check duration
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      const duration = Math.floor(video.duration);

      if (duration < 15 || duration > 60) {
        setErrorMessage(
          `Video must be between 15-60 seconds. Your video is ${duration}s.`,
        );
        setStatus("error");
        setFormData({ ...formData, video: null });
        setVideoPreview(null);
        return;
      }

      setVideoDuration(duration);
      setFormData({ ...formData, video: file });
      setVideoPreview(URL.createObjectURL(file));
      setStatus("idle");
    };

    video.onerror = () => {
      setErrorMessage("Unable to read video file. Please try another.");
      setStatus("error");
    };

    video.src = URL.createObjectURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.video) {
      setErrorMessage("Please select a video file");
      setStatus("error");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Please fill in all required fields");
      setStatus("error");
      return;
    }

    try {
      setStatus("uploading");
      setErrorMessage("");

      // Create FormData for multipart upload
      const uploadData = new FormData();
      uploadData.append("video", formData.video);
      uploadData.append("name", formData.name.trim());
      uploadData.append("email", formData.email.trim().toLowerCase());
      uploadData.append("message", formData.message.trim());
      uploadData.append("duration", videoDuration.toString());

      const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
      if (!API_BASE) {
        throw new Error("API configuration missing");
      }

      const response = await fetch(`${API_BASE}/submit-video`, {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", video: null });
      setVideoPreview(null);
      setVideoDuration(0);
      if (videoInputRef.current) videoInputRef.current.value = "";
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const isLoading = status === "uploading" || status === "validating";

  return (
    <section
      ref={ref}
      data-section="video-submission"
      className="bg-gradient-to-b from-white to-zinc-50 py-16 px-6"
    >
      <div
        className={`mx-auto max-w-2xl transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-2xl border border-zinc-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] px-6 sm:px-8 py-8"
        >
          {/* Video Upload */}
          <div>
            <label className="block text-sm font-semibold text-zinc-900 mb-2">
              Video Upload <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-zinc-500 mb-3">
              MP4, MOV, or WebM • 15-60 seconds • Max 100MB
            </p>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              disabled={isLoading}
              className="block w-full text-sm text-zinc-900 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-900 hover:file:bg-zinc-200 file:transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />

            {videoPreview && (
              <div className="mt-4">
                <video
                  ref={videoPreviewRef}
                  src={videoPreview}
                  controls
                  className="w-full rounded-xl bg-zinc-900 shadow-md"
                />
                <p className="mt-2 text-xs text-center text-zinc-600">
                  Duration: {videoDuration}s ✓
                </p>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-zinc-900 mb-2"
            >
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isLoading}
              placeholder="John Smith"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:shadow-md transition-all duration-200 hover:border-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-zinc-900 mb-2"
            >
              Email{" "}
              <span className="text-zinc-400 text-xs font-normal">
                (optional, for submission confirmation)
              </span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={isLoading}
              placeholder="john@example.com"
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:shadow-md transition-all duration-200 hover:border-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>

          {/* Message (Optional) */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-zinc-900 mb-2"
            >
              Additional Message{" "}
              <span className="text-zinc-400">(Optional)</span>
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              disabled={isLoading}
              placeholder="Tell us more about your connection to Leroy Kelly..."
              rows={4}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:shadow-md transition-all duration-200 hover:border-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed resize-none"
            />
          </div>

          {/* Error Message */}
          {status === "error" && errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {status === "success" && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-sm text-emerald-600 font-semibold">
                Thank you! Your video has been submitted.
              </p>
              <p className="text-xs text-emerald-600 mt-1">
                We'll review it and may feature it on our Instagram.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.video}
            className="w-full px-6 py-4 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
          >
            {status === "validating"
              ? "Validating video..."
              : status === "uploading"
                ? "Uploading..."
                : "Submit Video"}
          </button>

          <p className="text-xs text-center text-zinc-500">
            By submitting, you grant us permission to feature your video on our
            social media channels.
          </p>
        </form>
      </div>
    </section>
  );
}
