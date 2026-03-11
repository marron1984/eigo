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

  // 4択の選択肢を生成
  const options = useMemo(() => {
    if (!currentWord) return [];
    const others = words.filter(w => w.id !== currentWord.id);
    const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [...shuffled, currentWord].sort(() => Math.random() - 0.5);
    return allOptions;
  }, [currentWord, words]);

  if (isFinished) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold mb-2">クイズ完了！</h3>
        <p className="text-foreground/60 mb-2">
          {score.correct} / {score.total} 問正解
        </p>
        <p className="text-2xl font-bold text-accent mb-6">
          {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
        </p>
        <button
          onClick={onComplete}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          もう一度
        </button>
      </div>
    );
  }

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    const isCorrect = options[index].id === currentWord.id;
    const quality = isCorrect ? 5 : 1;
    onResult(currentWord.id, quality);
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-foreground/50">
          {currentIndex + 1} / {words.length}
        </span>
        <span className="text-sm text-success">
          正解: {score.correct}
        </span>
      </div>

      {/* 進捗バー */}
      <div className="w-full h-2 bg-card-border rounded-full mb-6">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
        />
      </div>

      <div className="bg-card-bg border border-card-border rounded-xl p-6 mb-6">
        <div className="text-sm text-foreground/40 mb-2">この英単語の意味は？</div>
        <div className="text-2xl font-bold text-accent mb-1">{currentWord.english}</div>
        <div className="text-sm text-foreground/50 mb-3">{currentWord.pronunciation}</div>
        <button
          onClick={() => speak(currentWord.english)}
          className="text-sm text-accent hover:text-accent-hover"
        >
          🔊 発音を聞く
        </button>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => {
          let className = 'w-full text-left px-5 py-4 rounded-xl border transition-all text-sm ';
          if (selectedAnswer === null) {
            className += 'bg-card-bg border-card-border hover:border-accent/50 cursor-pointer';
          } else if (option.id === currentWord.id) {
            className += 'bg-success/20 border-success text-success';
          } else if (selectedAnswer === index) {
            className += 'bg-danger/20 border-danger text-danger';
          } else {
            className += 'bg-card-bg border-card-border opacity-50';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(index)}
              className={className}
              disabled={selectedAnswer !== null}
            >
              {option.japanese}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="mt-4">
          <div className="bg-card-bg border border-card-border rounded-xl p-4 mb-4">
            <p className="text-sm text-foreground/70 italic">&quot;{currentWord.exampleSentence}&quot;</p>
            <p className="text-sm text-foreground/50 mt-1">{currentWord.exampleTranslation}</p>
          </div>
          <button
            onClick={handleNext}
            className="w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
          >
            次へ
          </button>
        </div>
      )}
    </div>
  );
}
