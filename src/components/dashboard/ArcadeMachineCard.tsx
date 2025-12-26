import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Coins, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArcadeMachineCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  glowColor: string;
  cost?: { Easy?: number; Medium?: number; Hard?: number; fixed?: number; free?: boolean };
  onClick: () => void;
  locked?: boolean;
  index?: number;
}

export function ArcadeMachineCard({
  title,
  description,
  icon,
  gradient,
  glowColor,
  cost,
  onClick,
  locked = false,
  index = 0,
}: ArcadeMachineCardProps) {
  const getCostDisplay = () => {
    if (!cost) return null;
    if (cost.free) return "FREE";
    if (cost.fixed) return cost.fixed;
    if (cost.Medium) return cost.Medium;
    return null;
  };

  const costDisplay = getCostDisplay();

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        !locked
          ? {
              y: -10,
              scale: 1.05,
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : {}
      }
      whileTap={!locked ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={locked}
      className={cn(
        "group relative flex flex-col items-center justify-center p-6 text-center",
        "min-h-[240px] w-full rounded-3xl",
        "bg-card/60 backdrop-blur-sm",
        "border border-border/50",
        "transition-all duration-300",
        locked && "opacity-40 cursor-not-allowed"
      )}
      style={{
        boxShadow: locked
          ? "none"
          : `0 0 0 1px ${glowColor}20, 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Neon outer glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 30px ${glowColor}40, 0 0 60px ${glowColor}20, inset 0 0 30px ${glowColor}10`,
        }}
      />

      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300",
          "group-hover:opacity-30",
          `bg-gradient-to-br ${gradient}`
        )}
      />

      {/* Animated scanlines effect */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-20 transition-opacity">
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.03) 2px,
              rgba(255,255,255,0.03) 4px
            )`,
          }}
        />
      </div>

      {/* Gold Pill Badge - Floating at top right */}
      {costDisplay && (
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 200 }}
          className={cn(
            "absolute -top-2 -right-2 z-20",
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
            "font-display text-xs font-bold",
            cost?.free
              ? "bg-success/90 text-success-foreground shadow-[0_0_15px_hsl(var(--success)/0.5)]"
              : "bg-gradient-to-r from-gold to-yellow-500 text-gold-foreground shadow-[0_0_15px_hsl(var(--gold)/0.5)]"
          )}
        >
          {!cost?.free && <Coins className="h-3 w-3" />}
          <span>{costDisplay}</span>
        </motion.div>
      )}

      {/* Icon container */}
      <motion.div
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-2xl",
          "bg-gradient-to-br shadow-2xl",
          gradient
        )}
        style={{
          boxShadow: `0 8px 32px ${glowColor}50, inset 0 2px 10px rgba(255,255,255,0.2)`,
        }}
      >
        <div className="text-white drop-shadow-lg">{icon}</div>

        {/* Icon inner glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-50"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 60%)`,
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display text-lg font-bold tracking-tight mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 max-w-[180px]">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-3/4 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor}, transparent)`,
        }}
      />

      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Lock className="h-8 w-8 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Coming Soon</span>
          </div>
        </div>
      )}
    </motion.button>
  );
}
