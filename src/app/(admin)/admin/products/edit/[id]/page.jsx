"use client";

import ProductForm from "@/components/ProductForm";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductsById, useUpdateProducts } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetProductsById(id);
  const { product } = data || {};
  // console.log(id);
  // console.log(product._id);
  const { data: categoriesData } = useGetCategories();
  const { categories } = categoriesData || {};
  const [formValue, setFormValue] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isLoading: isUpdating, mutateAsync } = useUpdateProducts();

  useEffect(() => {
    if (product) {
      setFormValue({
        title: product.title,
        description: product.description,
        slug: product.slug,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        offPrice: product.offPrice,
        countInStock: product.countInStock,
        imageLink: product.imageLink,
      });
      setTags(product.tags);
      setSelectedCategory(product.category);
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id,
        value: {
          ...formValue,
          tags,
          category: selectedCategory._id,
        },
      });

      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //
  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">editing products</h1>
      <ProductForm
        onSubmit={submitHandler}
        tags={tags}
        setTags={setTags}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        onChange={formHandler}
        formValue={formValue}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}

export default Page;
