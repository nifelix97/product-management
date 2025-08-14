import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsAxios } from '../hooks/useProductsAxios';
import Layout from '../components/Layout';
import Button from '../components/Button';
import InPuts from '../components/InPut';
import type { Product } from '../types/productType';

export default function EditProductPage() { 
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, updateProduct, loading } = useProductsAxios();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    discountPercentage: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProduct(Number(id));
          setProduct(productData);
          setFormData({
            title: productData.title,
            description: productData.description,
            price: productData.price.toString(),
            stock: productData.stock.toString(),
            discountPercentage: productData.discountPercentage.toString()
          });
        } catch (error) {
          console.error('Failed to fetch product:', error);
          navigate('/');
        }
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      const updateData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discountPercentage: parseFloat(formData.discountPercentage) || 0
      };

      await updateProduct(product.id, updateData);
      alert('Product updated successfully!');
      navigate('/'); // Navigate back to homepage
    } catch (error) {
      alert('Failed to update product. Please try again.');
      console.error('Update error:', error);
    }
  };

  if (loading || !product) {
    return (
      <Layout>
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[400px]">
          <div className="text-primary-500 text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 mt-16">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Edit Product</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <InPuts
              label="Product Title"
              name="title"
              value={formData.title}
              type="text"
              placeholder="Enter product title"
              onChange={handleInputChange}
            />

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleTextareaChange}
                rows={4}
                placeholder="Enter product description"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InPuts
                label="Price ($)"
                name="price"
                value={formData.price}
                type="number"
                placeholder="0.00"
                onChange={handleInputChange}
              />

              <InPuts
                label="Stock Quantity"
                name="stock"
                value={formData.stock}
                type="number"
                placeholder="0"
                onChange={handleInputChange}
              />

              <InPuts
                label="Discount (%)"
                name="discountPercentage"
                value={formData.discountPercentage}
                type="number"
                placeholder="0.00"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                label="Update Product"
                onClick={() => {}}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3"
              />
              <Button
                type="button"
                label="Cancel"
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}