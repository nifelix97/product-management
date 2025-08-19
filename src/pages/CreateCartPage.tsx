import { useState } from 'react';
import { useCartContext } from '../context/CartContext';
import Layout from '../components/Layout';
import InPuts from '../components/InPut';
import { useNavigate } from 'react-router-dom';

export default function CreateCartPage() {
  const { createCart } = useCartContext();
  const [userId, setUserId] = useState('');
  const [products, setProducts] = useState([{ id: '', quantity: 1 }]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleProductChange = (idx: number, field: string, value: string | number) => {
    setProducts(products =>
      products.map((p, i) => i === idx ? { ...p, [field]: value } : p)
    );
  };

  const addProduct = () => setProducts([...products, { id: '', quantity: 1 }]);
  const removeProduct = (idx: number) => setProducts(products.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createCart({
        userId: Number(userId),
        products: products.map(p => ({ id: Number(p.id), quantity: Number(p.quantity) }))
      });
      navigate('/cart');
    } catch {
      setError('Failed to create cart.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4 mt-16">
        <h2 className="text-2xl font-bold mb-4 text-primary-700">Create New Cart</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InPuts
            label="User ID"
            name="userId"
            type="number"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            placeholder="Enter user ID"
          />
          <div>
            <label className="block mb-1 font-semibold text-primary-700">Products</label>
            {products.map((product, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <InPuts
                  name={`productId-${idx}`}
                  type="number"
                  value={product.id}
                  onChange={e => handleProductChange(idx, 'id', e.target.value)}
                  placeholder="Product ID"
                />
                <InPuts
                  name={`quantity-${idx}`}
                  type="number"
                  value={String(product.quantity)}
                  onChange={e => handleProductChange(idx, 'quantity', e.target.value)}
                  placeholder="Quantity"
                />
                {products.length > 1 && (
                  <button type="button" onClick={() => removeProduct(idx)} className="text-red-500">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addProduct} className="text-primary-700 underline">+ Add Product</button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Cart'}
          </button>
        </form>
      </div>
    </Layout>
  );
}