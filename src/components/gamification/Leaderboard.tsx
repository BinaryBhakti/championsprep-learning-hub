import { useState } from 'react';
import { Trophy, Medal, Flame, ChevronUp, ChevronDown, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  mockWeeklyLeaderboard,
  mockMonthlyLeaderboard,
  LeaderboardEntry,
} from '@/lib/mockGamificationData';
import { cn } from '@/lib/utils';

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-600" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getRankBg = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
    case 2:
      return 'bg-gradient-to-r from-gray-300/20 to-gray-400/20 border-gray-400/30';
    case 3:
      return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/30';
    default:
      return '';
  }
};

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

function LeaderboardList({ entries }: LeaderboardListProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2 pr-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl border transition-all",
              entry.isCurrentUser && "ring-2 ring-primary ring-offset-2",
              getRankBg(entry.rank)
            )}
          >
            {/* Rank */}
            <div className="w-10 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>

            {/* Avatar */}
            <Avatar className="h-10 w-10">
              <AvatarFallback className={cn(
                "text-sm",
                entry.rank <= 3 ? "bg-primary/20 text-primary" : "bg-muted"
              )}>
                {entry.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium truncate",
                entry.isCurrentUser && "text-primary"
              )}>
                {entry.name}
                {entry.isCurrentUser && <span className="text-xs ml-1">(You)</span>}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Flame className="h-3 w-3 text-orange-500" />
                <span>{entry.streak} day streak</span>
              </div>
            </div>

            {/* XP */}
            <div className="text-right">
              <p className="font-bold">{entry.xp.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export function Leaderboard() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const currentData = period === 'weekly' ? mockWeeklyLeaderboard : mockMonthlyLeaderboard;
  const currentUser = currentData.find(e => e.isCurrentUser);

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-gold" />
            Leaderboard
          </CardTitle>
          {currentUser && (
            <Badge variant="outline" className="gap-1">
              Your Rank: #{currentUser.rank}
              {period === 'weekly' && currentUser.rank <= 5 && (
                <ChevronUp className="h-3 w-3 text-success" />
              )}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={period} onValueChange={(v) => setPeriod(v as 'weekly' | 'monthly')}>
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-4">
            <LeaderboardList entries={mockWeeklyLeaderboard} />
          </TabsContent>

          <TabsContent value="monthly" className="mt-4">
            <LeaderboardList entries={mockMonthlyLeaderboard} />
          </TabsContent>
        </Tabs>

        {/* Friend Leaderboards CTA */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-dashed text-muted-foreground">
          <Users className="h-4 w-4" />
          <span className="text-sm">Join a study group to compete with friends!</span>
        </div>
      </CardContent>
    </Card>
  );
}
