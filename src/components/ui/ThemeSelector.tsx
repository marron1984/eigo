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
    <div className="space-y-4">
      {/* テーマ選択 */}
      <div>
        <label className="text-sm text-foreground/50 mb-2 block">テーマ</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onThemeChange('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selectedTheme === 'all'
                ? 'bg-accent text-white'
                : 'bg-card-bg border border-card-border text-foreground/60 hover:border-accent/50'
            }`}
          >
            すべて
          </button>
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedTheme === theme.id
                  ? 'bg-accent text-white'
                  : 'bg-card-bg border border-card-border text-foreground/60 hover:border-accent/50'
              }`}
            >
              {theme.icon} {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* 難易度選択 */}
      <div>
        <label className="text-sm text-foreground/50 mb-2 block">レベル</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onDifficultyChange('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              selectedDifficulty === 'all'
                ? 'bg-accent text-white'
                : 'bg-card-bg border border-card-border text-foreground/60 hover:border-accent/50'
            }`}
          >
            すべて
          </button>
          {DIFFICULTIES.map(diff => (
            <button
              key={diff.id}
              onClick={() => onDifficultyChange(diff.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedDifficulty === diff.id
                  ? 'bg-accent text-white'
                  : 'bg-card-bg border border-card-border text-foreground/60 hover:border-accent/50'
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
