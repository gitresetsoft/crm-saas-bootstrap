import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Settings, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  Boxes,
  BarChart3,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isMobile: boolean;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({ isMobile, onCloseMobile }: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  const toggleCollapse = () => setCollapsed(!collapsed);

  // Define sidebar navigation items
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Team",
      href: "/dashboard/team",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]",
        isMobile && "absolute inset-y-0 left-0 z-50"
      )}
    >
      <div className="flex h-16 items-center border-b border-border px-3 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <Boxes className="h-6 w-6 text-primary" />
          {!collapsed && <span className="text-xl font-bold">SaaSApp</span>}
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            onClick={isMobile ? onCloseMobile : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              )
            }
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {!isMobile && (
        <div className="p-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className="w-full justify-center rounded-md border border-border p-2"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}