import { VocabularyWord } from '@/types';

export const baseballVocabulary: VocabularyWord[] = [
  // 中学レベル
  { id: 'bb-jh-1', english: 'throw', japanese: '投げる', pronunciation: '/θroʊ/', exampleSentence: 'He can throw the ball very fast.', exampleTranslation: '彼はとても速くボールを投げられる。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-2', english: 'catch', japanese: '捕る', pronunciation: '/kætʃ/', exampleSentence: 'The fielder made a great catch.', exampleTranslation: '野手が素晴らしいキャッチをした。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-3', english: 'hit', japanese: '打つ', pronunciation: '/hɪt/', exampleSentence: 'He hit the ball over the fence.', exampleTranslation: '彼はフェンスの向こうにボールを打った。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-4', english: 'team', japanese: 'チーム', pronunciation: '/tiːm/', exampleSentence: 'Our team won the game yesterday.', exampleTranslation: '昨日私たちのチームが試合に勝った。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-5', english: 'run', japanese: '走る・得点', pronunciation: '/rʌn/', exampleSentence: 'He scored three runs in the game.', exampleTranslation: '彼は試合で3点を取った。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-6', english: 'player', japanese: '選手', pronunciation: '/ˈpleɪər/', exampleSentence: 'He is the best player on the team.', exampleTranslation: '彼はチームで一番の選手です。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-7', english: 'ground', japanese: 'グラウンド', pronunciation: '/ɡraʊnd/', exampleSentence: 'The ball rolled on the ground.', exampleTranslation: 'ボールがグラウンドを転がった。', theme: 'baseball', difficulty: 'junior-high' },
  { id: 'bb-jh-8', english: 'practice', japanese: '練習', pronunciation: '/ˈpræktɪs/', exampleSentence: 'We practice every day after school.', exampleTranslation: '放課後毎日練習しています。', theme: 'baseball', difficulty: 'junior-high' },
  // 高校レベル
  { id: 'bb-hs-1', english: 'championship', japanese: '選手権', pronunciation: '/ˈtʃæmpiənʃɪp/', exampleSentence: 'The team won the championship last year.', exampleTranslation: 'チームは去年選手権を獲得した。', theme: 'baseball', difficulty: 'high-school' },
  { id: 'bb-hs-2', english: 'pitcher', japanese: 'ピッチャー・投手', pronunciation: '/ˈpɪtʃər/', exampleSentence: 'The pitcher threw a perfect game.', exampleTranslation: '投手が完全試合を投げた。', theme: 'baseball', difficulty: 'high-school' },
  { id: 'bb-hs-3', english: 'stadium', japanese: 'スタジアム・球場', pronunciation: '/ˈsteɪdiəm/', exampleSentence: 'The stadium was full of fans.', exampleTranslation: '球場はファンでいっぱいだった。', theme: 'baseball', difficulty: 'high-school' },
  { id: 'bb-hs-4', english: 'inning', japanese: 'イニング・回', pronunciation: '/ˈɪnɪŋ/', exampleSentence: 'They scored in the ninth inning.', exampleTranslation: '9回に得点した。', theme: 'baseball', difficulty: 'high-school' },
  { id: 'bb-hs-5', english: 'defeat', japanese: '打ち負かす', pronunciation: '/dɪˈfiːt/', exampleSentence: 'They defeated the rival team 5-3.', exampleTranslation: 'ライバルチームを5対3で打ち負かした。', theme: 'baseball', difficulty: 'high-school' },
  // 日常会話レベル
  { id: 'bb-d-1', english: 'bullpen', japanese: 'ブルペン', pronunciation: '/ˈbʊlpen/', exampleSentence: 'The reliever warmed up in the bullpen.', exampleTranslation: 'リリーフがブルペンで投球練習した。', theme: 'baseball', difficulty: 'daily' },
  { id: 'bb-d-2', english: 'lineup', japanese: '打順・ラインナップ', pronunciation: '/ˈlaɪnʌp/', exampleSentence: 'The manager changed the lineup today.', exampleTranslation: '監督は今日打順を変えた。', theme: 'baseball', difficulty: 'daily' },
  { id: 'bb-d-3', english: 'strikeout', japanese: '三振', pronunciation: '/ˈstraɪkaʊt/', exampleSentence: 'He had 12 strikeouts in the game.', exampleTranslation: '彼は試合で12個の三振を奪った。', theme: 'baseball', difficulty: 'daily' },
  // ビジネスレベル
  { id: 'bb-b-1', english: 'designated hitter', japanese: '指名打者', pronunciation: '/ˈdezɪɡneɪtɪd ˈhɪtər/', exampleSentence: 'The designated hitter batted in the cleanup spot.', exampleTranslation: '指名打者が4番を打った。', theme: 'baseball', difficulty: 'business' },
  { id: 'bb-b-2', english: 'scouting', japanese: 'スカウティング', pronunciation: '/ˈskaʊtɪŋ/', exampleSentence: 'Scouting reports help teams prepare.', exampleTranslation: 'スカウティングレポートはチームの準備に役立つ。', theme: 'baseball', difficulty: 'business' },
  // 上級レベル
  { id: 'bb-a-1', english: 'on-base percentage', japanese: '出塁率', pronunciation: '/ɑːn beɪs pərˈsentɪdʒ/', exampleSentence: 'His on-base percentage is over .400.', exampleTranslation: '彼の出塁率は4割を超えている。', theme: 'baseball', difficulty: 'advanced' },
  { id: 'bb-a-2', english: 'sabermetrics', japanese: 'セイバーメトリクス', pronunciation: '/ˌseɪbərˈmetrɪks/', exampleSentence: 'Sabermetrics changed how teams evaluate players.', exampleTranslation: 'セイバーメトリクスはチームの選手評価を変えた。', theme: 'baseball', difficulty: 'advanced' },
];
