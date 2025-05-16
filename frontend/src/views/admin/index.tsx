import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/adminSidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getItem } from "@/lib/local-storage";

const Admin = () => {
  useEffect(() => {
    const accessToken = getItem<string>("accessToken");
    if (!accessToken) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "20rem" } as React.CSSProperties}
    >
      <AdminSidebar />
      <main className="container mx-auto p-4 relative">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Admin;