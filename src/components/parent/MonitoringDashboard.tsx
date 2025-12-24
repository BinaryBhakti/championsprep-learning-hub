import { Coins, Flame, Target, BookOpen, Trophy, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  ChildStats,
  SubjectMastery,
  WeeklyActivity,
  Achievement,
  TopicReview,
} from '@/lib/mockParentData';

interface MonitoringDashboardProps {
  stats: ChildStats;
  subjectMastery: SubjectMastery[];
  weeklyActivity: WeeklyActivity[];
  achievements: Achievement[];
  topicsToReview: TopicReview[];
}

const chartConfig = {
  sessions: { label: 'Sessions', color: 'hsl(var(--primary))' },
  minutes: { label: 'Minutes', color: 'hsl(var(--gold))' },
};

export function MonitoringDashboard({
  stats,
  subjectMastery,
  weeklyActivity,
  achievements,
  topicsToReview,
}: MonitoringDashboardProps) {
  const statCards = [
    {
      title: 'Coin Balance',
      value: stats.coinBalance,
      icon: Coins,
      iconColor: 'text-gold',
    },
    {
      title: 'Current Streak',
      value: `${stats.currentStreak} days`,
      icon: Flame,
      iconColor: 'text-primary',
      subtitle: `Longest: ${stats.longestStreak} days`,
    },
    {
      title: 'Average Score',
      value: `${stats.averageScore}%`,
      icon: Target,
      iconColor: 'text-success',
    },
    {
      title: 'Total Sessions',
      value: stats.totalSessions,
      icon: BookOpen,
      iconColor: 'text-secondary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject Mastery */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Subject Mastery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjectMastery.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{subject.subject}</span>
                  <span className="text-muted-foreground">{subject.mastery}%</span>
                </div>
                <Progress value={subject.mastery} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Activity Heatmap */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="sessions"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span>Sessions per day</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Achievements */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-gold" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.slice(0, 4).map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {achievement.earnedAt}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Topics Needing Review */}
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Topics Needing Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topicsToReview.map((topic) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{topic.topic}</p>
                    <p className="text-xs text-muted-foreground">{topic.subject}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="mb-1">
                      {topic.lastScore}%
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {topic.attempts} attempts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
