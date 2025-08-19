import { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import Layout from '../components/Layout';
import ProductList from '../components/ListProduct';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import type { Product } from '../types/productType';

export default function HomePage() {
  const navigate = useNavigate();
  const { searchProducts, products, fetchProducts } = useProductContext();
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (products.length === 0) {
      console.log('HomePage: Fetching products because array is empty');
      fetchProducts();
    }
  }, [products.length, fetchProducts]);

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setSearchQuery('');
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      setSearchQuery(query);
      const results = await searchProducts(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [searchProducts]);

  const debouncedSearch = useCallback(
    debounce(performSearch, 300),
    [performSearch]
  );

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  return (
    <Layout onSearch={handleSearch}>
      <div className="container mx-auto p-4">
        <div className='mt-16 text-right p-4'>
          <Button label="Add Product" onClick={() => navigate('/add')} />
        </div>

        {searchQuery && (
          <div className="mb-6 px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Search Results for "{searchQuery}"
                </h2>
                {searchResults && (
                  <p className="text-gray-600 text-sm">
                    {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'} found
                  </p>
                )}
              </div>
              <button
                onClick={() => handleSearch('')}
                className="text-primary-600 hover:text-primary-800 text-sm underline"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {isSearching && (
          <div className="flex justify-center items-center py-12">
            <div className="text-primary-500 text-lg">Searching...</div>
          </div>
        )}

        {searchQuery && searchResults && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No products found for "{searchQuery}"
            </p>
            <p className="text-gray-400 mb-4">
              Try searching with different keywords
            </p>
            <button
              onClick={() => handleSearch('')}
              className="text-primary-600 hover:text-primary-800 underline"
            >
              Show all products
            </button>
          </div>
        )}

        {!isSearching && (
          <ProductList 
            searchResults={searchResults} 
            showingSearchResults={!!searchQuery}
          />
        )}
      </div>
    </Layout>
  );
}