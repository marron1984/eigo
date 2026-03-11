import { VocabularyWord, Theme, Difficulty } from '@/types';
import { pokerVocabulary } from './poker';
import { baseballVocabulary } from './baseball';
import { horseRacingVocabulary } from './horse-racing';
import { artJapanVocabulary } from './art-japan';
import { artWorldVocabulary } from './art-world';
import { sakanactionVocabulary } from './sakanaction';

export const allVocabulary: VocabularyWord[] = [
  ...pokerVocabulary,
  ...baseballVocabulary,
  ...horseRacingVocabulary,
  ...artJapanVocabulary,
  ...artWorldVocabulary,
  ...sakanactionVocabulary,
];

export function getVocabularyByTheme(theme: Theme): VocabularyWord[] {
  return allVocabulary.filter(w => w.theme === theme);
}

export function getVocabularyByDifficulty(difficulty: Difficulty): VocabularyWord[] {
  return allVocabulary.filter(w => w.difficulty === difficulty);
}

export function getVocabularyByThemeAndDifficulty(theme: Theme, difficulty: Difficulty): VocabularyWord[] {
  return allVocabulary.filter(w => w.theme === theme && w.difficulty === difficulty);
}
