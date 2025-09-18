// Mock data for the Laravel BBS prototype

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  threadCount: number;
  postCount: number;
  isAdmin: boolean;
  createdAt: string;
  lastActivityAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
  description?: string;
}

export interface Thread {
  id: number;
  title: string;
  body: string;
  viewCount: number;
  postCount: number;
  isPinned: boolean;
  isLocked: boolean;
  category: Category;
  user: User;
  images: { id: number; path: string; filename: string; }[];
  createdAt: string;
  updatedAt: string;
  lastPost?: {
    id: number;
    content: string;
    user: User;
    createdAt: string;
  };
}

export interface Post {
  id: number;
  content: string;
  user: User;
  threadId: number;
  replyTo?: {
    id: number;
    content: string;
    user: User;
  };
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: 1,
    name: '山田太郎',
    email: 'yamada@example.com',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    bio: 'Laravel初心者です。よろしくお願いします！',
    location: '東京',
    website: 'https://example.com',
    threadCount: 15,
    postCount: 89,
    isAdmin: false,
    createdAt: '2024-01-01T00:00:00Z',
    lastActivityAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 2,
    name: '佐藤花子',
    email: 'sato@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    bio: 'フルスタック開発者として5年の経験があります。',
    location: '大阪',
    threadCount: 32,
    postCount: 156,
    isAdmin: true,
    createdAt: '2023-12-15T00:00:00Z',
    lastActivityAt: '2024-01-15T16:45:00Z'
  },
  {
    id: 3,
    name: '田中一郎',
    email: 'tanaka@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    bio: 'プログラミング学習中。Laravel勉強してます。',
    threadCount: 8,
    postCount: 42,
    isAdmin: false,
    createdAt: '2024-01-05T00:00:00Z',
    lastActivityAt: '2024-01-15T10:20:00Z'
  },
  {
    id: 4,
    name: '鈴木美咲',
    email: 'suzuki@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    bio: 'Web制作会社でバックエンドエンジニアをしています。',
    location: '福岡',
    threadCount: 23,
    postCount: 134,
    isAdmin: false,
    createdAt: '2023-11-20T00:00:00Z',
    lastActivityAt: '2024-01-15T08:15:00Z'
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 1,
    name: '技術',
    slug: 'tech',
    color: 'bg-blue-500',
    description: 'Laravel、PHP、Web開発に関する技術的な話題'
  },
  {
    id: 2,
    name: '質問',
    slug: 'question',
    color: 'bg-orange-500',
    description: 'プログラミングや開発に関する質問'
  },
  {
    id: 3,
    name: '雑談',
    slug: 'chat',
    color: 'bg-green-500',
    description: '技術以外の雑談や日常の話題'
  },
  {
    id: 4,
    name: 'お知らせ',
    slug: 'news',
    color: 'bg-purple-500',
    description: 'サイトからの重要なお知らせ'
  }
];

