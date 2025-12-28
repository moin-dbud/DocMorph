import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function AdminLayout() {
  const { user } = useUser();

  return (
    <div className="min-h-screen flex bg-[#0B0B0F] text-white">
      
      {/* LEFT SIDEBAR */}
      <aside className="w-64 border-r border-white/10 p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold">Admin</h2>
          <p className="text-sm text-zinc-400">
            {user?.fullName}
          </p>
        </div>

        <nav className="space-y-3">
          <AdminLink to="dashboard">Dashboard</AdminLink>
          <AdminLink to="users">Users</AdminLink>
          <AdminLink to="payments">Payments</AdminLink>
          <AdminLink to="conversions">Conversions</AdminLink>
        </nav>
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}

function AdminLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-lg px-4 py-2 text-sm transition ${
          isActive
            ? "bg-indigo-600 text-white"
            : "text-zinc-300 hover:bg-white/10"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
