import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";


export default function Billing() {
    const [payments, setPayments] = useState([]);


    const { getToken } = useAuth();

    const [plan, setPlan] = useState("free");
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");


    useEffect(() => {
        const fetchPayments = async () => {
            const token = await getToken();
            const res = await fetch(`${API_BASE}/api/payment/history`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setPayments(data.payments || []);
        };

        fetchPayments();
    }, [getToken]);


    /* =========================
       FETCH USER BILLING INFO
    ========================= */
    useEffect(() => {
        const fetchBilling = async () => {
            const token = await getToken();
            const res = await fetch(`${API_BASE}/api/credits`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setPlan(data.plan);
            setCredits(data.credits);
        };

        fetchBilling();
    }, [getToken]);

    /* =========================
       HANDLE UPGRADE
    ========================= */
    const handleUpgrade = async (selectedPlan) => {
        try {
            setLoading(true);
            const token = await getToken();

            // 1️⃣ Create order
            const res = await fetch(
                `${API_BASE}/api/payment/create-order`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ plan: selectedPlan }),
                }
            );

            const order = await res.json();

            // 2️⃣ Razorpay checkout
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "DocMorph",
                description: `${selectedPlan.toUpperCase()} Plan`,
                order_id: order.orderId,
                handler: async function (response) {
                    // 3️⃣ Verify payment
                    await fetch(`${API_BASE}/api/payment/verify`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            ...response,
                            credits: order.credits,
                            plan: selectedPlan,
                        }),
                    });

                    // 4️⃣ Refresh billing info
                    window.location.reload();
                },
                theme: { color: "#6366F1" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            alert("Payment failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    /* =========================
       UI
    ========================= */
    return (
        <section className="min-h-screen bg-[#0B0B0F] text-white py-24">
            <div className="mx-auto max-w-6xl px-6 space-y-16">

                {/* HEADER */}
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">Billing & Plans</h1>
                    <p className="mt-3 text-zinc-400">
                        Manage your subscription and credits
                    </p>
                </div>

                {/* CURRENT PLAN */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div>
                        <p className="text-sm text-zinc-400">Current Plan</p>
                        <p className="text-2xl font-semibold uppercase">{plan}</p>
                    </div>

                    <div>
                        <p className="text-sm text-zinc-400">Credits Available</p>
                        <p className="text-2xl font-semibold">{credits ?? "…"}</p>
                    </div>
                </div>

                {/* PLANS */}
                <div className="grid gap-8 md:grid-cols-3">

                    {/* FREE */}
                    <PlanCard
                        title="Free"
                        price="₹0"
                        subtitle="5 credits"
                        active={plan === "free"}
                        features={[
                            "5 conversion credits",
                            "Basic formats",
                            "Standard processing",
                        ]}
                    />

                    {/* PRO */}
                    <PlanCard
                        title="Pro"
                        price="₹199"
                        subtitle="300 credits"
                        popular
                        active={plan === "pro"}
                        onUpgrade={() => handleUpgrade("pro")}
                        loading={loading}
                        features={[
                            "300 credits",
                            "All formats",
                            "Fast processing",
                            "Conversion history",
                        ]}
                    />

                    {/* PREMIUM */}
                    <PlanCard
                        title="Premium"
                        price="₹499"
                        subtitle="1000 credits"
                        active={plan === "premium"}
                        onUpgrade={() => handleUpgrade("premium")}
                        loading={loading}
                        features={[
                            "1000 credits",
                            "Bulk uploads",
                            "Priority processing",
                            "Email support",
                        ]}
                    />
                </div>

                {/* PAYMENT HISTORY */}
                {payments.length > 0 && (
                    <div className="mt-16">
                        <h2 className="mb-6 text-xl font-semibold">Payment History</h2>

                        <div className="overflow-hidden rounded-xl border border-white/10">
                            <table className="w-full text-sm">
                                <thead className="bg-white/5 text-zinc-400">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Date</th>
                                        <th className="px-4 py-3 text-left">Plan</th>
                                        <th className="px-4 py-3 text-left">Credits</th>
                                        <th className="px-4 py-3 text-left">Amount</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-left">Invoice</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {payments.map((p) => (
                                        <tr key={p._id} className="border-t border-white/10">
                                            <td className="px-4 py-3">
                                                {new Date(p.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-3 uppercase">{p.plan}</td>
                                            <td className="px-4 py-3">{p.creditsAdded}</td>
                                            <td className="px-4 py-3">₹{p.amount}</td>
                                            <td className="px-4 py-3 text-green-400">Success</td>
                                            <td className="px-4 py-3">
                                                <a
                                                    href={`${API_BASE}/api/invoice/${p._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-indigo-400 hover:underline"
                                                >
                                                    Download
                                                </a>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* FOOTER NOTE */}
                <p className="text-center text-sm text-zinc-500">
                    Payments are secure • Credits never expire • Upgrade anytime
                </p>
            </div>
        </section>
    );
}

/* =========================
   PLAN CARD COMPONENT
========================= */
function PlanCard({
    title,
    price,
    subtitle,
    features,
    popular,
    active,
    onUpgrade,
    loading,
}) {
    return (
        <div
            className={`relative rounded-2xl border p-8 transition ${popular
                ? "border-indigo-500 bg-indigo-500/10 shadow-xl"
                : "border-white/10 bg-white/5"
                }`}
        >
            {popular && (
                <span className="absolute top-4 right-4 rounded-full bg-indigo-600 px-3 py-1 text-xs">
                    Most Popular
                </span>
            )}

            <h3 className="text-lg font-semibold">{title}</h3>

            <div className="mt-4 text-4xl font-bold">
                {price}
                <span className="ml-1 text-sm font-normal text-zinc-400">/mo</span>
            </div>

            <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>

            {active ? (
                <div className="mt-6 rounded-lg bg-green-600/20 px-4 py-2 text-center text-sm text-green-400">
                    Current Plan
                </div>
            ) : onUpgrade ? (
                <button
                    onClick={onUpgrade}
                    disabled={loading}
                    className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium hover:bg-indigo-500 disabled:opacity-50"
                >
                    {loading ? "Processing..." : `Upgrade to ${title}`}
                </button>
            ) : null}

            <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                {features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        {item}
                    </li>
                ))}
            </ul>

        </div>
    );
}
