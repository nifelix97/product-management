import { useEffect } from 'react';
import { useProductsAxios } from '../hooks/useProductsAxios';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { products, loading, error, fetchProducts } = useProductsAxios();

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className='text-center text-primary-500'>Loading products...</div>;
  if (error) return <div className='text-center text-red-500'>Error: {error.message}</div>;

  if (!Array.isArray(products) || products.length === 0) {
    return <div className='text-center text-gray-500'>No products found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-12">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product}
          className=" hover:shadow-lg transition-shadow hover:border-primary-600"
        />
      ))}
    </div>
  );
}