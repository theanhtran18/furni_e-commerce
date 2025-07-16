"use client";

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="cursor-pointer group relative rounded-xl overflow-hidden"
    >
      <div
        key={product._id}
        className="cursor-pointer group relative rounded-xl overflow-hidden"
      >
        {/* Overlay phía dưới */}
        <div
          className="absolute bottom-5 left-0 w-full h-2/3 bg-[#e8f0ef] rounded-2xl
             opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0
             transition-all duration-500 ease-out z-0"
        />

        {/* Ảnh */}
        <img
          src={product.image}
          alt={product.productName}
          className="mx-auto -mb-10 relative z-10"
        />

        {/* Tên + giá */}
        <div className="text-center z-10 relative mb-10 mt-20">
          <h3 className="text-lg font-medium mt-8">{product.productName}</h3>
          <p className="font-bold text-xl">${product.price.toFixed(2)}</p>
        </div>

        {/* Nút + */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 flex justify-center items-end z-10 pointer-events-none">
          <button
            className="w-10 h-10 rounded-full bg-black text-white text-2xl flex items-center justify-center
            opacity-0 group-hover:opacity-100 -translate-y-10 group-hover:translate-y-0 
            transition-all duration-500 delay-100 pointer-events-auto"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
