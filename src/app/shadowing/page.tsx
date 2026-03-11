'use client';

import { useState, useMemo } from 'react';
import { Theme, Difficulty } from '@/types';
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
    setResults(prev => [...prev, {
      phrase: currentPhrase.english,
      spoken: transcript,
      accuracy,
    }]);
    setPhase('result');
  };

  const handleNext = () => {
    if (isLastPhrase) {
      // 完了 - 結果保存
      const avgAccuracy = results.length > 0
        ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length)
        : 0;
      if (currentExercise) {
        addShadowingResult({
          exerciseId: currentExercise.id,
          accuracy: avgAccuracy,
          completedAt: new Date().toISOString(),
        });
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

  // 教材選択画面
  if (!currentExercise) {
    return (
      <div className="max-w-3xl mx-auto pb-20 md:pb-0">
        <h1 className="text-2xl font-bold mb-1">🗣 シャドーイング</h1>
        <p className="text-foreground/50 text-sm mb-6">聞いて真似して発音力を向上させよう</p>

        {!isSupported && (
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-warning">
              お使いのブラウザは音声認識に対応していません。Chrome での使用を推奨します。
            </p>
          </div>
        )}

        <div className="mb-6">
          <ThemeSelector
            selectedTheme={selectedTheme}
            selectedDifficulty={selectedDifficulty}
            onThemeChange={setSelectedTheme}
            onDifficultyChange={setSelectedDifficulty}
          />
        </div>

        <div className="space-y-3">
          {filteredExercises.map(ex => (
            <button
              key={ex.id}
              onClick={() => { setSelectedExercise(ex.id); setCurrentPhraseIndex(0); setResults([]); setPhase('listen'); resetTranscript(); }}
              className="w-full text-left bg-card-bg border border-card-border rounded-xl p-5 hover:border-accent/50 transition-all"
            >
              <h3 className="font-medium text-accent mb-1">{ex.title}</h3>
              <p className="text-sm text-foreground/50">
                {ex.phrases.length}フレーズ
              </p>
            </button>
          ))}
          {filteredExercises.length === 0 && (
            <p className="text-center py-12 text-foreground/40">
              該当する教材がありません
            </p>
          )}
        </div>
      </div>
    );
  }

  // 完了画面
  if (isComplete) {
    const avgAccuracy = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length)
      : 0;

    return (
      <div className="max-w-3xl mx-auto pb-20 md:pb-0">
        <button onClick={handleBack} className="text-sm text-foreground/50 hover:text-foreground mb-4 inline-block">
          ← 戻る
        </button>

        <div className="text-center py-8">
          <div className="text-4xl mb-3">
            {avgAccuracy >= 80 ? '🎉' : avgAccuracy >= 50 ? '👍' : '💪'}
          </div>
          <h3 className="text-xl font-bold mb-2">シャドーイング完了！</h3>
          <p className="text-3xl font-bold text-accent mb-6">平均精度: {avgAccuracy}%</p>
        </div>

        <div className="space-y-3">
          {results.map((r, i) => (
            <div key={i} className="bg-card-bg border border-card-border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-accent">フレーズ {i + 1}</span>
                <span className={`text-sm font-bold ${r.accuracy >= 80 ? 'text-success' : r.accuracy >= 50 ? 'text-warning' : 'text-danger'}`}>
                  {r.accuracy}%
                </span>
              </div>
              <p className="text-sm text-foreground/70 mb-1">正解: {r.phrase}</p>
              <p className="text-sm text-foreground/50">あなた: {r.spoken || '(認識なし)'}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleBack}
          className="w-full mt-6 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
        >
          教材一覧に戻る
        </button>
      </div>
    );
  }

  // 学習画面
  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-0">
      <button onClick={handleBack} className="text-sm text-foreground/50 hover:text-foreground mb-4 inline-block">
        ← 戻る
      </button>

      <h2 className="text-xl font-bold mb-2">{currentExercise.title}</h2>

      {/* 進捗 */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-foreground/50">
          {currentPhraseIndex + 1} / {currentExercise.phrases.length}
        </span>
        <div className="flex-1 h-2 bg-card-border rounded-full">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${((currentPhraseIndex + 1) / currentExercise.phrases.length) * 100}%` }}
          />
        </div>
      </div>

      {currentPhrase && (
        <div className="space-y-4">
          {/* フレーズ表示 */}
          <div className="bg-card-bg border border-card-border rounded-xl p-6">
            <p className="text-lg font-medium text-accent mb-2">{currentPhrase.english}</p>
            <p className="text-sm text-foreground/50">{currentPhrase.japanese}</p>
          </div>

          {/* コントロール */}
          <div className="flex gap-3">
            {/* 聞くボタン */}
            <button
              onClick={handleListen}
              disabled={isSpeaking}
              className={`flex-1 py-4 rounded-xl text-sm font-medium transition-colors ${
                isSpeaking
                  ? 'bg-accent/10 text-accent/50'
                  : 'bg-accent/20 text-accent hover:bg-accent/30'
              }`}
            >
              {isSpeaking ? '🔊 再生中...' : '🔊 お手本を聞く'}
            </button>

            {/* 録音ボタン */}
            {phase === 'listen' && (
              <button
                onClick={handleStartRecording}
                disabled={!isSupported || isSpeaking}
                className="flex-1 py-4 rounded-xl text-sm font-medium bg-success/20 text-success hover:bg-success/30 transition-colors disabled:opacity-50"
              >
                🎤 録音開始
              </button>
            )}

            {phase === 'record' && (
              <button
                onClick={handleStopRecording}
                className="flex-1 py-4 rounded-xl text-sm font-medium bg-danger/20 text-danger hover:bg-danger/30 transition-colors animate-pulse"
              >
                ⏹ {isListening ? '録音中...' : '録音停止'}
              </button>
            )}
          </div>

          {/* 認識結果 */}
          {phase === 'record' && transcript && (
            <div className="bg-card-bg border border-card-border rounded-xl p-4">
              <div className="text-sm text-foreground/50 mb-1">認識テキスト:</div>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}

          {/* 結果表示 */}
          {phase === 'result' && results.length > 0 && (
            <div className="bg-card-bg border border-card-border rounded-xl p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-foreground/50">精度</span>
                <span className={`text-2xl font-bold ${
                  results[results.length - 1].accuracy >= 80 ? 'text-success' :
                  results[results.length - 1].accuracy >= 50 ? 'text-warning' : 'text-danger'
                }`}>
                  {results[results.length - 1].accuracy}%
                </span>
              </div>
              <p className="text-sm text-foreground/60 mb-1">
                あなた: {results[results.length - 1].spoken || '(認識なし)'}
              </p>
              <p className="text-sm text-foreground/40">
                正解: {results[results.length - 1].phrase}
              </p>

              <button
                onClick={handleNext}
                className="w-full mt-4 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
              >
                {isLastPhrase ? '結果を見る' : '次のフレーズ'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
