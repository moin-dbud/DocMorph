import { useSearchParams, Link } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const plan = params.get("plan");

  return (
    <section className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
      <div className="max-w-md text-center space-y-6">
        <div className="text-5xl">🎉</div>

        <h1 className="text-3xl font-semibold">
          Payment Successful
        </h1>

        <p className="text-zinc-400">
          Your account has been upgraded to{" "}
          <span className="font-semibold text-indigo-400">
            {plan?.toUpperCase()}
          </span>
        </p>

        <Link
          to="/convert"
          className="inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium hover:bg-indigo-500 transition"
        >
          Start Converting
        </Link>
      </div>
    </section>
  );
}