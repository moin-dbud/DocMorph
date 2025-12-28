import { Link } from "react-router-dom";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import HeroMockUI from "./HeroMockUI";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#0B0B0F] text-white">
            <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 text-center">

                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-300 backdrop-blur">
                    ✨ New: Credit-based file conversion system
                </div>

                {/* Headline */}
                <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                    Convert files at{" "}
                    <span className="bg-gradient-to from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        lightspeed
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                    Secure document & image conversions with usage-based credits.
                    No signup required — upgrade when you need more.
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        to="/convert"
                        className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-indigo-500"
                    >
                        Start Converting →
                    </Link>

                    <Link
                        to="/pricing"
                        className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/10"
                    >
                        View Pricing
                    </Link>
                </div>

                {/* Trust Text */}
                <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-400">
                    <div className="flex -space-x-2">
                        <img
                            className="h-6 w-6 rounded-full ring-2 ring-black/60 object-cover"
                            src={img1}
                            alt="User avatar"
                        />
                        <img
                            className="h-6 w-6 rounded-full ring-2 ring-black/60 object-cover"
                            src={img2}
                            alt="User avatar"
                        />
                        <img
                            className="h-6 w-6 rounded-full ring-2 ring-black/60 object-cover"
                            src={img3}
                            alt="User avatar"
                        />
                    </div>

                    <span>Trusted by modern teams of all sizes</span>
                </div>


                {/* Product Preview Image */}
                <HeroMockUI />

            </div>
        </section>
    );
}
