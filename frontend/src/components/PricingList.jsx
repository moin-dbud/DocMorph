import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";


export default function PricingList() {
  const [billing, setBilling] = useState("monthly");
  const { getToken, isSignedIn } = useAuth();


  const handlePayment = async (plan) => {
    if (!isSignedIn) {
      alert("Please sign in to continue");
      return;
    }

    try {
      const token = await getToken();

      // 1️⃣ Create order from backend
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Order creation failed:", data);
        return;
      }

      // 2️⃣ Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "DocMorph",
        description: "Upgrade Plan",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            console.log("Razorpay success response:", response);
          

          // 3️⃣ Verify payment with backend
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                credits: data.credits,
                plan: plan,
              }),
            }
          );

          const verifyData = await verifyRes.json();
          console.log("Payment verification response:", verifyData);

          if (!verifyRes.ok) {
            alert("Payment verification failed. Contact support.");
            return;
          }

          alert(`Payment successful! You have been credited with ${data.credits} credits.`);
          window.location.href = `/payment-success?plan=${plan}`;
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("Payment verification failed. Contact support.");
        }
        },

        modal: {
          ondismiss: () => {
            console.log("Checkout form closed");
          }
        },

        theme: {
          color: "#6366F1",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed. Try again.");
    }
  };


  return (
    <section className="relative bg-[#0B0B0F] py-28 text-white">
      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Pricing Plans
          </h2>
          <p className="mt-4 text-zinc-400">
            Simple, transparent pricing based on usage credits
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3 text-sm">
            <span className={billing === "monthly" ? "text-white" : "text-zinc-500"}>
              Monthly
            </span>

            <button
              onClick={() =>
                setBilling(billing === "monthly" ? "annual" : "monthly")
              }
              className="relative h-6 w-11 rounded-full bg-white/10"
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${billing === "annual" ? "left-6" : "left-1"
                  }`}
              />
            </button>

            <span className={billing === "annual" ? "text-white" : "text-zinc-500"}>
              Annual
            </span>

            <span className="ml-2 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs text-yellow-400">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Free */}
          <Plan
            title="Free"
            price="₹0"
            subtitle="5 credits / month"
            cta="Start for Free"
            features={[
              "5 conversion credits",
              "Basic file formats",
              "No signup required",
              "Standard processing",
            ]}
          />


          {/* Pro */}
          <Plan
            popular
            title="Pro"
            price={billing === "monthly" ? "₹199" : "₹1900"}
            subtitle="300 credits / month"
            cta="Upgrade to Pro"
            plan="pro"
            onAction={handlePayment}
            features={[
              "300 conversion credits",
              "All supported formats",
              "No watermark",
              "Fast processing",
              "Conversion history",
            ]}
          />


          {/* Premium */}
          <Plan
            title="Premium"
            price={billing === "monthly" ? "₹499" : "₹4800"}
            subtitle="1000 credits / month"
            cta="Go Premium"
            plan="premium"
            onAction={handlePayment}
            features={[
              "1000 conversion credits",
              "Bulk uploads",
              "Priority processing",
              "Higher file size limits",
              "Email support",
            ]}
          />

        </div>

        {/* Footer note */}
        <p className="mt-10 text-center text-sm text-zinc-500">
          All plans are usage-based. Upgrade anytime as your needs grow.
        </p>
      </div>
    </section>
  );
}

function Plan({ title, price, subtitle, features, cta, popular, plan, onAction }) {
  return (
    <div
      className={`relative rounded-2xl border p-8 transition ${
        popular
          ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-2xl"
          : "border-white/10 bg-white/5"
      }`}
    >
      {popular && (
        <span className="absolute right-6 top-6 rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}

      <h3 className="text-lg font-semibold">{title}</h3>

      <div className="mt-4 text-4xl font-bold">
        {price}
        <span className="ml-1 text-sm font-normal text-zinc-400">/mo</span>
      </div>

      <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>

      <button
        onClick={() => onAction?.(plan)}
        disabled={!onAction}
        className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium transition ${
          popular
            ? "bg-indigo-600 text-white hover:bg-indigo-500"
            : onAction
            ? "bg-white/10 text-white hover:bg-white/20"
            : "bg-white/5 text-zinc-500 cursor-not-allowed"
        }`}
      >
        {cta}
      </button>

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

