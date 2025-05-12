import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatNumber } from "@/lib/utils";
import type { Metric } from "@/types";

interface StatsCardProps {
  metric: Metric;
  icon: React.ReactNode;
  className?: string;
}

export function StatsCard({ metric, icon, className }: StatsCardProps) {
  const isPositive = metric.change >= 0;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
        <div className="rounded-full p-1 bg-muted">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatNumber(metric.value)}</div>
        <div className="mt-1 flex items-center text-xs">
          <span
            className={`flex items-center ${
              isPositive ? "text-success" : "text-destructive"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-3 w-3" />
            ) : (
              <ArrowDownRight className="mr-1 h-3 w-3" />
            )}
            {Math.abs(metric.change).toFixed(1)}%
          </span>
          <span className="ml-1 text-muted-foreground">
            vs. last {metric.timeframe}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}