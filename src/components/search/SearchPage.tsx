import React, { useState, useEffect } from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import ThreadList from '../thread/ThreadList';
import CategoryBadge from '../common/CategoryBadge';

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface User {
  id: number;
  name: string;
  avatar: string;
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

interface SearchPageProps {
  categories: Category[];
  onSearch: (query: string, categoryId?: number, sortBy?: string) => Promise<Thread[]>;
  onThreadClick: (threadId: number) => void;
  initialQuery?: string;
}

type SortOption = 'latest' | 'oldest' | 'popular' | 'replies';

const SearchPage: React.FC<SearchPageProps> = ({
  categories,
  onSearch,
  onThreadClick,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'latest', label: '新着順' },
    { value: 'oldest', label: '古い順' },
    { value: 'popular', label: '人気順（閲覧数）' },
    { value: 'replies', label: '返信数順' }
  ];

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const results = await onSearch(query, selectedCategory, sortBy);
      setThreads(results);
    } catch (error) {
      console.error('検索エラー:', error);
      setThreads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSortBy('latest');
    if (hasSearched) {
      handleSearch();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">スレッド検索</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="キーワードを入力してください..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter size={16} className="mr-2" />
                フィルター
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    検索中...
                  </>
                ) : (
                  '検索'
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  カテゴリー
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(undefined)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === undefined
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    すべて
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`transition-colors ${
                        selectedCategory === category.id
                          ? 'ring-2 ring-blue-500'
                          : ''
                      }`}
                    >
                      <CategoryBadge category={category} size="sm" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  並び順
                </label>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSortBy(option.value as SortOption)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        sortBy === option.value
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option.value === 'latest' ? <SortDesc size={14} className="mr-1" /> : 
                       option.value === 'oldest' ? <SortAsc size={14} className="mr-1" /> : null}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  フィルターをクリア
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              検索結果
              {!loading && threads.length > 0 && (
                <span className="text-gray-500 font-normal ml-2">
                  （{threads.length.toLocaleString()}件）
                </span>
              )}
            </h2>
            {query && (
              <div className="text-sm text-gray-500">
                「<span className="font-medium text-gray-900">{query}</span>」の検索結果
              </div>
            )}
          </div>

          <ThreadList 
            threads={threads} 
            loading={loading} 
            onThreadClick={onThreadClick}
          />

          {!loading && threads.length === 0 && hasSearched && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">検索結果が見つかりません</div>
              <div className="text-gray-400 text-sm mb-4">
                以下をお試しください：
              </div>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>・キーワードを変更してみてください</li>
                <li>・カテゴリーフィルターを解除してみてください</li>
                <li>・より一般的な用語で検索してみてください</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="text-gray-500 text-lg mb-2">スレッドを検索</div>
          <div className="text-gray-400 text-sm">
            キーワードを入力して検索ボタンを押してください
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;