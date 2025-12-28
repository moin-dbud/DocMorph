export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#0B0B0F] py-28 text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Why Choose DocMorph
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Built for speed, simplicity, and trust — everything a modern file
            conversion platform should be.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          <Feature
            icon="⚡"
            title="Lightning-Fast Conversions"
            description="Optimized pipelines ensure your files are converted in seconds, not minutes."
          />

          <Feature
            icon="🎯"
            title="Credit-Based Fair Usage"
            description="Only pay for what you use. Transparent credits with no hidden limits."
          />

          <Feature
            icon="🚀"
            title="No Signup Required"
            description="Start converting instantly without creating an account."
          />

          <Feature
            icon="🔒"
            title="Secure by Default"
            description="Your files are processed securely and automatically removed after conversion."
          />

          <Feature
            icon="📄"
            title="High-Quality Output"
            description="We preserve formatting, clarity, and resolution across all conversions."
          />

          <Feature
            icon="🌍"
            title="Works Everywhere"
            description="Fully browser-based. No installs. No downloads. No hassle."
          />

        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, description }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-indigo-500/40 hover:bg-white/10">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl" />
      </div>

      {/* Icon */}
      <div className="mb-4 text-3xl">
        {icon}
      </div>

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  );
}
