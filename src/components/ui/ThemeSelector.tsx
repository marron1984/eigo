'use client';

import { Theme, Difficulty, THEMES, DIFFICULTIES } from '@/types';

interface ThemeSelectorProps {
  selectedTheme: Theme | 'all';
  selectedDifficulty: Difficulty | 'all';
  onThemeChange: (theme: Theme | 'all') => void;
  onDifficultyChange: (difficulty: Difficulty | 'all') => void;
}

export default function ThemeSelector({
  selectedTheme,
  selectedDifficulty,
  onThemeChange,
  onDifficultyChange,
}: ThemeSelectorProps) {
  return (
    <div className="space-y-3">
      {/* テーマ: 横スクロール */}
      <div>
        <div className="text-[10px] text-foreground/30 font-medium uppercase tracking-wider mb-1.5 px-1">テーマ</div>
        <div className="flex gap-1.5 overflow-x-auto app-scroll pb-1">
          <button
            onClick={() => onThemeChange('all')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTheme === 'all'
                ? 'bg-accent text-white'
                : 'bg-card-bg text-foreground/40 active:bg-card-border'
            }`}
          >
            ALL
          </button>
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTheme === theme.id
                  ? 'bg-accent text-white'
                  : 'bg-card-bg text-foreground/40 active:bg-card-border'
              }`}
            >
              {theme.icon} {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* レベル */}
      <div>
        <div className="text-[10px] text-foreground/30 font-medium uppercase tracking-wider mb-1.5 px-1">レベル</div>
        <div className="flex gap-1.5 overflow-x-auto app-scroll pb-1">
          <button
            onClick={() => onDifficultyChange('all')}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedDifficulty === 'all'
                ? 'bg-accent text-white'
                : 'bg-card-bg text-foreground/40 active:bg-card-border'
            }`}
          >
            ALL
          </button>
          {DIFFICULTIES.map(diff => (
            <button
              key={diff.id}
              onClick={() => onDifficultyChange(diff.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedDifficulty === diff.id
                  ? 'bg-accent text-white'
                  : 'bg-card-bg text-foreground/40 active:bg-card-border'
              }`}
            >
              {diff.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
