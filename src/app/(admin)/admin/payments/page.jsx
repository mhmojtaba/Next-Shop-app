"use client";

import { useGetAllPayment } from "@/hooks/usePayment";
import { HashLoader } from "react-spinners";

function Payments() {
  const { data, isLoading } = useGetAllPayment();
  // const { user, payments, cart } = data || {};
  console.log(data);
  if (isLoading)
    return (
      <HashLoader
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    );

  return (
    <div dir="rtl">
      <h1>Orders</h1>
      {/* <table className="border-collapse w-full text-sm table-auto min-w-[800px] ">
        <thead>
          <tr>
            {Thead.map((head) => {
              return (
                <th
                  className="whitespace-nowrap border-gray-700 gap-x-2 mb-2 table_th"
                  key={head.id}
                >
                  {head.lable}
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
                <td className="table_td">{pay.invoiceNumber}</td>
                <td className="table_td max-w-[200px] truncate">
                  {pay.description}
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
              </tr>
            );
          })}
        </tbody>
      </table> */}
    </div>
  );
}

export default Payments;

export const Thead = [
  {
    id: 1,
    lable: "#",
  },
  {
    id: 2,
    lable: "شماره فاکتور",
  },
  {
    id: 3,
    lable: "شرح",
  },
  {
    id: 4,
    lable: "سفارش",
  },
  {
    id: 5,
    lable: "مبلغ",
  },
  {
    id: 5,
    lable: "تاریخ",
  },
  {
    id: 5,
    lable: "وضعیت",
  },
];
