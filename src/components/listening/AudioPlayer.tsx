'use client';

import { useState } from 'react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

interface AudioPlayerProps {
  text: string;
}

export default function AudioPlayer({ text }: AudioPlayerProps) {
  const [rate, setRate] = useState(1.0);
  const { speak, stop, isSpeaking } = useSpeechSynthesis();

  const rates = [
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1.0, label: '1x' },
    { value: 1.25, label: '1.25x' },
  ];

  return (
    <div className="bg-card-bg border border-card-border rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => isSpeaking ? stop() : speak(text, rate)}
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-colors ${
            isSpeaking
              ? 'bg-danger/20 text-danger hover:bg-danger/30'
              : 'bg-accent/20 text-accent hover:bg-accent/30'
          }`}
        >
          {isSpeaking ? '⏹' : '▶'}
        </button>
        <div className="flex-1">
          <div className="text-sm text-foreground/60 mb-2">再生速度</div>
          <div className="flex gap-2">
            {rates.map(r => (
              <button
                key={r.value}
                onClick={() => setRate(r.value)}
                className={`px-3 py-1 rounded text-xs transition-colors ${
                  rate === r.value
                    ? 'bg-accent text-white'
                    : 'bg-card-border text-foreground/60 hover:text-foreground'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-foreground/30">
        🔊 再生ボタンを押して英語を聞きましょう
      </p>
    </div>
  );
}
