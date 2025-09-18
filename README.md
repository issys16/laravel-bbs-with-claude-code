# Laravel学習用掲示板アプリ

Laravelの主要機能を実践的に学習するための掲示板アプリケーションです。基本的なCRUD操作から認証、ファイルアップロード、リアルタイム通知まで、段階的に機能を実装していきます。

## 概要

このプロジェクトは、Laravel初学者から中級者向けの学習用アプリケーションです。実際の掲示板サービスに必要な機能を一通り実装することで、Laravelの実践的な使い方を習得できます。

### 主な学習ポイント

- Eloquent ORM によるデータベース操作
- Laravel Breeze を使った認証システム
- ファイルアップロードと画像処理
- フォームバリデーション
- ミドルウェアによるアクセス制御
- Blade テンプレートエンジン
- サービス層の実装パターン

## 機能一覧

### 実装済み機能 (MVP)

- [ ] ユーザー認証（登録、ログイン、パスワードリセット）
- [ ] スレッド投稿機能
- [ ] レス投稿・返信機能
- [ ] カテゴリー管理
- [ ] 画像アップロード（最大3枚/スレッド）
- [ ] Markdown対応
- [ ] 検索・フィルタリング機能
- [ ] ページネーション

### 今後実装予定

- [ ] リアルタイム通知（Laravel Echo + Pusher）
- [ ] いいね・ブックマーク機能
- [ ] 管理者ダッシュボード
- [ ] RESTful API（Laravel Sanctum）
- [ ] キャッシュ最適化（Redis）
- [ ] テストコード（PHPUnit, Laravel Dusk）

## 技術スタック

- **Backend**: Laravel 11.x, PHP 8.2+
- **Frontend**: Blade, Alpine.js 3.x, Tailwind CSS 3.x
- **Build Tool**: Vite 5.x
- **Database**: MySQL 8.0
- **Container**: Docker (Laravel Sail)
- **Cache**: Redis 7.x（将来実装）

## セットアップ

### 必要な環境

- Docker Desktop
- Git

### インストール手順

1. リポジトリのクローン
```bash
git clone https://github.com/issys16/laravel-bbs-with-claude-code.git
cd laravel-bbs-with-claude-code
```

2. 環境変数の設定
```bash
cp .env.example .env
```

3. Sailのインストール
```bash
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```

4. Sailの起動
```bash
./vendor/bin/sail up -d
```

5. アプリケーションキーの生成
```bash
./vendor/bin/sail artisan key:generate
```

6. データベースのマイグレーション
```bash
./vendor/bin/sail artisan migrate
```

7. 初期データの投入
```bash
./vendor/bin/sail artisan db:seed
```

8. ストレージのリンク作成
```bash
./vendor/bin/sail artisan storage:link
```

9. フロントエンドのビルド
```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

### アクセス

- アプリケーション: http://localhost
- phpMyAdmin: http://localhost:8080
- MailHog: http://localhost:8025

## 開発

### 開発サーバーの起動

```bash
# Sailコンテナの起動
./vendor/bin/sail up -d

# Vite開発サーバーの起動（別ターミナル）
./vendor/bin/sail npm run dev
```

### よく使うコマンド

```bash
# Artisanコマンド
./vendor/bin/sail artisan make:model ModelName -mfsc
./vendor/bin/sail artisan make:controller ControllerName --resource

# マイグレーション
./vendor/bin/sail artisan migrate
./vendor/bin/sail artisan migrate:rollback
./vendor/bin/sail artisan migrate:fresh --seed

# キャッシュクリア
./vendor/bin/sail artisan optimize:clear

# テスト実行
./vendor/bin/sail test

# コード整形
./vendor/bin/sail vendor/bin/pint
```

### ディレクトリ構造

```
.
├── app/
│   ├── Http/
│   │   ├── Controllers/    # コントローラー
│   │   ├── Middleware/     # ミドルウェア
│   │   └── Requests/       # フォームリクエスト
│   ├── Models/             # Eloquentモデル
│   ├── Policies/           # 認可ポリシー
│   └── Services/           # サービスクラス
├── database/
│   ├── migrations/         # マイグレーション
│   └── seeders/           # シーダー
├── resources/
│   └── views/             # Bladeテンプレート
├── routes/                # ルート定義
├── tests/                 # テストコード
└── docs/                  # プロジェクトドキュメント
```

## データベース設計

主要なテーブル構造については、[データベース設計書](docs/03_database.md)を参照してください。

### 主要モデル

- **User**: ユーザー情報
- **Thread**: スレッド（掲示板のトピック）
- **Post**: 投稿（スレッドへのレス）
- **Category**: カテゴリー
- **ThreadImage**: スレッドに添付された画像

## API仕様

RESTful APIの詳細については、[API設計書](docs/04_api.md)を参照してください。

## 開発ガイドライン

### コーディング規約

- PHP: PSR-12 準拠
- JavaScript: ES6+
- Git: [Conventional Commits](https://www.conventionalcommits.org/)

詳細は [CLAUDE.md](CLAUDE.md) を参照してください。

### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 新機能開発
- `hotfix/*`: 緊急修正

### プルリクエスト

1. `feature/*` ブランチで開発
2. `develop` ブランチへPR作成
3. コードレビュー実施
4. テスト通過後マージ

## トラブルシューティング

### Sailが起動しない

```bash
# Dockerが起動しているか確認
docker ps

# 既存のコンテナを停止
./vendor/bin/sail down

# ボリュームも含めて削除
./vendor/bin/sail down -v
```

### データベース接続エラー

`.env` ファイルの以下の設定を確認：

```
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel_bbs
DB_USERNAME=sail
DB_PASSWORD=password
```

### その他の問題

[Issues](https://github.com/issys16/laravel-bbs-with-claude-code/issues) で報告してください。

## ライセンス

このプロジェクトは学習目的で作成されています。

## 作成者

- GitHub: [@issys16](https://github.com/issys16)

## 参考資料

- [Laravel 11.x ドキュメント](https://laravel.com/docs/11.x)
- [Laravel Sail ドキュメント](https://laravel.com/docs/11.x/sail)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Alpine.js ドキュメント](https://alpinejs.dev/)
