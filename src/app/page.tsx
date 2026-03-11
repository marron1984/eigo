'use client';

import { useProgress } from '@/hooks/useProgress';
import StreakDisplay from '@/components/dashboard/StreakDisplay';
import StatsOverview from '@/components/dashboard/StatsOverview';
import ProgressChart from '@/components/dashboard/ProgressChart';
import ModeCard from '@/components/dashboard/ModeCard';

export default function Dashboard() {
  const { progress } = useProgress();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-0">
      <div>
        <h1 className="text-2xl font-bold mb-1">ようこそ、吉田さん</h1>
        <p className="text-foreground/50 text-sm">今日も英語を学びましょう</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StreakDisplay streakDays={progress.streakDays} />
        <div className="md:col-span-2">
          <ProgressChart dailyActivity={progress.dailyActivity} />
        </div>
      </div>

      <StatsOverview progress={progress} />

      <div>
        <h2 className="text-lg font-semibold mb-4">学習モード</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ModeCard
            href="/vocabulary"
            icon="📖"
            title="単語"
            description="フラッシュカードとクイズで語彙力を強化。中学英語から段階的にレベルアップ。"
            color="#3b82f6"
          />
          <ModeCard
            href="/listening"
            icon="🎧"
            title="ヒアリング"
            description="英語を聞いて理解力を鍛える。速度調整機能で自分のペースで学習。"
            color="#f59e0b"
          />
          <ModeCard
            href="/shadowing"
            icon="🗣"
            title="シャドーイング"
            description="聞いて真似して発音力を向上。AIが精度をフィードバック。"
            color="#22c55e"
          />
        </div>
      </div>
    </div>
  );
}
