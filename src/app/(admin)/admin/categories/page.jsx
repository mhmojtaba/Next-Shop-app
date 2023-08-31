"use client";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import { BsPlusCircleFill } from "react-icons/bs";
import { useGetCategories } from "@/hooks/useCategories";
import CategoryListTable from "./CategoryListTable";

function Categories() {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};
  // console.log(categories);

  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1 className="mb-4">Products</h1>
      <Link
        href="/admin/categories/add"
        className=" text-sky-400  hover:text-sky-600 flex items-center gap-x-2 py-2"
      >
        <BsPlusCircleFill />
        add a Category
      </Link>
      <CategoryListTable categories={categories} />
    </div>
  );
}

export default Categories;
