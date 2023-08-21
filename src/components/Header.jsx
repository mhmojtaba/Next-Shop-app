"use client";

import { useGetUser } from "@/hooks/useAuth";

import Link from "next/link";
import React from "react";

function Header() {
  const { data, error, isLoading } = useGetUser();
  //

  // console.log({ data, error, isLoading });
  return (
    <header
      className={`mx-auto xl:max-w-screen-2xl bg-red-300 transition-all duration-100 ${
        isLoading ? "opacity-50 blur-sm" : " opacity-100 blur-none"
      }`}
    >
      <ul className=" w-full flex justify-around items-center h-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li className="relative">
          <Link href="/cart">
            cart
            <span className="ml-2 text-white text-sm absolute -top-1 -right-3">
              {data && data.data.data.cart.payDetail.orderItems.length}
            </span>
          </Link>
        </li>
        <li>
          <Link href="/admin">Admin</Link>
        </li>
        {data ? (
          <Link href="/profile">
            <span>{data.data.data.user.name}</span>
          </Link>
        ) : (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
