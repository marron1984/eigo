#!/usr/bin/env npx tsx
/**
 * 英語学習データ生成スクリプト
 *
 * 使い方:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate.mts --theme poker --difficulty junior-high --type vocabulary --count 20
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate.mts --theme baseball --type listening --count 5
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate.mts --theme art-japan --type shadowing --count 5
 *
 * npm scripts:
 *   npm run generate -- --theme poker --type vocabulary --count 20
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'node:fs';
import path from 'node:path';

// ── 型定義 ──────────────────────────────────────────

type Theme = 'poker' | 'baseball' | 'horse-racing' | 'art-japan' | 'art-world' | 'sakanaction';
type Difficulty = 'junior-high' | 'high-school' | 'daily' | 'business' | 'advanced';
type ContentType = 'vocabulary' | 'listening' | 'shadowing';

interface VocabularyWord {
  id: string;
  english: string;
  japanese: string;
  pronunciation: string;
  exampleSentence: string;
  exampleTranslation: string;
  theme: Theme;
  difficulty: Difficulty;
}

interface ListeningQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface ListeningExercise {
  id: string;
  title: string;
  text: string;
  japaneseTranslation: string;
  questions: ListeningQuestion[];
  theme: Theme;
  difficulty: Difficulty;
}

interface ShadowingPhrase {
  english: string;
  japanese: string;
}

interface ShadowingExercise {
  id: string;
  title: string;
  phrases: ShadowingPhrase[];
  theme: Theme;
  difficulty: Difficulty;
}

// ── テーマ・難易度の日本語名 ─────────────────────────

const THEME_NAMES: Record<Theme, string> = {
  poker: 'ポーカー',
  baseball: '日本野球',
  'horse-racing': '日本競馬',
  'art-japan': '日本の現代アート',
  'art-world': '世界の現代アート',
  sakanaction: 'Sakanaction（サカナクション）',
};

const DIFFICULTY_NAMES: Record<Difficulty, string> = {
  'junior-high': '中学レベル（基礎・簡単な単語と文）',
  'high-school': '高校レベル（より複雑な語彙と構文）',
  daily: '日常会話レベル（自然な表現・イディオム）',
  business: 'ビジネスレベル（実践的・専門的な表現）',
  advanced: '上級レベル（難解・専門的な語彙）',
};

const THEME_FILE_MAP: Record<Theme, string> = {
  poker: 'poker',
  baseball: 'baseball',
  'horse-racing': 'horse-racing',
  'art-japan': 'art-japan',
  'art-world': 'art-world',
  sakanaction: 'sakanaction',
};

const ID_PREFIX: Record<Theme, string> = {
  poker: 'p',
  baseball: 'bb',
  'horse-racing': 'hr',
  'art-japan': 'aj',
  'art-world': 'aw',
  sakanaction: 'sk',
};

const DIFF_PREFIX: Record<Difficulty, string> = {
  'junior-high': 'jh',
  'high-school': 'hs',
  daily: 'd',
  business: 'b',
  advanced: 'a',
};

// ── 引数パース ──────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed: Record<string, string> = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    parsed[key] = args[i + 1];
  }

  const theme = parsed.theme as Theme;
  const type = (parsed.type ?? 'vocabulary') as ContentType;
  const difficulty = parsed.difficulty as Difficulty | undefined;
  const count = parseInt(parsed.count ?? '10', 10);

  if (!theme || !THEME_NAMES[theme]) {
    console.error('❌ --theme が必要です。選択肢:', Object.keys(THEME_NAMES).join(', '));
    process.exit(1);
  }

  if (!['vocabulary', 'listening', 'shadowing'].includes(type)) {
    console.error('❌ --type は vocabulary / listening / shadowing のいずれか');
    process.exit(1);
  }

  if (difficulty && !DIFFICULTY_NAMES[difficulty]) {
    console.error('❌ --difficulty の選択肢:', Object.keys(DIFFICULTY_NAMES).join(', '));
    process.exit(1);
  }

  return { theme, type, difficulty, count };
}

// ── プロンプト作成 ──────────────────────────────────

function buildVocabularyPrompt(theme: Theme, difficulty: Difficulty, count: number, existingWords: string[]): string {
  return `あなたは英語学習教材を作成する専門家です。

テーマ「${THEME_NAMES[theme]}」、難易度「${DIFFICULTY_NAMES[difficulty]}」の英単語データを${count}個生成してください。

以下の既存の単語と重複しないようにしてください:
${existingWords.length > 0 ? existingWords.join(', ') : '（なし）'}

以下のJSON配列形式で出力してください。JSON以外は出力しないでください。
[
  {
    "english": "英単語",
    "japanese": "日本語訳",
    "pronunciation": "/発音記号/",
    "exampleSentence": "テーマに沿った例文（英語）",
    "exampleTranslation": "例文の日本語訳"
  }
]

ルール:
- 発音記号はIPA形式で記載
- 例文はテーマ「${THEME_NAMES[theme]}」に関連する内容にする
- 難易度「${DIFFICULTY_NAMES[difficulty]}」に適した単語を選ぶ
- 例文は自然な英語で、学習者が実際に使えるものにする
- 必ず${count}個生成する`;
}

function buildListeningPrompt(theme: Theme, difficulty: Difficulty, count: number): string {
  return `あなたは英語学習教材を作成する専門家です。

テーマ「${THEME_NAMES[theme]}」、難易度「${DIFFICULTY_NAMES[difficulty]}」のリスニング問題を${count}個生成してください。

以下のJSON配列形式で出力してください。JSON以外は出力しないでください。
[
  {
    "title": "日本語のタイトル",
    "text": "リスニング用の英文（3-5文程度）",
    "japaneseTranslation": "英文の日本語訳",
    "questions": [
      {
        "question": "日本語の質問文",
        "options": ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
        "correctIndex": 0
      }
    ]
  }
]

ルール:
- 各問題に2つの質問をつける
- 選択肢は4つで、1つだけ正解
- テーマ「${THEME_NAMES[theme]}」に関連する内容にする
- 難易度「${DIFFICULTY_NAMES[difficulty]}」に適した英文にする
- correctIndexは0始まり`;
}

function buildShadowingPrompt(theme: Theme, difficulty: Difficulty, count: number): string {
  return `あなたは英語学習教材を作成する専門家です。

テーマ「${THEME_NAMES[theme]}」、難易度「${DIFFICULTY_NAMES[difficulty]}」のシャドーイング練習を${count}個生成してください。

以下のJSON配列形式で出力してください。JSON以外は出力しないでください。
[
  {
    "title": "日本語のタイトル",
    "phrases": [
      { "english": "英語のフレーズ", "japanese": "日本語訳" }
    ]
  }
]

ルール:
- 各練習に3-5個のフレーズを含める
- 会話形式や説明形式など自然な流れにする
- テーマ「${THEME_NAMES[theme]}」に関連する内容にする
- 難易度「${DIFFICULTY_NAMES[difficulty]}」に適した表現を使う
- シャドーイングに適した、リズムの良いフレーズにする`;
}

// ── 既存データ読み込み ──────────────────────────────

function getExistingWords(theme: Theme): string[] {
  const filePath = path.join(process.cwd(), 'src', 'data', 'vocabulary', `${THEME_FILE_MAP[theme]}.ts`);
  if (!fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.match(/english: '([^']+)'/g);
  return matches ? matches.map(m => m.replace("english: '", '').replace("'", '')) : [];
}

function getNextId(theme: Theme, type: ContentType, difficulty: Difficulty): { prefix: string; startNum: number } {
  const tp = ID_PREFIX[theme];
  const dp = DIFF_PREFIX[difficulty];
  let prefix: string;
  let dir: string;

  switch (type) {
    case 'vocabulary':
      prefix = `${tp}-${dp}`;
      dir = 'vocabulary';
      break;
    case 'listening':
      prefix = `l-${THEME_FILE_MAP[theme]}-${dp}`;
      dir = 'listening';
      break;
    case 'shadowing':
      prefix = `s-${THEME_FILE_MAP[theme]}-${dp}`;
      dir = 'shadowing';
      break;
  }

  // 既存ファイルから最大IDを探す
  const dataDir = path.join(process.cwd(), 'src', 'data', dir);
  let maxNum = 0;

  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
      const regex = new RegExp(`id: '${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+)'`, 'g');
      let match;
      while ((match = regex.exec(content)) !== null) {
        maxNum = Math.max(maxNum, parseInt(match[1], 10));
      }
    }
  }

  return { prefix, startNum: maxNum + 1 };
}

// ── Claude APIコール ────────────────────────────────

async function callClaude(prompt: string): Promise<string> {
  const client = new Anthropic();

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = message.content[0];
  if (block.type !== 'text') throw new Error('Unexpected response type');
  return block.text;
}

function extractJSON(text: string): unknown {
  // JSONブロックを抽出
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error('JSONが見つかりません:\n' + text);
  return JSON.parse(jsonMatch[0]);
}

// ── ファイル書き出し ────────────────────────────────

function writeVocabularyFile(theme: Theme, words: VocabularyWord[]) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'vocabulary', `${THEME_FILE_MAP[theme]}.ts`);
  const existingContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : null;

  if (existingContent) {
    // 既存ファイルの末尾 ]; の前に追加
    const newEntries = words
      .map(w => `  { id: '${w.id}', english: '${escapeStr(w.english)}', japanese: '${escapeStr(w.japanese)}', pronunciation: '${escapeStr(w.pronunciation)}', exampleSentence: '${escapeStr(w.exampleSentence)}', exampleTranslation: '${escapeStr(w.exampleTranslation)}', theme: '${w.theme}', difficulty: '${w.difficulty}' },`)
      .join('\n');

    const updated = existingContent.replace(/\];(\s*)$/, `${newEntries}\n];$1`);
    fs.writeFileSync(filePath, updated);
  } else {
    // 新規ファイル作成
    const varName = themeToVarName(theme);
    const entries = words
      .map(w => `  { id: '${w.id}', english: '${escapeStr(w.english)}', japanese: '${escapeStr(w.japanese)}', pronunciation: '${escapeStr(w.pronunciation)}', exampleSentence: '${escapeStr(w.exampleSentence)}', exampleTranslation: '${escapeStr(w.exampleTranslation)}', theme: '${w.theme}', difficulty: '${w.difficulty}' },`)
      .join('\n');

    const content = `import { VocabularyWord } from '@/types';\n\nexport const ${varName}Vocabulary: VocabularyWord[] = [\n${entries}\n];\n`;
    fs.writeFileSync(filePath, content);
  }
}

function appendListeningData(theme: Theme, exercises: ListeningExercise[]) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'listening', 'index.ts');
  const content = fs.readFileSync(filePath, 'utf-8');

  const newEntries = exercises
    .map(e => {
      const qs = e.questions
        .map(q => `      { question: '${escapeStr(q.question)}', options: [${q.options.map(o => `'${escapeStr(o)}'`).join(', ')}], correctIndex: ${q.correctIndex} },`)
        .join('\n');
      return `  {\n    id: '${e.id}',\n    title: '${escapeStr(e.title)}',\n    text: '${escapeStr(e.text)}',\n    japaneseTranslation: '${escapeStr(e.japaneseTranslation)}',\n    questions: [\n${qs}\n    ],\n    theme: '${e.theme}',\n    difficulty: '${e.difficulty}',\n  },`;
    })
    .join('\n');

  const updated = content.replace(/\];(\s*)$/, `${newEntries}\n];$1`);
  fs.writeFileSync(filePath, updated);
}

function appendShadowingData(theme: Theme, exercises: ShadowingExercise[]) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'shadowing', 'index.ts');
  const content = fs.readFileSync(filePath, 'utf-8');

  const newEntries = exercises
    .map(e => {
      const ps = e.phrases
        .map(p => `      { english: '${escapeStr(p.english)}', japanese: '${escapeStr(p.japanese)}' },`)
        .join('\n');
      return `  {\n    id: '${e.id}',\n    title: '${escapeStr(e.title)}',\n    phrases: [\n${ps}\n    ],\n    theme: '${e.theme}',\n    difficulty: '${e.difficulty}',\n  },`;
    })
    .join('\n');

  const updated = content.replace(/\];(\s*)$/, `${newEntries}\n];$1`);
  fs.writeFileSync(filePath, updated);
}

// ── ユーティリティ ──────────────────────────────────

function escapeStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function themeToVarName(theme: Theme): string {
  return theme.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

// ── メイン処理 ──────────────────────────────────────

async function main() {
  const { theme, type, difficulty, count } = parseArgs();

  const difficulties: Difficulty[] = difficulty
    ? [difficulty]
    : ['junior-high', 'high-school', 'daily', 'business', 'advanced'];

  const countPerDifficulty = difficulty ? count : Math.max(Math.ceil(count / difficulties.length), 3);

  console.log(`\n🚀 生成開始: テーマ=${THEME_NAMES[theme]}, タイプ=${type}`);
  console.log(`   難易度: ${difficulties.map(d => DIFFICULTY_NAMES[d].split('（')[0]).join(', ')}`);
  console.log(`   各難易度あたり ${countPerDifficulty}件\n`);

  for (const diff of difficulties) {
    console.log(`📝 ${DIFFICULTY_NAMES[diff].split('（')[0]} を生成中...`);

    let prompt: string;
    switch (type) {
      case 'vocabulary': {
        const existingWords = getExistingWords(theme);
        prompt = buildVocabularyPrompt(theme, diff, countPerDifficulty, existingWords);
        break;
      }
      case 'listening':
        prompt = buildListeningPrompt(theme, diff, countPerDifficulty);
        break;
      case 'shadowing':
        prompt = buildShadowingPrompt(theme, diff, countPerDifficulty);
        break;
    }

    const response = await callClaude(prompt);
    const data = extractJSON(response) as Record<string, unknown>[];
    const { prefix, startNum } = getNextId(theme, type, diff);

    switch (type) {
      case 'vocabulary': {
        const words: VocabularyWord[] = data.map((item, i) => ({
          id: `${prefix}-${startNum + i}`,
          english: item.english as string,
          japanese: item.japanese as string,
          pronunciation: item.pronunciation as string,
          exampleSentence: item.exampleSentence as string,
          exampleTranslation: item.exampleTranslation as string,
          theme,
          difficulty: diff,
        }));
        writeVocabularyFile(theme, words);
        console.log(`   ✅ ${words.length}件の単語を追加`);
        break;
      }
      case 'listening': {
        const exercises: ListeningExercise[] = data.map((item, i) => ({
          id: `${prefix}-${startNum + i}`,
          title: item.title as string,
          text: item.text as string,
          japaneseTranslation: item.japaneseTranslation as string,
          questions: item.questions as ListeningQuestion[],
          theme,
          difficulty: diff,
        }));
        appendListeningData(theme, exercises);
        console.log(`   ✅ ${exercises.length}件のリスニング問題を追加`);
        break;
      }
      case 'shadowing': {
        const exercises: ShadowingExercise[] = data.map((item, i) => ({
          id: `${prefix}-${startNum + i}`,
          title: item.title as string,
          phrases: item.phrases as ShadowingPhrase[],
          theme,
          difficulty: diff,
        }));
        appendShadowingData(theme, exercises);
        console.log(`   ✅ ${exercises.length}件のシャドーイング問題を追加`);
        break;
      }
    }
  }

  console.log('\n🎉 生成完了！\n');
}

main().catch(err => {
  console.error('❌ エラー:', err.message);
  process.exit(1);
});
