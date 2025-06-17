"use client";
import { unsetAuth } from "lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    unsetAuth();
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/login"; // hoặc dùng router.push nếu muốn
  };

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
        {!user ? (
          <>
            <li className={navLinkClass("/login")}>
              <Link href="/login">Sign in</Link>
            </li>
            <li className={navLinkClass("/register")}>
              <Link href="/register">Sign up</Link>
            </li>
          </>
        ) : (
          <li className="relative" ref={menuRef}>
            <div
              className="cursor-pointer w-7 h-7 rounded-full overflow-hidden border-2 border-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {menuOpen && (
              <ul className="absolute right-0 mt-2 bg-white shadow-md rounded-md text-sm z-50 text-[#403f43]">
                <li className="rounded-md px-4 py-2 hover:bg-gray-100">
                  <p>
                    {user.familyName} {user.givenName}
                  </p>
                  <p className="text-[12px]">{user.email}</p>
                  <p className="border"></p>
                </li>
                <li className=" rounded-md px-4 py-2 hover:bg-[#dbfdeb]">
                  <Link
                    className="flex items-center gap-4"
                    href="/purchase"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <svg
                      className="w-6 h-6 "
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
                        d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z"
                      />
                    </svg>
                    Đơn mua
                  </Link>
                </li>

                <li className=" rounded-md px-4 py-2 hover:bg-[#dbfdeb]">
                  <Link
                    className="flex items-center gap-4"
                    href="/profile"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
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
                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Profile
                  </Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-4 rounded-md px-4 py-2 hover:bg-[#dbfdeb] cursor-pointer"
                >
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
                      d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                    />
                  </svg>
                  Logout
                </li>
              </ul>
            )}
          </li>
        )}

        <li className={navLinkClass("/shopping-cart")}>
          <Link href="/shopping-cart">
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
          </Link>
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
