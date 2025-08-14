import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { useProductsAxios } from '../hooks/useProductsAxios';
import Layout from '../components/Layout';
import type { Product } from '../types/productType';

export default function SingleProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loading, error, getProduct } = useProductsAxios();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProduct(Number(id));
          setProduct(productData);
          if (productData.images && productData.images.length > 0) {
            setSelectedImage(productData.images[0]);
          } else {
            setSelectedImage(productData.thumbnail);
          }
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
          <div className="text-primary-500 text-lg">Loading product...</div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto p-4 mt-16">
          <div className="text-center text-red-500 mb-4">
            {error?.message || 'Product not found'}
          </div>
        </div>
      </Layout>
    );
  }

  const allImages = product.images && product.images.length > 0 
    ? [product.thumbnail, ...product.images].filter((img, index, arr) => arr.indexOf(img) === index)
    : [product.thumbnail];

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <MdArrowBack
          className='text-primary-600 text-3xl cursor-pointer hover:text-primary-700 mt-16'
          onClick={() => navigate('/')}
        />
        
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className='w-full lg:w-1/2'>
            <div className="mb-4">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="w-full h-80 lg:h-96 object-cover rounded-md shadow-md"
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded-md cursor-pointer transition-all ${
                      selectedImage === image 
                        ? 'border-2 border-primary-500 opacity-100' 
                        : 'border border-gray-300 opacity-80 hover:opacity-100'
                    }`}
                    onClick={() => handleImageSelect(image)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-2 capitalize">
                {product.category}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl lg:text-3xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
                  -{product.discountPercentage.toFixed(0)}% OFF
                </span>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Stock:</span> {product.stock} available
              </p>
              <p className="text-gray-700">
                <span className="font-medium">SKU:</span> {product.sku}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Rating:</span> {product.rating.toFixed(1)}⭐
              </p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Shipping:</span> {product.shippingInformation}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Warranty:</span> {product.warrantyInformation}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Return Policy:</span> {product.returnPolicy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}