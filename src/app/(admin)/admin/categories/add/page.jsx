"use client";
import CategoryForm from "@/components/CategoryForm";
import { useAddCategory } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function AddCategory() {
  const router = useRouter();
  const { isLoading, mutateAsync } = useAddCategory();
  const [formValue, setFormValue] = useState({
    title: "",
    englishTitle: "",
    type: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({ ...formValue });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //   console.log(formValue);

  return (
    <div className="w-full  mb-10 ">
      <h1 className="mb-4 text-xl font-bold">Add Category</h1>
      <CategoryForm
        formValue={formValue}
        onSubmit={submitHandler}
        onChange={formHandler}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AddCategory;
