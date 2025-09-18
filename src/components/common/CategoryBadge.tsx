import React from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  color: string;
}

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
  clickable?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  size = 'md', 
  clickable = false 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  const baseClasses = `inline-flex items-center rounded-full font-medium ${sizeClasses[size]}`;
  
  const colorClasses = {
    'bg-blue-500': 'bg-blue-100 text-blue-800',
    'bg-orange-500': 'bg-orange-100 text-orange-800',
    'bg-green-500': 'bg-green-100 text-green-800',
    'bg-purple-500': 'bg-purple-100 text-purple-800',
    'bg-red-500': 'bg-red-100 text-red-800',
    'bg-yellow-500': 'bg-yellow-100 text-yellow-800'
  };

  const badgeColor = colorClasses[category.color as keyof typeof colorClasses] || 'bg-gray-100 text-gray-800';

  const Element = clickable ? 'a' : 'span';
  const props = clickable ? { href: `/threads/category/${category.slug}` } : {};

  return (
    <Element 
      {...props}
      className={`${baseClasses} ${badgeColor} ${
        clickable ? 'hover:opacity-75 transition-opacity cursor-pointer' : ''
      }`}
    >
      <div className={`w-2 h-2 rounded-full ${category.color} mr-2`}></div>
      {category.name}
    </Element>
  );
};

export default CategoryBadge;