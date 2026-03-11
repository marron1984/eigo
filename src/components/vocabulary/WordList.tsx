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
      <input
        type="text"
        placeholder="単語を検索..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-3 bg-card-bg border border-card-border rounded-xl text-foreground placeholder:text-foreground/30 mb-4 outline-none focus:border-accent/50"
      />
      <div className="space-y-2 max-h-[60vh] overflow-y-auto">
        {filtered.map(word => (
          <div
            key={word.id}
            className="flex items-center justify-between px-4 py-3 bg-card-bg border border-card-border rounded-lg hover:border-accent/30 transition-colors"
          >
            <div className="flex-1">
              <span className="font-medium text-accent mr-3">{word.english}</span>
              <span className="text-foreground/60 text-sm">{word.japanese}</span>
            </div>
            <button
              onClick={() => speak(word.english)}
              className="text-foreground/40 hover:text-accent transition-colors ml-2"
            >
              🔊
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-foreground/40 py-8">該当する単語が見つかりません</p>
        )}
      </div>
    </div>
  );
}
