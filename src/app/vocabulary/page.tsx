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

  const resetFlashcards = () => setCurrentIndex(0);

  const modes: { id: Mode; label: string }[] = [
    { id: 'flashcard', label: 'フラッシュカード' },
    { id: 'quiz', label: 'クイズ' },
    { id: 'list', label: '単語一覧' },
  ];

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0">
      <h1 className="text-2xl font-bold mb-1">📖 単語学習</h1>
      <p className="text-foreground/50 text-sm mb-6">フラッシュカードやクイズで語彙力を強化</p>

      {/* モード切り替え */}
      <div className="flex gap-2 mb-6">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => { setMode(m.id); setCurrentIndex(0); }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              mode === m.id
                ? 'bg-accent text-white'
                : 'bg-card-bg border border-card-border text-foreground/60 hover:border-accent/50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* テーマ・レベル選択 */}
      <div className="mb-6">
        <ThemeSelector
          selectedTheme={selectedTheme}
          selectedDifficulty={selectedDifficulty}
          onThemeChange={t => { setSelectedTheme(t); setCurrentIndex(0); }}
          onDifficultyChange={d => { setSelectedDifficulty(d); setCurrentIndex(0); }}
        />
      </div>

      <div className="text-sm text-foreground/40 mb-4">
        {filteredWords.length} 語
      </div>

      {/* コンテンツ */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-12 text-foreground/40">
          該当する単語がありません。条件を変更してください。
        </div>
      ) : mode === 'flashcard' ? (
        currentIndex < shuffledWords.length ? (
          <Flashcard
            key={shuffledWords[currentIndex].id}
            word={shuffledWords[currentIndex]}
            onResult={handleFlashcardResult}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">全カード完了！</h3>
            <button
              onClick={resetFlashcards}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
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
