import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StreakDisplay } from '@/components/gamification/StreakDisplay';
import { DailyChallenge } from '@/components/gamification/DailyChallenge';
import { AchievementsGrid } from '@/components/gamification/AchievementsGrid';
import { Leaderboard } from '@/components/gamification/Leaderboard';
import { Navbar } from '@/components/layout/Navbar';

export default function Gamification() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-display text-3xl font-bold flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              Gamification Hub
            </h1>
            <p className="text-muted-foreground">
              Track your progress, complete challenges, and climb the leaderboard!
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Streak & Daily Challenge */}
          <div className="space-y-6">
            <StreakDisplay variant="full" />
            <DailyChallenge />
          </div>

          {/* Center Column - Achievements */}
          <div className="lg:col-span-2">
            <AchievementsGrid />
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="mt-8">
          <Leaderboard />
        </div>
      </main>
    </div>
  );
}
