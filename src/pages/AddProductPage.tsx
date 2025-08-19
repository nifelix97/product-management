import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import Layout from '../components/Layout';
import Button from '../components/Button';
import InPuts from '../components/InPut';
import type { Product } from '../types/productType';

export default function AddProductPage() {
  const navigate = useNavigate();
  const { createProduct } = useProductContext();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    discountPercentage: '',
    brand: '',
    category: '',
    thumbnail: '',
    images: ['']
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
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

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
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

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      newErrors.price = 'Valid price greater than 0 is required';
    }

    const stock = parseInt(formData.stock);
    if (!formData.stock || isNaN(stock) || stock < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    const discount = parseFloat(formData.discountPercentage);
    if (formData.discountPercentage && (isNaN(discount) || discount < 0 || discount > 100)) {
      newErrors.discountPercentage = 'Discount must be between 0 and 100';
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = 'Thumbnail URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsCreating(true);
      
      const newProduct: Omit<Product, 'id'> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        discountPercentage: parseFloat(formData.discountPercentage) || 0,
        brand: formData.brand.trim(),
        category: [formData.category.trim()] as unknown as Product['category'],
        thumbnail: formData.thumbnail.trim(),
        images: formData.images.filter(img => img.trim() !== ''),
        rating: 0, 
        reviews: [],
        returnPolicy: "30 days return policy",
        minimumOrderQuantity: 1,
        meta: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          barcode: `${Date.now()}`,
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formData.title)}`
        },
        tags: [],
        sku: `SKU-${Date.now()}`,
        weight: 1,
        dimensions: {
          width: 0,
          height: 0,
          depth: 0
        },
        warrantyInformation: "1 year warranty",
        shippingInformation: "Ships in 1-2 business days",
        availabilityStatus: "In Stock"
      };

      const createdProduct = await createProduct(newProduct);
      
      alert('Product created successfully!');
      navigate(`/product/${createdProduct.id}`);
      
    } catch (error) {
      alert('Failed to create product. Please try again.');
      console.error('Create error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      stock: '',
      discountPercentage: '',
      brand: '',
      category: '',
      thumbnail: '',
      images: ['']
    });
    setErrors({});
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-16 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="text-primary-600 hover:text-primary-800 mr-4"
            >
              ← Back to Products
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Product</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InPuts
                  label="Product Title *"
                  name="title"
                  value={formData.title}
                  type="text"
                  placeholder="Enter product title"
                  error={errors.title}
                  onChange={handleInputChange}
                />

                <InPuts
                  label="Brand *"
                  name="brand"
                  value={formData.brand}
                  type="text"
                  placeholder="Enter brand name"
                  error={errors.brand}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleTextareaChange}
                  rows={4}
                  placeholder="Enter detailed product description"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                  aria-invalid={!!errors.description}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">{errors.description}</span>
                )}
              </div>

              <InPuts
                label="Category *"
                name="category"
                value={formData.category}
                type="text"
                placeholder="e.g., electronics, clothing, beauty"
                error={errors.category}
                onChange={handleInputChange}
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Inventory</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InPuts
                  label="Price ($) *"
                  name="price"
                  value={formData.price}
                  type="number"
                  placeholder="0.00"
                  error={errors.price}
                  onChange={handleInputChange}
                />

                <InPuts
                  label="Stock Quantity *"
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
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h2>
              
              <InPuts
                label="Thumbnail URL *"
                name="thumbnail"
                value={formData.thumbnail}
                type="url"
                placeholder="https://example.com/thumbnail.jpg"
                error={errors.thumbnail}
                onChange={handleInputChange}
              />

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Image URL ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 sm:text-sm"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                >
                  Add Another Image
                </button>
              </div>
            </div>

            {(formData.thumbnail || formData.title) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview</h2>
                <div className="flex gap-4">
                  {formData.thumbnail && (
                    <div className="w-32 h-32 border rounded-lg overflow-hidden">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{formData.title || 'Product Title'}</h3>
                    <p className="text-gray-600 text-sm">{formData.brand || 'Brand'}</p>
                    <p className="text-primary-600 font-bold text-xl">
                      ${formData.price || '0.00'}
                    </p>
                    <p className="text-sm text-gray-500">Stock: {formData.stock || '0'}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button
                type="submit"
                label={isCreating ? "Creating Product..." : "Create Product"}
                onClick={() => {}}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-3"
                disabled={isCreating}
              />
              <Button
                type="button"
                label="Reset Form"
                onClick={handleReset}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3"
                disabled={isCreating}
              />
              <Button
                type="button"
                label="Cancel"
                onClick={() => navigate('/')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3"
                disabled={isCreating}
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}