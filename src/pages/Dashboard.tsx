import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { ArcadeCard } from "@/components/dashboard/ArcadeCard";
import { TopicSelector } from "@/components/dashboard/TopicSelector";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ProgressTracking } from "@/components/dashboard/ProgressTracking";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { RecentTopics } from "@/components/dashboard/RecentTopics";
import { StreakDisplay } from "@/components/gamification/StreakDisplay";
import { DailyChallenge } from "@/components/gamification/DailyChallenge";
import { useAuth } from "@/contexts/AuthContext";
import { LEARNING_MODES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Zap,
  Layers,
  FileText,
  BookOpen,
  MessageCircle,
  GraduationCap,
  Gamepad2,
  BarChart3,
  Users,
  Shield,
  Trophy,
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
  const [activeTab, setActiveTab] = useState("arcade");

  const handleModeClick = (modeId: string) => {
    setSelectedMode(modeId);
    
    if (modeId === "tutor") {
      toast({
        title: "AI Tutor",
        description: "Starting chat with your AI tutor...",
      });
      return;
    }

    setTopicSelectorOpen(true);
  };

  const handleStartLearning = (config: { subject: string; topics: string[]; difficulty: string; language: string }) => {
    toast({
      title: "Starting " + selectedMode.toUpperCase(),
      description: `Topic: ${config.topics[0]} • ${config.difficulty} difficulty`,
    });
    console.log("Starting learning:", { mode: selectedMode, ...config });
  };

  const handleRecentTopicSelect = (topic: string, subject: string) => {
    toast({
      title: "Quick Start",
      description: `Continuing with ${topic}`,
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              Welcome back,{" "}
              <span className="gradient-text">{user.name.split(" ")[0]}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Ready to level up your Commerce knowledge?
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link to="/parent">
                <Users className="h-4 w-4 mr-2" />
                Parent View
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="rounded-full">
              <Link to="/admin">
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview with Streak */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <StatsOverview />
          </div>
          <div className="lg:w-auto flex items-center">
            <Link to="/gamification">
              <StreakDisplay variant="compact" />
            </Link>
          </div>
        </div>

        {/* Daily Challenge & Recent Topics */}
        <div className="grid gap-4 lg:grid-cols-2 mb-8">
          <DailyChallenge />
          <RecentTopics onSelectTopic={handleRecentTopicSelect} />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 rounded-2xl h-12">
            <TabsTrigger value="arcade" className="flex items-center gap-2 rounded-xl">
              <Gamepad2 className="h-4 w-4" />
              Learning Arcade
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2 rounded-xl">
              <BarChart3 className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Arcade Tab */}
          <TabsContent value="arcade" className="space-y-8">
            {/* Learning Modes Grid */}
            <div>
              <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-primary">🎮</span> Choose Your Mode
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
            <div>
              <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-primary">⚡</span> Quick Actions
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="arcade-card !p-4 cursor-pointer hover:border-primary/50 hover-scale" onClick={() => navigate("/challenges")}>
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

                <div className="arcade-card !p-4 cursor-pointer hover:border-primary/50 hover-scale" onClick={() => navigate("/groups")}>
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

                <div className="arcade-card !p-4 cursor-pointer hover:border-primary/50 hover-scale" onClick={() => navigate("/gamification")}>
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Achievements</h3>
                      <p className="text-sm text-muted-foreground">View badges & leaderboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ProgressTracking />
              </div>
              <div>
                <ActivityTimeline />
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
