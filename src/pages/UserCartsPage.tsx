import { useParams, useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import type { Cart } from '../types/cartType';

export default function UserCartsPage() {
  const { userId } = useParams();
  const { getCartsByUserId } = useCartContext();
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(null);
      getCartsByUserId(Number(userId))
        .then(data => setCarts(data))
        .catch(() => setError('Failed to fetch carts for this user.'))
        .finally(() => setLoading(false));
    }
  }, [userId]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-2 sm:p-4 mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary-700">
          Carts for User #{userId}
        </h2>
        {loading && <div className="p-8 text-center text-primary-700">Loading...</div>}
        {error && <div className="p-8 text-center text-red-500">{error}</div>}
        {!loading && !error && carts.length === 0 && (
          <div className="text-primary-700">No carts found for this user.</div>
        )}
        <div className="space-y-6">
          {carts.map(cart => (
            <div
              key={cart.id}
              className="border border-primary-100 rounded-lg shadow bg-white cursor-pointer hover:bg-primary-50 transition"
              onClick={() => navigate(`/cart/${cart.id}`)}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter') navigate(`/cart/${cart.id}`); }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 bg-primary-100 rounded-t-lg">
                <div className="mb-2 sm:mb-0">
                  <span className="font-semibold text-primary-700">Cart #{cart.id}</span>
                </div>
                <div className="flex gap-4 text-primary-700 text-sm">
                  <span>Products: {cart.totalProducts}</span>
                  <span>Items: {cart.totalQuantity}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="p-2 text-left text-primary-700">Product</th>
                      <th className="p-2 text-right text-primary-700">Price</th>
                      <th className="p-2 text-right text-primary-700">Qty</th>
                      <th className="p-2 text-right text-primary-700">Total</th>
                      <th className="p-2 text-right text-primary-700">Discounted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.products.map(product => (
                      <tr key={product.id} className="border-b last:border-b-0">
                        <td className="p-2 flex items-center gap-2">
                          <img src={product.thumbnail} alt={product.title} className="w-8 h-8 object-cover rounded" />
                          <span className="text-primary-800">{product.title}</span>
                        </td>
                        <td className="p-2 text-right text-primary-700">${product.price.toFixed(2)}</td>
                        <td className="p-2 text-right text-primary-700">{product.quantity}</td>
                        <td className="p-2 text-right text-primary-700">${product.total.toFixed(2)}</td>
                        <td className="p-2 text-right text-primary-700">${product.discountedTotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 px-4 py-2 bg-primary-50 rounded-b-lg">
                <div>
                  <span className="font-semibold text-primary-700">Cart Total: </span>
                  <span className="text-primary-800">{cart.total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <div>
                  <span className="font-semibold text-primary-700">Discounted Total: </span>
                  <span className="text-primary-800">{cart.discountedTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}