export default function About() {
  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 space-y-20">

        {/* HERO */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-semibold">About DocMorph</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            DocMorph is a modern, secure, and developer-friendly file conversion
            platform built to simplify document workflows.
          </p>
        </header>

        {/* MISSION */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-zinc-400">
              Our mission is to make file conversion fast, reliable, and secure
              for everyone — from students and professionals to developers and
              growing businesses.
            </p>
            <p className="text-zinc-400">
              We believe tools should be simple on the surface and powerful
              under the hood.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <ul className="space-y-3 text-zinc-300">
              <li>⚡ Fast conversions</li>
              <li>🔐 Security-first approach</li>
              <li>🧠 Smart credit-based usage</li>
              <li>📈 Built for scale</li>
            </ul>
          </div>
        </section>

        {/* STORY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Why DocMorph?</h2>
          <p className="text-zinc-400">
            Traditional file conversion tools are often slow, unreliable,
            overloaded with ads, or compromise user privacy.
          </p>
          <p className="text-zinc-400">
            DocMorph was created to solve these problems with a clean interface,
            transparent pricing, and a backend designed for performance and
            reliability.
          </p>
        </section>

        {/* TECH */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Technology & Security</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-2">
              <h3 className="font-medium">Modern Stack</h3>
              <p className="text-sm text-zinc-400">
                Built using React, Node.js, MongoDB, and cloud-native services
                for reliability and scalability.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-2">
              <h3 className="font-medium">Security First</h3>
              <p className="text-sm text-zinc-400">
                Authentication via Clerk, secure file handling, and automatic
                cleanup ensure your data stays protected.
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-medium mb-2">Transparency</h3>
              <p className="text-sm text-zinc-400">
                Clear pricing, clear limits, and honest communication.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-medium mb-2">Reliability</h3>
              <p className="text-sm text-zinc-400">
                If a conversion fails, your credits are safe.
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-6">
              <h3 className="font-medium mb-2">User First</h3>
              <p className="text-sm text-zinc-400">
                Every feature is built with real users in mind.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Get Started with DocMorph</h2>
          <p className="text-zinc-400">
            Experience secure, fast, and modern file conversion today.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/convert"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500 transition"
            >
              Start Converting
            </a>

            <a
              href="/contact-us"
              className="rounded-xl border border-white/20 px-6 py-3 hover:bg-white/5 transition"
            >
              Contact Us
            </a>
          </div>
        </section>

      </div>
    </section>
  );
}