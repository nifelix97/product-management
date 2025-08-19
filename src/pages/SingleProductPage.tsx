import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { MdStarRate } from "react-icons/md";
import type { Product } from '../types/productType';

export default function SingleProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getProduct, products, loading, fetchProducts } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>(''); 

    useEffect(() => {
    if (product) {
      setSelectedImage(product.thumbnail || '');
    }
  }, [product]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };


  useEffect(() => {
    if (products.length === 0 && !loading) {
      console.log('SingleProductPage: Fetching products for context');
      fetchProducts();
    }
  }, [products.length, loading, fetchProducts]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setIsLoading(true);
          
          const contextProduct = products.find(p => p.id === Number(id));
          if (contextProduct) {
            console.log('Using context product:', contextProduct);
            setProduct(contextProduct);
            setIsLoading(false);
            return;
          }
          
          console.log('Fetching from API...');
          const productData = await getProduct(Number(id));
          setProduct(productData);
        } catch (error) {
          console.error('Failed to fetch product:', error);
          navigate('/');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id, navigate, products]);

  useEffect(() => {
    if (id && products.length > 0) {
      const contextProduct = products.find(p => p.id === Number(id));
      if (contextProduct) {
        console.log('Context product updated:', contextProduct);
        setProduct(contextProduct);
      }
    }
  }, [id, products]);

  if (isLoading || loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px] mt-16">
          <div className="text-primary-500 text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px] mt-16">
          <div className="text-red-500 text-lg">Product not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-16 max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="text-primary-600 hover:text-primary-800 mb-6 flex items-center"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className='flex justify-center'>
              <div className="space-y-4">
              {selectedImage && (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {product.thumbnail && (
                    <button
                      onClick={() => handleImageClick(product.thumbnail)}
                      className={`relative overflow-hidden rounded-md transition-all duration-200 ${
                        selectedImage === product.thumbnail 
                          ? 'ring-2 ring-primary-500 ring-offset-2' 
                          : 'hover:opacity-80'
                      }`}
                    >
                      <img
                        src={product.thumbnail}
                        alt={`${product.title} - Thumbnail`}
                        className="w-full h-16 md:h-20 object-cover"
                      />
                    </button>
                  )}
             {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(image)}
                      className={`relative overflow-hidden rounded-md transition-all duration-200 ${
                        selectedImage === image 
                          ? 'ring-2 ring-primary-500 ring-offset-2' 
                          : 'hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="w-full h-16 md:h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{product.discountPercentage.toFixed(0)}% OFF
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold capitalize">
                    {Array.isArray(product.category) ? String(product.category[0]) : String(product.category)}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Stock</p>
                  <p className="font-semibold">{product.stock} units</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center">
                    <span className="font-semibold mr-1">{product.rating.toFixed(1)}</span>
                    <MdStarRate className="text-yellow-500" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Brand</p>
                  <p className="font-semibold">{product.brand || 'N/A'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  label="Edit Product"
                  onClick={() => navigate(`/edit/${product.id}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3"
                />
                <Button
                  label="Back to Products"
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}