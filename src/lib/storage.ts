import { UserProgress } from '@/types';

const STORAGE_KEY = 'eigo-progress';

const DEFAULT_PROGRESS: UserProgress = {
  streakDays: 0,
  lastStudyDate: '',
  vocabulary: [],
  listening: [],
  shadowing: [],
  dailyActivity: [],
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return DEFAULT_PROGRESS;
    return JSON.parse(data) as UserProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (progress.lastStudyDate === today) {
    return progress;
  }

  const newStreak = progress.lastStudyDate === yesterday
    ? progress.streakDays + 1
    : 1;

  return {
    ...progress,
    streakDays: newStreak,
    lastStudyDate: today,
  };
}

export function recordDailyActivity(
  progress: UserProgress,
  minutesStudied: number,
  wordsLearned: number
): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  const existing = progress.dailyActivity.find(a => a.date === today);

  const updatedActivity = existing
    ? progress.dailyActivity.map(a =>
        a.date === today
          ? { ...a, minutesStudied: a.minutesStudied + minutesStudied, wordsLearned: a.wordsLearned + wordsLearned }
          : a
      )
    : [...progress.dailyActivity, { date: today, minutesStudied, wordsLearned }];

  return { ...progress, dailyActivity: updatedActivity };
}
