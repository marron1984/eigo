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
      <div className="text-center py-8">
        <div className="text-4xl mb-3">
          {score >= 80 ? '🎉' : score >= 50 ? '👍' : '💪'}
        </div>
        <p className="text-lg font-bold mb-1">
          {correctCount} / {questions.length} 問正解
        </p>
        <p className="text-2xl font-bold text-accent">{score}%</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-sm text-foreground/50 mb-3">
        質問 {currentQ + 1} / {questions.length}
      </div>
      <h4 className="text-base font-medium mb-4">{question.question}</h4>
      <div className="space-y-2">
        {question.options.map((option, index) => {
          let className = 'w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ';
          if (selectedAnswer === null) {
            className += 'bg-card-bg border-card-border hover:border-accent/50 cursor-pointer';
          } else if (index === question.correctIndex) {
            className += 'bg-success/20 border-success text-success';
          } else if (selectedAnswer === index) {
            className += 'bg-danger/20 border-danger text-danger';
          } else {
            className += 'bg-card-bg border-card-border opacity-50';
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={className}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <button
          onClick={handleNext}
          className="w-full mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          {currentQ + 1 >= questions.length ? '結果を見る' : '次の質問'}
        </button>
      )}
    </div>
  );
}
