import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThreadList from './components/thread/ThreadList';
import ThreadDetail from './components/thread/ThreadDetail';
import CreateThreadForm from './components/thread/CreateThreadForm';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import SearchPage from './components/search/SearchPage';
import ProfilePage from './components/user/ProfilePage';
import CategoryBadge from './components/common/CategoryBadge';
import LoadingSpinner from './components/common/LoadingSpinner';
import {
  mockThreads,
  mockCategories,
  mockUsers,
  mockPosts,
  getCurrentUser,
  getThreadsByCategory,
  searchThreads,
  getThreadById,
  getPostsByThreadId,
  getUserById,
  getThreadsByUserId,
  type User,
  type Thread,
  type Category,
  type Post
} from './mockData';

type Page = 
  | 'home' 
  | 'threads' 
  | 'thread-detail' 
  | 'create-thread' 
  | 'login' 
  | 'register' 
  | 'search' 
  | 'profile' 
  | 'category';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [selectedThreadId, setSelectedThreadId] = useState<number | undefined>(undefined);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [threads, setThreads] = useState<Thread[]>(mockThreads);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentUser(getCurrentUser());
    setCurrentPage('home');
    setLoading(false);
  };

  const handleRegister = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentUser(getCurrentUser());
    setCurrentPage('home');
    setLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(undefined);
    setCurrentPage('home');
  };

  const handleThreadClick = (threadId: number) => {
    setSelectedThreadId(threadId);
    setCurrentPage('thread-detail');
  };

  const handleCreateThread = () => {
    if (!currentUser) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage('create-thread');
  };

  const handleCreateThreadSubmit = async (data: {
    title: string;
    body: string;
    categoryId: number;
    images: File[];
  }) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentPage('threads');
    setLoading(false);
  };

  const handleSearch = async (query: string, categoryId?: number, sortBy?: string) => {
    setSearchQuery(query);
    const results = searchThreads(query, categoryId, sortBy);
    return results;
  };

  const handleSearchFromHeader = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const handleCategoryClick = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    setCurrentPage('category');
  };

  const handleReply = async (content: string, replyToId?: number) => {
    // Simulate API call
    console.log('Reply:', content, 'Reply to:', replyToId);
  };

  const handleEdit = async (postId: number, content: string) => {
    // Simulate API call
    console.log('Edit post:', postId, 'New content:', content);
  };

  const handleDelete = async (postId: number) => {
    // Simulate API call
    console.log('Delete post:', postId);
  };

  const handleProfileClick = (userId: number) => {
    setSelectedUserId(userId);
    setCurrentPage('profile');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="text-blue-600">Laravel</span> 学習コミュニティ
                  </h1>
                  <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Laravel開発者のための掲示板サイト。技術的な質問から開発日記まで、
                    みんなで知識を共有しましょう。
                  </p>
                  <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    {!currentUser ? (
                      <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex">
                        <button
                          onClick={() => setCurrentPage('register')}
                          className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          今すぐ参加
                        </button>
                        <button
                          onClick={() => setCurrentPage('threads')}
                          className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                        >
                          スレッドを見る
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 sm:space-y-0 sm:space-x-3 sm:flex">
                        <button
                          onClick={handleCreateThread}
                          className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          スレッドを作成
                        </button>
                        <button
                          onClick={() => setCurrentPage('threads')}
                          className="w-full sm:w-auto flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                        >
                          スレッド一覧
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">最新のスレッド</h2>
                    <ThreadList 
                      threads={threads.slice(0, 5)} 
                      loading={false} 
                      onThreadClick={handleThreadClick}
                    />
                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setCurrentPage('threads')}
                        className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        すべてのスレッドを見る
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="space-y-8">
                    {/* Categories */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">カテゴリー</h3>
                      <div className="space-y-3">
                        {mockCategories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.slug)}
                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <CategoryBadge category={category} clickable={false} />
                            <span className="text-sm text-gray-500">
                              {threads.filter(t => t.category.id === category.id).length}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">統計情報</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">総スレッド数</span>
                          <span className="font-semibold text-gray-900">{threads.length.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">総投稿数</span>
                          <span className="font-semibold text-gray-900">
                            {Object.values(mockPosts).flat().length.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">登録ユーザー数</span>
                          <span className="font-semibold text-gray-900">{mockUsers.length.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Popular Threads */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">人気のスレッド</h3>
                      <div className="space-y-3">
                        {threads
                          .sort((a, b) => b.viewCount - a.viewCount)
                          .slice(0, 5)
                          .map((thread) => (
                          <button
                            key={thread.id}
                            onClick={() => handleThreadClick(thread.id)}
                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                              {thread.title}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <span>{thread.viewCount.toLocaleString()} 閲覧</span>
                              <span className="mx-1">•</span>
                              <span>{thread.postCount} 投稿</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'threads':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">スレッド一覧</h1>
                {currentUser && (
                  <button
                    onClick={handleCreateThread}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    新しいスレッド
                  </button>
                )}
              </div>
              <ThreadList 
                threads={threads} 
                loading={loading} 
                onThreadClick={handleThreadClick}
              />
            </div>
          </div>
        );

      case 'thread-detail':
        const thread = selectedThreadId ? getThreadById(selectedThreadId) : undefined;
        const posts = selectedThreadId ? getPostsByThreadId(selectedThreadId) : [];
        
        if (!thread) {
          return <div>スレッドが見つかりません</div>;
        }

        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <ThreadDetail
              thread={thread}
              posts={posts}
              currentUser={currentUser}
              onReply={handleReply}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onBack={() => setCurrentPage('threads')}
            />
          </div>
        );

      case 'create-thread':
        return (
          <div className="min-h-screen bg-gray-50 py-8">
            <CreateThreadForm
              categories={mockCategories}
              onSubmit={handleCreateThreadSubmit}
              onCancel={() => setCurrentPage('threads')}
              loading={loading}
            />
          </div>
        );

      case 'login':
        return (
          <LoginForm
            onSubmit={handleLogin}
            onRegisterClick={() => setCurrentPage('register')}
            onForgotPasswordClick={() => console.log('Forgot password')}
            loading={loading}
          />
        );

      case 'register':
        return (
          <RegisterForm
            onSubmit={handleRegister}
            onLoginClick={() => setCurrentPage('login')}
            loading={loading}
          />
        );

      case 'search':
        return (
          <SearchPage
            categories={mockCategories}
            onSearch={handleSearch}
            onThreadClick={handleThreadClick}
            initialQuery={searchQuery}
          />
        );

      case 'profile':
        const user = selectedUserId ? getUserById(selectedUserId) : currentUser;
        const userThreads = user ? getThreadsByUserId(user.id) : [];
        
        if (!user) {
          return <div>ユーザーが見つかりません</div>;
        }

        return (
          <ProfilePage
            user={user}
            threads={userThreads}
            currentUser={currentUser}
            isOwnProfile={currentUser?.id === user.id}
            onEditProfile={() => console.log('Edit profile')}
            onThreadClick={handleThreadClick}
            loading={loading}
          />
        );

      case 'category':
        const categoryThreads = selectedCategory ? getThreadsByCategory(selectedCategory) : [];
        const category = mockCategories.find(c => c.slug === selectedCategory);
        
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {category ? category.name : 'カテゴリー'}
                  </h1>
                  {category && <CategoryBadge category={category} />}
                </div>
                {currentUser && (
                  <button
                    onClick={handleCreateThread}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    新しいスレッド
                  </button>
                )}
              </div>
              {category?.description && (
                <p className="text-gray-600 mb-6">{category.description}</p>
              )}
              <ThreadList 
                threads={categoryThreads} 
                loading={loading} 
                onThreadClick={handleThreadClick}
              />
            </div>
          </div>
        );

      default:
        return <div>ページが見つかりません</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={currentUser}
        onLogin={() => setCurrentPage('login')}
        onRegister={() => setCurrentPage('register')}
        onLogout={handleLogout}
        onCreateThread={handleCreateThread}
        onSearch={handleSearchFromHeader}
        currentPage={currentPage}
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;