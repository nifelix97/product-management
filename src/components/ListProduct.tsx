import { useEffect } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../types/productType';
import { useProductContext } from '../context/ProductContext';

interface ProductListProps {
  searchResults?: Product[] | null;
  showingSearchResults?: boolean;
}

export default function ProductList({ searchResults, showingSearchResults }: ProductListProps) {
  const { products, loading, error, fetchProducts } = useProductContext();

  useEffect(() => {
    // Always fetch products if we don't have them, regardless of search state
    if (products.length === 0 && !loading) {
      console.log('Fetching products because products array is empty');
      fetchProducts();
    }
  }, [products.length, loading, fetchProducts]);

  const displayProducts = showingSearchResults ? (searchResults || []) : products;
  const isLoading = !showingSearchResults && loading;

  if (isLoading) {
    return <div className='text-center text-primary-500'>Loading products...</div>;
  }

  if (error && !showingSearchResults) {
    return <div className='text-center text-red-500'>Error: {error.message}</div>;
  }

  if (!Array.isArray(displayProducts) || displayProducts.length === 0) {
    if (showingSearchResults) {
      return null; 
    }
    return <div className='text-center text-gray-500'>No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {displayProducts.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          className="hover:shadow-lg transition-shadow hover:border-primary-600"
        />
      ))}
    </div>
  );
}