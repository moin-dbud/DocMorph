export default function HeroMockUI() {
  return (
    <div className="relative mx-auto mt-12 max-w-5xl">

      {/* Glow background */}
      <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl" />

      {/* Main Window */}
      <div className="rounded-3xl border border-white/10 bg-[#111318] p-6 shadow-2xl">

        {/* Top Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="ml-4 text-sm text-zinc-300">
              DocMorph – File Converter
            </span>
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            Credits left: 3
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Upload Card */}
          <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#0F1117] p-6">

            <div className="flex h-48 flex-col items-center justify-center rounded-xl border border-dashed border-white/20 text-center">
              <div className="mb-3 text-3xl">📤</div>
              <p className="text-sm text-zinc-300">
                Drag & drop the file here
              </p>
              <p className="text-xs text-zinc-500">or click to browse</p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <select className="w-full rounded-lg border border-white/10 bg-[#0B0D12] px-4 py-2 text-sm text-white outline-none">
                <option>PDF → JPG</option>
                <option>JPG → PDF</option>
                <option>PNG → JPG</option>
              </select>

              <button className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90">
                Convert File
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-6">

            {/* Credit Usage */}
            <div className="rounded-2xl border border-white/10 bg-[#0F1117] p-5 text-center">
              <p className="mb-3 text-sm text-zinc-400">Credit Usage</p>

              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-indigo-500/40">
                <span className="text-lg font-semibold text-white">75%</span>
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                Monthly Allocation
              </p>
            </div>

            {/* Conversion History */}
            <div className="rounded-2xl border border-white/10 bg-[#0F1117] p-5">
              <p className="mb-3 text-sm text-zinc-400">
                Conversion History
              </p>

              <ul className="space-y-2 text-xs text-zinc-300">
                <li>📄 Report.doc → Report.pdf</li>
                <li>🖼 image.jpg → image.png</li>
                <li>📊 Resources.ppt → Resources.pdf</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
