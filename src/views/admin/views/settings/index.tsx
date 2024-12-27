import { useSidebar } from "@/components/ui/sidebar";
import { useEffect } from "react";

const Settings = () => {
  const { setOpen } = useSidebar();

  useEffect(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}

export default Settings;
