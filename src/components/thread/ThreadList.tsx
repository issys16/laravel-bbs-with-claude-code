import React from 'react';
import ThreadCard from './ThreadCard';
import LoadingSpinner from '../common/LoadingSpinner';

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

interface ThreadListProps {
  threads: Thread[];
  loading: boolean;
  onThreadClick: (threadId: number) => void;
}

const ThreadList: React.FC<ThreadListProps> = ({ threads, loading, onThreadClick }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-3/4 h-6 bg-gray-200 rounded mb-2"></div>
            <div className="space-y-2 mb-4">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gray-200 rounded-full mr-2"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">スレッドが見つかりません</div>
        <div className="text-gray-400 text-sm">条件を変更して再度検索してください</div>
      </div>
    );
  }

  // ピン留めスレッドを最初に表示
  const pinnedThreads = threads.filter(thread => thread.isPinned);
  const regularThreads = threads.filter(thread => !thread.isPinned);

  return (
    <div className="space-y-4">
      {pinnedThreads.map(thread => (
        <ThreadCard
          key={thread.id}
          thread={thread}
          onClick={onThreadClick}
        />
      ))}
      {regularThreads.map(thread => (
        <ThreadCard
          key={thread.id}
          thread={thread}
          onClick={onThreadClick}
        />
      ))}
    </div>
  );
};

export default ThreadList;