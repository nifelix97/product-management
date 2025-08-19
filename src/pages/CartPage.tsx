import { useCartContext } from "../context/CartContext";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
export default function CartPage() {
  const { carts, loading, error } = useCartContext();
  const { deleteCart } = useCartContext();

  const totalPrice = carts.reduce((sum, cart) => sum + cart.total, 0);
  const totalDiscounted = carts.reduce(
    (sum, cart) => sum + cart.discountedTotal,
    0
  );
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-2 sm:p-4 mt-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary-700">
          All Carts
        </h2>
        {/* <div className="mb-6 flex justify-between items-center">
          <Button
            label="Create New Cart"
            onClick={() => navigate("/cart/create")}
            className="bg-primary-600 hover:bg-primary-700 text-white"
          />
          <Button
            label="Refresh"
            onClick={() => window.location.reload()}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
          />
        </div> */}
        <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-8 bg-primary-50 rounded-lg p-4">
          <div>
            <span className="font-semibold text-primary-700">
              Total Price:{" "}
            </span>
            <span className="text-primary-800">
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
          <div>
            <span className="font-semibold text-primary-700">
              Total Discounted:{" "}
            </span>
            <span className="text-primary-800">
              {totalDiscounted.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>
        </div>
        {loading && (
          <div className="p-8 text-center text-primary-700">
            Loading carts...
          </div>
        )}
        {error && (
          <div className="p-8 text-center text-red-500">
            Failed to load carts.
          </div>
        )}
        {!loading && !error && carts.length === 0 && (
          <div className="text-primary-700">No carts found.</div>
        )}
        <div className="space-y-6">
          {carts.map((cart) => (
            <div
              key={cart.id}
              className="border border-primary-100 rounded-lg shadow bg-white cursor-pointer hover:bg-primary-50 transition"
              onClick={() => navigate(`/cart/${cart.id}`)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter") navigate(`/cart/${cart.id}`);
              }}
            >
              <div
                key={cart.id}
                className="border border-primary-100 rounded-lg shadow bg-white"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 bg-primary-100 rounded-t-lg">
                  <div className="mb-2 sm:mb-0">
                    <span className="font-semibold text-primary-700">
                      Cart #{cart.id}
                    </span>
                    <span
                      className="ml-2 text-primary-600 text-sm underline cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/user/${cart.userId}/carts`);
                      }}
                      tabIndex={0}
                      role="button"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.stopPropagation();
                          navigate(`/user/${cart.userId}/carts`);
                        }
                      }}
                    >
                      User ID: {cart.userId}
                    </span>
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
                        <th className="p-2 text-left text-primary-700">
                          Product
                        </th>
                        <th className="p-2 text-right text-primary-700">
                          Price
                        </th>
                        <th className="p-2 text-right text-primary-700">Qty</th>
                        <th className="p-2 text-right text-primary-700">
                          Total
                        </th>
                        <th className="p-2 text-right text-primary-700">
                          Discounted
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      className="divide-y divide-primary-100"
                      onClick={() => console.log("Table row clicked")}
                    >
                      {cart.products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b last:border-b-0"
                        >
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
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="p-2 text-right text-primary-700">
                            {product.quantity}
                          </td>
                          <td className="p-2 text-right text-primary-700">
                            ${product.total.toFixed(2)}
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
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 px-4 py-2 bg-primary-50 rounded-b-lg">
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
                    <Button
                      label="Delete"
                      onClick={() => deleteCart(cart.id)}
                      className="ml-4 bg-red-500 hover:bg-red-600 text-white"
                    />
                    <Button
                      label="Edit"
                      onClick={() => navigate(`/cart/${cart.id}/edit`)}
                      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
