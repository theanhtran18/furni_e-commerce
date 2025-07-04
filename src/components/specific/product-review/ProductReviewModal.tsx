"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

const ProductReviewModal = ({ product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE + "/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ product: product._id, rating, comment }),
    });
    if (!res.ok) {
      toast.error("Review failed!");
    } else toast.success("Product review succeed!!");

    onClose();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      return (
        <span
          key={starNumber}
          className={`cursor-pointer text-3xl ${
            starNumber <= (hoveredStar || rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredStar(starNumber)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20  flex items-center justify-center fade-in">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h2>
        <div className="flex gap-4 mt-5">
          <Image
            src={`/${product.image}`}
            alt="Product"
            width={100}
            height={100}
            className="border border-gray-200 rounded-md"
          />
          <div>
            <h2>{product.productName}</h2>
            <p className="text-gray-500">dicription</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-5 items-center">
            <label className="block my-5">Chất lượng sản phẩm:</label>
            <div>{renderStars()}</div>
          </div>
          <label className="block">
            Nhận xét:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border rounded p-2 w-full mt-1"
              rows="4"
              required
            />
          </label>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md cursor-pointer "
            >
              Trở Lại
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ee4d2d] text-white rounded-md cursor-pointer"
            >
              Hoàn Thành
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReviewModal;
