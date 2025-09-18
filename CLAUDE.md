# Claude Code プロジェクトルール

このファイルは、Claude Code がこのプロジェクトで作業する際に従うべきルールと設定をまとめたものです。

## 基本設定

### 言語設定
- **回答言語**: 日本語で回答すること（コード内のコメントを除く）
- **コミュニケーション**: 簡潔で明確な日本語を使用
- **技術用語**: 必要に応じて英語の技術用語を併記

### プロジェクト概要
- **プロジェクト名**: Laravel学習用掲示板アプリ
- **フレームワーク**: Laravel 11.x
- **開発環境**: Laravel Sail (Docker)
- **認証**: Laravel Breeze

## コーディングスタイル

### PHPコーディング規約
- **スタイル**: PSR-12 に準拠
- **命名規則**:
  - クラス名: PascalCase（例: `ThreadController`）
  - メソッド名: camelCase（例: `createThread`）
  - 変数名: camelCase（例: `$threadData`）
  - 定数: UPPER_SNAKE_CASE（例: `MAX_UPLOAD_SIZE`）
- **インデント**: スペース4つ
- **最大行長**: 120文字

### Bladeテンプレート
- **ディレクティブ**: Laravel標準のBladeディレクティブを使用
- **コンポーネント**: 再利用可能な部分は `@component` や `<x-component>` を活用
- **エスケープ**: XSS対策のため、必ず `{{ }}` を使用（生HTMLが必要な場合のみ `{!! !!}`）

### JavaScript/CSS
- **フレームワーク**: Alpine.js 3.x + Tailwind CSS 3.x
- **ビルドツール**: Vite
- **命名規則**: BEM記法は使わず、Tailwindのユーティリティクラスを優先

## Git コミットメッセージ

### フォーマット
```
<type>: <subject>

<body>

<footer>
```

### type の種類
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメントのみの変更
- `style`: コードの動作に影響しないスタイル修正
- `refactor`: リファクタリング
- `perf`: パフォーマンス改善
- `test`: テストの追加・修正
- `chore`: ビルドツールや補助ツールの変更

### 例
```
feat: スレッドへの画像アップロード機能を追加

- 最大3枚まで画像をアップロード可能
- 画像は自動的にリサイズされる
- サポート形式: JPEG, PNG, GIF

closes #123
```

## データベース設計

### マイグレーション
- **命名**: `yyyy_mm_dd_hhmmss_動詞_テーブル名_table.php`
- **外部キー**: 必ず制約を設定（CASCADE or RESTRICT）
- **インデックス**: 検索・ソートで使用するカラムには必ず設定

### モデル
- **リレーション**: Eloquentの規約に従う
- **スコープ**: 頻繁に使用するクエリはローカルスコープで定義
- **アクセサ/ミューテタ**: Laravel 11.x の新しい記法を使用

## セキュリティ

### 必須対策
- **CSRF**: すべてのフォームで `@csrf` を使用
- **XSS**: ユーザー入力は必ずエスケープ
- **SQLインジェクション**: Eloquent ORM とパラメータバインディングを使用
- **認可**: Policy クラスで権限管理
- **バリデーション**: Form Request クラスで入力検証

### アップロード
- **画像検証**: MIME タイプとファイルサイズを必ず確認
- **保存場所**: `storage/app/public` を使用
- **ファイル名**: ユニークなファイル名に変更（UUID推奨）

## テスト

### テスト方針
- **単体テスト**: Service層のビジネスロジックを中心に
- **機能テスト**: Controller の主要なエンドポイント
- **命名**: `test_動作_条件_結果` の形式

### 実行コマンド
```bash
# 全テスト実行
./vendor/bin/phpunit

# 特定のテストのみ
./vendor/bin/phpunit --filter ThreadTest
```

## パフォーマンス

### 必須対応
- **N+1問題**: Eager Loading を使用（`with()` メソッド）
- **キャッシュ**: 頻繁にアクセスされるデータはキャッシュ化
- **ページネーション**: 大量データは必ずページネーション
- **画像最適化**: アップロード時にリサイズ処理

## 開発フロー

### 新機能追加時
1. 要件の確認（`docs/01_requirements.md` を参照）
2. アーキテクチャ設計の確認（`docs/02_architecture.md` を参照）
3. マイグレーション作成
4. モデル・リレーション設定
5. Service層の実装
6. Controller実装
7. View作成
8. テスト作成
9. 動作確認

### コードレビュー観点
- [ ] PSR-12 準拠
- [ ] セキュリティ対策の実施
- [ ] テストの作成
- [ ] パフォーマンスの考慮
- [ ] エラーハンドリング
- [ ] ログ出力

## よく使うコマンド

```bash
# Sailの起動
./vendor/bin/sail up -d

# マイグレーション実行
./vendor/bin/sail artisan migrate

# キャッシュクリア
./vendor/bin/sail artisan cache:clear
./vendor/bin/sail artisan config:clear
./vendor/bin/sail artisan route:clear
./vendor/bin/sail artisan view:clear

# テスト実行
./vendor/bin/sail test

# コード整形チェック
./vendor/bin/pint --test

# コード整形実行
./vendor/bin/pint
```

## 注意事項

- **冗長なコード**: DRY原則を守り、重複コードは避ける
- **過度な抽象化**: YAGNI原則に従い、現時点で必要な機能のみ実装
- **コメント**: 「なぜ」そうしたかを説明（「何を」は避ける）
- **マジックナンバー**: 定数化またはconfigで管理
- **エラーハンドリング**: try-catch で適切に処理し、ユーザーに分かりやすいメッセージを表示

## 参考資料

- [Laravel 11.x ドキュメント](https://laravel.com/docs/11.x)
- [PSR-12 コーディングスタイル](https://www.php-fig.org/psr/psr-12/)
- プロジェクト設計書: `/docs` ディレクトリ参照