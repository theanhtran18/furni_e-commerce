"use client";

import { useState } from "react";

const tabs = ["All", "Pending", "Shipping", "Delivered", "Cancelled"];

export default function OrderStatusTabs({ onTabChange }) {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab); // Gửi tab được chọn về cha
  };

  return (
    <div className="bg-white mx-30 my-5">
      <div className="flex justify-between border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`relative py-4 text-[15px] text-center flex-1 transition duration-200 cursor-pointer
              ${
                activeTab === tab
                  ? "text-[#4da584] font-semibold"
                  : "text-gray-700 hover:text-[#3b5d50]"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#459375]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
