const conversions = [
  { from: "PDF", to: "JPG" },
  { from: "JPG", to: "PDF" },
  { from: "PNG", to: "JPG" },
  { from: "DOCX", to: "PDF" },
  { from: "PPT", to: "PDF" },
  { from: "WEBP", to: "PNG" },
  { from: "HEIC", to: "JPG" },
];

export default function SupportedConversions() {
  return (
    <section className="relative overflow-hidden bg-[#0B0B0F] py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Supported Conversions
          </h2>
          <p className="mt-4 text-zinc-400">
            Convert documents and images effortlessly across multiple formats
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex w-max animate-scroll gap-6">
              {[...conversions, ...conversions].map((item, index) => (
                <ConversionCard key={index} from={item.from} to={item.to} />
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B0B0F] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0B0F] to-transparent" />
        </div>

      </div>
    </section>
  );
}

function ConversionCard({ from, to }) {
  return (
    <div className="group relative flex h-32 w-56 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-indigo-500/40 hover:bg-white/10">
      <span className="text-xl font-semibold text-white">
        {from}
      </span>

      <span className="my-1 text-sm text-zinc-400">to</span>

      <span className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        {to}
      </span>
    </div>
  );
}
