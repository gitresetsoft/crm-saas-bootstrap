import * as React from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { formatDate } from "@/lib/utils";
import type { Notification } from "@/types";

interface NotificationBellProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  className?: string;
}

export function NotificationBell({
  notifications,
  onMarkAsRead,
  className,
}: NotificationBellProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label={`${unreadCount} unread notifications`}
        className="relative rounded-full"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-md border border-border bg-card p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={() => notifications.forEach((n) => !n.read && onMarkAsRead(n.id))}
                className="text-xs text-primary hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-[300px] space-y-2 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="py-2 text-center text-sm text-muted-foreground">
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "rounded-md p-2 transition-colors",
                    !notification.read && "bg-muted"
                  )}
                >
                  <div className="flex justify-between gap-2">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.read && (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="text-xs text-primary hover:underline"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(notification.created_at)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}