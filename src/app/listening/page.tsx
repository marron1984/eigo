'use client';

import { useState, useMemo } from 'react';
import { Theme, Difficulty, THEMES } from '@/types';
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
    addListeningResult({ exerciseId: currentExercise.id, score, completedAt: new Date().toISOString() });
    markStudyDay();
    addActivity(3, 0);
    setQuizCompleted(true);
  };

  const handleBack = () => {
    setSelectedExercise(null);
    setShowTranscript(false);
    setQuizCompleted(false);
  };

  // 教材選択
  if (!currentExercise) {
    return (
      <div className="px-5 pt-5">
        <h1 className="text-lg font-bold mb-4">ヒアリング</h1>

        <div className="mb-4">
          <ThemeSelector
            selectedTheme={selectedTheme}
            selectedDifficulty={selectedDifficulty}
            onThemeChange={setSelectedTheme}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        <div className="space-y-2">
          {filteredExercises.map(ex => {
            const theme = THEMES.find(t => t.id === ex.theme);
            return (
              <button
                key={ex.id}
                onClick={() => setSelectedExercise(ex.id)}
                className="w-full text-left bg-card-bg rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-lg shrink-0">
                  {theme?.icon || '🎧'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground/80 truncate">{ex.title}</h3>
                  <p className="text-[10px] text-foreground/30">{ex.questions.length}問</p>
                </div>
                <svg className="w-4 h-4 text-foreground/15 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
          {filteredExercises.length === 0 && (
            <p className="text-center py-16 text-foreground/25 text-sm">該当する教材がありません</p>
          )}
        </div>
      </div>
    );
  }

  // 学習画面
  return (
    <div className="px-5 pt-5">
      <button onClick={handleBack} className="flex items-center gap-1 text-xs text-foreground/30 mb-3 active:text-foreground/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        戻る
      </button>

      <h2 className="text-base font-bold mb-4">{currentExercise.title}</h2>

      <div className="mb-4">
        <AudioPlayer text={currentExercise.text} />
      </div>

      <div className="bg-card-bg rounded-2xl p-4 mb-3">
        <div className="text-[10px] text-foreground/25 uppercase tracking-wider mb-3">理解度テスト</div>
        <ComprehensionQuiz
          key={currentExercise.id}
          questions={currentExercise.questions}
          onComplete={handleComplete}
        />
      </div>

      {quizCompleted && (
        <div className="bg-card-bg rounded-2xl p-4 slide-up">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-2 text-xs text-accent font-medium"
          >
            <svg className={`w-3 h-3 transition-transform ${showTranscript ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            テキストを{showTranscript ? '隠す' : '表示'}
          </button>
          {showTranscript && (
            <div className="mt-3 space-y-2 slide-up">
              <p className="text-xs text-foreground/60 leading-relaxed">{currentExercise.text}</p>
              <p className="text-xs text-foreground/30">{currentExercise.japaneseTranslation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
