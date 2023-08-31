"use client";

import { adminPaymentListTableTHeads } from "@/const/tableHeads";
import { useGetAllPayment } from "@/hooks/usePayment";
import Link from "next/link";
import { HiEye } from "react-icons/hi";
import { HashLoader } from "react-spinners";

function Payments() {
  const { data, isLoading } = useGetAllPayment();
  const { payments } = data || {};
  // console.log(payments);
  if (isLoading) return <HashLoader visible="true" height="80" width="80" />;

  return (
    <div dir="rtl">
      <h1>Orders</h1>
      <div className="min-w-[700px] overflow-x-auto">
        <table className="border-collapse w-full text-sm table-auto">
          <thead>
            <tr>
              {adminPaymentListTableTHeads.map((head, index) => {
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
            {payments.map((pay, index) => {
              return (
                <tr key={pay._id}>
                  <td className="table_td">{index}</td>
                  <td className="table_td max-w-[160px] truncate">
                    {pay.invoiceNumber}
                  </td>
                  <td className="table_td max-w-[200px] truncate">
                    {pay.description}
                  </td>
                  <td className=" table_td">
                    <div className="flex flex-col items-start">
                      <span className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate">
                        {pay.user.name}
                      </span>
                      <span className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate">
                        {pay.user.email}
                      </span>
                      <span className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate">
                        {pay.user.phoneNumber}
                      </span>
                    </div>
                  </td>
                  <td className=" table_td">
                    <div className="flex flex-col items-start">
                      {pay.cart.productDetail.map((product) => (
                        <span
                          className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate"
                          key={product._id}
                        >
                          {product.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table_td">{pay.amount}</td>
                  <td className="table_td">{pay.createdAt}</td>
                  <td className="table_td">
                    <div>
                      {pay.status === "COMPLETED" ? (
                        <span className="bg-green-400 rounded-xl mb-2 px-2 py-1">
                          موفق
                        </span>
                      ) : (
                        <span className="bg-rose-400 rounded-xl mb-2 px-2 py-1">
                          نا موفق
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="table_td">
                    <Link href={`/admin/payments/${pay._id}`}>
                      <HiEye className="text-sky-500 w-6 h-6" />
                    </Link>
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

export default Payments;
