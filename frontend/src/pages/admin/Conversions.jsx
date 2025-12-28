import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function AdminConversions() {
  const { getToken } = useAuth();
  const [conversions, setConversions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const token = await getToken();

        const res = await fetch(
          "http://localhost:5000/api/admin/conversions",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (!data.success) throw new Error();

        setConversions(data.conversions);
      } catch {
        setConversions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConversions();
  }, []);

  if (loading) return <p className="text-white">Loading conversions…</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">
        Conversions
      </h2>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3">File</th>
              <th className="p-3">Type</th>
              <th className="p-3">Credits</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {conversions.map((c) => (
              <tr key={c._id} className="border-t border-white/10">
                <td className="p-3">
                  {c.userId?.email || "—"}
                </td>
                <td className="p-3 text-center">
                  {c.originalFileName}
                </td>
                <td className="p-3 text-center">
                  {c.conversionType}
                </td>
                <td className="p-3 text-center">
                  {c.creditsUsed}
                </td>
                <td className="p-3 text-center text-xs text-zinc-400">
                  {new Date(c.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}