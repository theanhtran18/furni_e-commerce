"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductReviewModal from "../product-review/ProductReviewModal";

const OrderCard = ({ filterOrders, handleBuyBack, handleCancelOrder }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {Array.isArray(filterOrders) && filterOrders.length > 0 ? (
        filterOrders.map((order, index) => (
          <div key={`${order._id}-${index}`}>
            <div className="mx-30 mb-10">
              <div className="bg-white">
                <div className="p-5 flex justify-between">
                  <h2 className="font-bold">{order.seller.name}</h2>
                  <p className="flex gap-3 text-[#26aa99]">
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                      />
                    </svg>
                    {order.status.toLowerCase() === "shipping"
                      ? "Order is being shipped"
                      : order.status.toLowerCase() === "delivered"
                      ? "Delivery successful"
                      : order.status.toLowerCase() === "cancelled"
                      ? "Order cancelled"
                      : "Processing"}
                  </p>
                </div>
                <p className="border-1 border-[#3c7b67] mx-5"></p>
                <div className="p-5 flex justify-between items-center">
                  <div className="flex ">
                    <Image
                      src={`/${order.product.image}`}
                      alt="Product"
                      width={100}
                      height={100}
                      className="border border-gray-200 rounded-md"
                    />
                    <div className="flex flex-col justify-between px-5">
                      <h2 className="font-semibold">
                        {order.product.productName}
                      </h2>
                      <p>mo ta</p>
                      <p>x{order.quantity}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#ee4d2d]">₫{order.totalPrice}</p>
                  </div>
                </div>
                <div></div>
              </div>
              {/*Xác nhận, trả hàng, đánh giá */}

              <div className="bg-white p-5 flex justify-between  gap-4 mt-0.5">
                <p className="mt-15 text-gray-500 text-sm">
                  {new Date(order.updatedAt).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </p>
                <div className="flex flex-col items-end gap-4">
                  <div className="flex ">
                    Total amount:{" "}
                    <p className="text-lg text-[#ee4d2d]">
                      ₫{order.totalPrice}{" "}
                    </p>
                  </div>
                  {order.status === "pending" ? (
                    <div>
                      <button
                        className="border text-white bg-[#ee4d2d] py-2 px-4 rounded-md font-bold text-sm cursor-pointer"
                        onClick={() => handleCancelOrder(order)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : order.status === "shipping" ? (
                    <button className="border p-2 rounded-md font-bold text-sm cursor-pointer">
                      View Store Reviews
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        className="border text-white bg-[#ee4d2d] py-2 px-4 rounded-md font-bold text-sm cursor-pointer"
                        onClick={() => handleBuyBack(order)}
                      >
                        Buy Back
                      </button>
                      <button
                        className="border p-2 rounded-md font-bold text-sm cursor-pointer"
                        onClick={() => setShowModal(true)}
                      >
                        Product Review
                      </button>
                      {showModal && (
                        <ProductReviewModal
                          product={order.product}
                          onClose={() => setShowModal(false)}
                        />
                      )}
                      <button className="border p-2 rounded-md font-bold text-sm cursor-pointer">
                        View Store Reviews
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center italic m-10">Không có đơn hàng!</div>
      )}
    </>
  );
};

export default React.memo(OrderCard);
