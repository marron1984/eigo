'use client';

import { useState, useMemo } from 'react';
import { Theme, Difficulty, THEMES } from '@/types';
import { allShadowingExercises } from '@/data/shadowing';
import { useProgress } from '@/hooks/useProgress';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSpeechRecognition, calculateAccuracy } from '@/hooks/useSpeechRecognition';
import ThemeSelector from '@/components/ui/ThemeSelector';

export default function ShadowingPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('junior-high');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [results, setResults] = useState<{ phrase: string; spoken: string; accuracy: number }[]>([]);
  const [phase, setPhase] = useState<'listen' | 'record' | 'result'>('listen');

  const { addShadowingResult, markStudyDay, addActivity } = useProgress();
  const { speak, isSpeaking } = useSpeechSynthesis();
  const { startListening, stopListening, transcript, isListening, isSupported, resetTranscript } = useSpeechRecognition();

  const filteredExercises = useMemo(() => {
    return allShadowingExercises.filter(ex => {
      if (selectedTheme !== 'all' && ex.theme !== selectedTheme) return false;
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTheme, selectedDifficulty]);

  const currentExercise = selectedExercise
    ? allShadowingExercises.find(ex => ex.id === selectedExercise)
    : null;

  const currentPhrase = currentExercise?.phrases[currentPhraseIndex];
  const isLastPhrase = currentExercise ? currentPhraseIndex >= currentExercise.phrases.length - 1 : false;

  const handleBack = () => {
    setSelectedExercise(null);
    setCurrentPhraseIndex(0);
    setResults([]);
    setPhase('listen');
    resetTranscript();
  };

  const handleListen = () => {
    if (!currentPhrase) return;
    speak(currentPhrase.english, 0.85);
  };

  const handleStartRecording = () => {
    resetTranscript();
    setPhase('record');
    startListening();
  };

  const handleStopRecording = () => {
    stopListening();
    if (!currentPhrase) return;
    const accuracy = calculateAccuracy(currentPhrase.english, transcript);
    setResults(prev => [...prev, { phrase: currentPhrase.english, spoken: transcript, accuracy }]);
    setPhase('result');
  };

  const handleNext = () => {
    if (isLastPhrase) {
      const avgAccuracy = results.length > 0
        ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) : 0;
      if (currentExercise) {
        addShadowingResult({ exerciseId: currentExercise.id, accuracy: avgAccuracy, completedAt: new Date().toISOString() });
        markStudyDay();
        addActivity(5, 0);
      }
      return;
    }
    setCurrentPhraseIndex(prev => prev + 1);
    setPhase('listen');
    resetTranscript();
  };

  const isComplete = isLastPhrase && phase === 'result';

  // 教材選択
  if (!currentExercise) {
    return (
      <div className="px-5 pt-5">
        <h1 className="text-lg font-bold mb-4">シャドーイング</h1>

        {!isSupported && (
          <div className="bg-warning/10 rounded-2xl p-3 mb-4">
            <p className="text-xs text-warning">お使いのブラウザは音声認識に対応していません。Chromeを推奨します。</p>
          </div>
        )}

        <div className="mb-4">
          <ThemeSelector
            selectedTheme={selectedTheme}
            selectedDifficulty={selectedDifficulty}
            onThemeChange={setSelectedTheme}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        <div className="space-y-2">
          {filteredExercises.map(ex => {
            const theme = THEMES.find(t => t.id === ex.theme);
            return (
              <button
                key={ex.id}
                onClick={() => { setSelectedExercise(ex.id); setCurrentPhraseIndex(0); setResults([]); setPhase('listen'); resetTranscript(); }}
                className="w-full text-left bg-card-bg rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
              >
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-lg shrink-0">
                  {theme?.icon || '🗣'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground/80 truncate">{ex.title}</h3>
                  <p className="text-[10px] text-foreground/30">{ex.phrases.length}フレーズ</p>
                </div>
                <svg className="w-4 h-4 text-foreground/15 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
          {filteredExercises.length === 0 && (
            <p className="text-center py-16 text-foreground/25 text-sm">該当する教材がありません</p>
          )}
        </div>
      </div>
    );
  }

  // 完了画面
  if (isComplete) {
    const avgAccuracy = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) : 0;

    return (
      <div className="px-5 pt-5 slide-up">
        <button onClick={handleBack} className="flex items-center gap-1 text-xs text-foreground/30 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          戻る
        </button>

        <div className="text-center py-6">
          <div className="text-5xl mb-3">{avgAccuracy >= 80 ? '🎉' : avgAccuracy >= 50 ? '👍' : '💪'}</div>
          <h3 className="text-lg font-bold mb-1">シャドーイング完了！</h3>
          <p className="text-xs text-foreground/40 mb-2">お疲れさま！毎日続けよう。</p>
          <p className="text-3xl font-black text-accent">{avgAccuracy}%</p>
        </div>

        <div className="space-y-2 mt-4">
          {results.map((r, i) => (
            <div key={i} className="bg-card-bg rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-foreground/25">#{i + 1}</span>
                <span className={`text-sm font-bold ${r.accuracy >= 80 ? 'text-success' : r.accuracy >= 50 ? 'text-warning' : 'text-danger'}`}>
                  {r.accuracy}%
                </span>
              </div>
              <p className="text-xs text-foreground/50">{r.phrase}</p>
              <p className="text-xs text-foreground/25 mt-0.5">{r.spoken || '(認識なし)'}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleBack}
          className="w-full mt-4 py-3.5 bg-accent text-white rounded-2xl font-semibold text-sm active:bg-accent-hover transition-colors"
        >
          一覧に戻る
        </button>
      </div>
    );
  }

  // 学習画面
  return (
    <div className="px-5 pt-5">
      <button onClick={handleBack} className="flex items-center gap-1 text-xs text-foreground/30 mb-3 active:text-foreground/50">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        戻る
      </button>

      {/* 進捗 */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-1.5 bg-card-border rounded-full">
          <div
            className="h-full bg-success rounded-full transition-all duration-300"
            style={{ width: `${((currentPhraseIndex + 1) / currentExercise.phrases.length) * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-foreground/25">{currentPhraseIndex + 1}/{currentExercise.phrases.length}</span>
      </div>

      {currentPhrase && (
        <div className="space-y-3">
          {/* フレーズ */}
          <div className="bg-card-bg rounded-2xl p-5 text-center">
            <p className="text-lg font-bold text-accent mb-1">{currentPhrase.english}</p>
            <p className="text-xs text-foreground/30">{currentPhrase.japanese}</p>
          </div>

          {/* コントロール */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleListen}
              disabled={isSpeaking}
              className={`py-4 rounded-2xl text-sm font-semibold transition-all ${
                isSpeaking
                  ? 'bg-accent/5 text-accent/30'
                  : 'bg-accent/10 text-accent active:bg-accent/20'
              }`}
            >
              {isSpeaking ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  再生中
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                  お手本
                </span>
              )}
            </button>

            {phase === 'listen' && (
              <button
                onClick={handleStartRecording}
                disabled={!isSupported || isSpeaking}
                className="py-4 rounded-2xl text-sm font-semibold bg-success/10 text-success active:bg-success/20 transition-all disabled:opacity-30"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  録音
                </span>
              </button>
            )}

            {phase === 'record' && (
              <button
                onClick={handleStopRecording}
                className="py-4 rounded-2xl text-sm font-semibold bg-danger/10 text-danger active:bg-danger/20 transition-all mic-recording"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-danger" />
                  {isListening ? '録音中...' : '停止'}
                </span>
              </button>
            )}

            {phase === 'result' && (
              <button
                onClick={handleNext}
                className="py-4 rounded-2xl text-sm font-semibold bg-accent text-white active:bg-accent-hover transition-all"
              >
                {isLastPhrase ? '結果を見る' : '次へ'}
              </button>
            )}
          </div>

          {/* 録音中の認識テキスト */}
          {phase === 'record' && transcript && (
            <div className="bg-surface rounded-xl p-3 slide-up">
              <div className="text-[10px] text-foreground/20 mb-1">認識中...</div>
              <p className="text-sm text-foreground/60">{transcript}</p>
            </div>
          )}

          {/* 結果 */}
          {phase === 'result' && results.length > 0 && (
            <div className="bg-card-bg rounded-2xl p-4 slide-up">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-foreground/25 uppercase tracking-wider">精度</span>
                <span className={`text-2xl font-black ${
                  results[results.length - 1].accuracy >= 80 ? 'text-success' :
                  results[results.length - 1].accuracy >= 50 ? 'text-warning' : 'text-danger'
                }`}>
                  {results[results.length - 1].accuracy}%
                </span>
              </div>
              <div className="bg-surface rounded-xl p-3 space-y-1">
                <p className="text-xs text-foreground/50">
                  <span className="text-foreground/25">You: </span>
                  {results[results.length - 1].spoken || '(認識なし)'}
                </p>
                <p className="text-xs text-foreground/25">
                  <span>Ans: </span>
                  {results[results.length - 1].phrase}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
