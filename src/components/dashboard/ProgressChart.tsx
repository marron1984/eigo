'use client';

import { DailyActivity } from '@/types';

interface ProgressChartProps {
  dailyActivity: DailyActivity[];
}

export default function ProgressChart({ dailyActivity }: ProgressChartProps) {
  // 直近7日間のデータ
  const last7Days = getLast7Days();
  const data = last7Days.map(date => {
    const activity = dailyActivity.find(a => a.date === date);
    return {
      date,
      label: formatDateLabel(date),
      words: activity?.wordsLearned ?? 0,
      minutes: activity?.minutesStudied ?? 0,
    };
  });

  const maxWords = Math.max(...data.map(d => d.words), 5);

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6">
      <h3 className="text-sm font-medium text-foreground/60 mb-4">直近7日間の学習状況</h3>
      <div className="flex items-end gap-2 h-32">
        {data.map(day => {
          const height = maxWords > 0 ? (day.words / maxWords) * 100 : 0;
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-foreground/50">{day.words}</span>
              <div className="w-full bg-card-border rounded-t relative" style={{ height: '100px' }}>
                <div
                  className="absolute bottom-0 w-full bg-accent rounded-t transition-all duration-500"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-[10px] text-foreground/40">{day.label}</span>
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

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
