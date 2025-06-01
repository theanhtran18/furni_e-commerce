"use client";

import { useSelector } from "react-redux";
import { RootState } from "store/store";
import Banner from "@/components/ui/banner";
import { useState } from "react";
import { getUser } from "lib/auth";
import { toast } from "sonner";

const CheckoutPage = () => {
  const items = useSelector((state: RootState) => state.cart.selectedItems);

  const user = getUser();

  const [form, setForm] = useState({
    address: "",
    phone: "",
    note: "",
    paymentMethod: "COD",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!form.address || !form.phone) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    const orderPayload = {
      userId: user._id,
      listProduct: items.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      paymentMethod: form.paymentMethod,
      note: form.note,
      shippingInfo: {
        address: form.address,
        phone: form.phone,
      },
    };

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE + "/order/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      if (res.ok) {
        toast.success("Order placed successfully!");
        // Optionally reset form or redirect
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while placing order.");
    }
  };

  return (
    <>
      <div>
        <Banner title="Checkout" />
        <div className="bg-[#eff2f1] p-10">
          <div className="grid grid-cols-2 gap-4">
            {/* Billing Details */}
            <div className="col-span-1">
              <h1 className="text-3xl font-medium pb-5">Billing Details</h1>
              <div className="grid grid-cols-2 gap-4 p-10 bg-white border border-gray-300">
                <div className="flex flex-col">
                  <label>
                    FirstName <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border rounded-[10px] p-3 w-full border-gray-400 bg-gray-200"
                    value={user.givenName}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    LastName <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border rounded-[10px] p-3 w-full border-gray-400 bg-gray-200"
                    value={user.familyName}
                    readOnly
                  />
                </div>

                <div className="col-span-2 flex flex-col my-5">
                  <label>
                    Address <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="border rounded-[10px] p-3 w-full border-gray-400"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  >
                    <option value="">Select address</option>
                    <option value="123 Main St">123 Main St</option>
                    <option value="456 Elm Ave">456 Elm Ave</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border rounded-[10px] p-3 w-full border-gray-400 bg-gray-200"
                    value={user.email}
                    readOnly
                  />
                </div>
                <div className="flex flex-col">
                  <label>
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="border rounded-[10px] p-3 w-full border-gray-400"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-2 flex flex-col my-5">
                  <label>Order Notes</label>
                  <textarea
                    className="border rounded-[10px] p-3 w-full"
                    rows={4}
                    placeholder="Write your notes here..."
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Order Summary + Payment */}
            <div className="col-span-1">
              <h1 className="text-3xl font-medium pb-5 px-4">Your Order</h1>
              <div className="max-w-xl mx-auto bg-white p-10 border border-gray-300 space-y-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 border-b pb-2 font-semibold">
                    <div>Product</div>
                    <div className="text-right">Total</div>
                  </div>

                  {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-2">
                      <div>
                        {item.product.productName} x {item.quantity}
                      </div>
                      <div className="text-right">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="grid grid-cols-2 border-t pt-2 font-medium">
                    <div>Cart Subtotal</div>
                    <div className="text-right">${subtotal.toFixed(2)}</div>
                  </div>

                  <div className="grid grid-cols-2 font-bold">
                    <div>Order Total</div>
                    <div className="text-right">${subtotal.toFixed(2)}</div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  {["COD", "MOMO", "VNPAY", "PAYPAL"].map((method) => (
                    <label
                      key={method}
                      className={`block border p-4 rounded-md cursor-pointer hover:border-black transition ${
                        form.paymentMethod === method
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        className="mr-2"
                        checked={form.paymentMethod === method}
                        onChange={(e) =>
                          setForm({ ...form, paymentMethod: e.target.value })
                        }
                      />
                      <span className="uppercase underline">{method}</span>
                    </label>
                  ))}
                </div>

                {/* Place Order */}
                <div className="pt-4">
                  <button
                    className="bg-black text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition w-full"
                    onClick={placeOrder}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
