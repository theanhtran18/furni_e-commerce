"use client";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { getUser } from "lib/auth";
import { toast } from "sonner";

const OrderSummary = ({ form, setForm }) => {
  const user = getUser();

  const items = useSelector((state: RootState) => state.cart.selectedItems);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!form.address) {
      toast.warning("Please provide delivery address!");
      return;
    }
    try {
      const results = await Promise.all(
        items.map(async (item) => {
          const orderPayload = {
            userId: user._id,
            product: {
              productId: item.product._id,
              quantity: item.quantity,
            },
            paymentMethod: form.paymentMethod,
            note: form.note,
            shippingAddress: form.address,
          };

          const res = await fetch(
            process.env.NEXT_PUBLIC_API_BASE + "/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(orderPayload),
            }
          );

          if (!res.ok) {
            throw new Error("One or more orders failed");
          }

          return res.json();
        })
      );

      toast.success("Orders placed successfully!");
      window.location.href = "/purchase";
    } catch (error) {
      console.error(error);
      toast.error("Failed to place all orders.");
    }
  };
  return (
    <>
      <div className="col-span-1">
        <div className="">
          <h1 className="text-3xl font-medium mb-5">Your Order</h1>
          <div className="max-w-xl bg-white p-10 border border-gray-300 space-y-6">
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
                className="bg-[#0f1312] text-white font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition w-full"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
