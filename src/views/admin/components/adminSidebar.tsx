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

type AdminNavProps = React.ComponentProps<typeof Sidebar>

const AdminSidebar = ({ className, ...props }: AdminNavProps) => {
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Orders
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Store className="h-4 w-4" />
                    Products
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Customers
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
