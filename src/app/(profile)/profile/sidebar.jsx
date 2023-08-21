"use client";

import { logout } from "@/services/authService";
import Link from "next/link";
import React from "react";

function Sidebar() {
  const logoutHandler = async () => {
    await logout();
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("token");
    document.location.href = "/";
  };
  return (
    <div>
      <ul className="flex flex-col space-y-8 pl-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile/dashboard">dashboard</Link>
        </li>
        <li>
          <Link href="/profile/items">Items</Link>
        </li>
        <li>
          <button
            onClick={logoutHandler}
            className="bg-red-400 text-white hover:text-red-600 hover:bg-red-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
          >
            logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
