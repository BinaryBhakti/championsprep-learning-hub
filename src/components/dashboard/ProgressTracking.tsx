import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, AlertTriangle, BookOpen } from "lucide-react";
import {
  SubjectProgress,
  TopicProgress,
  mockSubjectProgress,
  mockTopicProgress,
} from "@/lib/mockStudentData";
import { cn } from "@/lib/utils";

const chartConfig = {
  mastery: { label: "Mastery", color: "hsl(var(--primary))" },
};

interface ProgressTrackingProps {
  subjectProgress?: SubjectProgress[];
  topicProgress?: TopicProgress[];
}

export function ProgressTracking({
  subjectProgress = mockSubjectProgress,
  topicProgress = mockTopicProgress,
}: ProgressTrackingProps) {
  const weakTopics = topicProgress.filter((t) => t.status === "weak");
  const chartData = subjectProgress.map((s) => ({
    subject: s.subject.split(" ")[0],
    mastery: s.mastery,
    fill: s.color,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Subject Mastery */}
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Subject Mastery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjectProgress.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-muted-foreground">
                  {subject.topicsCompleted}/{subject.totalTopics} topics •{" "}
                  {subject.mastery}%
                </span>
              </div>
              <Progress value={subject.mastery} className="h-3" />
            </div>
          ))}

          {/* Chart */}
          <ChartContainer config={chartConfig} className="h-[150px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="subject" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mastery" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weak Topics */}
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Topics Needing Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weakTopics.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                Great job! No weak topics to review.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {weakTopics.map((topic) => (
                <div
                  key={topic.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-2xl",
                    "bg-destructive/5 border border-destructive/20"
                  )}
                >
                  <div>
                    <p className="font-medium">{topic.topic}</p>
                    <p className="text-xs text-muted-foreground">{topic.subject}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{topic.mastery}%</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {topic.attempts} attempts
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
