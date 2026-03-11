'use client';

interface StreakDisplayProps {
  streakDays: number;
}

export default function StreakDisplay({ streakDays }: StreakDisplayProps) {
  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6 flex items-center gap-4">
      <div className="text-4xl">🔥</div>
      <div>
        <div className="text-3xl font-bold text-warning">{streakDays}</div>
        <div className="text-sm text-foreground/60">日連続学習中</div>
      </div>
    </div>
  );
}