// Mock Threads
export const mockThreads: Thread[] = [
  {
    id: 1,
    title: 'Laravelの学習方法について教えてください',
    body: `Laravel初心者です。効率的な学習方法を教えてください。

現在の状況：
- PHP基礎は理解している
- MVCアーキテクチャの概念は知っている
- データベース設計の基礎知識はある

どのような順番で学習を進めるべきでしょうか？
おすすめの教材やリソースがあれば教えてください。`,
    viewCount: 342,
    postCount: 15,
    isPinned: true,
    isLocked: false,
    category: mockCategories[1], // 質問
    user: mockUsers[0],
    images: [],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    lastPost: {
      id: 45,
      content: '公式ドキュメントから始めることをおすすめします！',
      user: mockUsers[1],
      createdAt: '2024-01-15T14:30:00Z'
    }
  },
  {
    id: 2,
    title: 'Laravel 11の新機能まとめ',
    body: `Laravel 11がリリースされましたので、主な新機能をまとめてみました。

## 主な変更点

### 1. アプリケーションの簡素化
- \`config\` ディレクトリの整理
- 不要な設定ファイルの削除

### 2. パフォーマンス向上
- キャッシュ機能の改善
- データベースクエリの最適化

### 3. 開発者体験の向上
- エラー画面の改善
- デバッグ機能の強化

皆さんはもうLaravel 11を使っていますか？`,
    viewCount: 567,
    postCount: 23,
    isPinned: false,
    isLocked: false,
    category: mockCategories[0], // 技術
    user: mockUsers[1],
    images: [
      {
        id: 1,
        path: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
        filename: 'laravel-code.jpg'
      }
    ],
    createdAt: '2024-01-12T15:30:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    lastPost: {
      id: 67,
      content: 'パフォーマンス向上が素晴らしいです！',
      user: mockUsers[2],
      createdAt: '2024-01-15T16:45:00Z'
    }
  },
  {
    id: 3,
    title: 'Eloquent ORMのリレーションで困っています',
    body: `多対多のリレーションで中間テーブルに追加カラムがある場合の実装方法について質問があります。

具体的には、UserとRoleの多対多リレーションで、中間テーブルに作成日時を保存したいのですが、どのように実装すればよいでしょうか？

\`\`\`php
Schema::create('role_user', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained();
    $table->foreignId('role_id')->constrained();
    $table->timestamp('assigned_at');
    $table->timestamps();
});
\`\`\`

こんな感じのテーブル構造です。`,
    viewCount: 234,
    postCount: 8,
    isPinned: false,
    isLocked: false,
    category: mockCategories[1], // 質問
    user: mockUsers[2],
    images: [],
    createdAt: '2024-01-13T10:15:00Z',
    updatedAt: '2024-01-15T10:20:00Z',
    lastPost: {
      id: 34,
      content: 'withPivotを使うと解決できますよ！',
      user: mockUsers[3],
      createdAt: '2024-01-15T10:20:00Z'
    }
  },
  {
    id: 4,
    title: '今日の開発日記 - ログイン機能実装完了！',
    body: `今日はLaravel Breezeを使ってログイン機能を実装しました！

思った以上に簡単で驚きです。\`php artisan breeze:install\`コマンド一発で必要なファイルが全部生成されるんですね。

明日はプロフィール編集機能を作る予定です。
皆さんの開発進捗はいかがですか？`,
    viewCount: 156,
    postCount: 12,
    isPinned: false,
    isLocked: false,
    category: mockCategories[2], // 雑談
    user: mockUsers[0],
    images: [],
    createdAt: '2024-01-14T18:00:00Z',
    updatedAt: '2024-01-15T08:15:00Z',
    lastPost: {
      id: 56,
      content: '順調に進んでますね！頑張ってください！',
      user: mockUsers[3],
      createdAt: '2024-01-15T08:15:00Z'
    }
  },
  {
    id: 5,
    title: '[重要] サイトメンテナンスのお知らせ',
    body: `いつもLaravel BBSをご利用いただき、ありがとうございます。

下記の日程でサイトメンテナンスを実施いたします。

**メンテナンス日時**
2024年1月20日（土） 2:00 〜 4:00 (JST)

**作業内容**
- サーバーソフトウェアの更新
- データベース最適化
- セキュリティ強化

メンテナンス中はサイトにアクセスできません。
ご不便をおかけしますが、よろしくお願いいたします。`,
    viewCount: 89,
    postCount: 3,
    isPinned: true,
    isLocked: true,
    category: mockCategories[3], // お知らせ
    user: mockUsers[1],
    images: [],
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z'
  }
];

