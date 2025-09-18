import React, { useState } from 'react';
import { Edit, Settings, MapPin, Calendar, MessageSquare, Eye, User as UserIcon } from 'lucide-react';
import ThreadList from '../thread/ThreadList';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  threadCount: number;
  postCount: number;
  createdAt: string;
  lastActivityAt: string;
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

interface ProfilePageProps {
  user: User;
  threads: Thread[];
  currentUser?: User;
  isOwnProfile: boolean;
  onEditProfile: () => void;
  onThreadClick: (threadId: number) => void;
  loading: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  threads,
  currentUser,
  isOwnProfile,
  onEditProfile,
  onThreadClick,
  loading
}) => {
  const [activeTab, setActiveTab] = useState<'threads' | 'posts' | 'bookmarks'>('threads');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
      return `${minutes}分前にアクティブ`;
    } else if (hours < 24) {
      return `${hours}時間前にアクティブ`;
    } else if (days < 7) {
      return `${days}日前にアクティブ`;
    } else {
      return formatDate(dateString);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        {/* Profile Info */}
        <div className="px-6 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
                src={user.avatar}
                alt={user.name}
              />
              {isOwnProfile && (
                <button
                  onClick={onEditProfile}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md"
                  title="プロフィール編集"
                >
                  <Edit size={14} />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatLastActivity(user.lastActivityAt)}
                  </p>
                </div>
                {isOwnProfile && (
                  <div className="mt-4 sm:mt-0 flex space-x-3">
                    <button
                      onClick={onEditProfile}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit size={16} className="mr-2" />
                      プロフィール編集
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <Settings size={16} className="mr-2" />
                      設定
                    </button>
                  </div>
                )}
              </div>
              
              {user.bio && (
                <p className="text-gray-700 mt-4 max-w-2xl">{user.bio}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {formatDate(user.createdAt)}に参加
                </div>
                {user.website && (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {user.website}
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.threadCount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">スレッド</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.postCount.toLocaleString()}</div>
              <div className="text-sm text-gray-500">投稿</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {(user.threadCount + user.postCount).toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">総活動</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('threads')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'threads'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-2" />
                スレッド ({user.threadCount})
              </div>
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'posts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <UserIcon size={16} className="mr-2" />
                投稿 ({user.postCount})
              </div>
            </button>
            {isOwnProfile && (
              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'bookmarks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                ブックマーク
              </button>
            )}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'threads' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isOwnProfile ? '作成したスレッド' : `${user.name}さんのスレッド`}
              </h2>
              <ThreadList 
                threads={threads} 
                loading={loading} 
                onThreadClick={onThreadClick}
              />
            </div>
          )}
          
          {activeTab === 'posts' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {isOwnProfile ? '投稿履歴' : `${user.name}さんの投稿`}
              </h2>
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">投稿履歴</div>
                <div className="text-gray-400 text-sm">この機能は開発中です</div>
              </div>
            </div>
          )}
          
          {activeTab === 'bookmarks' && isOwnProfile && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">ブックマーク</h2>
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">ブックマーク機能</div>
                <div className="text-gray-400 text-sm">この機能は将来実装予定です</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;