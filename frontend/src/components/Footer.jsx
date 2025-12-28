import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0F] border-t border-white/10 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">

        {/* Top Grid */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold">
              Doc<span className="text-indigo-400">Morph</span>
            </h3>
            <p className="mt-4 text-sm text-zinc-400">
              A modern, credit-based document and image conversion platform.
              Fast, secure, and built for simplicity.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Product
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link to="/convert" className="hover:text-white">
                  Convert
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-white">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} DocMorph. All rights reserved.</p>
          <p>
            Built with ❤️ for modern teams
          </p>
        </div>

      </div>
    </footer>
  );
}
