import { Home, Settings, ShoppingCart, Store, Users } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

type AdminNavProps = React.ComponentProps<typeof Sidebar>

const AdminSidebar = ({ className, ...props }: AdminNavProps) => {
  const [storeId] = useState('123');
  const actions = [
    {
      title: "Dashboard",
      icon: Home,
      url: `/admin/${storeId}`,
    },
    {
      title: "Ordenes",
      icon: ShoppingCart,
      url: `/admin/${storeId}/orders`,
    },
    {
      title: "Productos",
      icon: Store,
      url: `/admin/${storeId}/products`,
    },
    {
      title: "Clientes",
      icon: Users,
      url: `/admin/${storeId}/customers`,
    },
    {
      title: "Configuración",
      icon: Settings,
      url: `/admin/${storeId}/settings`,
    },
  ];

  const navigate = useNavigate();

  return (
    <Sidebar
      className={cn(
        "border-r",
        className,
      )}
      {...props}
    >
      <SidebarHeader className="flex flex-row border-b p-4">
        <img src="https://via.placeholder.com/48" alt="logo" className="w-12 h-12 rounded" />
        <div className='flex flex-col ml-2'>
          <span className="font-semibold">Flores Juan</span>
          <span className="text-muted-foreground text-xs">wapptienda/store/flores-juan</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="p-2">
            <SidebarMenu>
              {actions.map((action, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => navigate(action.url)}>
                      <action.icon className="h-4 w-4" />
                      {action.title}
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
