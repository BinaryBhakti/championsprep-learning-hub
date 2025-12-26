import { motion } from "framer-motion";
import { Coins, Flame, Trophy, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface StatOrbProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: "gold" | "streak" | "primary" | "accent";
  delay?: number;
}

function StatOrb({ icon, value, label, color, delay = 0 }: StatOrbProps) {
  const colorClasses = {
    gold: {
      bg: "from-gold/30 to-gold/10",
      border: "border-gold/40",
      glow: "shadow-[0_0_20px_hsl(var(--gold)/0.4)]",
      icon: "text-gold",
      value: "text-gold",
    },
    streak: {
      bg: "from-streak/30 to-streak/10",
      border: "border-streak/40",
      glow: "shadow-[0_0_20px_hsl(var(--streak)/0.4)]",
      icon: "text-streak",
      value: "text-streak",
    },
    primary: {
      bg: "from-primary/30 to-primary/10",
      border: "border-primary/40",
      glow: "shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
      icon: "text-primary",
      value: "text-primary",
    },
    accent: {
      bg: "from-accent/30 to-accent/10",
      border: "border-accent/40",
      glow: "shadow-[0_0_20px_hsl(var(--accent)/0.4)]",
      icon: "text-accent",
      value: "text-accent",
    },
  };

  const styles = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={cn(
        "relative flex items-center gap-3 px-5 py-3 rounded-2xl",
        "bg-gradient-to-br backdrop-blur-md",
        "border",
        styles.bg,
        styles.border,
        styles.glow
      )}
    >
      {/* Animated glow pulse */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute inset-0 rounded-2xl",
          styles.glow,
          "opacity-50"
        )}
      />

      {/* Icon */}
      <div className={cn("relative z-10", styles.icon)}>
        {icon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className={cn("font-display text-lg font-bold leading-none", styles.value)}>
          {value}
        </p>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function HUDStats() {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      icon: <Coins className="h-5 w-5" />,
      value: user.coins,
      label: "Coins",
      color: "gold" as const,
    },
    {
      icon: <Flame className="h-5 w-5" />,
      value: `${user.studyStreak?.current || 0}d`,
      label: "Streak",
      color: "streak" as const,
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      value: "1,250",
      label: "XP",
      color: "primary" as const,
    },
    {
      icon: <Zap className="h-5 w-5" />,
      value: "78%",
      label: "Mastery",
      color: "accent" as const,
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
      {stats.map((stat, index) => (
        <StatOrb
          key={stat.label}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          color={stat.color}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
