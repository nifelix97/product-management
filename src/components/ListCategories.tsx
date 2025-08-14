import { useEffect } from 'react'
import { useProductsAxios } from '../hooks/useProductsAxios';
import CategoryCard from './CategoryCard';

export default function ListCategories() {
  const { categories, loading, error, fetchCategories } = useProductsAxios();

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] mt-16">
        <div className="text-center text-primary-500 text-base sm:text-lg">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] mt-16">
        <div className="text-center text-red-500 text-sm sm:text-base px-4">
          Error: {error.message}
        </div>
      </div>
    );
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px] mt-16">
        <div className="text-center text-gray-500 text-sm sm:text-base">
          No categories found.
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 sm:mt-12 lg:mt-16">
      <div className='grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mt-16'>
        {categories.map((category) => (
          <CategoryCard 
            key={category.slug}
            category={category} 
          />
        ))}
      </div>
    </div>
  )
}