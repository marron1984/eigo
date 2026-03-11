'use client';

import { useState, useMemo } from 'react';
import { VocabularyWord } from '@/types';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface QuizModeProps {
  words: VocabularyWord[];
  onResult: (wordId: string, quality: number) => void;
  onComplete: () => void;
}

export default function QuizMode({ words, onResult, onComplete }: QuizModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const { speak } = useSpeechSynthesis();

  const currentWord = words[currentIndex];
  const isFinished = currentIndex >= words.length;

  const options = useMemo(() => {
    if (!currentWord) return [];
    const others = words.filter(w => w.id !== currentWord.id);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled, currentWord].sort(() => Math.random() - 0.5);
  }, [currentWord, words]);

  if (isFinished) {
    const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
    return (
      <div className="text-center py-10 slide-up">
        <div className="text-5xl mb-4">{pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '💪'}</div>
        <h3 className="text-lg font-bold mb-1">クイズ完了！</h3>
        <p className="text-foreground/40 text-sm mb-2">{score.correct} / {score.total} 問正解</p>
        <p className="text-3xl font-black text-accent mb-6">{pct}%</p>
        <button
          onClick={onComplete}
          className="w-full py-3.5 bg-accent text-white rounded-2xl font-semibold text-sm active:bg-accent-hover transition-colors"
        >
          もう一度チャレンジ
        </button>
      </div>
    );
  }

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const isCorrect = options[index].id === currentWord.id;
    onResult(currentWord.id, isCorrect ? 5 : 1);
    setScore(prev => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));
  };

  return (
    <div className="slide-up">
      {/* 進捗 */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-card-border rounded-full">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-foreground/30 shrink-0">{currentIndex + 1}/{words.length}</span>
      </div>

      {/* 問題 */}
      <div className="bg-card-bg rounded-2xl p-5 mb-4">
        <div className="text-[10px] text-foreground/25 uppercase tracking-wider mb-2">この単語の意味は？</div>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-black text-accent">{currentWord.english}</div>
          <button
            onClick={() => speak(currentWord.english)}
            className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0"
          >
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>
        </div>
        <div className="text-xs text-foreground/25 mt-1">{currentWord.pronunciation}</div>
      </div>

      {/* 選択肢 */}
      <div className="space-y-2">
        {options.map((option, index) => {
          const isCorrectOption = option.id === currentWord.id;
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                selectedAnswer === null
                  ? 'bg-card-bg text-foreground/70 active:bg-card-border'
                  : isCorrectOption
                    ? 'bg-success/15 text-success correct-pop'
                    : isSelected
                      ? 'bg-danger/15 text-danger'
                      : 'bg-card-bg text-foreground/20'
              }`}
            >
              {option.japanese}
            </button>
          );
        })}
      </div>

      {/* 例文 + 次へ */}
      {selectedAnswer !== null && (
        <div className="mt-3 slide-up">
          <div className="bg-surface rounded-xl p-3 mb-3">
            <p className="text-xs text-foreground/50 italic">&quot;{currentWord.exampleSentence}&quot;</p>
            <p className="text-xs text-foreground/30 mt-1">{currentWord.exampleTranslation}</p>
          </div>
          <button
            onClick={() => { setSelectedAnswer(null); setCurrentIndex(prev => prev + 1); }}
            className="w-full py-3.5 bg-accent text-white rounded-2xl font-semibold text-sm active:bg-accent-hover transition-colors"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
}
