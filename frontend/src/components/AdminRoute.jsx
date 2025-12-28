import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function AdminRoute() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
