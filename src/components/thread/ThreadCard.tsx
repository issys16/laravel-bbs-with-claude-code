import React from 'react';
import { Eye, MessageSquare, Clock, User, Pin, Lock } from 'lucide-react';
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
  createdAt: string;
  updatedAt: string;
  lastPost?: {
    id: number;
    content: string;
    user: User;
    createdAt: string;
  };
}

interface ThreadCardProps {
  thread: Thread;
  onClick: (threadId: number) => void;
}

const ThreadCard: React.FC<ThreadCardProps> = ({ thread, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes}分前`;
    } else if (hours < 24) {
      return `${hours}時間前`;
    } else if (days < 7) {
      return `${days}日前`;
    } else {
      return date.toLocaleDateString('ja-JP');
    }
  };

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={() => onClick(thread.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1">
          <CategoryBadge category={thread.category} size="sm" />
          {thread.isPinned && (
            <div className="flex items-center text-orange-600">
              <Pin size={14} />
              <span className="text-xs ml-1">ピン留め</span>
            </div>
          )}
          {thread.isLocked && (
            <div className="flex items-center text-gray-500">
              <Lock size={14} />
              <span className="text-xs ml-1">ロック済み</span>
            </div>
          )}
        </div>
        <time className="text-xs text-gray-500 flex-shrink-0">
          {formatDate(thread.createdAt)}
        </time>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {thread.title}
      </h3>

      {/* Body preview */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {thread.body}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img
              src={thread.user.avatar}
              alt={thread.user.name}
              className="w-5 h-5 rounded-full mr-2"
            />
            <span>{thread.user.name}</span>
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

        {thread.lastPost && (
          <div className="flex items-center text-xs">
            <Clock size={14} className="mr-1" />
            <span>最新: {formatDate(thread.lastPost.createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadCard;