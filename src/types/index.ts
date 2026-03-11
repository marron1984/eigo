// テーマカテゴリ
export type Theme = 'poker' | 'baseball' | 'horse-racing' | 'art-japan' | 'art-world' | 'sakanaction';

// 中学英語から段階的にレベルアップ
export type Difficulty =
  | 'junior-high'    // 中学レベル（基礎の振り返り）
  | 'high-school'    // 高校レベル
  | 'daily'          // 日常会話レベル
  | 'business'       // ビジネス・実践レベル
  | 'advanced';      // 上級・専門レベル

// 単語データ
export interface VocabularyWord {
  id: string;
  english: string;
  japanese: string;
  pronunciation: string;
  exampleSentence: string;
  exampleTranslation: string;
  theme: Theme;
  difficulty: Difficulty;
}

// ヒアリング教材
export interface ListeningExercise {
  id: string;
  title: string;
  text: string;
  japaneseTranslation: string;
  questions: ListeningQuestion[];
  theme: Theme;
  difficulty: Difficulty;
}

export interface ListeningQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

// シャドーイング教材
export interface ShadowingExercise {
  id: string;
  title: string;
  phrases: ShadowingPhrase[];
  theme: Theme;
  difficulty: Difficulty;
}

export interface ShadowingPhrase {
  english: string;
  japanese: string;
}

// 進捗データ
export interface VocabularyProgress {
  wordId: string;
  correct: number;
  incorrect: number;
  nextReview: string;
  ease: number;
}

export interface ListeningProgress {
  exerciseId: string;
  score: number;
  completedAt: string;
}

export interface ShadowingProgress {
  exerciseId: string;
  accuracy: number;
  completedAt: string;
}

export interface DailyActivity {
  date: string;
  minutesStudied: number;
  wordsLearned: number;
}

export interface UserProgress {
  streakDays: number;
  lastStudyDate: string;
  vocabulary: VocabularyProgress[];
  listening: ListeningProgress[];
  shadowing: ShadowingProgress[];
  dailyActivity: DailyActivity[];
}

// テーマ表示情報
export interface ThemeInfo {
  id: Theme;
  name: string;
  icon: string;
  color: string;
}

// 難易度表示情報
export interface DifficultyInfo {
  id: Difficulty;
  name: string;
  description: string;
  order: number;
}

export const THEMES: ThemeInfo[] = [
  { id: 'poker', name: 'ポーカー', icon: '♠', color: '#e74c3c' },
  { id: 'baseball', name: '日本野球', icon: '⚾', color: '#3498db' },
  { id: 'horse-racing', name: '日本競馬', icon: '🏇', color: '#2ecc71' },
  { id: 'art-japan', name: '日本の現代アート', icon: '🎨', color: '#9b59b6' },
  { id: 'art-world', name: '世界の現代アート', icon: '🌍', color: '#f39c12' },
  { id: 'sakanaction', name: 'Sakanaction', icon: '🎵', color: '#1abc9c' },
];

export const DIFFICULTIES: DifficultyInfo[] = [
  { id: 'junior-high', name: '中学レベル', description: '基礎の振り返り', order: 1 },
  { id: 'high-school', name: '高校レベル', description: 'より複雑な語彙と構文', order: 2 },
  { id: 'daily', name: '日常会話', description: '自然な表現・イディオム', order: 3 },
  { id: 'business', name: 'ビジネス', description: '実践的な表現', order: 4 },
  { id: 'advanced', name: '上級', description: '専門的な語彙', order: 5 },
];
