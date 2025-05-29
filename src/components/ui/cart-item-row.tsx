import Image from "next/image";

const CartItemRow = ({
  item,
  onUpdateQuantity,
  onRemove,
  selected,
  onSelect,
}) => {
  return (
    <tr
      key={item.product._id}
      className="align-middle border-b border-gray-300"
    >
      <td className="py-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(item.product._id, e.target.checked)}
        />
      </td>
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
            onClick={() => onUpdateQuantity(item.product._id, -1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="min-w-[30px] text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.product._id, 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </td>
      <td>${((item.product.price * item.quantity) / 100).toFixed(2)}</td>
      <td>
        <button
          onClick={() => onRemove(item.product._id)}
          className="text-red-500 hover:underline cursor-pointer"
        >
          x
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
