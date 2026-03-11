import { VocabularyProgress } from '@/types';

// SM-2 アルゴリズム（間隔反復）
// ease: 難易度係数 (1.3 ~ 2.5, 初期値 2.5)
// quality: 回答品質 (0-5, 3以上で正解)

export function calculateNextReview(
  progress: VocabularyProgress | undefined,
  quality: number // 0-5
): VocabularyProgress {
  const now = new Date();
  const ease = progress?.ease ?? 2.5;
  const correct = progress?.correct ?? 0;
  const incorrect = progress?.incorrect ?? 0;

  if (quality < 3) {
    // 不正解: リセットして翌日に復習
    const nextReview = new Date(now.getTime() + 86400000);
    return {
      wordId: progress?.wordId ?? '',
      correct,
      incorrect: incorrect + 1,
      nextReview: nextReview.toISOString(),
      ease: Math.max(1.3, ease - 0.2),
    };
  }

  // 正解: 間隔を延ばす
  const newCorrect = correct + 1;
  const newEase = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  let intervalDays: number;
  if (newCorrect === 1) {
    intervalDays = 1;
  } else if (newCorrect === 2) {
    intervalDays = 6;
  } else {
    // 前回の間隔 × ease
    const prevInterval = progress?.nextReview
      ? Math.max(1, Math.round((new Date(progress.nextReview).getTime() - now.getTime()) / 86400000))
      : 1;
    intervalDays = Math.round(prevInterval * newEase);
  }

  const nextReview = new Date(now.getTime() + intervalDays * 86400000);

  return {
    wordId: progress?.wordId ?? '',
    correct: newCorrect,
    incorrect,
    nextReview: nextReview.toISOString(),
    ease: newEase,
  };
}

export function isDueForReview(progress: VocabularyProgress): boolean {
  return new Date(progress.nextReview) <= new Date();
}
