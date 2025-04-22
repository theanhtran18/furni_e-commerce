"use client";

import { useState } from "react";

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {open && (
        <div className="flex flex-col w-screen mt-14  bg-[#3b5d50] ">
          <a href="#" className=" hover:bg-gray-100">
            Sản phẩm
          </a>
          <a href="#" className=" hover:bg-gray-100">
            Dịch vụ
          </a>
          <a href="#" className=" hover:bg-gray-100">
            Liên hệ
          </a>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
