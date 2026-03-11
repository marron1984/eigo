'use client';

import { UserProgress } from '@/types';

interface StatsOverviewProps {
  progress: UserProgress;
}

export default function StatsOverview({ progress }: StatsOverviewProps) {
  const wordsLearned = progress.vocabulary.length;
  const totalCorrect = progress.vocabulary.reduce((sum, v) => sum + v.correct, 0);
  const totalAttempts = progress.vocabulary.reduce((sum, v) => sum + v.correct + v.incorrect, 0);
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const listeningCompleted = progress.listening.length;
  const shadowingCompleted = progress.shadowing.length;

  const stats = [
    { label: '学習済み単語', value: wordsLearned, unit: '語', color: 'text-accent' },
    { label: '正答率', value: accuracy, unit: '%', color: 'text-success' },
    { label: 'ヒアリング完了', value: listeningCompleted, unit: '問', color: 'text-warning' },
    { label: 'シャドーイング完了', value: shadowingCompleted, unit: '回', color: 'text-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="bg-card-bg border border-card-border rounded-xl p-5">
          <div className="text-sm text-foreground/60 mb-1">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
            <span className="text-sm font-normal text-foreground/40 ml-1">{stat.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
