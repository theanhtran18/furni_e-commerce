"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (path) =>
    `relative cursor-pointer transition-all duration-200 
     ${
       pathname === path
         ? "text-white font-bold after:w-full"
         : "text-gray-300 after:w-0"
     } 
     hover:text-white 
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:bg-yellow-400 
     after:transition-all after:duration-300`;

  return (
    <header className="bg-[#3b5d50] sticky top-0 w-full z-[999] flex justify-between items-center px-5 sm:px-12 md:px-30 py-10 relative">
      <h1 className="text-4xl font-bold font-poppins text-white">Furni.</h1>

      {/* Menu items - hidden on mobile, flex on medium and up */}
      <ul className="hidden md:flex gap-8 text-white text-lg">
        <li className={navLinkClass("/")}>
          <Link href="/">Home</Link>
        </li>
        <li className={navLinkClass("/shop")}>
          <Link href="/shop">Shop</Link>
        </li>

        <li
          className="relative cursor-pointer text-gray-300 transition-all duration-200
             hover:text-white
             after:content-[''] after:absolute after:left-0 after:-bottom-1
             after:w-0 after:h-[2px] after:bg-yellow-400
             hover:after:w-full hover:after:transition-all hover:after:duration-300"
        >
          About us
        </li>
        <li className={navLinkClass("/login")}>
          <Link href="/login">Sign in</Link>
        </li>
        <li className={navLinkClass("/register")}>
          <Link href="/register">Sign up</Link>
        </li>
        <li className="hover:underline cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </li>
      </ul>

      {/* Toggle button - shown only on mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white z-20"
      >
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

      {/* Dropdown menu - only on mobile */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#3b5d50] py-4 z-10">
          <ul className="flex flex-col gap-4 text-white text-lg px-6">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Shop</li>
            <li className="hover:underline cursor-pointer">About us</li>
            <li className="hover:underline cursor-pointer">Sign in</li>
            <li className="hover:underline cursor-pointer">Sign up</li>
            <li className="hover:underline cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
