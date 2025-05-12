import { useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";

// Sample data for charts
const userDataByMonth = [
  { name: "Jan", active: 4000, new: 2400 },
  { name: "Feb", active: 3000, new: 1398 },
  { name: "Mar", active: 2000, new: 9800 },
  { name: "Apr", active: 2780, new: 3908 },
  { name: "May", active: 1890, new: 4800 },
  { name: "Jun", active: 2390, new: 3800 },
  { name: "Jul", active: 3490, new: 4300 },
];

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4000 },
  { name: "May", revenue: 7000 },
  { name: "Jun", revenue: 6000 },
  { name: "Jul", revenue: 8000 },
  { name: "Aug", revenue: 9000 },
  { name: "Sep", revenue: 8500 },
  { name: "Oct", revenue: 10000 },
  { name: "Nov", revenue: 11000 },
  { name: "Dec", revenue: 14000 },
];

const platformUsageData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 150 },
  { name: "Other", value: 50 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  const axisColor = isDark ? "#888" : "#666";
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  
  // Update page title
  useEffect(() => {
    document.title = "Analytics - SaaSApp";
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={userDataByMonth}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: axisColor }} 
                    axisLine={{ stroke: gridColor }}
                    tickLine={{ stroke: gridColor }}
                  />
                  <YAxis 
                    tick={{ fill: axisColor }} 
                    axisLine={{ stroke: gridColor }}
                    tickLine={{ stroke: gridColor }}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
                      borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0',
                      borderRadius: '0.5rem',
                      color: isDark ? 'white' : 'black',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="active" fill="hsl(var(--primary))" />
                  <Bar dataKey="new" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Platform Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {platformUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
                      borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0',
                      borderRadius: '0.5rem',
                      color: isDark ? 'white' : 'black',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Annual Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: axisColor }} 
                  axisLine={{ stroke: gridColor }}
                  tickLine={{ stroke: gridColor }}
                />
                <YAxis 
                  tick={{ fill: axisColor }} 
                  axisLine={{ stroke: gridColor }}
                  tickLine={{ stroke: gridColor }}
                />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: isDark ? 'hsl(var(--card))' : 'white',
                    borderColor: isDark ? 'hsl(var(--border))' : '#e2e8f0',
                    borderRadius: '0.5rem',
                    color: isDark ? 'white' : 'black',
                  }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}