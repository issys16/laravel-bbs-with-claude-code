import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import CategoryBadge from '../common/CategoryBadge';

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface CreateThreadFormProps {
  categories: Category[];
  onSubmit: (data: {
    title: string;
    body: string;
    categoryId: number;
    images: File[];
  }) => void;
  onCancel: () => void;
  loading?: boolean;
}

const CreateThreadForm: React.FC<CreateThreadFormProps> = ({
  categories,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 0);
  const [images, setImages] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      body,
      categoryId,
      images
    });
  };

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).slice(0, 3 - images.length);
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">新しいスレッドを作成</h1>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              カテゴリー
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`cursor-pointer p-3 border rounded-lg transition-all ${
                    categoryId === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={categoryId === category.id}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="sr-only"
                  />
                  <CategoryBadge category={category} />
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="スレッドのタイトルを入力してください"
              required
              maxLength={255}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {title.length}/255
            </div>
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
              本文
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={10}
              placeholder="スレッドの内容を入力してください..."
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              Markdownが使用できます
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              画像 (最大3枚)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                dragOver
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  ファイルをドラッグ&ドロップするか、クリックして選択
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                  className="hidden"
                  id="image-upload"
                  disabled={images.length >= 3}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  ファイルを選択
                </label>
                <div className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF (最大5MB)
                </div>
              </div>
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  作成中...
                </>
              ) : (
                <>
                  <ImageIcon size={16} className="mr-2" />
                  スレッドを作成
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThreadForm;