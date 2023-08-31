import { couponListTableTHeads } from "@/const/tableHeads";
import { useRemoveCoupon } from "@/hooks/useCoupon";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { HiEye, HiTrash } from "react-icons/hi";
import { RiEdit2Line } from "react-icons/ri";
import { HashLoader } from "react-spinners";

function CouponDataTable({ coupons, isLoading }) {
  const { mutateAsync } = useRemoveCoupon();
  const queryClient = useQueryClient();
  // console.log(coupons);

  const removeCouponHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-coupon"] });
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };

  if (isLoading) return <HashLoader />;
  return (
    <div>
      <h1>Coupons</h1>

      <div className="min-w-[700px] overflow-x-auto" dir="rtl">
        <table className="border-collapse w-full text-sm table-auto">
          <thead>
            <tr>
              {couponListTableTHeads.map((head, index) => {
                return (
                  <th
                    className="whitespace-nowrap border-gray-700 gap-x-2 mb-2 table_th"
                    key={index}
                  >
                    {head.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {coupons.map((c, index) => {
              return (
                <tr key={c._id}>
                  <td className="table_td">{index + 1}</td>
                  <td className="table_td max-w-[160px] truncate">{c.code}</td>
                  <td className="table_td max-w-[200px] truncate">{c.type}</td>
                  <td className="table_td">{c.amount}</td>
                  <td className=" table_td">
                    <div className="flex flex-col items-start">
                      {c.productIds.map((product) => (
                        <span
                          className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate"
                          key={product._id}
                        >
                          {product.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table_td">{c.usageCount}</td>
                  <td className="table_td">{c.usageLimit}</td>

                  <td className="table_td max-w-[160px] truncate">
                    {new Date(c.expireDate).toLocaleDateString()}
                  </td>
                  <td className="table_td">
                    <div>
                      {c.isActive === true ? (
                        <span className="bg-green-400 rounded-xl mb-2 px-2 py-1">
                          فعال
                        </span>
                      ) : (
                        <span className="bg-rose-400 rounded-xl mb-2 px-2 py-1">
                          غیرفعال
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="table__td font-bold text-lg">
                    <div className="flex items-center justify-center gap-x-4">
                      <button onClick={() => removeCouponHandler(c._id)}>
                        <HiTrash className="text-rose-600 w-6 h-6" />
                      </button>
                      <Link href={`/admin/coupons/edit/${c._id}`}>
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
    </div>
  );
}

export default CouponDataTable;
