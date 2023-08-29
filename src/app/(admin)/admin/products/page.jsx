"use client";

import { useGetProducts } from "@/hooks/useProducts";
import Link from "next/link";
import React from "react";
import { HashLoader } from "react-spinners";
import ProductListTable from "./ProductListTable";

function Products() {
  const { data, isLoading } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1 className="mb-4">Products</h1>
      <Link
        href="/admin/products/add"
        className="bg-sky-400 text-white  hover:text-sky-600 hover:bg-sky-200 rounded-lg outline-none px-4 py-2"
      >
        add a product
      </Link>
      <ProductListTable products={products} />
    </div>
  );
}

export default Products;
