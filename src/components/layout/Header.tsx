import React, { useState } from 'react';
import { Search, Menu, X, User, Settings, LogOut, Plus, Bell } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  isAdmin: boolean;
}

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  onCreateThread: () => void;
  onSearch: (query: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onLogin,
  onRegister,
  onLogout,
  onCreateThread,
  onSearch,
  currentPage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const categories = [
    { id: 1, name: '技術', slug: 'tech', color: 'bg-blue-500' },
    { id: 2, name: '質問', slug: 'question', color: 'bg-orange-500' },
    { id: 3, name: '雑談', slug: 'chat', color: 'bg-green-500' },
    { id: 4, name: 'お知らせ', slug: 'news', color: 'bg-purple-500' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex-shrink-0 ml-2 md:ml-0">
              <h1 className="text-xl font-bold text-gray-900">
                <span className="text-blue-600">Laravel</span> BBS
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              ホーム
            </a>
            <a
              href="/threads"
              className={`text-sm font-medium transition-colors ${
                currentPage === 'threads' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              スレッド一覧
            </a>
            <div className="relative group">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                カテゴリー
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`/threads/category/${category.slug}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="スレッドを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={onCreateThread}
                  className="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  スレッド作成
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.name}
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">{user.name}</div>
                        {user.isAdmin && (
                          <div className="text-xs text-blue-600 mt-1">管理者</div>
                        )}
                      </div>
                      <a
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User size={16} className="mr-3" />
                        マイページ
                      </a>
                      <a
                        href="/profile/edit"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings size={16} className="mr-3" />
                        設定
                      </a>
                      {user.isAdmin && (
                        <a
                          href="/admin/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Settings size={16} className="mr-3" />
                          管理画面
                        </a>
                      )}
                      <hr className="my-1" />
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <LogOut size={16} className="mr-3" />
                        ログアウト
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={onLogin}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                >
                  ログイン
                </button>
                <button
                  onClick={onRegister}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  会員登録
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t border-gray-200">
            <a
              href="/"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              ホーム
            </a>
            <a
              href="/threads"
              className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
            >
              スレッド一覧
            </a>
            <div className="px-3 py-2">
              <div className="text-gray-700 text-base font-medium mb-2">カテゴリー</div>
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/threads/category/${category.slug}`}
                  className="flex items-center py-1 text-gray-600 hover:text-gray-800"
                >
                  <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                  {category.name}
                </a>
              ))}
            </div>
            <div className="px-3 py-2">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="スレッドを検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </form>
            </div>
            {!user && (
              <div className="px-3 py-2 space-y-2">
                <button
                  onClick={onLogin}
                  className="w-full text-left text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                >
                  ログイン
                </button>
                <button
                  onClick={onRegister}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  会員登録
                </button>
              </div>
            )}
            {user && (
              <div className="px-3 py-2">
                <button
                  onClick={onCreateThread}
                  className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus size={16} className="mr-2" />
                  スレッド作成
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;