'use client';

import { useState } from 'react';
import { ListeningQuestion } from '@/types';

interface ComprehensionQuizProps {
  questions: ListeningQuestion[];
  onComplete: (score: number) => void;
}

export default function ComprehensionQuiz({ questions, onComplete }: ComprehensionQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQ];

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === question.correctIndex) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      const finalScore = Math.round(((correctCount + (selectedAnswer === question.correctIndex ? 1 : 0)) / questions.length) * 100);
      setFinished(true);
      onComplete(finalScore);
    } else {
      setSelectedAnswer(null);
      setCurrentQ(prev => prev + 1);
    }
  };

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="text-center py-8 slide-up">
        <div className="text-5xl mb-3">{score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}</div>
        <p className="text-sm text-foreground/40 mb-1">{correctCount} / {questions.length} 問正解</p>
        <p className="text-3xl font-black text-accent">{score}%</p>
      </div>
    );
  }

  return (
    <div className="slide-up">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1 bg-card-border rounded-full">
          <div className="h-full bg-warning rounded-full transition-all" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="text-[10px] text-foreground/25">{currentQ + 1}/{questions.length}</span>
      </div>

      <h4 className="text-sm font-medium mb-3">{question.question}</h4>

      <div className="space-y-2">
        {question.options.map((option, index) => {
          const isCorrectOption = index === question.correctIndex;
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={selectedAnswer !== null}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                selectedAnswer === null
                  ? 'bg-card-bg text-foreground/70 active:bg-card-border'
                  : isCorrectOption
                    ? 'bg-success/15 text-success correct-pop'
                    : isSelected
                      ? 'bg-danger/15 text-danger'
                      : 'bg-card-bg text-foreground/20'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="w-full mt-3 py-3.5 bg-accent text-white rounded-2xl font-semibold text-sm active:bg-accent-hover transition-colors slide-up"
        >
          {currentQ + 1 >= questions.length ? '結果を見る' : '次へ'}
        </button>
      )}
    </div>
  );
}
