import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Layers, BookOpen, GraduationCap, Clock, Coins } from "lucide-react";
import { RecentActivity, mockRecentActivity } from "@/lib/mockStudentData";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  quiz: <Brain className="h-4 w-4" />,
  flashcard: <Layers className="h-4 w-4" />,
  study: <BookOpen className="h-4 w-4" />,
  mock: <GraduationCap className="h-4 w-4" />,
};

const typeColors: Record<string, string> = {
  quiz: "from-purple-500 to-pink-500",
  flashcard: "from-green-500 to-emerald-500",
  study: "from-indigo-500 to-purple-500",
  mock: "from-yellow-500 to-orange-500",
};

interface ActivityTimelineProps {
  activities?: RecentActivity[];
}

export function ActivityTimeline({ activities = mockRecentActivity }: ActivityTimelineProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "relative flex gap-4 pb-4",
                  index !== activities.length - 1 && "border-b border-border/50"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    "bg-gradient-to-br text-white shadow-md",
                    typeColors[activity.type]
                  )}
                >
                  {typeIcons[activity.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{activity.topic}</p>
                      <p className="text-xs text-muted-foreground">{activity.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mt-2">
                    {activity.score !== undefined && (
                      <Badge
                        variant={activity.score >= 70 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {activity.score}%
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(activity.duration)}
                    </span>
                    <span className="text-xs text-gold flex items-center gap-1">
                      <Coins className="h-3 w-3" />
                      {activity.coinsSpent}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
