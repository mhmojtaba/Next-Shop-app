"use client";

import { useGetCategoryById } from "@/hooks/useCategories";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

function CategoryDetail() {
  const params = useParams();
  const { data, isLoading } = useGetCategoryById(params.id);
  const { category } = data || {};
  //   console.log(category);
  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1>{category?.title}</h1>
      <h3>{category?.description}</h3>
    </div>
  );
}

export default CategoryDetail;
