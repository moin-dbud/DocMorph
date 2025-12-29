import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PLAN_FEATURES } from "../config/plans";

export default function Convert() {


  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [jobStatus, setJobStatus] = useState(null);
  // Plan upgrade state
  const [plan, setPlan] = useState("free");

  // plans state
  const features = PLAN_FEATURES[plan];

  const { getToken, isSignedIn } = useAuth();
  const navigate = useNavigate();

  /* =========================
     CORE STATE
  ========================= */
  const [status, setStatus] = useState("idle");
  // idle | fileSelected | processing | success | error

  const [credits, setCredits] = useState(null);
  const [file, setFile] = useState(null);
  const [conversionType, setConversionType] = useState("PDF → JPG");
  const [errorMessage, setErrorMessage] = useState("");
  const [history, setHistory] = useState([]);

  // State for download
  const [downloadFile, setDownloadFile] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


  /* =========================
     FETCH CREDITS
  ========================= */
  useEffect(() => {
    if (!isSignedIn) return;

    const fetchCredits = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/credits`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCredits(data.credits);
        setPlan(data.plan);
      } catch {
        setErrorMessage("Unable to load credits.");
        setStatus("error");
      }
    };

    fetchCredits();
  }, [isSignedIn, getToken]);

  /* =========================
     AUTO REDIRECT ON ZERO CREDITS
  ========================= */
  useEffect(() => {
    if (credits === 0) {
      const timer = setTimeout(() => navigate("/pricing"), 1500);
      return () => clearTimeout(timer);
    }
  }, [credits, navigate]);

  // history 
  useEffect(() => {
    if (!isSignedIn) return;

    const fetchHistory = async () => {
      try {
        const token = await getToken();

        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setHistory(data.history || []);
      } catch (err) {
        console.error("Failed to load history");
      }
    };

    fetchHistory();
  }, [isSignedIn, getToken]);

  // poll job status
  useEffect(() => {
    if (!jobId) return;

    const poll = async () => {
      const token = await getToken();
      const res = await fetch(
        `${API_BASE}/api/convert/status/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
    };

    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  }, [jobId, getToken]);




  /* =========================
     FILE HANDLING
  ========================= */
  const handleFileSelect = (file) => {
    if (!file) return;

    const maxSize = features.maxFileSizeMB * 1024 * 1024;

    if (file.size > maxSize) {
      setErrorMessage(
        `File too large. Max size for ${plan.toUpperCase()} plan is ${features.maxFileSizeMB}MB`
      );
      setStatus("error");
      return;
    }

    setFile(file);
    setStatus("fileSelected");
  };

  // Download logic
  const handleDownload = async (fileName) => {
    const token = await getToken();

    const res = await fetch(
      `${API_BASE}/api/download/${encodeURIComponent(fileName)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      alert("Unauthorized or download failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };


  /* =========================
     CONVERT
  ========================= */
  const handleConvert = async () => {
    if (!file || credits <= 0) return;

    try {
      setStatus("processing");

      const token = await getToken();

      const formData = new FormData();
      formData.append("file", file);                 // ✅ real file
      formData.append("conversionType", conversionType);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/convert`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,          // ✅ NO content-type
        },
        body: formData,
      });

      const data = await res.json();
      setJobId(data.jobId);
      setJobStatus("queued");

      if (!res.ok) {
        setErrorMessage(data.message || "Conversion failed.");
        setStatus("error");
        return;
      }

      // ✅ Backend-controlled credits
      setCredits(data.creditsLeft);
      setDownloadFile(data.fileName);

      // ✅ History entry
      setHistory((prev) => [
        {
          name: file.name,
          type: conversionType,
          date: new Date().toLocaleString(),
          downloadUrl: data.downloadUrl,
        },
        ...prev,
      ]);

      setStatus("success");
      setFile(null);
    } catch (err) {
      setErrorMessage("Something went wrong.");
      setStatus("error");
    }
  };

  const resetFlow = () => {
    setFile(null);
    setErrorMessage("");
    setStatus("idle");
  };

  /* =========================
     UI
  ========================= */
  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 space-y-12">

        {/* PAGE HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold">Convert Files</h1>
            <p className="mt-2 text-zinc-400">
              Secure, credit-based file conversions
            </p>
          </div>

          <div className="rounded-xl bg-white/10 px-5 py-3 text-sm">
            🔋 Credits remaining:{" "}
            <span className="font-semibold">{credits ?? "…"}</span>
          </div>

          {plan !== "free" && (
            <span className="rounded-lg bg-indigo-600 px-3 py-1 text-sm font-semibold text-white uppercase" >
              {plan}
            </span>
          )}

        </div>

        {/* CONVERSION CARD */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-black from-white/10 to-white/5 p-8 shadow-[0_0_80px_rgba(99,102,241,0.12)] space-y-8">

          {/* DRAG & DROP */}
          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${status === "processing"
              ? "border-white/10 opacity-50"
              : "border-indigo-500/40 hover:border-indigo-500"
              }`}
          >
            <input
              type="file"
              hidden
              multiple={features.bulkupload}
              disabled={status === "processing"}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            <p className="text-lg font-medium">
              Drag & drop your file here
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              or click to browse
            </p>

            {file && (
              <p className="mt-4 text-xs text-indigo-400">
                Selected: {file.name}
              </p>
            )}
          </label>

          {/* CONVERSION TYPE */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Step 2 – Choose conversion type
            </label>
            <select
              value={conversionType}
              disabled={status === "processing"}
              onChange={(e) => setConversionType(e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3"
            >
              <option className="bg-black text-white">PDF → JPG</option>
              {features.allowedFormats.includes("PNG") && (
                <>
                  <option className="bg-black text-white" >JPG → PNG</option>
                  <option className="bg-black text-white">PNG → JPG</option>
                  <option disabled className="bg-black text-gray-500" >DOCX → PDF (coming soon) </option>
                </>
              )}
            </select>
          </div>

          {/* ACTION BUTTON */}
          <button
            onClick={handleConvert}
            disabled={status !== "fileSelected" || credits <= 0}
            className="w-full rounded-xl bg-indigo-600 py-4 font-medium text-white transition hover:bg-indigo-500 disabled:bg-white/10 disabled:text-zinc-500"
          >
            {status === "processing" ? "Converting…" : "Convert File"}
          </button>

          {/* STATUS FEEDBACK */}
          {status === "processing" && (
            <p className="text-center text-sm text-zinc-400">
              Converting your file securely…
            </p>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <p className="text-green-400 text-lg">
                ✅ Conversion completed successfully
              </p>

              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg" onClick={() => handleDownload(downloadFile)}>
                ⬇ Download File
              </button>


              <div>
                <button
                  onClick={resetFlow}
                  className="text-indigo-400 underline text-sm"
                >
                  Convert another file
                </button>
              </div>
            </div>
          )}


          {status === "error" && (
            <div className="text-center text-red-400">
              ❌ {errorMessage}
              <div className="mt-3">
                <button
                  onClick={resetFlow}
                  className="text-indigo-400 underline"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {jobStatus && (
            <div className="mt-6">
              <div className="h-2 w-full rounded bg-white/10">
                <div
                  className="h-2 rounded bg-indigo-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-zinc-400 text-center">
                {jobStatus === "processing"
                  ? `Processing… ${progress}%`
                  : jobStatus === "queued"
                    ? "Queued…"
                    : jobStatus === "completed"
                      ? "Completed"
                      : "Failed"}
              </p>
            </div>
          )}


          {credits === 0 && (
            <p className="text-center text-sm text-zinc-400">
              You’ve used all your credits. Redirecting to pricing…
              <span
                onClick={() => navigate("/pricing")}
                className="ml-1 cursor-pointer text-indigo-400 hover:underline"
              >
                Upgrade now
              </span>
            </p>
          )}
        </div>

        {/* TRUST STRIP */}
        <div className="flex justify-center gap-6 text-xs text-zinc-500">
          <span>🔐 Secure processing</span>
          <span>⚡ 1 credit = 1 conversion</span>
          <span>🗑 Auto-deleted files</span>
        </div>

        {/* CONVERSION HISTORY */}
        {history.length > 0 && (
          <div>
            <h2 className="mb-4 text-lg font-semibold">
              Recent Conversions
            </h2>
            <div className="space-y-3">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{item.originalFileName}</p>
                    <p className="text-xs text-zinc-400">
                      {item.conversionType}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>

                    <a
                      href={`${API_BASE}/api/download/${item.outputFileName}`}
                      className="text-indigo-400 hover:underline text-xs"
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
