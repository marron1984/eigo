'use client';

import { useState } from 'react';
import { VocabularyWord } from '@/types';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface FlashcardProps {
  word: VocabularyWord;
  onResult: (quality: number) => void;
}

export default function Flashcard({ word, onResult }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  const { speak } = useSpeechSynthesis();

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word.english);
  };

  return (
    <div className="w-full slide-up">
      <div
        className="flip-card"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flip-card-inner relative w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: '260px' }}>
          {/* 表面 */}
          <div className="flip-card-front absolute inset-0 bg-card-bg rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="text-[10px] text-foreground/25 uppercase tracking-wider mb-6">tap to flip</div>
            <div className="text-3xl font-black text-accent mb-2">{word.english}</div>
            <div className="text-xs text-foreground/30 mb-6">{word.pronunciation}</div>
            <button
              onClick={handleSpeak}
              className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center active:bg-accent/20 transition-colors"
            >
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>

          {/* 裏面 */}
          <div className="flip-card-back absolute inset-0 bg-card-bg border border-accent/20 rounded-2xl p-6 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-success mb-1">{word.japanese}</div>
            <div className="text-base text-accent/70 mb-4">{word.english}</div>
            <div className="bg-surface rounded-xl p-3 w-full">
              <p className="text-xs text-foreground/60 italic leading-relaxed">&quot;{word.exampleSentence}&quot;</p>
              <p className="text-xs text-foreground/35 mt-1">{word.exampleTranslation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 評価ボタン */}
      {flipped && (
        <div className="mt-4 grid grid-cols-3 gap-2 slide-up">
          <button
            onClick={() => { setFlipped(false); onResult(1); }}
            className="py-3.5 rounded-xl bg-danger/10 text-danger text-sm font-semibold active:bg-danger/20 transition-colors"
          >
            もう一度
          </button>
          <button
            onClick={() => { setFlipped(false); onResult(3); }}
            className="py-3.5 rounded-xl bg-warning/10 text-warning text-sm font-semibold active:bg-warning/20 transition-colors"
          >
            あいまい
          </button>
          <button
            onClick={() => { setFlipped(false); onResult(5); }}
            className="py-3.5 rounded-xl bg-success/10 text-success text-sm font-semibold active:bg-success/20 transition-colors"
          >
            覚えた！
          </button>
        </div>
      )}
    </div>
  );
}
