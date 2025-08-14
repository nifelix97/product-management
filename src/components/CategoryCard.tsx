import type { Category } from '../types/productType';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category
  className?: string
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  const categorySlug = category.url 
    ? category.url.split('/').pop()
    : category.slug || category.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link 
      to={`/category/${categorySlug}`} 
      className={`block group transition-all duration-300 ${className || ''}`}
    >
      <div className="border border-primary-200 hover:border-primary-400 p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full min-h-[100px] sm:min-h-[120px] lg:min-h-[140px]">
        <div className="flex flex-col items-center justify-center h-full space-y-2 sm:space-y-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
            <span className="text-primary-600 font-bold text-sm sm:text-base lg:text-lg">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <h2 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 group-hover:text-primary-700 transition-colors text-center capitalize leading-tight">
            {category.name.replace('-', ' ')}
          </h2>
          
          <p className="text-xs text-gray-500 text-center hidden sm:block">
        {category.slug}
          </p>
        </div>
      </div>
    </Link>
  )
}