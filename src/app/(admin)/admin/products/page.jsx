"use client";

import { useGetProducts } from "@/hooks/useProducts";
import Link from "next/link";
import React from "react";
import { HashLoader } from "react-spinners";
import ProductListTable from "./ProductListTable";
import { BsPlusCircleFill } from "react-icons/bs";

function Products() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1 className="mb-4">Products</h1>
      <Link
        href="/admin/products/add"
        className=" text-sky-400  hover:text-sky-600 flex items-center gap-x-2 py-2"
      >
        <BsPlusCircleFill />
        add a product
      </Link>
      <ProductListTable products={products} />
    </div>
  );
}

export default Products;
