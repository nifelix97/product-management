import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import InPuts from '../components/InPut';
import type { Product } from '../types/productType';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, updateProduct } = useProductContext();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    discountPercentage: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUpdating, setIsUpdating] = useState(false);

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
          alert('Failed to load product. Redirecting to homepage.');
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

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price < 0) {
      newErrors.price = 'Valid price is required';
    }

    const stock = parseInt(formData.stock);
    if (!formData.stock || isNaN(stock) || stock < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    const discount = parseFloat(formData.discountPercentage);
    if (formData.discountPercentage && (isNaN(discount) || discount < 0 || discount > 100)) {
      newErrors.discountPercentage = 'Discount must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!product) return;

  if (!validateForm()) {
    return;
  }

  try {
    setIsUpdating(true);
    
    const updateData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      discountPercentage: parseFloat(formData.discountPercentage) || 0
    };

    const updatedProduct = await updateProduct(product.id, updateData);
    
    setProduct(updatedProduct);
    
    alert('Product updated successfully!');
    
    setTimeout(() => {
      navigate(`/product/${product.id}`);
    }, 200);
    
  } catch (error) {
    alert('Failed to update product. Please try again.');
    console.error('Update error:', error);
  } finally {
    setIsUpdating(false);
  }
};
  return (
    <Layout>
      <div className="container mx-auto p-4 mt-16 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => { if (product) navigate(`/product/${product.id}`); }}
              className="text-primary-600 hover:text-primary-800 mr-4"
            >
              ← Back to Product
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Product</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <InPuts
              label="Product Title"
              name="title"
              value={formData.title}
              type="text"
              placeholder="Enter product title"
              error={errors.title}
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
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">{errors.description}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InPuts
                label="Price ($)"
                name="price"
                value={formData.price}
                type="number"
                placeholder="0.00"
                error={errors.price}
                onChange={handleInputChange}
              />

              <InPuts
                label="Stock Quantity"
                name="stock"
                value={formData.stock}
                type="number"
                placeholder="0"
                error={errors.stock}
                onChange={handleInputChange}
              />

              <InPuts
                label="Discount (%)"
                name="discountPercentage"
                value={formData.discountPercentage}
                type="number"
                placeholder="0.00"
                error={errors.discountPercentage}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                label={isUpdating ? "Updating..." : "Update Product"}
                onClick={() => {}}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3"
                disabled={isUpdating}
              />
              <Button
                type="button"
                label="Cancel"
                onClick={() => { if (product) navigate(`/product/${product.id}`); }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3"
                disabled={isUpdating}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}