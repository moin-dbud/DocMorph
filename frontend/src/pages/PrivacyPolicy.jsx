export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-5xl px-6 py-24 space-y-12">

        {/* HEADER */}
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy explains how
            DocMorph collects, uses, and protects your information.
          </p>
        </header>

        {/* INTRO */}
        <section className="space-y-4 text-zinc-300">
          <p>
            DocMorph (“we”, “our”, or “us”) is committed to protecting your
            personal data. By using our website and services, you agree to the
            practices described in this Privacy Policy.
          </p>
        </section>

        {/* INFORMATION WE COLLECT */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>
              <b>Account Information:</b> Name, email address, and authentication
              details provided via Clerk.
            </li>
            <li>
              <b>Uploaded Files:</b> Files you upload for conversion, processed
              temporarily.
            </li>
            <li>
              <b>Usage Data:</b> Conversion history, credits usage, and basic
              activity logs.
            </li>
            <li>
              <b>Contact Messages:</b> Information submitted through the Contact
              Us form.
            </li>
          </ul>
        </section>

        {/* HOW WE USE DATA */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>To provide and improve our file conversion services</li>
            <li>To manage user accounts and credits</li>
            <li>To process payments and billing</li>
            <li>To respond to support requests and inquiries</li>
            <li>To maintain platform security and prevent abuse</li>
          </ul>
        </section>

        {/* FILE HANDLING */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. File Handling & Storage</h2>
          <p className="text-zinc-300">
            Uploaded files are processed securely and are not shared with third
            parties. Converted files are automatically deleted after a limited
            period or once downloaded.
          </p>
        </section>

        {/* DATA SHARING */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Data Sharing</h2>
          <p className="text-zinc-300">
            We do not sell or rent your personal data. Data may only be shared
            with trusted third-party services required to operate the platform
            (such as authentication and payment providers).
          </p>
        </section>

        {/* SECURITY */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Security</h2>
          <p className="text-zinc-300">
            We use industry-standard security practices, including authentication,
            access control, and secure file handling, to protect your data.
          </p>
        </section>

        {/* USER RIGHTS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Your Rights</h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-300">
            <li>You can access or update your account information</li>
            <li>You may request deletion of your data</li>
            <li>You can contact us regarding privacy concerns</li>
          </ul>
        </section>

        {/* COOKIES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Cookies</h2>
          <p className="text-zinc-300">
            DocMorph uses essential cookies to manage authentication and session
            security. We do not use invasive tracking cookies.
          </p>
        </section>

        {/* POLICY UPDATES */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">8. Policy Updates</h2>
          <p className="text-zinc-300">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page.
          </p>
        </section>

        {/* CONTACT */}
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-zinc-400">
            If you have questions about this Privacy Policy, please contact us.
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