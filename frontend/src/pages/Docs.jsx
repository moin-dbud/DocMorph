export default function Docs() {
  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 space-y-16">

        {/* HEADER */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold">DocMorph Documentation</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Everything you need to use DocMorph — from file conversions to API usage.
          </p>
        </header>

        {/* GETTING STARTED */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <p className="text-zinc-400">
            DocMorph is a secure, credit-based file conversion platform.
            Create an account, upload your file, choose a conversion type,
            and download the result.
          </p>

          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>Sign up or log in</li>
            <li>Select a file to convert</li>
            <li>Choose the conversion format</li>
            <li>Download the converted file</li>
          </ul>
        </section>

        {/* SUPPORTED CONVERSIONS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Supported Conversions</h2>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <ul className="space-y-2 text-zinc-300">
              <li>✅ PDF → JPG</li>
              <li>✅ JPG → PNG</li>
              <li>✅ PNG → JPG</li>
              <li>⏳ DOCX → PDF (coming soon)</li>
            </ul>
          </div>
        </section>

        {/* CREDITS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Credits & Plans</h2>
          <p className="text-zinc-400">
            DocMorph uses a credit-based system.
            Each conversion consumes <b>1 credit</b>.
          </p>

          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>Free plan includes limited credits</li>
            <li>Paid plans unlock higher file size limits</li>
            <li>Credits are deducted only on successful conversions</li>
          </ul>
        </section>

        {/* API USAGE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">API Usage (Advanced)</h2>
          <p className="text-zinc-400">
            DocMorph exposes secure APIs for file conversion.
            All API requests require authentication.
          </p>

          <div className="rounded-xl bg-black/40 p-4 text-sm text-green-400 overflow-x-auto">
            <code>
              POST /api/convert <br />
              GET /api/credits <br />
              GET /api/history <br />
              GET /api/download/:fileName
            </code>
          </div>

          <p className="text-zinc-400 text-sm">
            ⚠️ API access is currently limited to authenticated users.
          </p>
        </section>

        {/* SECURITY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Security & Privacy</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>Files are processed securely</li>
            <li>Converted files are auto-deleted after download</li>
            <li>Authentication handled via Clerk</li>
            <li>No files are shared with third parties</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">FAQ</h2>

          <div className="space-y-3 text-zinc-300">
            <p><b>Q:</b> What happens if conversion fails?</p>
            <p><b>A:</b> Credits are not deducted.</p>

            <p><b>Q:</b> Is there a file size limit?</p>
            <p><b>A:</b> Yes, limits depend on your plan.</p>

            <p><b>Q:</b> Can I convert multiple files?</p>
            <p><b>A:</b> Bulk uploads are supported on paid plans.</p>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Need Help?</h2>
          <p className="text-zinc-400">
            If you have questions or issues, reach out via the Contact page
            or WhatsApp support.
          </p>

          <a
            href="/contact-us"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500 transition"
          >
            Contact Support
          </a>
        </section>

      </div>
    </section>
  );
}