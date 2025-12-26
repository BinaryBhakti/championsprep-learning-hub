import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { ArcadeMachineCard } from "@/components/dashboard/ArcadeMachineCard";
import { TopicSelector } from "@/components/dashboard/TopicSelector";
import { HUDStats } from "@/components/dashboard/HUDStats";
import { CurrentMission } from "@/components/dashboard/CurrentMission";
import { ProgressTracking } from "@/components/dashboard/ProgressTracking";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { RecentTopics } from "@/components/dashboard/RecentTopics";
import { StreakDisplay } from "@/components/gamification/StreakDisplay";
import { DailyChallenge } from "@/components/gamification/DailyChallenge";
import { UserProfileDropdown } from "@/components/dashboard/UserProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { LEARNING_MODES } from "@/lib/constants";
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
  Trophy,
  Users,
  Swords,
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

// Neon glow colors matching each mode's gradient
const glowColors: Record<string, string> = {
  quiz: "#818CF8", // Indigo
  flashcard: "#22D3EE", // Cyan
  practice: "#A78BFA", // Purple
  mock: "#F472B6", // Pink
  study: "#34D399", // Emerald
  tutor: "#FBBF24", // Amber
  pyq: "#FB923C", // Orange
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

  const handleStartLearning = (config: {
    subject: string;
    topics: string[];
    difficulty: string;
    language: string;
  }) => {
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[150px]" />
      </div>

      <Navbar />

      <main className="relative container mx-auto px-4 pt-24 pb-12">
        {/* Header with HUD Stats and Profile */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
        >
          <HUDStats />
          <div className="flex items-center gap-4">
            <Link to="/gamification">
              <StreakDisplay variant="compact" />
            </Link>
            <UserProfileDropdown />
          </div>
        </motion.div>

        {/* Current Mission Hero */}
        <div className="mb-10">
          <CurrentMission
            missionTitle="Complete 3 Quizzes Today"
            missionDescription="Finish any 3 quiz sessions to earn bonus coins and boost your streak!"
            progress={1}
            reward={50}
            timeLeft="6h 23m"
            onContinue={() => handleModeClick("quiz")}
          />
        </div>

        {/* Daily Challenge & Recent Topics */}
        <div className="grid gap-6 lg:grid-cols-2 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DailyChallenge />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RecentTopics onSelectTopic={handleRecentTopicSelect} />
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TabsList className="inline-flex h-14 items-center justify-center rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 p-1.5">
              <TabsTrigger
                value="arcade"
                className="flex items-center gap-2 rounded-xl px-6 py-3 font-display text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
              >
                <Gamepad2 className="h-4 w-4" />
                Learning Arcade
              </TabsTrigger>
              <TabsTrigger
                value="progress"
                className="flex items-center gap-2 rounded-xl px-6 py-3 font-display text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
              >
                <BarChart3 className="h-4 w-4" />
                Progress
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* Arcade Tab */}
          <TabsContent value="arcade" className="space-y-10">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent"
              >
                <Gamepad2 className="h-5 w-5 text-primary-foreground" />
              </motion.div>
              <div>
                <h2 className="font-display text-xl font-bold">Choose Your Mode</h2>
                <p className="text-sm text-muted-foreground">
                  Select a learning mode to start your session
                </p>
              </div>
            </div>

            {/* Arcade Machine Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {LEARNING_MODES.map((mode, index) => (
                <ArcadeMachineCard
                  key={mode.id}
                  title={mode.name}
                  description={mode.description}
                  icon={iconMap[mode.icon]}
                  gradient={mode.color}
                  glowColor={glowColors[mode.id] || "#818CF8"}
                  cost={mode.cost}
                  onClick={() => handleModeClick(mode.id)}
                  index={index}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-yellow-500">
                  <Zap className="h-5 w-5 text-gold-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold">Quick Actions</h2>
                  <p className="text-sm text-muted-foreground">
                    Jump into social features
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Friend Challenges",
                    description: "Challenge your friends",
                    icon: Swords,
                    gradient: "from-pink-500 to-rose-500",
                    glow: "#F472B6",
                    path: "/challenges",
                  },
                  {
                    title: "Study Groups",
                    description: "Learn together",
                    icon: Users,
                    gradient: "from-blue-500 to-cyan-500",
                    glow: "#22D3EE",
                    path: "/groups",
                  },
                  {
                    title: "Achievements",
                    description: "View badges & leaderboard",
                    icon: Trophy,
                    gradient: "from-yellow-500 to-orange-500",
                    glow: "#FBBF24",
                    path: "/gamification",
                  },
                ].map((action, index) => (
                  <motion.button
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(action.path)}
                    className="group relative flex items-center gap-4 p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-left transition-all hover:border-primary/30"
                    style={{
                      boxShadow: `0 0 0 1px ${action.glow}10`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        boxShadow: `0 0 30px ${action.glow}20`,
                      }}
                    />
                    <div
                      className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${action.gradient} shadow-lg`}
                      style={{
                        boxShadow: `0 4px 20px ${action.glow}40`,
                      }}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-display font-bold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
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
