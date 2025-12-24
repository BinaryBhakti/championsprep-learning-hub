import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, ArrowRight } from "lucide-react";
import { recentTopics } from "@/lib/mockStudentData";
import { cn } from "@/lib/utils";

interface RecentTopicsProps {
  onSelectTopic: (topic: string, subject: string) => void;
}

export function RecentTopics({ onSelectTopic }: RecentTopicsProps) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Continue Learning</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentTopics.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "shrink-0 rounded-full group",
                "hover:border-primary hover:bg-primary/5"
              )}
              onClick={() => onSelectTopic(item.topic, item.subject)}
            >
              <span className="max-w-[150px] truncate">{item.topic}</span>
              <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
