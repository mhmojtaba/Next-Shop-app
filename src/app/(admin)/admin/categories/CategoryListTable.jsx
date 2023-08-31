import { categoryListTableTHeads } from "@/const/tableHeads";
import { useRemoveCategory } from "@/hooks/useCategories";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";

function CategoryListTable({ categories }) {
  const { isLoading, mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();

  const removeCategoryHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-category"] });
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };

  return (
    <div className="shadow-sm overflow-auto my-8" dir="rtl">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {categoryListTableTHeads.map((item) => {
              return (
                <th className="whitespace-nowrap table__th" key={item.id}>
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.map((category, index) => {
              return (
                <tr key={category._id}>
                  <td className="table__td">{index + 1}</td>
                  <td className="table__td  whitespace-nowrap font-bold">
                    {category.title}
                  </td>
                  <td className="table__td">{category.description}</td>
                  <td className="table__td">{category.englishTitle}</td>
                  <td className="table__td">{category.type}</td>
                  <td className="table__td font-bold text-lg">
                    <div className="flex items-center justify-center gap-x-4">
                      <Link href={`/admin/categories/${category._id}`}>
                        <HiEye className="text-sky-600 w-6 h-6" />
                      </Link>
                      <button
                        onClick={() => removeCategoryHandler(category._id)}
                      >
                        <HiTrash className="text-rose-600 w-6 h-6" />
                      </button>
                      <Link href={`/admin/categories/edit/${category._id}`}>
                        <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryListTable;
