import { useEffect } from 'react';
import { useProductsAxios } from '../hooks/useProductsAxios';
import ProductCard from './ProductCard';
import type { Product } from '../types/productType';

interface ProductListProps {
  searchResults?: Product[] | null;
  showingSearchResults?: boolean;
}

export default function ProductList({ searchResults, showingSearchResults }: ProductListProps) {
  const { products, loading, error, fetchProducts } = useProductsAxios();

  useEffect(() => {
    if (!showingSearchResults) {
      fetchProducts();
    }
  }, [showingSearchResults]);

  const handleProductUpdated = () => {
    console.log('Product updated, refreshing list...');
    if (showingSearchResults) {
      fetchProducts();
    } else {
      fetchProducts();
    }
  };

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
          onProductUpdated={handleProductUpdated}
          className="hover:shadow-lg transition-shadow hover:border-primary-600"
        />
      ))}
    </div>
  );
}