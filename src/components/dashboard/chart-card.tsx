import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/hooks/use-theme";
import type { ChartData } from "@/types";

interface ChartCardProps {
  title: string;
  data: ChartData[];
  className?: string;
}

export function ChartCard({ title, data, className }: ChartCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: isDark ? '#888' : '#666' }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: isDark ? '#888' : '#666' }}
                dx={-10}
              />
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
                  borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0',
                  borderRadius: '0.5rem',
                  color: isDark ? 'white' : 'black',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}