import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { ArcadeCard } from "@/components/dashboard/ArcadeCard";
import { TopicSelector } from "@/components/dashboard/TopicSelector";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { useAuth } from "@/contexts/AuthContext";
import { LEARNING_MODES } from "@/lib/constants";
import {
  Brain,
  Zap,
  Layers,
  FileText,
  BookOpen,
  MessageCircle,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="h-8 w-8" />,
  Zap: <Zap className="h-8 w-8" />,
  Layers: <Layers className="h-8 w-8" />,
  FileText: <FileText className="h-8 w-8" />,
  BookOpen: <BookOpen className="h-8 w-8" />,
  MessageCircle: <MessageCircle className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [topicSelectorOpen, setTopicSelectorOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string>("");

  const handleModeClick = (modeId: string) => {
    setSelectedMode(modeId);
    
    // AI Tutor goes directly to chat
    if (modeId === "tutor") {
      toast({
        title: "AI Tutor",
        description: "Starting chat with your AI tutor...",
      });
      // Would navigate to /tutor in full implementation
      return;
    }

    setTopicSelectorOpen(true);
  };

  const handleStartLearning = (config: any) => {
    toast({
      title: "Starting " + selectedMode.toUpperCase(),
      description: `Topic: ${config.topics[0]} • ${config.difficulty} difficulty`,
    });
    // Would navigate to the learning mode page in full implementation
    console.log("Starting learning:", { mode: selectedMode, ...config });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Welcome back,{" "}
            <span className="gradient-text">{user.name.split(" ")[0]}</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Ready to level up your Commerce knowledge?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-12">
          <StatsOverview />
        </div>

        {/* Learning Modes - Arcade Grid */}
        <div className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">🎮</span> Learning Arcade
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {LEARNING_MODES.map((mode, index) => (
              <div
                key={mode.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ArcadeCard
                  title={mode.name}
                  description={mode.description}
                  icon={iconMap[mode.icon]}
                  gradient={mode.color}
                  cost={mode.cost}
                  onClick={() => handleModeClick(mode.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="arcade-card !p-4 cursor-pointer hover:border-primary/50" onClick={() => navigate("/challenges")}>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 text-white">
                🏆
              </div>
              <div>
                <h3 className="font-semibold">Friend Challenges</h3>
                <p className="text-sm text-muted-foreground">Challenge your friends</p>
              </div>
            </div>
          </div>

          <div className="arcade-card !p-4 cursor-pointer hover:border-primary/50" onClick={() => navigate("/groups")}>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                👥
              </div>
              <div>
                <h3 className="font-semibold">Study Groups</h3>
                <p className="text-sm text-muted-foreground">Learn together</p>
              </div>
            </div>
          </div>

          <div className="arcade-card !p-4 cursor-pointer hover:border-primary/50" onClick={() => navigate("/leaderboard")}>
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                📊
              </div>
              <div>
                <h3 className="font-semibold">Leaderboard</h3>
                <p className="text-sm text-muted-foreground">See top performers</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Topic Selector Modal */}
      <TopicSelector
        open={topicSelectorOpen}
        onOpenChange={setTopicSelectorOpen}
        mode={LEARNING_MODES.find((m) => m.id === selectedMode)?.name || ""}
        onStart={handleStartLearning}
      />
    </div>
  );
}
