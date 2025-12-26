import { motion } from "framer-motion";
import { Target, Clock, Coins, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrentMissionProps {
  missionTitle: string;
  missionDescription: string;
  progress: number;
  reward: number;
  timeLeft?: string;
  onContinue?: () => void;
}

export function CurrentMission({
  missionTitle = "Complete 3 Quizzes Today",
  missionDescription = "Finish any 3 quiz sessions to earn bonus coins",
  progress = 1,
  reward = 50,
  timeLeft = "6h 23m",
  onContinue,
}: CurrentMissionProps) {
  const progressPercent = (progress / 3) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Glassmorphism container */}
      <div
        className={cn(
          "relative p-6 sm:p-8",
          "bg-card/40 backdrop-blur-xl",
          "border border-primary/20",
          "shadow-[0_8px_32px_hsl(var(--primary)/0.15)]"
        )}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        
        {/* Floating orbs */}
        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"
              >
                <Target className="h-6 w-6 text-primary-foreground" />
              </motion.div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Current Mission
                </p>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                  {missionTitle}
                </h2>
              </div>
            </div>

            {/* Reward badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 border border-gold/30"
            >
              <Coins className="h-4 w-4 text-gold" />
              <span className="font-display font-bold text-gold">+{reward}</span>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">{missionDescription}</p>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-display font-semibold text-primary">
                {progress}/3 Complete
              </span>
            </div>
            <div className="relative h-3 overflow-hidden rounded-full bg-muted/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary"
              />
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Expires in {timeLeft}</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContinue}
              className="group flex items-center gap-2 rounded-full bg-primary/20 px-5 py-2.5 font-semibold text-primary hover:bg-primary/30 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Continue Quest
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
