'use client';

import { useState, useMemo, useCallback } from 'react';
import { Theme, Difficulty } from '@/types';
import { allVocabulary } from '@/data/vocabulary';
import { useProgress } from '@/hooks/useProgress';
import { calculateNextReview } from '@/lib/spaced-repetition';
import ThemeSelector from '@/components/ui/ThemeSelector';
import Flashcard from '@/components/vocabulary/Flashcard';
import QuizMode from '@/components/vocabulary/QuizMode';
import WordList from '@/components/vocabulary/WordList';

type Mode = 'flashcard' | 'quiz' | 'list';

const modes: { id: Mode; label: string }[] = [
  { id: 'flashcard', label: 'カード' },
  { id: 'quiz', label: 'クイズ' },
  { id: 'list', label: '一覧' },
];

export default function VocabularyPage() {
  const [mode, setMode] = useState<Mode>('flashcard');
  const [selectedTheme, setSelectedTheme] = useState<Theme | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('junior-high');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { progress, updateVocabulary, markStudyDay, addActivity } = useProgress();

  const filteredWords = useMemo(() => {
    return allVocabulary.filter(w => {
      if (selectedTheme !== 'all' && w.theme !== selectedTheme) return false;
      if (selectedDifficulty !== 'all' && w.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTheme, selectedDifficulty]);

  const shuffledWords = useMemo(() => {
    return [...filteredWords].sort(() => Math.random() - 0.5);
  }, [filteredWords]);

  const handleFlashcardResult = useCallback((quality: number) => {
    const word = shuffledWords[currentIndex];
    if (!word) return;
    const existing = progress.vocabulary.find(v => v.wordId === word.id);
    const newProgress = calculateNextReview(existing, quality);
    newProgress.wordId = word.id;
    updateVocabulary(newProgress);
    markStudyDay();
    addActivity(0.5, quality >= 3 ? 1 : 0);
    setCurrentIndex(prev => prev + 1);
  }, [shuffledWords, currentIndex, progress.vocabulary, updateVocabulary, markStudyDay, addActivity]);

  const handleQuizResult = useCallback((wordId: string, quality: number) => {
    const existing = progress.vocabulary.find(v => v.wordId === wordId);
    const newProgress = calculateNextReview(existing, quality);
    newProgress.wordId = wordId;
    updateVocabulary(newProgress);
    markStudyDay();
    addActivity(0.5, quality >= 3 ? 1 : 0);
  }, [progress.vocabulary, updateVocabulary, markStudyDay, addActivity]);

  return (
    <div className="px-5 pt-5">
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">単語学習</h1>
        <span className="text-xs text-foreground/25">{filteredWords.length}語</span>
      </div>

      {/* モード切り替え */}
      <div className="flex bg-card-bg rounded-xl p-1 mb-4">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setCurrentIndex(0); }}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
              mode === m.id
                ? 'bg-accent text-white shadow-sm'
                : 'text-foreground/35'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* フィルター */}
      <div className="mb-4">
        <ThemeSelector
          selectedTheme={selectedTheme}
          selectedDifficulty={selectedDifficulty}
          onThemeChange={t => { setSelectedTheme(t); setCurrentIndex(0); }}
          onDifficultyChange={d => { setSelectedDifficulty(d); setCurrentIndex(0); }}
        />
      </div>

      {/* コンテンツ */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-16 text-foreground/25 text-sm">
          該当する単語がありません
        </div>
      ) : mode === 'flashcard' ? (
        currentIndex < shuffledWords.length ? (
          <>
            {/* 進捗 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-1 bg-card-border rounded-full">
                <div
                  className="h-full bg-accent rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / shuffledWords.length) * 100}%` }}
                />
              </div>
              <span className="text-[10px] text-foreground/25">{currentIndex + 1}/{shuffledWords.length}</span>
            </div>
            <Flashcard
              key={shuffledWords[currentIndex].id}
              word={shuffledWords[currentIndex]}
              onResult={handleFlashcardResult}
            />
          </>
        ) : (
          <div className="text-center py-12 slide-up">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-lg font-bold mb-2">全カード完了！</h3>
            <p className="text-xs text-foreground/40 mb-6">お疲れさま！継続が大事です。</p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="w-full py-3.5 bg-accent text-white rounded-2xl font-semibold text-sm active:bg-accent-hover transition-colors"
            >
              もう一度
            </button>
          </div>
        )
      ) : mode === 'quiz' ? (
        <QuizMode
          key={`quiz-${selectedTheme}-${selectedDifficulty}`}
          words={shuffledWords.slice(0, Math.min(10, shuffledWords.length))}
          onResult={handleQuizResult}
          onComplete={() => setCurrentIndex(0)}
        />
      ) : (
        <WordList words={filteredWords} />
      )}
    </div>
  );
}
