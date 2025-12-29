export default function TermsOfService() {
  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 space-y-12">

        {/* HEADER */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold">Terms of Service</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            These Terms of Service govern your access to and use of DocMorph.
            Please read them carefully.
          </p>
        </header>

        {/* INTRO */}
        <section className="space-y-4 text-zinc-300">
          <p>
            By accessing or using DocMorph (“we”, “our”, or “us”), you agree to be
            bound by these Terms of Service. If you do not agree to these terms,
            please do not use the platform.
          </p>
        </section>

        {/* ELIGIBILITY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Eligibility</h2>
          <p className="text-zinc-300">
            You must be at least 13 years old to use DocMorph. By using the
            platform, you confirm that you meet this requirement.
          </p>
        </section>

        {/* ACCOUNT */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Accounts & Authentication</h2>
          <p className="text-zinc-300">
            You are responsible for maintaining the confidentiality of your
            account and for all activities that occur under your account.
            Authentication is managed securely via third-party providers.
          </p>
        </section>

        {/* SERVICE USAGE */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Use of the Service</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>You may use DocMorph only for lawful purposes</li>
            <li>You must not upload malicious or harmful content</li>
            <li>You must not abuse or attempt to exploit the platform</li>
            <li>Automated misuse or scraping is prohibited</li>
          </ul>
        </section>

        {/* CREDITS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Credits & Payments</h2>
          <p className="text-zinc-300">
            DocMorph operates on a credit-based system. Each successful file
            conversion consumes one credit. Credits are deducted only after a
            successful conversion.
          </p>
          <p className="text-zinc-300">
            Payments are handled securely through third-party payment providers.
            Purchased credits are non-refundable unless required by law.
          </p>
        </section>

        {/* FILE HANDLING */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. File Handling</h2>
          <p className="text-zinc-300">
            Files uploaded to DocMorph are processed temporarily for conversion.
            We do not claim ownership of your files. Converted files may be
            automatically deleted after a limited time.
          </p>
        </section>

        {/* AVAILABILITY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Service Availability</h2>
          <p className="text-zinc-300">
            We strive to keep DocMorph available at all times, but we do not
            guarantee uninterrupted access. The service may be temporarily
            unavailable due to maintenance or technical issues.
          </p>
        </section>

        {/* TERMINATION */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Account Termination</h2>
          <p className="text-zinc-300">
            We reserve the right to suspend or terminate accounts that violate
            these Terms of Service or engage in abusive behavior.
          </p>
        </section>

        {/* LIABILITY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Limitation of Liability</h2>
          <p className="text-zinc-300">
            DocMorph is provided “as is” without warranties of any kind. We are
            not liable for any direct or indirect damages resulting from the use
            or inability to use the service.
          </p>
        </section>

        {/* CHANGES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
          <p className="text-zinc-300">
            We may update these Terms of Service from time to time. Continued use
            of DocMorph after changes means you accept the updated terms.
          </p>
        </section>

        {/* CONTACT */}
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="text-zinc-400">
            If you have questions about these Terms of Service, please contact us.
          </p>

          <a
            href="/contact"
            className="inline-block rounded-xl bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-500 transition"
          >
            Contact Support
          </a>
        </section>

        {/* FOOTER NOTE */}
        <p className="text-center text-xs text-zinc-500">
          Last updated: December 2025
        </p>
      </div>
    </section>
  );
}