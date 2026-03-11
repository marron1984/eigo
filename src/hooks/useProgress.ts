'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProgress, VocabularyProgress, ListeningProgress, ShadowingProgress } from '@/types';
import { getProgress, saveProgress, updateStreak, recordDailyActivity } from '@/lib/storage';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getProgress());

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const update = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  const markStudyDay = useCallback(() => {
    update(prev => updateStreak(prev));
  }, [update]);

  const addActivity = useCallback((minutes: number, words: number) => {
    update(prev => recordDailyActivity(prev, minutes, words));
  }, [update]);

  const updateVocabulary = useCallback((vocabProgress: VocabularyProgress) => {
    update(prev => {
      const existing = prev.vocabulary.findIndex(v => v.wordId === vocabProgress.wordId);
      const vocabulary = existing >= 0
        ? prev.vocabulary.map((v, i) => i === existing ? vocabProgress : v)
        : [...prev.vocabulary, vocabProgress];
      return { ...prev, vocabulary };
    });
  }, [update]);

  const addListeningResult = useCallback((result: ListeningProgress) => {
    update(prev => ({
      ...prev,
      listening: [...prev.listening, result],
    }));
  }, [update]);

  const addShadowingResult = useCallback((result: ShadowingProgress) => {
    update(prev => ({
      ...prev,
      shadowing: [...prev.shadowing, result],
    }));
  }, [update]);

  return {
    progress,
    markStudyDay,
    addActivity,
    updateVocabulary,
    addListeningResult,
    addShadowingResult,
  };
}
