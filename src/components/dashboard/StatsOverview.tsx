'use client';

import { UserProgress } from '@/types';

interface StatsOverviewProps {
  progress: UserProgress;
}

export default function StatsOverview({ progress }: StatsOverviewProps) {
  const totalCorrect = progress.vocabulary.reduce((sum, v) => sum + v.correct, 0);
  const totalAttempts = progress.vocabulary.reduce((sum, v) => sum + v.correct + v.incorrect, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const totalActiveDays = progress.dailyActivity.length;

  const stats = [
    { label: '正答率', value: accuracy, unit: '%', color: '#10b981' },
    { label: '学習日数', value: totalActiveDays, unit: '日', color: '#6366f1' },
    { label: '総学習', value: progress.vocabulary.length + progress.listening.length + progress.shadowing.length, unit: '回', color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(stat => (
        <div key={stat.label} className="bg-card-bg rounded-2xl p-3 text-center">
          <div className="text-xl font-bold" style={{ color: stat.color }}>
            {stat.value}
            <span className="text-[10px] font-normal text-foreground/30 ml-0.5">{stat.unit}</span>
          </div>
          <div className="text-[10px] text-foreground/40 mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
