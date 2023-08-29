"use client";

import { useState } from "react";
import { useGetCategories } from "@/hooks/useCategories";
import { useAddProducts } from "@/hooks/useProducts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

function AddProducts() {
  const router = useRouter();
  const { isLoading, mutateAsync } = useAddProducts();
  const { data } = useGetCategories();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    slug: "",
    brand: "",
    price: "",
    discount: "",
    offPrice: "",
    countInStock: "",
    imageLink: "",
  });
  const { categories } = data || {};

  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  //   console.log(categories);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formValue,
        tags,
        category: selectedCategory._id,
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
  return (
    <div className="w-full  mb-10 ">
      <h1 className="mb-4 text-xl font-bold">add product</h1>
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

export default AddProducts;
