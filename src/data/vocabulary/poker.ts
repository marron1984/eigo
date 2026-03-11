import { VocabularyWord } from '@/types';

export const pokerVocabulary: VocabularyWord[] = [
  // 中学レベル
  { id: 'p-jh-1', english: 'card', japanese: 'カード', pronunciation: '/kɑːrd/', exampleSentence: 'I have five cards in my hand.', exampleTranslation: '手に5枚のカードがあります。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-2', english: 'win', japanese: '勝つ', pronunciation: '/wɪn/', exampleSentence: 'I want to win this game.', exampleTranslation: 'この試合に勝ちたい。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-3', english: 'lose', japanese: '負ける', pronunciation: '/luːz/', exampleSentence: 'You lose if you have no chips.', exampleTranslation: 'チップがなくなったら負けです。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-4', english: 'number', japanese: '数字', pronunciation: '/ˈnʌmbər/', exampleSentence: 'Each card has a number.', exampleTranslation: '各カードには数字があります。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-5', english: 'play', japanese: '遊ぶ・プレイする', pronunciation: '/pleɪ/', exampleSentence: 'Let\'s play a game of poker.', exampleTranslation: 'ポーカーをしましょう。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-6', english: 'money', japanese: 'お金', pronunciation: '/ˈmʌni/', exampleSentence: 'You need money to play poker.', exampleTranslation: 'ポーカーをするにはお金が必要です。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-7', english: 'table', japanese: 'テーブル', pronunciation: '/ˈteɪbl/', exampleSentence: 'The players sit around the table.', exampleTranslation: 'プレイヤーはテーブルを囲んで座ります。', theme: 'poker', difficulty: 'junior-high' },
  { id: 'p-jh-8', english: 'turn', japanese: '順番', pronunciation: '/tɜːrn/', exampleSentence: 'It\'s your turn to act.', exampleTranslation: 'あなたの順番です。', theme: 'poker', difficulty: 'junior-high' },
  // 高校レベル
  { id: 'p-hs-1', english: 'strategy', japanese: '戦略', pronunciation: '/ˈstrætədʒi/', exampleSentence: 'A good poker strategy requires patience.', exampleTranslation: '良いポーカー戦略には忍耐が必要です。', theme: 'poker', difficulty: 'high-school' },
  { id: 'p-hs-2', english: 'opponent', japanese: '対戦相手', pronunciation: '/əˈpoʊnənt/', exampleSentence: 'Watch your opponent carefully.', exampleTranslation: '対戦相手をよく観察しましょう。', theme: 'poker', difficulty: 'high-school' },
  { id: 'p-hs-3', english: 'combination', japanese: '組み合わせ', pronunciation: '/ˌkɑːmbɪˈneɪʃn/', exampleSentence: 'A royal flush is the best combination.', exampleTranslation: 'ロイヤルフラッシュは最高の組み合わせです。', theme: 'poker', difficulty: 'high-school' },
  { id: 'p-hs-4', english: 'confidence', japanese: '自信', pronunciation: '/ˈkɑːnfɪdəns/', exampleSentence: 'Play with confidence.', exampleTranslation: '自信を持ってプレイしよう。', theme: 'poker', difficulty: 'high-school' },
  { id: 'p-hs-5', english: 'decision', japanese: '決断', pronunciation: '/dɪˈsɪʒn/', exampleSentence: 'Every decision matters in poker.', exampleTranslation: 'ポーカーではすべての決断が重要です。', theme: 'poker', difficulty: 'high-school' },
  // 日常会話レベル
  { id: 'p-d-1', english: 'bluff', japanese: 'ブラフ・はったり', pronunciation: '/blʌf/', exampleSentence: 'He decided to bluff with a weak hand.', exampleTranslation: '弱い手でブラフすることにした。', theme: 'poker', difficulty: 'daily' },
  { id: 'p-d-2', english: 'fold', japanese: 'フォールド・降りる', pronunciation: '/foʊld/', exampleSentence: 'She folded her cards after the flop.', exampleTranslation: 'フロップ後にカードを降りた。', theme: 'poker', difficulty: 'daily' },
  { id: 'p-d-3', english: 'raise', japanese: 'レイズ・つり上げる', pronunciation: '/reɪz/', exampleSentence: 'I\'ll raise to two hundred.', exampleTranslation: '200にレイズします。', theme: 'poker', difficulty: 'daily' },
  { id: 'p-d-4', english: 'all-in', japanese: 'オールイン', pronunciation: '/ɔːl ɪn/', exampleSentence: 'He went all-in with pocket aces.', exampleTranslation: 'ポケットエースでオールインした。', theme: 'poker', difficulty: 'daily' },
  // ビジネスレベル
  { id: 'p-b-1', english: 'bankroll', japanese: 'バンクロール・資金', pronunciation: '/ˈbæŋkroʊl/', exampleSentence: 'Manage your bankroll carefully.', exampleTranslation: 'バンクロールを慎重に管理しましょう。', theme: 'poker', difficulty: 'business' },
  { id: 'p-b-2', english: 'variance', japanese: '分散・ばらつき', pronunciation: '/ˈveriəns/', exampleSentence: 'Poker has high variance in the short term.', exampleTranslation: 'ポーカーは短期的に分散が大きい。', theme: 'poker', difficulty: 'business' },
  // 上級レベル
  { id: 'p-a-1', english: 'pot odds', japanese: 'ポットオッズ', pronunciation: '/pɑːt ɑːdz/', exampleSentence: 'Calculate the pot odds before calling.', exampleTranslation: 'コールする前にポットオッズを計算しよう。', theme: 'poker', difficulty: 'advanced' },
  { id: 'p-a-2', english: 'equity', japanese: 'エクイティ・期待勝率', pronunciation: '/ˈekwəti/', exampleSentence: 'You need at least 30% equity to call.', exampleTranslation: 'コールするには少なくとも30%のエクイティが必要です。', theme: 'poker', difficulty: 'advanced' },
];
