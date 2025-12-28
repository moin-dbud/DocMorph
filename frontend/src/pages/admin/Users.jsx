import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function AdminUsers() {
  const { getToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };

    loadUsers();
  }, []);

  const grantCredits = async (id) => {
    const amount = prompt("Enter credits to add:");
    if (!amount) return;

    const token = await getToken();
    await fetch("http://localhost:5000/api/admin/users/credits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id, credits: amount }),
    });

    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, credits: u.credits + Number(amount) } : u
      )
    );
  };

  if (loading) return <p className="text-white">Loading users…</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Users</h2>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm text-white">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3">Plan</th>
              <th className="p-3">Credits</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-white/10">
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-center">{u.plan}</td>
                <td className="p-3 text-center">{u.credits}</td>
                <td className="p-3 text-center">{u.role}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => grantCredits(u._id)}
                    className="rounded bg-indigo-600 px-3 py-1 text-xs"
                  >
                    Add Credits
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
