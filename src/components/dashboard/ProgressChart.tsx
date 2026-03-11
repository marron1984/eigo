'use client';

import { DailyActivity } from '@/types';

interface ProgressChartProps {
  dailyActivity: DailyActivity[];
}

export default function ProgressChart({ dailyActivity }: ProgressChartProps) {
  const last7Days = getLast7Days();
  const data = last7Days.map(date => {
    const activity = dailyActivity.find(a => a.date === date);
    return {
      date,
      words: activity?.wordsLearned ?? 0,
      minutes: activity?.minutesStudied ?? 0,
      active: !!(activity && (activity.wordsLearned > 0 || activity.minutesStudied > 0)),
    };
  });

  const maxVal = Math.max(...data.map(d => d.words + d.minutes), 5);

  return (
    <div className="bg-card-bg rounded-2xl p-4">
      <h3 className="text-xs font-medium text-foreground/40 mb-3">今週のアクティビティ</h3>
      <div className="flex items-end gap-2 h-20">
        {data.map((day, i) => {
          const date = new Date(day.date);
          const dayLabel = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
          const isToday = i === 6;
          const height = maxVal > 0 ? Math.max(((day.words + day.minutes) / maxVal) * 100, day.active ? 15 : 0) : 0;

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full relative rounded-lg overflow-hidden" style={{ height: '56px' }}>
                <div className="absolute inset-0 bg-card-border/50 rounded-lg" />
                <div
                  className={`absolute bottom-0 w-full rounded-lg transition-all duration-500 ${
                    isToday ? 'bg-accent' : day.active ? 'bg-accent/50' : ''
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className={`text-[9px] ${
                isToday ? 'text-accent font-bold' : 'text-foreground/25'
              }`}>
                {dayLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}
