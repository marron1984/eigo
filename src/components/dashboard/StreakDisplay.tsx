'use client';

interface StreakDisplayProps {
  streakDays: number;
  studiedToday: boolean;
}

export default function StreakDisplay({ streakDays, studiedToday }: StreakDisplayProps) {
  const getMessage = () => {
    if (streakDays === 0) return 'さあ、始めよう！';
    if (streakDays < 3) return '良いスタート！';
    if (streakDays < 7) return '調子いいね！';
    if (streakDays < 14) return 'すごい継続力！';
    if (streakDays < 30) return '習慣になってきた！';
    return '鉄人！止まらない！';
  };

  return (
    <div className="bg-card-bg rounded-2xl p-5 relative overflow-hidden">
      {streakDays > 0 && (
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-streak-fire/10 rounded-full blur-2xl" />
      )}

      <div className="relative flex items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
          streakDays > 0 ? 'bg-streak-fire/15 streak-flame' : 'bg-card-border'
        } ${streakDays >= 7 ? 'streak-glow' : ''}`}>
          {streakDays > 0 ? '🔥' : '💤'}
        </div>

        <div className="flex-1">
          <div className="flex items-baseline gap-1">
            <span className={`text-4xl font-black tracking-tight ${
              streakDays > 0 ? 'text-streak-fire' : 'text-foreground/30'
            }`}>
              {streakDays}
            </span>
            <span className="text-sm text-foreground/50 font-medium">日連続</span>
          </div>
          <p className="text-xs text-foreground/40 mt-0.5">{getMessage()}</p>
        </div>

        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          studiedToday ? 'bg-success/20 text-success' : 'bg-card-border text-foreground/30'
        }`}>
          {studiedToday ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <div className="w-2 h-2 rounded-full bg-foreground/20" />
          )}
        </div>
      </div>

      {/* 直近7日ミニカレンダー */}
      <div className="flex gap-1.5 mt-4 justify-center">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const isToday = i === 6;
          const dayLabel = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
          const daysAgo = 6 - i;
          const wasActive = studiedToday
            ? daysAgo < streakDays
            : daysAgo > 0 && daysAgo <= streakDays;

          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[9px] text-foreground/30">{dayLabel}</span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-medium ${
                isToday && studiedToday
                  ? 'bg-streak-fire text-white shadow-[0_0_8px_rgba(255,107,53,0.3)]'
                  : isToday
                    ? 'border-2 border-dashed border-streak-fire/40 text-streak-fire/60'
                    : wasActive
                      ? 'bg-streak-fire/20 text-streak-fire'
                      : 'bg-card-border/50 text-foreground/20'
              }`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
