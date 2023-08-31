"use client";

import { useGetProductsById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

function Page() {
  const params = useParams();
  const { data, isLoading } = useGetProductsById(params.id);
  const { product } = data || {};
  // console.log(product);
  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1>{product?.title}</h1>
      <h3>{product?.description}</h3>
    </div>
  );
}

export default Page;
