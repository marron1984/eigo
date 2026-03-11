'use client';

import { useProgress } from '@/hooks/useProgress';
import StreakDisplay from '@/components/dashboard/StreakDisplay';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ProgressChart from '@/components/dashboard/ProgressChart';
import ModeCard from '@/components/dashboard/ModeCard';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Dashboard() {
  const { progress } = useProgress();

  const today = new Date().toISOString().split('T')[0];
  const todayActivity = progress.dailyActivity.find(a => a.date === today);
  const studiedToday = !!todayActivity && (todayActivity.wordsLearned > 0 || todayActivity.minutesStudied > 0);

  return (
    <div className="px-5 pt-6 space-y-5">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">今日も続けよう</h1>
          <p className="text-foreground/40 text-xs mt-0.5">
            {new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {studiedToday && (
            <div className="bg-success/15 text-success text-xs font-semibold px-3 py-1 rounded-full">
              TODAY DONE
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* ストリーク */}
      <StreakDisplay streakDays={progress.streakDays} studiedToday={studiedToday} />

      {/* 今日まだ未学習の場合のCTA */}
      {!studiedToday && (
        <div className="slide-up bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/20 rounded-2xl p-4">
          <p className="text-sm font-medium text-accent">今日はまだ学習していません</p>
          <p className="text-xs text-foreground/40 mt-1">1日5分でOK。継続が力になる。</p>
        </div>
      )}

      {/* 学習モード */}
      <div className="space-y-3">
        <ModeCard
          href="/vocabulary"
          title="単語学習"
          subtitle="フラッシュカード & クイズ"
          icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          color="#6366f1"
          count={progress.vocabulary.length}
          countLabel="語 習得"
        />
        <ModeCard
          href="/listening"
          title="ヒアリング"
          subtitle="聴いて理解する力"
          icon="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          color="#f59e0b"
          count={progress.listening.length}
          countLabel="問 完了"
        />
        <ModeCard
          href="/shadowing"
          title="シャドーイング"
          subtitle="声に出して発音練習"
          icon="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          color="#10b981"
          count={progress.shadowing.length}
          countLabel="回 完了"
        />
      </div>

      {/* 統計 */}
      <StatsOverview progress={progress} />

      {/* 週間アクティビティ */}
      <ProgressChart dailyActivity={progress.dailyActivity} />

      <div className="h-4" />
    </div>
  );
}
