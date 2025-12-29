import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { getToken } = useAuth();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await getToken();

        const res = await fetch(`${API_BASE}/api/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [getToken]);

  if (loading) {
    return <p className="text-zinc-400">Loading dashboard...</p>;
  }

  return (
    <div className="space-y-8 items-center justify-between">
      <h1 className="text-3xl font-semibold items-center justify-between">Welcome, Admin 👋</h1>
      <p className="text-zinc-400 mt-1">
        Manage users, revenue and conversions from here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue).toLocaleString()}`}
        />
        <StatCard title="Total Conversions" value={stats.totalConversions} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-6">
      <p className="text-sm text-zinc-400">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}