// Mock Posts
export const mockPosts: { [threadId: number]: Post[] } = {
  1: [
    {
      id: 1,
      content: `私も同じような状況でした！

私がおすすめする学習順序は以下の通りです：

1. **公式ドキュメントを読む**
   - Laravel公式ドキュメントは非常に充実しています
   - まずは「Getting Started」から始めましょう

2. **実際にプロジェクトを作ってみる**
   - todoアプリなど簡単なものから始める
   - CRUD操作を一通り実装してみる

3. **認証機能を実装する**
   - Laravel Breezeを使ってみる
   - ユーザー登録・ログイン機能を理解する

頑張ってください！`,
      user: mockUsers[1],
      threadId: 1,
      isEdited: false,
      createdAt: '2024-01-10T10:30:00Z'
    },
    {
      id: 2,
      content: `>>1 の方法は良いですね！

追加で、YouTubeの動画チュートリアルもおすすめです。
特に日本語のチュートリアルだと理解しやすいです。

私が参考にしたチャンネル：
- Laravel入門チャンネル
- プログラミング学習TV

実際に手を動かしながら学習するのが一番効果的だと思います。`,
      user: mockUsers[2],
      threadId: 1,
      replyTo: {
        id: 1,
        content: '私も同じような状況でした！',
        user: mockUsers[1]
      },
      isEdited: false,
      createdAt: '2024-01-10T11:15:00Z'
    },
    {
      id: 3,
      content: `皆さんありがとうございます！

まずは公式ドキュメントから始めてみます。
実際にプロジェクトを作りながら学習していこうと思います。

進捗があったらまた報告させていただきます！`,
      user: mockUsers[0],
      threadId: 1,
      isEdited: false,
      createdAt: '2024-01-10T12:00:00Z'
    }
  ],
  2: [
    {
      id: 4,
      content: `素晴らしいまとめですね！

Laravel 11で特に気に入っているのは、アプリケーション構造の簡素化です。
config ディレクトリがスッキリして、開発者にとって分かりやすくなりました。

パフォーマンス向上も体感できるレベルで改善されていますね。
特にEloquentの最適化が効いている気がします。`,
      user: mockUsers[3],
      threadId: 2,
      isEdited: false,
      createdAt: '2024-01-12T16:00:00Z'
    },
    {
      id: 5,
      content: `私はまだLaravel 10を使っているのですが、アップグレードすべきでしょうか？

既存のプロジェクトへの影響が心配で、なかなか踏み切れずにいます。
破壊的変更はどの程度あるのでしょうか？`,
      user: mockUsers[0],
      threadId: 2,
      isEdited: false,
      createdAt: '2024-01-12T17:30:00Z'
    },
    {
      id: 6,
      content: `>>5 破壊的変更は比較的少ないです。

主な変更点：
- PHP 8.2以上が必要
- 一部の設定ファイルの変更
- 古いヘルパー関数の削除

アップグレードガイドに従えば、スムーズに移行できると思います。
バックアップを取ってから試してみることをおすすめします。`,
      user: mockUsers[1],
      threadId: 2,
      replyTo: {
        id: 5,
        content: '私はまだLaravel 10を使っているのですが',
        user: mockUsers[0]
      },
      isEdited: false,
      createdAt: '2024-01-13T09:00:00Z'
    }
  ],
  3: [
    {
      id: 7,
      content: `withPivot()を使うことで解決できます！

\`\`\`php
// User モデル
public function roles()
{
    return $this->belongsToMany(Role::class)
                ->withPivot('assigned_at')
                ->withTimestamps();
}
\`\`\`

これで中間テーブルの追加カラムにアクセスできるようになります。

使用例：
\`\`\`php
$user = User::with('roles')->first();
foreach ($user->roles as $role) {
    echo $role->pivot->assigned_at;
}
\`\`\``,
      user: mockUsers[3],
      threadId: 3,
      isEdited: false,
      createdAt: '2024-01-13T11:00:00Z'
    },
    {
      id: 8,
      content: `ありがとうございます！withPivotで解決できました！

追加でattach時にも値を設定したい場合は、こんな感じでできました：

\`\`\`php
$user->roles()->attach($roleId, [
    'assigned_at' => now()
]);
\`\`\`

とても助かりました！`,
      user: mockUsers[2],
      threadId: 3,
      replyTo: {
        id: 7,
        content: 'withPivot()を使うことで解決できます！',
        user: mockUsers[3]
      },
      isEdited: false,
      createdAt: '2024-01-13T14:00:00Z'
    }
  ],
  4: [
    {
      id: 9,
      content: `お疲れ様です！Laravel Breezeは本当に便利ですよね。

私も最初使った時は、こんなに簡単にできるのかと驚きました。
プロフィール編集機能の実装も楽しみですね！

頑張ってください！応援しています。`,
      user: mockUsers[3],
      threadId: 4,
      isEdited: false,
      createdAt: '2024-01-14T19:00:00Z'
    },
    {
      id: 10,
      content: `私も今Laravel勉強中です！

お互い頑張りましょう。
進捗報告楽しみにしています。

私は今Eloquentのリレーションで苦戦中です...😅`,
      user: mockUsers[2],
      threadId: 4,
      isEdited: false,
      createdAt: '2024-01-14T20:30:00Z'
    }
  ],
  5: [
    {
      id: 11,
      content: `メンテナンスお疲れ様です。
サービス向上のための作業、ありがとうございます。`,
      user: mockUsers[0],
      threadId: 5,
      isEdited: false,
      createdAt: '2024-01-15T12:30:00Z'
    }
  ]
};

export const getCurrentUser = (): User => mockUsers[0];

export const getThreadsByCategory = (categorySlug: string): Thread[] => {
  return mockThreads.filter(thread => thread.category.slug === categorySlug);
};

export const searchThreads = (query: string, categoryId?: number, sortBy?: string): Thread[] => {
  let results = mockThreads.filter(thread => 
    thread.title.toLowerCase().includes(query.toLowerCase()) ||
    thread.body.toLowerCase().includes(query.toLowerCase())
  );

  if (categoryId) {
    results = results.filter(thread => thread.category.id === categoryId);
  }

  switch (sortBy) {
    case 'oldest':
      results.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case 'popular':
      results.sort((a, b) => b.viewCount - a.viewCount);
      break;
    case 'replies':
      results.sort((a, b) => b.postCount - a.postCount);
      break;
    case 'latest':
    default:
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  return results;
};

export const getThreadById = (id: number): Thread | undefined => {
  return mockThreads.find(thread => thread.id === id);
};

export const getPostsByThreadId = (threadId: number): Post[] => {
  return mockPosts[threadId] || [];
};

export const getUserById = (id: number): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getThreadsByUserId = (userId: number): Thread[] => {
  return mockThreads.filter(thread => thread.user.id === userId);
};