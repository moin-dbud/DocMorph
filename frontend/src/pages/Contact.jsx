import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  // idle | loading | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-4xl px-6 py-24 space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold">Contact Us</h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Have a question, feedback, or need help with a conversion?
            We’re here to help.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500"
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:border-indigo-500"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-xl bg-indigo-600 py-4 font-medium transition hover:bg-indigo-500 disabled:bg-white/10"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-center text-green-400">
                ✅ Message sent successfully! We’ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-red-400">
                ❌ {error}
              </p>
            )}
          </form>
        </div>

        {/* SUPPORT INFO */}
        <div className="text-center text-sm text-zinc-400 space-y-2">
          <p>📩 Support Email: <span className="text-white">support@docmorph.ai</span></p>
          <p>⏱ Typical response time: within 24 hours</p>
          <p>🔐 Your data is always secure and private</p>
        </div>
      </div>
    </section>
  );
}
