# Laravel学習用掲示板アプリ - API設計書

## 1. API概要

### 1.1 基本仕様

- **ベースURL**: `https://api.example.com/v1`
- **認証方式**: Laravel Sanctum (Bearer Token)
- **レスポンス形式**: JSON
- **文字エンコーディング**: UTF-8
- **HTTPメソッド**: GET, POST, PUT, PATCH, DELETE

### 1.2 共通ヘッダー

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-Requested-With: XMLHttpRequest
```

## 2. エンドポイント一覧

### 2.1 認証 API

#### ログイン

```http
POST /auth/login
```

```json
// Request
{
    "email": "user@example.com",
    "password": "password123"
}

// Response 200
{
    "user": {
        "id": 1,
        "name": "山田太郎",
        "email": "user@example.com"
    },
    "token": "1|dK3vm5L9Xfde3F...",
    "token_type": "Bearer"
}
```

#### ログアウト

```http
POST /auth/logout
```

```json
// Response 200
{
    "message": "ログアウトしました"
}
```

#### ユーザー登録

```http
POST /auth/register
```

```json
// Request
{
    "name": "山田太郎",
    "email": "user@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}

// Response 201
{
    "user": {
        "id": 1,
        "name": "山田太郎",
        "email": "user@example.com"
    },
    "token": "1|dK3vm5L9Xfde3F...",
    "message": "登録が完了しました"
}
```

### 2.2 スレッド API

#### スレッド一覧取得

```http
GET /threads?page=1&per_page=20&category=tech&sort=latest
```

```json
// Response 200
{
    "data": [
        {
            "id": 1,
            "title": "Laravelの学習方法について",
            "body": "効率的な学習方法を...",
            "view_count": 150,
            "post_count": 23,
            "is_pinned": false,
            "is_locked": false,
            "category": {
                "id": 1,
                "name": "技術",
                "slug": "tech"
            },
            "user": {
                "id": 1,
                "name": "山田太郎",
                "avatar": "/avatars/user1.jpg"
            },
            "last_post": {
                "id": 45,
                "content": "最新のコメント...",
                "created_at": "2024-01-15T10:30:00Z"
            },
            "created_at": "2024-01-10T09:00:00Z",
            "updated_at": "2024-01-15T10:30:00Z"
        }
    ],
    "links": {
        "first": "/threads?page=1",
        "last": "/threads?page=10",
        "prev": null,
        "next": "/threads?page=2"
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 10,
        "path": "/threads",
        "per_page": 20,
        "to": 20,
        "total": 200
    }
}
```

#### スレッド詳細取得

```http
GET /threads/{id}
```

```json
// Response 200
{
    "data": {
        "id": 1,
        "title": "Laravelの学習方法について",
        "body": "効率的な学習方法を教えてください...",
        "view_count": 151,
        "post_count": 23,
        "is_pinned": false,
        "is_locked": false,
        "category": {
            "id": 1,
            "name": "技術",
            "slug": "tech"
        },
        "user": {
            "id": 1,
            "name": "山田太郎",
            "avatar": "/avatars/user1.jpg"
        },
        "images": [
            {
                "id": 1,
                "path": "/images/thread1_1.jpg",
                "filename": "screenshot.jpg"
            }
        ],
        "created_at": "2024-01-10T09:00:00Z",
        "updated_at": "2024-01-15T10:30:00Z"
    }
}
```

#### スレッド作成

```http
POST /threads
```

```json
// Request (multipart/form-data)
{
    "title": "新しいスレッドタイトル",
    "body": "スレッドの本文...",
    "category_id": 1,
    "images[]": [File, File, File]
}

// Response 201
{
    "data": {
        "id": 2,
        "title": "新しいスレッドタイトル",
        "body": "スレッドの本文...",
        // ...
    },
    "message": "スレッドを作成しました"
}
```

#### スレッド更新

```http
PUT /threads/{id}
```

```json
// Request
{
    "title": "更新後のタイトル",
    "body": "更新後の本文...",
    "category_id": 2
}

// Response 200
{
    "data": {
        "id": 1,
        "title": "更新後のタイトル",
        // ...
    },
    "message": "スレッドを更新しました"
}
```

#### スレッド削除

```http
DELETE /threads/{id}
```

```json
// Response 200
{
    "message": "スレッドを削除しました"
}
```

### 2.3 投稿 API

#### 投稿一覧取得

```http
GET /threads/{thread_id}/posts?page=1&per_page=20
```

```json
// Response 200
{
    "data": [
        {
            "id": 1,
            "content": "コメント内容...",
            "is_edited": false,
            "reply_to": {
                "id": 5,
                "content": "返信先の内容..."
            },
            "user": {
                "id": 2,
                "name": "鈴木花子",
                "avatar": "/avatars/user2.jpg"
            },
            "created_at": "2024-01-10T10:00:00Z",
            "updated_at": "2024-01-10T10:00:00Z"
        }
    ],
    "meta": {
        "current_page": 1,
        "total": 23
    }
}
```

#### 投稿作成

```http
POST /threads/{thread_id}/posts
```

```json
// Request
{
    "content": "新しいコメント...",
    "reply_to_id": null
}

// Response 201
{
    "data": {
        "id": 24,
        "content": "新しいコメント...",
        // ...
    },
    "message": "投稿しました"
}
```

#### 投稿更新

```http
PATCH /posts/{id}
```

```json
// Request
{
    "content": "更新後のコメント..."
}

// Response 200
{
    "data": {
        "id": 1,
        "content": "更新後のコメント...",
        "is_edited": true,
        "edited_at": "2024-01-10T11:00:00Z",
        // ...
    },
    "message": "投稿を更新しました"
}
```

#### 投稿削除

```http
DELETE /posts/{id}
```

```json
// Response 200
{
    "message": "投稿を削除しました"
}
```

### 2.4 検索 API

#### スレッド検索

```http
GET /search/threads?q=Laravel&category=tech&sort=relevance
```

```json
// Response 200
{
    "data": [
        {
            "id": 1,
            "title": "Laravelの学習方法について",
            "body": "効率的な学習方法を...",
            "highlight": {
                "title": "<mark>Laravel</mark>の学習方法について",
                "body": "効率的な<mark>Laravel</mark>学習方法を..."
            },
            // ...
        }
    ],
    "meta": {
        "query": "Laravel",
        "total": 15,
        "took": 0.023
    }
}
```

### 2.5 ユーザー API

#### プロフィール取得

```http
GET /users/{id}
```

```json
// Response 200
{
    "data": {
        "id": 1,
        "name": "山田太郎",
        "avatar": "/avatars/user1.jpg",
        "bio": "プログラミング初心者です",
        "thread_count": 5,
        "post_count": 123,
        "created_at": "2024-01-01T00:00:00Z"
    }
}
```

#### プロフィール更新

```http
PATCH /users/{id}
```

```json
// Request (multipart/form-data)
{
    "name": "山田太郎",
    "bio": "Laravel勉強中です",
    "avatar": File
}

// Response 200
{
    "data": {
        "id": 1,
        "name": "山田太郎",
        // ...
    },
    "message": "プロフィールを更新しました"
}
```

## 3. エラーレスポンス

### 3.1 エラー形式

```json
{
    "message": "エラーメッセージ",
    "errors": {
        "field_name": [
            "検証エラーメッセージ1",
            "検証エラーメッセージ2"
        ]
    }
}
```

### 3.2 HTTPステータスコード

```yaml
200 OK: 正常処理
201 Created: リソース作成成功
204 No Content: 削除成功
400 Bad Request: リクエスト不正
401 Unauthorized: 認証エラー
403 Forbidden: 権限エラー
404 Not Found: リソースが見つからない
422 Unprocessable Entity: バリデーションエラー
429 Too Many Requests: レート制限
500 Internal Server Error: サーバーエラー
```

## 4. レート制限

```yaml
認証エンドポイント:
  - 5 requests / minute

一般API:
  - 60 requests / minute

投稿作成:
  - 5 requests / minute
```