import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CartSummary = ({ selectedItems }) => {
  const router = useRouter();

  const total = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const displayPrice = (value: number) => `$${(value / 100).toFixed(2)}`;

  const handleCheckout = () => {
    if (total === 0) {
      toast.warning("Chưa có sản phẩm nào được chọn!");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="col-start-3 px-6 py-4 bg-gray-50 rounded-xl shadow-lg border border-gray-200">
      <div className="pb-4 border-b border-gray-300 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Cart Totals</h1>
      </div>

      <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="p-4 font-medium text-gray-600">Subtotal</td>
            <td className="p-4 text-right font-semibold text-gray-800">
              {displayPrice(total)}
            </td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-gray-600">Total</td>
            <td className="p-4 text-right font-bold text-green-600">
              {displayPrice(total)}
            </td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={handleCheckout}
        className="mt-4 w-full p-3 rounded-3xl border cursor-pointer hover:bg-[#cfa706] hover:text-white"
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default CartSummary;
