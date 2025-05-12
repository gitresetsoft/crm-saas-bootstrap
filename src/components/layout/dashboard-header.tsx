import * as React from "react";
import { Menu, Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/toggle-theme";
import { Avatar } from "@/components/ui/avatar";
import { NotificationBell } from "@/components/ui/notification-bell";
import { useAuth } from "@/hooks/use-auth";
import type { Notification } from "@/types";

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
}

export function DashboardHeader({ onOpenMobileMenu }: DashboardHeaderProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to SaaSApp!",
      description: "Thanks for joining us. Get started by exploring the dashboard.",
      read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "New feature available",
      description: "Check out our latest analytics dashboard with improved insights.",
      read: false,
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  // Get the current page title from the pathname
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path === "/dashboard/analytics") return "Analytics";
    if (path === "/dashboard/team") return "Team Management";
    if (path === "/dashboard/settings") return "Account Settings";
    if (path === "/dashboard/billing") return "Billing & Subscription";
    return "Dashboard";
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onOpenMobileMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-3">
          <NotificationBell
            notifications={notifications}
            onMarkAsRead={markAsRead}
          />
          <ThemeToggle />
          <div className="relative">
            <Avatar
              src={user?.avatar_url}
              alt={user?.email || "User"}
              size="sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
}