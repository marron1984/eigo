import { ShadowingExercise } from '@/types';

export const allShadowingExercises: ShadowingExercise[] = [
  // ポーカー
  {
    id: 's-poker-jh-1',
    title: 'ポーカーの会話（基礎）',
    phrases: [
      { english: 'Do you want to play cards?', japanese: 'カードで遊びたいですか？' },
      { english: 'Yes, I like playing poker.', japanese: 'はい、ポーカーが好きです。' },
      { english: 'How many cards do I get?', japanese: '何枚カードをもらえますか？' },
      { english: 'You get two cards at first.', japanese: '最初に2枚もらいます。' },
      { english: 'I think I can win this game.', japanese: 'この試合に勝てると思います。' },
    ],
    theme: 'poker',
    difficulty: 'junior-high',
  },
  {
    id: 's-poker-hs-1',
    title: 'ポーカーテーブルでの会話',
    phrases: [
      { english: 'I would like to raise the bet.', japanese: 'ベットを上げたいです。' },
      { english: 'The odds are not in my favor.', japanese: 'オッズは自分に有利ではない。' },
      { english: 'He is bluffing, I can tell.', japanese: '彼はブラフしている、わかる。' },
      { english: 'I will fold this hand and wait for a better one.', japanese: 'この手は降りて、もっと良い手を待ちます。' },
    ],
    theme: 'poker',
    difficulty: 'high-school',
  },
  // 野球
  {
    id: 's-baseball-jh-1',
    title: '野球の話（基礎）',
    phrases: [
      { english: 'I like watching baseball games.', japanese: '野球の試合を見るのが好きです。' },
      { english: 'My favorite team is the Giants.', japanese: 'お気に入りのチームはジャイアンツです。' },
      { english: 'The pitcher threw a very fast ball.', japanese: 'ピッチャーがとても速いボールを投げた。' },
      { english: 'He hit a home run in the last inning.', japanese: '最終回にホームランを打った。' },
      { english: 'Let us go to the stadium this weekend.', japanese: '今週末スタジアムに行きましょう。' },
    ],
    theme: 'baseball',
    difficulty: 'junior-high',
  },
  {
    id: 's-baseball-hs-1',
    title: '試合後の感想',
    phrases: [
      { english: 'That was an incredible game tonight.', japanese: '今夜は信じられない試合だった。' },
      { english: 'The relief pitcher saved the game in the ninth inning.', japanese: 'リリーフピッチャーが9回に試合を救った。' },
      { english: 'His batting average has improved significantly this season.', japanese: '今シーズン、彼の打率は大幅に向上した。' },
    ],
    theme: 'baseball',
    difficulty: 'high-school',
  },
  // 競馬
  {
    id: 's-horse-jh-1',
    title: '競馬場にて（基礎）',
    phrases: [
      { english: 'Look at that beautiful horse!', japanese: 'あの美しい馬を見て！' },
      { english: 'Which horse do you think will win?', japanese: 'どの馬が勝つと思いますか？' },
      { english: 'The race is about to start.', japanese: 'レースがもうすぐ始まります。' },
      { english: 'My horse came in first place!', japanese: '私の馬が1着になった！' },
      { english: 'That was such an exciting race.', japanese: 'なんてワクワクするレースだったんだ。' },
    ],
    theme: 'horse-racing',
    difficulty: 'junior-high',
  },
  {
    id: 's-horse-hs-1',
    title: 'レース分析の会話',
    phrases: [
      { english: 'The favorite horse did not perform well today.', japanese: '本命馬は今日は調子が良くなかった。' },
      { english: 'The jockey made an excellent decision at the final stretch.', japanese: '騎手が最終直線で素晴らしい判断をした。' },
      { english: 'This horse has a strong pedigree from champion bloodlines.', japanese: 'この馬はチャンピオン血統の強い血統を持っている。' },
    ],
    theme: 'horse-racing',
    difficulty: 'high-school',
  },
  // 日本の現代アート
  {
    id: 's-artjp-jh-1',
    title: '美術館で（基礎）',
    phrases: [
      { english: 'This painting is very colorful.', japanese: 'この絵はとてもカラフルです。' },
      { english: 'I think this art is interesting.', japanese: 'このアートは面白いと思います。' },
      { english: 'Who made this sculpture?', japanese: 'この彫刻は誰が作りましたか？' },
      { english: 'The building has a very modern design.', japanese: 'その建物はとてもモダンなデザインです。' },
      { english: 'I want to visit more museums in Japan.', japanese: '日本でもっと美術館を訪れたいです。' },
    ],
    theme: 'art-japan',
    difficulty: 'junior-high',
  },
  {
    id: 's-artjp-hs-1',
    title: '現代アートについて語る',
    phrases: [
      { english: 'Yayoi Kusama is famous for her polka dot installations.', japanese: '草間彌生は水玉のインスタレーションで有名です。' },
      { english: 'Japanese architecture often harmonizes with nature.', japanese: '日本建築はしばしば自然と調和する。' },
      { english: 'The exhibition explores the relationship between tradition and innovation.', japanese: '展覧会は伝統と革新の関係を探求している。' },
    ],
    theme: 'art-japan',
    difficulty: 'high-school',
  },
  // 世界の現代アート
  {
    id: 's-artw-jh-1',
    title: 'アートの感想（基礎）',
    phrases: [
      { english: 'I like this picture very much.', japanese: 'この絵がとても好きです。' },
      { english: 'The colors are bright and cheerful.', japanese: '色が明るくて楽しげです。' },
      { english: 'Art makes people think about many things.', japanese: 'アートは人々にいろいろなことを考えさせる。' },
      { english: 'I want to become an artist someday.', japanese: 'いつかアーティストになりたいです。' },
    ],
    theme: 'art-world',
    difficulty: 'junior-high',
  },
  // Sakanaction
  {
    id: 's-saka-jh-1',
    title: '音楽の話（基礎）',
    phrases: [
      { english: 'What kind of music do you like?', japanese: 'どんな音楽が好きですか？' },
      { english: 'I like Japanese rock music.', japanese: '日本のロック音楽が好きです。' },
      { english: 'This song has a nice melody.', japanese: 'この曲は良いメロディーですね。' },
      { english: 'Have you been to a concert before?', japanese: 'コンサートに行ったことがありますか？' },
      { english: 'The band played very well last night.', japanese: '昨晩バンドはとても上手に演奏した。' },
    ],
    theme: 'sakanaction',
    difficulty: 'junior-high',
  },
  {
    id: 's-saka-hs-1',
    title: 'ライブの感想を語る',
    phrases: [
      { english: 'The concert was absolutely amazing and unforgettable.', japanese: 'コンサートは本当に素晴らしく忘れられないものだった。' },
      { english: 'Their use of electronic sounds creates a unique atmosphere.', japanese: 'エレクトロニックサウンドの使い方が独特な雰囲気を作り出す。' },
      { english: 'Yamaguchi writes lyrics that really resonate with people.', japanese: '山口は人々の心に響く歌詞を書く。' },
    ],
    theme: 'sakanaction',
    difficulty: 'high-school',
  },
];
