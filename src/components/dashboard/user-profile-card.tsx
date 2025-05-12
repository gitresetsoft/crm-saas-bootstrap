import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";

interface UserProfileCardProps {
  user: User;
  className?: string;
}

export function UserProfileCard({ user, className }: UserProfileCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar 
            src={user.avatar_url}
            alt={user.email || "User"}
            size="lg"
            className="h-20 w-20"
            fallback={`${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`}
          />
          
          <div className="text-center">
            <h3 className="text-xl font-semibold">
              {user.first_name ? `${user.first_name} ${user.last_name || ''}` : 'User'}
            </h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          
          <div className="w-full space-y-4 rounded-md border border-border p-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Member since</span>
              <span className="text-sm">
                {user.created_at ? formatDate(user.created_at) : 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="rounded-full bg-success/20 px-2 py-0.5 text-xs text-success">
                Active
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}