import { useAuth } from "@/contexts/AuthContext";
import { Flame, Trophy, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
  gradient: string;
}

function StatCard({ icon, label, value, subtext, gradient }: StatCardProps) {
  return (
    <div className="arcade-card !p-4">
      <div className="relative z-10 flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            "bg-gradient-to-br shadow-lg",
            gradient
          )}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-bold">{value}</p>
          {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

export function StatsOverview() {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      icon: <Flame className="h-6 w-6 text-white animate-streak-flame" />,
      label: "Current Streak",
      value: user.studyStreak.current,
      subtext: `Best: ${user.studyStreak.longest} days`,
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: <Trophy className="h-6 w-6 text-white" />,
      label: "Grade",
      value: `Class ${user.grade}`,
      subtext: user.educationBoard,
      gradient: "from-yellow-500 to-amber-500",
    },
    {
      icon: <Target className="h-6 w-6 text-white" />,
      label: "Topics Studied",
      value: 24,
      subtext: "This week",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      label: "Avg Score",
      value: "78%",
      subtext: "Last 10 quizzes",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  );
}
