import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function AdminPayments() {
  const { getToken } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = await getToken();

        const res = await fetch(`${API_BASE}/api/admin/payments`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message);
        }

        setPayments(data.payments || []);
      } catch (err) {
        console.error("Failed to load payments:", err);
        setPayments([]); // ✅ prevents crash
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p className="text-white">Loading payments…</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">
        Payments & Revenue
      </h2>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Credits</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(payments) && payments.map((p) => (
              <tr
                key={p._id}
                className="border-t border-white/10"
              >
                <td className="p-3">
                  {p.userId?.email || "—"}
                </td>
                <td className="p-3 text-center capitalize">
                  {p.plan}
                </td>
                <td className="p-3 text-center">
                  ₹{(p.amount).toLocaleString()}
                </td>
                <td className="p-3 text-center">
                  {p.credits ?? "-"}
                </td>
                <td className="p-3 text-center">
                  <span
                    className={`rounded px-2 py-1 text-xs ${p.status === "success"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-center text-xs text-zinc-400">
                  {new Date(p.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
