import { useParams, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import type { Cart } from '../types/cartType';
import { calculateCartTotals, calculateProductTotals } from '../types/cartType';


export default function EditCartPage() {
  const { id } = useParams();
  const { getCartById, updateCart } = useCartContext();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCartById(Number(id))
        .then(data => setCart(data))
        .catch(() => setError('Failed to fetch cart.'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleQuantityChange = (productId: number, newQty: number) => {
    if (!cart) return;
    setCart({
      ...cart,
      products: cart.products.map(p =>
        p.id === productId ? { ...p, quantity: newQty } : p
      ),
    });
  };

 const handleSave = async () => {
  if (!cart) return;
  setSaving(true);
  setError(null);

  const updatedProducts = cart.products.map(p => {
    const { total, discountedTotal } = calculateProductTotals(p.price, p.quantity, p.discountPercentage);
    return { ...p, total, discountedTotal };
  });

  const { total, discountedTotal, totalProducts, totalQuantity } = calculateCartTotals(updatedProducts);

  try {
    await updateCart(cart.id, {
      products: updatedProducts,
      total,
      discountedTotal,
      totalProducts,
      totalQuantity,
    });
    navigate(`/cart/${cart.id}`);
  } catch {
    setError('Failed to update cart.');
  } finally {
    setSaving(false);
  }
};
  

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 mt-16">
        {loading && <div className="text-primary-700">Loading cart...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {cart && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-primary-700">Edit Cart #{cart.id}</h2>
            <div className="mb-4 text-primary-700">User ID: {cart.userId}</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="p-2 text-left text-primary-700">Product</th>
                    <th className="p-2 text-right text-primary-700">Price</th>
                    <th className="p-2 text-right text-primary-700">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map(product => (
                    <tr key={product.id}>
                      <td className="p-2 flex items-center gap-2">
                        <img src={product.thumbnail} alt={product.title} className="w-8 h-8 object-cover rounded" />
                        <span className="text-primary-800">{product.title}</span>
                      </td>
                      <td className="p-2 text-right text-primary-700">${product.price.toFixed(2)}</td>
                      <td className="p-2 text-right">
                        <input
                          type="number"
                          min={1}
                          value={product.quantity}
                          onChange={e => handleQuantityChange(product.id, Number(e.target.value))}
                          className="w-16 border rounded px-2 py-1 text-primary-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="mt-6 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}