import { Users, UserPlus, Activity, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  mockAnalytics,
  signupTrendData,
  popularTopicsData,
  learningModeData,
} from '@/lib/mockAdminData';

const chartConfig = {
  signups: { label: 'Signups', color: 'hsl(var(--primary))' },
  count: { label: 'Sessions', color: 'hsl(var(--primary))' },
};

export function AnalyticsDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: mockAnalytics.totalUsers.toLocaleString(),
      icon: Users,
      description: 'All registered accounts',
    },
    {
      title: 'New Signups',
      value: mockAnalytics.newSignups7Days.toLocaleString(),
      icon: UserPlus,
      description: 'Last 7 days',
    },
    {
      title: 'Daily Active Users',
      value: mockAnalytics.dailyActiveUsers.toLocaleString(),
      icon: Activity,
      description: 'Active today',
    },
    {
      title: 'Total Generations',
      value: mockAnalytics.totalGenerations.toLocaleString(),
      icon: Sparkles,
      description: 'Questions generated',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Signup Trend */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Signup Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signupTrendData}>
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="signups"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Popular Topics */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularTopicsData} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="topic"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={140}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Learning Mode Distribution */}
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle>Learning Mode Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <ChartContainer config={chartConfig} className="h-[250px] w-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={learningModeData}
                    dataKey="value"
                    nameKey="mode"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {learningModeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-col gap-3">
              {learningModeData.map((item) => (
                <div key={item.mode} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-sm">
                    {item.mode}: <span className="font-semibold">{item.value}%</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
