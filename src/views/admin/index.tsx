import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/adminSidebar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <SidebarProvider
      style={
        { "--sidebar-width": "20rem" } as React.CSSProperties
      }
    >
      <AdminSidebar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default Admin;
