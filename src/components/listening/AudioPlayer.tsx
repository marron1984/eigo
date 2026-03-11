'use client';

import { useState } from 'react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface AudioPlayerProps {
  text: string;
}

const rates = [
  { value: 0.5, label: '0.5x' },
  { value: 0.75, label: '0.75x' },
  { value: 1.0, label: '1x' },
  { value: 1.25, label: '1.25x' },
];

export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [rate, setRate] = useState(1.0);
  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  return (
    <div className="bg-card-bg rounded-2xl p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => isSpeaking ? stop() : speak(text, rate)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
            isSpeaking
              ? 'bg-danger/15 text-danger active:bg-danger/25'
              : 'bg-accent/15 text-accent active:bg-accent/25'
          }`}
        >
          {isSpeaking ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <div className="flex-1">
          <div className="text-[10px] text-foreground/25 uppercase tracking-wider mb-1.5">再生速度</div>
          <div className="flex gap-1.5">
            {rates.map(r => (
              <button
                key={r.value}
                onClick={() => setRate(r.value)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  rate === r.value
                    ? 'bg-accent text-white'
                    : 'bg-surface text-foreground/30 active:bg-card-border'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
