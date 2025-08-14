import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { useProductsAxios } from '../hooks/useProductsAxios';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/productType';

export default function ProductCategory() {
  const { category } = useParams<{ category: string }>();
  const { getProductsByCategory } = useProductsAxios();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!category) {
        setError('Category not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await getProductsByCategory(category);
        setProducts(data || []);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching category products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
          <div className="text-primary-500 text-lg">Loading products...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-4 mt-32">
          <div className="text-center text-red-500 mb-4">{error}</div>
          <Link to="/categories" className="text-primary-600 hover:text-primary-800">
            ← Back to Categories
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6 mt-16">
          <div className="flex items-center">
            <Link 
              to="/categories" 
              className="mr-4 text-primary-600 hover:text-primary-800"
            >
              <MdArrowBack className="text-2xl" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize">
                {category?.replace('-', ' ')} Products
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {products.length} {products.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg mb-4">No products found in this category</p>
            <Link 
              to="/categories" 
              className="text-primary-600 hover:text-primary-800 underline"
            >
              Browse other categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                className="hover:scale-105 transition-transform"
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}