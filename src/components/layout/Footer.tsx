import React from 'react';
import { ExternalLink, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Site Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-bold">
                <span className="text-blue-400">Laravel</span> BBS
              </h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Laravel学習者のための掲示板コミュニティ。技術的な質問から雑談まで、
              開発者同士で知識を共有しましょう。
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">サービス</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ホーム
                </a>
              </li>
              <li>
                <a
                  href="/threads"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  スレッド一覧
                </a>
              </li>
              <li>
                <a
                  href="/search"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  検索
                </a>
              </li>
              <li>
                <a
                  href="/threads/category/tech"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  技術カテゴリー
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">サポート</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ヘルプ
                </a>
              </li>
              <li>
                <a
                  href="/help/guide"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  使い方ガイド
                </a>
              </li>
              <li>
                <a
                  href="/help/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  よくある質問
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  お問い合わせ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Laravel BBS. Laravel学習用サンプルアプリケーション
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                利用規約
              </a>
              <a
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                プライバシーポリシー
              </a>
              <a
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                サイトマップ
              </a>
              <a
                href="https://laravel.com"
                className="text-gray-400 hover:text-white transition-colors flex items-center"
              >
                Laravel公式
                <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;