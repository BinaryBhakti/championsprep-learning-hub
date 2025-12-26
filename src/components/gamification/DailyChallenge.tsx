import { useState, useEffect } from 'react';
import { Target, Coins, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockDailyChallenge, DailyChallenge as DailyChallengeType } from '@/lib/mockGamificationData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function DailyChallenge() {
  const [challenge, setChallenge] = useState<DailyChallengeType>(mockDailyChallenge);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expires = new Date(challenge.expiresAt);
      const diff = expires.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [challenge.expiresAt]);

  const handleClaim = () => {
    setChallenge({ ...challenge, completed: true });
    toast.success(`Claimed ${challenge.reward.coins} coins and ${challenge.reward.xp} XP!`);
  };

  const progressPercent = (challenge.progress / challenge.target) * 100;
  const isComplete = challenge.progress >= challenge.target;

  return (
    <Card className={cn(
      "rounded-3xl overflow-hidden transition-all bg-card/50 backdrop-blur-sm border-border/50",
      isComplete && !challenge.completed && "ring-2 ring-success ring-offset-2 ring-offset-background"
    )}>
      <div className={cn(
        "p-4 flex items-center justify-between",
        challenge.completed 
          ? "bg-success/10" 
          : "bg-gradient-to-r from-primary/10 to-gold/10"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            challenge.completed 
              ? "bg-success text-success-foreground" 
              : "bg-primary text-primary-foreground"
          )}>
            {challenge.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Target className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Daily Challenge</p>
            <h3 className="font-semibold">{challenge.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{timeLeft}</span>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground">{challenge.description}</p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{challenge.progress}/{challenge.target}</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </div>

        {/* Rewards */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <Badge variant="outline" className="gap-1">
              <Coins className="h-3 w-3 text-gold" />
              {challenge.reward.coins} coins
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Sparkles className="h-3 w-3 text-primary" />
              {challenge.reward.xp} XP
            </Badge>
          </div>

          {isComplete && !challenge.completed && (
            <Button size="sm" onClick={handleClaim} className="rounded-full">
              Claim Reward
            </Button>
          )}

          {challenge.completed && (
            <Badge className="bg-success/20 text-success">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
