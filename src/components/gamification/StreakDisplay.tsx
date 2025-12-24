import { Flame, Trophy, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mockStreakData } from '@/lib/mockGamificationData';

interface StreakDisplayProps {
  variant?: 'compact' | 'full';
}

export function StreakDisplay({ variant = 'compact' }: StreakDisplayProps) {
  const streak = mockStreakData;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
        <Flame className="h-4 w-4 text-primary animate-pulse" />
        <span className="font-semibold text-sm">{streak.current}</span>
        <span className="text-xs text-muted-foreground">day streak</span>
      </div>
    );
  }

  return (
    <Card className="rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Current Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{streak.current}</span>
              <span className="text-lg">days</span>
            </div>
          </div>
          <Flame className="h-16 w-16 text-white/30" />
        </div>
      </div>
      <CardContent className="p-4 space-y-4">
        {/* Longest streak */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-gold" />
            <span className="text-sm">Longest Streak</span>
          </div>
          <span className="font-bold">{streak.longest} days</span>
        </div>

        {/* Weekly activity */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">This Week</span>
          </div>
          <div className="flex justify-between gap-1">
            {days.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                    streak.weeklyActivity[index]
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {streak.weeklyActivity[index] ? (
                    <Flame className="h-4 w-4" />
                  ) : (
                    <span className="text-xs">{day}</span>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <p className="text-center text-sm text-muted-foreground">
          {streak.current >= streak.longest 
            ? "🔥 You're on your best streak ever!" 
            : `${streak.longest - streak.current} more days to beat your record!`}
        </p>
      </CardContent>
    </Card>
  );
}
