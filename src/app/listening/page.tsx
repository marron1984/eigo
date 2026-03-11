'use client';

import { useState, useMemo } from 'react';
import { Theme, Difficulty } from '@/types';
import { allListeningExercises } from '@/data/listening';
import { useProgress } from '@/hooks/useProgress';
import ThemeSelector from '@/components/ui/ThemeSelector';
import AudioPlayer from '@/components/listening/AudioPlayer';
import ComprehensionQuiz from '@/components/listening/ComprehensionQuiz';

export default function ListeningPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('junior-high');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { addListeningResult, markStudyDay, addActivity } = useProgress();

  const filteredExercises = useMemo(() => {
    return allListeningExercises.filter(ex => {
      if (selectedTheme !== 'all' && ex.theme !== selectedTheme) return false;
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTheme, selectedDifficulty]);

  const currentExercise = selectedExercise
    ? allListeningExercises.find(ex => ex.id === selectedExercise)
    : null;

  const handleComplete = (score: number) => {
    if (!currentExercise) return;
    addListeningResult({
      exerciseId: currentExercise.id,
      score,
      completedAt: new Date().toISOString(),
    });
    markStudyDay();
    addActivity(3, 0);
    setQuizCompleted(true);
  };

  const handleBack = () => {
    setSelectedExercise(null);
    setShowTranscript(false);
    setQuizCompleted(false);
  };

  // 問題選択画面
  if (!currentExercise) {
    return (
      <div className="max-w-3xl mx-auto pb-20 md:pb-0">
        <h1 className="text-2xl font-bold mb-1">🎧 ヒアリング</h1>
        <p className="text-foreground/50 text-sm mb-6">英語を聞いて理解力を鍛えよう</p>

        <div className="mb-6">
          <ThemeSelector
            selectedTheme={selectedTheme}
            selectedDifficulty={selectedDifficulty}
            onThemeChange={setSelectedTheme}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        <div className="space-y-3">
          {filteredExercises.map(ex => (
            <button
              key={ex.id}
              onClick={() => setSelectedExercise(ex.id)}
              className="w-full text-left bg-card-bg border border-card-border rounded-xl p-5 hover:border-accent/50 transition-all"
            >
              <h3 className="font-medium text-accent mb-1">{ex.title}</h3>
              <p className="text-sm text-foreground/50">
                {ex.questions.length}問 ・ {ex.theme}
              </p>
            </button>
          ))}
          {filteredExercises.length === 0 && (
            <p className="text-center py-12 text-foreground/40">
              該当する教材がありません
            </p>
          )}
        </div>
      </div>
    );
  }

  // 学習画面
  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0">
      <button
        onClick={handleBack}
        className="text-sm text-foreground/50 hover:text-foreground mb-4 inline-block"
      >
        ← 戻る
      </button>

      <h2 className="text-xl font-bold mb-4">{currentExercise.title}</h2>

      {/* 音声プレイヤー */}
      <div className="mb-6">
        <AudioPlayer text={currentExercise.text} />
      </div>

      {/* 理解度テスト */}
      <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-4">
        <h3 className="text-sm font-medium text-foreground/60 mb-4">理解度テスト</h3>
        <ComprehensionQuiz
          key={currentExercise.id}
          questions={currentExercise.questions}
          onComplete={handleComplete}
        />
      </div>

      {/* トランスクリプト */}
      {quizCompleted && (
        <div className="bg-card-bg border border-card-border rounded-xl p-6">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-sm text-accent hover:text-accent-hover"
          >
            {showTranscript ? '▼ テキストを隠す' : '▶ テキストを表示'}
          </button>
          {showTranscript && (
            <div className="mt-4 space-y-3">
              <p className="text-foreground/80 leading-relaxed">{currentExercise.text}</p>
              <p className="text-sm text-foreground/50">{currentExercise.japaneseTranslation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
