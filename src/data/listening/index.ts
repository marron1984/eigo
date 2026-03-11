import { ListeningExercise } from '@/types';

export const allListeningExercises: ListeningExercise[] = [
  // ポーカー
  {
    id: 'l-poker-jh-1',
    title: 'ポーカーの基本ルール',
    text: 'Poker is a card game. You get cards and try to make the best hand. The player with the best hand wins the game.',
    japaneseTranslation: 'ポーカーはカードゲームです。カードをもらい、最高の手を作ろうとします。最高の手を持つプレイヤーがゲームに勝ちます。',
    questions: [
      { question: 'ポーカーは何のゲームですか？', options: ['ボードゲーム', 'カードゲーム', 'ビデオゲーム', 'スポーツ'], correctIndex: 1 },
      { question: '誰が勝ちますか？', options: ['最初にプレイした人', '最もチップが多い人', '最高の手を持つ人', '最後まで残った人'], correctIndex: 2 },
    ],
    theme: 'poker',
    difficulty: 'junior-high',
  },
  {
    id: 'l-poker-hs-1',
    title: 'テキサスホールデムの流れ',
    text: 'In Texas Hold\'em, each player receives two hole cards. Then five community cards are dealt face up on the table. Players must make the best five-card hand using any combination of their hole cards and the community cards.',
    japaneseTranslation: 'テキサスホールデムでは、各プレイヤーは2枚のホールカードを受け取ります。その後、5枚のコミュニティカードがテーブルに表向きで配られます。プレイヤーはホールカードとコミュニティカードの組み合わせで最高の5枚の手を作らなければなりません。',
    questions: [
      { question: '各プレイヤーは最初に何枚のカードを受け取りますか？', options: ['1枚', '2枚', '3枚', '5枚'], correctIndex: 1 },
      { question: 'コミュニティカードは何枚ですか？', options: ['2枚', '3枚', '4枚', '5枚'], correctIndex: 3 },
    ],
    theme: 'poker',
    difficulty: 'high-school',
  },
  // 野球
  {
    id: 'l-baseball-jh-1',
    title: '野球の試合',
    text: 'Baseball is a popular sport in Japan. Two teams play against each other. One team throws the ball, and the other team tries to hit it. The team with more runs wins.',
    japaneseTranslation: '野球は日本で人気のあるスポーツです。2つのチームが対戦します。一方のチームがボールを投げ、もう一方のチームが打とうとします。より多くのランを取ったチームが勝ちます。',
    questions: [
      { question: '何チームで対戦しますか？', options: ['1チーム', '2チーム', '3チーム', '4チーム'], correctIndex: 1 },
      { question: '勝つのはどちらですか？', options: ['先に打ったチーム', 'より多くのランを取ったチーム', '先に投げたチーム', '人数が多いチーム'], correctIndex: 1 },
    ],
    theme: 'baseball',
    difficulty: 'junior-high',
  },
  {
    id: 'l-baseball-hs-1',
    title: 'NPBの歴史',
    text: 'Nippon Professional Baseball was established in 1950. It consists of two leagues: the Central League and the Pacific League. Each league has six teams. The champions of each league face each other in the Japan Series every autumn.',
    japaneseTranslation: '日本プロ野球は1950年に設立されました。セントラル・リーグとパシフィック・リーグの2つのリーグで構成されています。各リーグには6チームがあります。各リーグの優勝チームが毎年秋に日本シリーズで対戦します。',
    questions: [
      { question: 'NPBが設立されたのはいつですか？', options: ['1940年', '1945年', '1950年', '1955年'], correctIndex: 2 },
      { question: '各リーグのチーム数は？', options: ['4チーム', '5チーム', '6チーム', '8チーム'], correctIndex: 2 },
    ],
    theme: 'baseball',
    difficulty: 'high-school',
  },
  // 競馬
  {
    id: 'l-horse-jh-1',
    title: '競馬の楽しみ方',
    text: 'Horse racing is exciting to watch. Many horses run together on a track. People cheer for their favorite horse. The fastest horse wins the race.',
    japaneseTranslation: '競馬は見ていて興奮します。多くの馬がコースを一緒に走ります。人々はお気に入りの馬を応援します。最も速い馬がレースに勝ちます。',
    questions: [
      { question: '馬はどこを走りますか？', options: ['道路', 'コース', '山', '海辺'], correctIndex: 1 },
      { question: 'レースに勝つのは？', options: ['一番大きい馬', '一番速い馬', '一番若い馬', '一番人気の馬'], correctIndex: 1 },
    ],
    theme: 'horse-racing',
    difficulty: 'junior-high',
  },
  {
    id: 'l-horse-hs-1',
    title: '日本ダービー',
    text: 'The Japanese Derby is one of the most prestigious horse races in Japan. It is held at Tokyo Racecourse every year in late May or early June. Only three-year-old horses can participate. The distance of the race is 2,400 meters.',
    japaneseTranslation: '日本ダービーは日本で最も格式のある競馬レースの一つです。毎年5月下旬から6月上旬に東京競馬場で開催されます。3歳馬のみが出走できます。レースの距離は2,400メートルです。',
    questions: [
      { question: '日本ダービーはどこで開催されますか？', options: ['大阪競馬場', '中山競馬場', '東京競馬場', '京都競馬場'], correctIndex: 2 },
      { question: '出走できるのは何歳の馬ですか？', options: ['2歳', '3歳', '4歳', '5歳'], correctIndex: 1 },
    ],
    theme: 'horse-racing',
    difficulty: 'high-school',
  },
  // 日本の現代アート
  {
    id: 'l-artjp-jh-1',
    title: '美術館に行こう',
    text: 'Let\'s go to the art museum. There are many beautiful pictures and sculptures. You can see art from Japan and other countries. It is free for students.',
    japaneseTranslation: '美術館に行きましょう。たくさんの美しい絵画や彫刻があります。日本や他の国のアートを見ることができます。学生は無料です。',
    questions: [
      { question: '美術館には何がありますか？', options: ['本', '絵画と彫刻', '動物', '映画'], correctIndex: 1 },
      { question: '学生の入場料は？', options: ['100円', '500円', '1000円', '無料'], correctIndex: 3 },
    ],
    theme: 'art-japan',
    difficulty: 'junior-high',
  },
  {
    id: 'l-artjp-hs-1',
    title: '安藤忠雄の建築',
    text: 'Tadao Ando is a self-taught Japanese architect known for his innovative use of concrete. His buildings feature clean geometric shapes and the creative use of natural light. The Church of the Light in Osaka is one of his most celebrated works.',
    japaneseTranslation: '安藤忠雄はコンクリートの革新的な使用で知られる独学の日本人建築家です。彼の建物はクリーンな幾何学的形状と自然光の創造的な使い方が特徴です。大阪の光の教会は最も有名な作品の一つです。',
    questions: [
      { question: '安藤忠雄の建築の特徴は？', options: ['木造', 'コンクリート', 'ガラス', '鉄骨'], correctIndex: 1 },
      { question: '光の教会はどこにありますか？', options: ['東京', '京都', '大阪', '神戸'], correctIndex: 2 },
    ],
    theme: 'art-japan',
    difficulty: 'high-school',
  },
  // 世界の現代アート
  {
    id: 'l-artw-jh-1',
    title: '世界の有名な美術館',
    text: 'There are many famous museums in the world. The Louvre in Paris is very big. The Museum of Modern Art in New York has modern art. Many people visit these museums every year.',
    japaneseTranslation: '世界にはたくさんの有名な美術館があります。パリのルーブル美術館はとても大きいです。ニューヨークの近代美術館には現代アートがあります。毎年多くの人がこれらの美術館を訪れます。',
    questions: [
      { question: 'ルーブル美術館はどこにありますか？', options: ['ロンドン', 'パリ', 'ニューヨーク', '東京'], correctIndex: 1 },
      { question: 'MoMAはどこにありますか？', options: ['パリ', 'ロンドン', 'ニューヨーク', 'ベルリン'], correctIndex: 2 },
    ],
    theme: 'art-world',
    difficulty: 'junior-high',
  },
  // Sakanaction
  {
    id: 'l-saka-jh-1',
    title: '音楽を聴こう',
    text: 'I like listening to music. My favorite band plays guitar, drums, and keyboard. Their songs make me happy. I listen to their music on my phone every day.',
    japaneseTranslation: '音楽を聴くのが好きです。お気に入りのバンドはギター、ドラム、キーボードを演奏します。彼らの曲を聴くと幸せになります。毎日スマホで彼らの音楽を聴いています。',
    questions: [
      { question: 'バンドは何を演奏しますか？', options: ['ピアノだけ', 'ギター、ドラム、キーボード', 'バイオリン', 'フルート'], correctIndex: 1 },
      { question: 'どこで音楽を聴きますか？', options: ['テレビ', 'ラジオ', 'スマホ', 'CD'], correctIndex: 2 },
    ],
    theme: 'sakanaction',
    difficulty: 'junior-high',
  },
  {
    id: 'l-saka-hs-1',
    title: 'Sakanactionの音楽スタイル',
    text: 'Sakanaction is a Japanese band that blends rock music with electronic sounds. The lead vocalist, Ichiro Yamaguchi, writes most of the songs. Their music often features synthesizers and unique rhythms that create an atmospheric experience for listeners.',
    japaneseTranslation: 'サカナクションはロック音楽とエレクトロニックサウンドを融合させた日本のバンドです。ボーカルの山口一郎がほとんどの曲を書いています。彼らの音楽はシンセサイザーとユニークなリズムが特徴で、リスナーに雰囲気のある体験を提供します。',
    questions: [
      { question: 'サカナクションの音楽スタイルは？', options: ['クラシック', 'ジャズ', 'ロックとエレクトロニックの融合', 'カントリー'], correctIndex: 2 },
      { question: '曲を書くのは主に誰ですか？', options: ['ドラマー', '山口一郎', 'プロデューサー', 'ベーシスト'], correctIndex: 1 },
    ],
    theme: 'sakanaction',
    difficulty: 'high-school',
  },
];
