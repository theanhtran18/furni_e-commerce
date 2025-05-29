"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CartTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const userData =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user = userData ? JSON.parse(userData) : null;
    setUserId(user._id);
    if (!user || !user._id) {
      console.warn("Không tìm thấy user");
      setLoading(false);
      return;
    }
    console.log("test");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cart/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
        console.log("cart:", data);
      })
      .catch((err) => {
        console.error("Lỗi lấy giỏ hàng:", err);
        setLoading(false);
      });
  }, []);

  const updateQuantity = async (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cartItem/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        quantity: delta,
      }),
    });
  };

  const removeProduct = async (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cartItem/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
      }),
    });
  };

  if (loading) return <p className="text-center py-10">Loading cart...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="w-full table-auto text-left border-separate border-spacing-y-6">
        <thead>
          <tr className="text-gray-600 border-b border-gray-300">
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.product._id}
              className="align-middle border-b border-gray-300"
            >
              <td className="py-4">
                <Image
                  src={`/${item.product.image}`}
                  alt={item.product.productName}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </td>
              <td>{item.product.productName}</td>
              <td>${(item.product.price / 100).toFixed(2)}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product._id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="min-w-[30px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product._id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                ${((item.product.price * item.quantity) / 100).toFixed(2)}
              </td>
              <td>
                <button
                  onClick={() => removeProduct(item.product._id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-start-3 px-6 py-4 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
          <div className="pb-4 border-b border-gray-300 mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Cart Totals</h1>
          </div>

          <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-4 font-medium text-gray-600">Subtotal</td>
                <td className="p-4 text-right font-semibold text-gray-800">
                  $230
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-gray-600">Total</td>
                <td className="p-4 text-right font-bold text-green-600">
                  $230
                </td>
              </tr>
            </tbody>
          </table>
          <button className="p-3 rounded-3xl border">
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
