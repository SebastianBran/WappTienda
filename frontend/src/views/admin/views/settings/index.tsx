import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <Button
              className="flex items-center gap-2 text-sm font-medium"
              variant="ghost"
              onClick={() => navigate("/admin")}
            >
              <ChevronLeft className="h-4 w-4" />
              Volver al panel
            </Button>
          </div>
        </header>

        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
          <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <nav className="grid items-start px-4 py-4 text-sm">
              <Button
                className="gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all justify-start hover:text-foreground"
                variant="ghost"
                onClick={() => navigate("/admin/settings")}
              >
                General
              </Button>
            </nav>
          </aside>

          <main className="flex w-full flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Settings;
