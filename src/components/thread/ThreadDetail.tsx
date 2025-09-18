import React, { useState } from 'react';
import { Eye, MessageSquare, Clock, User, Edit, Trash2, Reply, Share2 } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface Image {
  id: number;
  path: string;
  filename: string;
}

interface Thread {
  id: number;
  title: string;
  body: string;
  viewCount: number;
  postCount: number;
  isPinned: boolean;
  isLocked: boolean;
  category: Category;
  user: User;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: number;
  content: string;
  user: User;
  replyTo?: {
    id: number;
    content: string;
    user: User;
  };
  isEdited: boolean;
  editedAt?: string;
  createdAt: string;
}

interface ThreadDetailProps {
  thread: Thread;
  posts: Post[];
  currentUser?: User;
  onReply: (content: string, replyToId?: number) => void;
  onEdit: (postId: number, content: string) => void;
  onDelete: (postId: number) => void;
  onBack: () => void;
}

const ThreadDetail: React.FC<ThreadDetailProps> = ({
  thread,
  posts,
  currentUser,
  onReply,
  onEdit,
  onDelete,
  onBack
}) => {
  const [replyContent, setReplyContent] = useState('');
  const [replyToPost, setReplyToPost] = useState<number | undefined>(undefined);
  const [editingPost, setEditingPost] = useState<number | undefined>(undefined);
  const [editContent, setEditContent] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP');
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(replyContent, replyToPost);
      setReplyContent('');
      setReplyToPost(undefined);
    }
  };

  const handleEditSubmit = (postId: number) => {
    if (editContent.trim()) {
      onEdit(postId, editContent);
      setEditingPost(undefined);
      setEditContent('');
    }
  };

  const startEdit = (post: Post) => {
    setEditingPost(post.id);
    setEditContent(post.content);
  };

  const startReply = (postId: number) => {
    setReplyToPost(postId);
    const textarea = document.getElementById('reply-textarea');
    if (textarea) {
      textarea.focus();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Thread Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 flex items-center"
        >
          ← スレッド一覧に戻る
        </button>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CategoryBadge category={thread.category} />
            {thread.isPinned && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                ピン留め
              </span>
            )}
            {thread.isLocked && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                ロック済み
              </span>
            )}
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Share2 size={20} />
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">{thread.title}</h1>

        <div className="prose max-w-none mb-6">
          <p className="whitespace-pre-wrap">{thread.body}</p>
        </div>

        {thread.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {thread.images.map((image) => (
              <img
                key={image.id}
                src={image.path}
                alt={image.filename}
                className="rounded-lg object-cover w-full h-48 hover:shadow-lg transition-shadow cursor-pointer"
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src={thread.user.avatar}
                alt={thread.user.name}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="font-medium">{thread.user.name}</span>
            </div>
            <div className="flex items-center">
              <Eye size={16} className="mr-1" />
              <span>{thread.viewCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="mr-1" />
              <span>{thread.postCount}</span>
            </div>
          </div>
          <time>{formatDate(thread.createdAt)}</time>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{post.user.name}</div>
                  <div className="text-xs text-gray-500">
                    #{index + 1} - {formatDate(post.createdAt)}
                    {post.isEdited && post.editedAt && (
                      <span className="ml-2">(編集済み: {formatDate(post.editedAt)})</span>
                    )}
                  </div>
                </div>
              </div>
              {currentUser && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => startReply(post.id)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                    title="返信"
                  >
                    <Reply size={16} />
                  </button>
                  {currentUser.id === post.user.id && (
                    <>
                      <button
                        onClick={() => startEdit(post)}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        title="編集"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(post.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="削除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {post.replyTo && (
              <div className="bg-gray-50 border-l-4 border-blue-300 p-3 mb-4">
                <div className="text-xs text-gray-600 mb-1">
                  {post.replyTo.user.name} への返信
                </div>
                <div className="text-sm text-gray-700 line-clamp-2">
                  {post.replyTo.content}
                </div>
              </div>
            )}

            {editingPost === post.id ? (
              <div className="space-y-3">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditSubmit(post.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    更新
                  </button>
                  <button
                    onClick={() => setEditingPost(undefined)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="whitespace-pre-wrap">{post.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reply Form */}
      {currentUser && !thread.isLocked && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">
            {replyToPost ? `#${posts.findIndex(p => p.id === replyToPost) + 1} への返信` : '返信する'}
          </h3>
          {replyToPost && (
            <div className="mb-4">
              <button
                onClick={() => setReplyToPost(undefined)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                返信をキャンセル
              </button>
            </div>
          )}
          <form onSubmit={handleReplySubmit}>
            <textarea
              id="reply-textarea"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="投稿内容を入力してください..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              rows={5}
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                投稿する
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ThreadDetail;