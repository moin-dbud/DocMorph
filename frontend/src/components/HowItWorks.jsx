export default function HowItWorks() {
  return (
    <section className="relative bg-[#0B0B0F] py-28 text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-20 max-w-2xl">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            How We Work
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            A simple, transparent process that gets results.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-14 md:grid-cols-4">
          <Step
            number="01"
            title="Upload"
            description="Upload your document or image in seconds. No signup required to start."
          />
          <Step
            number="02"
            title="Select Format"
            description="Choose the output format that fits your needs."
          />
          <Step
            number="03"
            title="Convert"
            description="We process your file instantly using optimized pipelines."
          />
          <Step
            number="04"
            title="Download"
            description="Download your converted file instantly — fast and secure."
          />
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="group relative cursor-default">

      {/* Big Number */}
      <div className="absolute -top-10 left-0 text-7xl font-bold text-white/5 transition duration-300 group-hover:text-indigo-500/20 group-hover:blur-[1px]">
        {number}
      </div>

      {/* Content */}
      <div className="relative pt-10 transition duration-300 group-hover:scale-[1.04]">
        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-2xl" />
      </div>
    </div>
  );
}
