"use client";

import { useGetProductsById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

function Page() {
  const params = useParams();
  const { data, isLoading } = useGetProductsById(params.id);
  const { product } = data || {};
  //   console.log(product);
  if (isLoading) return <HashLoader />;
  return <div>page</div>;
}

export default Page;
