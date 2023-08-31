"use client";

import CategoryForm from "@/components/CategoryForm";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};
  const [formValue, setFormValue] = useState({});
  const { isLoading: isUpdating, mutateAsync } = useUpdateCategory();
  //   console.log(category);

  useEffect(() => {
    if (category) {
      setFormValue({
        title: category.title,
        englishTitle: category.englishTitle,
        type: category.type,
        description: category.description,
      });
    }
  }, [data]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id,
        value: {
          ...formValue,
        },
      });

      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  //
  if (isLoading) return <HashLoader className="text-sky-400" />;

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">Editing Category</h1>
      <CategoryForm
        formValue={formValue}
        onSubmit={submitHandler}
        onChange={formHandler}
        isLoading={isUpdating}
      />
    </div>
  );
}

export default Page;
