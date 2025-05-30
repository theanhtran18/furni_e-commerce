"use client";

import { useEffect, useState } from "react";
import CartItemRow from "./ui/cart-item-row";
import CartSummary from "./ui/cart-sumary";

const CartTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const userData =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const user = userData ? JSON.parse(userData) : null;
    setUserId(user?._id);
    if (!user || !user._id) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cart/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setSelectedIds(data.items.map((item) => item.product._id)); // chọn tất cả ban đầu
        setLoading(false);
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
      body: JSON.stringify({ userId, productId, quantity: delta }),
    });
  };

  const removeProduct = async (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
    setSelectedIds((prev) => prev.filter((id) => id !== productId));
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/cartItem/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, productId }),
    });
  };

  const handleSelect = (productId: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, productId] : prev.filter((id) => id !== productId)
    );
  };

  if (loading) return <p className="text-center py-10">Loading cart...</p>;

  const selectedItems = items.filter((item) =>
    selectedIds.includes(item.product._id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="w-full table-auto text-left border-separate border-spacing-y-6">
        <thead>
          <tr className="text-gray-600">
            <th></th>
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
            <CartItemRow
              key={item.product._id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeProduct}
              selected={selectedIds.includes(item.product._id)}
              onSelect={handleSelect}
            />
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-3 gap-4">
        <CartSummary selectedItems={selectedItems} />
      </div>
    </div>
  );
};

export default CartTable;
