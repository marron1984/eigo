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
    <div className="w-full max-w-md mx-auto">
      <div
        className="flip-card cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flip-card-inner relative w-full ${flipped ? 'flipped' : ''}`} style={{ minHeight: '280px' }}>
          {/* 表面: 英語 */}
          <div className="flip-card-front absolute inset-0 bg-card-bg border border-card-border rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="text-sm text-foreground/40 mb-4">タップして意味を確認</div>
            <div className="text-3xl font-bold text-accent mb-2">{word.english}</div>
            <div className="text-sm text-foreground/50 mb-4">{word.pronunciation}</div>
            <button
              onClick={handleSpeak}
              className="px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors text-sm"
            >
              🔊 発音を聞く
            </button>
          </div>

          {/* 裏面: 日本語 + 例文 */}
          <div className="flip-card-back absolute inset-0 bg-card-bg border border-accent/30 rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-success mb-2">{word.japanese}</div>
            <div className="text-lg text-accent mb-4">{word.english}</div>
            <div className="text-sm text-foreground/70 mb-1 italic">&quot;{word.exampleSentence}&quot;</div>
            <div className="text-sm text-foreground/50 mb-6">{word.exampleTranslation}</div>
          </div>
        </div>
      </div>

      {/* 回答ボタン（裏面表示時） */}
      {flipped && (
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => { setFlipped(false); onResult(1); }}
            className="px-4 py-2 bg-danger/20 text-danger rounded-lg hover:bg-danger/30 transition-colors text-sm"
          >
            わからない
          </button>
          <button
            onClick={() => { setFlipped(false); onResult(3); }}
            className="px-4 py-2 bg-warning/20 text-warning rounded-lg hover:bg-warning/30 transition-colors text-sm"
          >
            あいまい
          </button>
          <button
            onClick={() => { setFlipped(false); onResult(5); }}
            className="px-4 py-2 bg-success/20 text-success rounded-lg hover:bg-success/30 transition-colors text-sm"
          >
            完璧！
          </button>
        </div>
      )}
    </div>
  );
}
