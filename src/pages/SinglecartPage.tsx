import { useParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import type { Cart } from "../types/cartType";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function SinglecartPage() {
  const { id } = useParams();
  const { getCartById } = useCartContext();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCartById(Number(id))
        .then((data) => setCart(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4 mt-16 ">
        {loading && <div className="text-primary-700">Loading cart...</div>}
        {!loading && !cart && (
          <div className="text-red-500">Cart not found.</div>
        )}
        {cart && (
          <>
            <div className="border border-primary-100 rounded-lg shadow bg-white">
              <h2 className="text-2xl font-bold mb-4 text-primary-700">
                Cart #{cart.id}
              </h2>
              <div className="mb-4 text-primary-700 ">
                User ID: {cart.userId}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-primary-50">
                      <th className="p-2 text-left text-primary-700">
                        Product
                      </th>
                      <th className="p-2 text-right text-primary-700">Price</th>
                      <th className="p-2 text-right text-primary-700">Qty</th>
                      <th className="p-2 text-right text-primary-700">Total</th>
                      <th className="p-2 text-right text-primary-700">
                        Discounted
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary-400">
                    {cart.products.map((product) => (
                      <tr key={product.id} className="border-b last:border-b-0">
                        <td className="p-2 flex items-center gap-2">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-8 h-8 object-cover rounded"
                          />
                          <span className="text-primary-800">
                            {product.title}
                          </span>
                        </td>
                        <td className="p-2 text-right text-primary-700">
                          ${product.price?.toFixed(2) ?? "0.00"}
                        </td>
                        <td className="p-2 text-right text-primary-700">
                          {product.quantity}
                        </td>
                        <td className="p-2 text-right text-primary-700">
                          $
                          {typeof product.total === "number"
                            ? product.total.toFixed(2)
                            : "0.00"}
                        </td>
                        <td className="p-2 text-right text-primary-700">
                          $
                          {typeof product.discountedTotal === "number"
                            ? product.discountedTotal.toFixed(2)
                            : "0.00"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-8 mt-4">
                <div>
                  <span className="font-semibold text-primary-700">
                    Cart Total:{" "}
                  </span>
                  <span className="text-primary-800">
                    {cart.total.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-primary-700">
                    Discounted Total:{" "}
                  </span>
                  <span className="text-primary-800">
                    {cart.discountedTotal.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div>
                  <Button
                    label="edit"
                    onClick={() => navigate(`/cart/${cart.id}/edit`)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
