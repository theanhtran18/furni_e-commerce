import ExploreButton from "./button/explore";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div
        className="bg-[#d2e3de] rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-6 
          relative grid grid-cols-1 md:grid-cols-2 gap-6 animate-zoomFadeIn"
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black text-3xl"
        >
          &times;
        </button>

        {/* Hình ảnh */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.productName}
            className="max-h-80 object-contain rounded-lg"
          />
        </div>

        {/* Thông tin */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-2">{product.productName}</h2>
          <p className="text-xl font-bold text-green-700 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a
            placerat nisl, nec luctus elit.
          </p>

          <button className="bg-[#f9bf29] border border-[#f9bf29] text-black px-5 py-3 rounded-xl font-bold hover:bg-[#f9bf29] cursor-pointer transition duration-300 w-fit">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
