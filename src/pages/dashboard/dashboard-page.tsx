import { useEffect, useState } from "react";
import { Users, BarChart4, CreditCard, Zap } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { ActivityList } from "@/components/dashboard/activity-list";
import { ChartCard } from "@/components/dashboard/chart-card";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";
import { useAuth } from "@/hooks/use-auth";
import type { Metric, Activity, ChartData } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  // Mock data for demonstration
  
  const [metrics] = useState<Metric[]>([
    {
      name: "Total Users",
      value: 23845,
      change: 12.5,
      timeframe: "monthly",
    },
    {
      name: "Active Projects",
      value: 153,
      change: 7.2,
      timeframe: "weekly",
    },
    {
      name: "Revenue",
      value: 38420,
      change: -2.5,
      timeframe: "monthly",
    },
    {
      name: "Conversion Rate",
      value: 28.6,
      change: 4.1,
      timeframe: "weekly",
    },
  ]);

  const [activities] = useState<Activity[]>([
    {
      id: "1",
      user_id: user?.id || "",
      action: "Created a new project",
      target: "Marketing Campaign Q2",
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: "2",
      user_id: user?.id || "",
      action: "Invited team member",
      target: "alex@example.com",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: "3",
      user_id: user?.id || "",
      action: "Updated settings",
      target: "Notification preferences",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      id: "4",
      user_id: user?.id || "",
      action: "Completed task",
      target: "Quarterly report review",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ]);

  const [chartData] = useState<ChartData[]>([
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4000 },
    { name: "May", value: 7000 },
    { name: "Jun", value: 6000 },
    { name: "Jul", value: 8000 },
    { name: "Aug", value: 9000 },
    { name: "Sep", value: 8500 },
    { name: "Oct", value: 10000 },
    { name: "Nov", value: 11000 },
    { name: "Dec", value: 14000 },
  ]);

  // Update page title
  useEffect(() => {
    document.title = "Dashboard - SaaSApp";
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          metric={metrics[0]}
          icon={<Users className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          metric={metrics[1]}
          icon={<Zap className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          metric={metrics[2]}
          icon={<CreditCard className="h-4 w-4 text-primary" />}
        />
        <StatsCard
          metric={metrics[3]}
          icon={<BarChart4 className="h-4 w-4 text-primary" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard
          title="Revenue Growth"
          data={chartData}
          className="lg:col-span-2"
        />
        <UserProfileCard user={user || { id: "" }} />
      </div>

      <ActivityList activities={activities} />
    </div>
  );
}