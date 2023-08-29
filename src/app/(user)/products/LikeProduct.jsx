"use client";

import { likeProducts } from "@/services/productService";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { BiLike, BiSolidLike } from "react-icons/bi";

function LikeProduct({ product }) {
  const router = useRouter();
  const pathname = usePathname();

  const likeHandler = async () => {
    // console.log(product._id);
    try {
      const { message } = await likeProducts(product._id);
      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        duration: 3000,
      });
    }
  };

  return (
    <button onClick={likeHandler}>
      {product.isLiked ? (
        <BiSolidLike className="w-5 h-5 fill-rose-500" />
      ) : (
        <BiLike className="w-5 h-5" />
      )}
    </button>
  );
}

export default LikeProduct;
