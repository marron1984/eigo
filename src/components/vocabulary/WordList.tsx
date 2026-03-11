'use client';

import { useState } from 'react';
import { VocabularyWord } from '@/types';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface WordListProps {
  words: VocabularyWord[];
}

export default function WordList({ words }: WordListProps) {
  const [search, setSearch] = useState('');
  const { speak } = useSpeechSynthesis();

  const filtered = words.filter(
    w =>
      w.english.toLowerCase().includes(search.toLowerCase()) ||
      w.japanese.includes(search)
  );

  return (
    <div>
      <div className="relative mb-3">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="検索..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card-bg rounded-xl text-sm text-foreground placeholder:text-foreground/20 outline-none focus:ring-1 focus:ring-accent/30"
        />
      </div>
      <div className="space-y-1">
        {filtered.map(word => (
          <div
            key={word.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl active:bg-card-bg transition-colors"
          >
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-accent text-sm">{word.english}</span>
              <span className="text-foreground/40 text-xs ml-2">{word.japanese}</span>
            </div>
            <button
              onClick={() => speak(word.english)}
              className="w-8 h-8 rounded-full bg-card-bg flex items-center justify-center shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-foreground/30 py-10 text-sm">見つかりません</p>
        )}
      </div>
    </div>
  );
}
