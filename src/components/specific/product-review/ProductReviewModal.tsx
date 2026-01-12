"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import api from "lib/axiosInstance";

type FormValues = {
  comment: string;
  rating: number;
};

const ProductReviewModal = ({ product, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  // Update react-hook-form field when clicking stars
  const handleStarClick = (star: number) => {
    setRating(star);
    setValue("rating", star, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form data:", data);

    const res = await api.post("/reviews", {
      product: product._id,
      rating: data.rating,
      comment: data.comment,
    });

    if (!res) {
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
          onClick={() => handleStarClick(starNumber)}
          onMouseEnter={() => setHoveredStar(starNumber)}
          onMouseLeave={() => setHoveredStar(0)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center fade-in">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Product Reviews</h2>

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
            <p className="text-gray-500">description</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-5"
        >
          <div className="flex gap-5 items-center">
            <label className="block">Product quality:</label>
            <div>{renderStars()}</div>
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm">
              Please select number of stars
            </p>
          )}
          <input
            type="hidden"
            {...register("rating", {
              required: "Please select number of stars",
              min: { value: 1, message: "Select at least 1 star" },
              max: { value: 5, message: "Maximum 5 stars" },
            })}
          />

          <label className="block">
            Comment:
            <textarea
              {...register("comment", { required: "Please enter a comment" })}
              className="border rounded p-2 w-full mt-1"
              rows={4}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm">{errors.comment.message}</p>
            )}
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#ee4d2d] text-white rounded-md"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductReviewModal;
