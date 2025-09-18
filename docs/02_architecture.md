# Laravel学習用掲示板アプリ - アーキテクチャ設計書

## 1. システムアーキテクチャ概要

### 1.1 アーキテクチャパターン

```
MVCアーキテクチャ + サービス層
├── Model: データアクセスとビジネスルール
├── View: Bladeテンプレートによる表示
├── Controller: リクエスト処理とレスポンス
└── Service: 複雑なビジネスロジックの分離
```

### 1.2 技術スタック

```
Frontend:
├── Blade Template Engine
├── Tailwind CSS 3.x
├── Alpine.js 3.x
├── Vite 5.x
└── Axios (Ajax通信)

Backend:
├── Laravel 11.x
├── PHP 8.2+
├── Composer 2.x
└── Laravel Breeze (認証)

Infrastructure:
├── MySQL 8.0
├── Redis 7.x (将来実装)
├── Docker (Laravel Sail)
└── Nginx 1.24
```

### 1.3 レイヤードアーキテクチャ

```
┌─────────────────────────────────────┐
│   Presentation Layer (UI/UX)        │
│   - Blade Views                     │
│   - Vue Components (将来)           │
├─────────────────────────────────────┤
│   Application Layer                 │
│   - Controllers                     │
│   - Form Requests                   │
│   - Resources (API)                 │
├─────────────────────────────────────┤
│   Domain Layer                      │
│   - Services                        │
│   - Models (Eloquent)               │
│   - Policies                        │
├─────────────────────────────────────┤
│   Infrastructure Layer              │
│   - Repositories (将来)             │
│   - External Services               │
│   - Cache/Queue                     │
└─────────────────────────────────────┘
```

## 2. ディレクトリ構造

```
laravel-bbs/
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       └── CleanupOldThreads.php
│   ├── Events/
│   │   └── ThreadViewed.php
│   ├── Exceptions/
│   │   └── Handler.php
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   ├── Admin/
│   │   │   │   └── DashboardController.php
│   │   │   ├── ThreadController.php
│   │   │   ├── PostController.php
│   │   │   ├── ProfileController.php
│   │   │   └── SearchController.php
│   │   ├── Middleware/
│   │   │   ├── CheckBanned.php
│   │   │   └── TrackLastActivity.php
│   │   └── Requests/
│   │       ├── StoreThreadRequest.php
│   │       ├── UpdateThreadRequest.php
│   │       └── StorePostRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Thread.php
│   │   ├── Post.php
│   │   ├── Category.php
│   │   └── ThreadImage.php
│   ├── Policies/
│   │   ├── ThreadPolicy.php
│   │   └── PostPolicy.php
│   ├── Providers/
│   │   └── AppServiceProvider.php
│   └── Services/
│       ├── ThreadService.php
│       ├── PostService.php
│       ├── ImageService.php
│       └── SearchService.php
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── views/
│   │   ├── layouts/
│   │   ├── components/
│   │   ├── threads/
│   │   ├── posts/
│   │   └── auth/
│   ├── css/
│   └── js/
├── routes/
│   ├── web.php
│   ├── api.php
│   └── admin.php
└── tests/
    ├── Feature/
    └── Unit/
```

## 3. コンポーネント設計

### 3.1 主要コンポーネント

```yaml
認証システム:
  - Laravel Breeze
  - メール認証
  - パスワードリセット
  - Remember Me機能

スレッド管理:
  - CRUD操作
  - カテゴリー分類
  - 画像アップロード
  - Markdown処理

投稿管理:
  - レス投稿
  - 返信機能
  - 編集・削除
  - アンカー機能

検索システム:
  - 全文検索
  - カテゴリーフィルター
  - ソート機能
  - ページネーション
```

### 3.2 サービス層の設計

```php
// ThreadService.php
class ThreadService {
    public function createThread(array $data, ?array $images = null): Thread
    public function updateThread(Thread $thread, array $data): Thread
    public function deleteThread(Thread $thread): bool
    public function incrementViewCount(Thread $thread): void
}

// PostService.php
class PostService {
    public function createPost(Thread $thread, array $data): Post
    public function updatePost(Post $post, array $data): Post
    public function deletePost(Post $post): bool
    public function parseAnchors(string $content): string
}

// ImageService.php
class ImageService {
    public function upload(UploadedFile $file): string
    public function resize(string $path, int $width, int $height): void
    public function delete(string $path): bool
}
```

## 4. セキュリティアーキテクチャ

### 4.1 認証・認可

```php
// 認証フロー
Guest → Login → Authenticated User → Authorized Actions

// 認可ポリシー
- ThreadPolicy: create, update, delete, viewAny
- PostPolicy: create, update, delete
- AdminPolicy: accessDashboard, managePosts
```

### 4.2 セキュリティ対策

```yaml
CSRF Protection:
  - すべてのフォームで@csrfトークン使用

XSS Prevention:
  - Blade自動エスケープ
  - HTMLPurifierでのサニタイズ

SQL Injection:
  - Eloquent ORM使用
  - パラメータバインディング

Rate Limiting:
  - API: 60 requests/minute
  - Post: 5 posts/minute
  - Login: 5 attempts/minute
```

## 5. パフォーマンス設計

### 5.1 キャッシュ戦略

```php
// キャッシュレベル
Database Query Cache → Redis Cache → HTTP Cache

// キャッシュ対象
- カテゴリーリスト: 永続キャッシュ
- 人気スレッド: 1時間
- ユーザープロフィール: 30分
- 検索結果: 10分
```

### 5.2 最適化手法

```yaml
Database:
  - Eager Loading (N+1問題回避)
  - インデックス設計
  - クエリ最適化

Asset:
  - Viteによるバンドル
  - 画像の遅延読み込み
  - CDN利用（将来）

Application:
  - OPcacheの有効化
  - Composerオートロード最適化
```