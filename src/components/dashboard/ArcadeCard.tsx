import { ReactNode } from "react";
import { Coins, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArcadeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  cost?: { Easy?: number; Medium?: number; Hard?: number; fixed?: number; free?: boolean };
  onClick: () => void;
  locked?: boolean;
}

export function ArcadeCard({
  title,
  description,
  icon,
  gradient,
  cost,
  onClick,
  locked = false,
}: ArcadeCardProps) {
  const getCostDisplay = () => {
    if (!cost) return null;
    if (cost.free) return "Free";
    if (cost.fixed) return `${cost.fixed} coins`;
    if (cost.Medium) return `${cost.Medium} coins`;
    return null;
  };

  const costDisplay = getCostDisplay();

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={cn(
        "arcade-card group relative flex flex-col items-center justify-center p-6 text-center",
        "min-h-[220px] w-full",
        locked && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-20",
          `bg-gradient-to-br ${gradient}`
        )}
      />

      {/* Icon container */}
      <div
        className={cn(
          "relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl",
          "bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
          gradient
        )}
      >
        <div className="text-white">{icon}</div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>

      {/* Cost badge */}
      {costDisplay && (
        <div className="relative z-10 mt-4">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              cost?.free
                ? "bg-success/20 text-success"
                : "bg-gold/20 text-gold"
            )}
          >
            {!cost?.free && <Coins className="h-3 w-3" />}
            <span>{costDisplay}</span>
          </div>
        </div>
      )}

      {/* Locked overlay */}
      {locked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-background/80">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute -top-1 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </button>
  );
}
