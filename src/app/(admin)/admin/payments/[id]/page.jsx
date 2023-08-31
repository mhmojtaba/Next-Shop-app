"use client";

import { adminPaymentDetailTableTHeads } from "@/const/tableHeads";
import { useGetOnePayment } from "@/hooks/usePayment";
import { useParams } from "next/navigation";
import { HashLoader } from "react-spinners";

function Page() {
  const { id } = useParams();
  const { data, isLoading } = useGetOnePayment(id);
  const { payment } = data || {};
  //   console.log(payment);
  if (isLoading) return <HashLoader />;

  return (
    <div>
      <h1>Payment Detail</h1>
      <div
        className="max-w-screen-md mx-auto border-2 border-gray-400 rounded-xl"
        dir="rtl"
      >
        {payment.map((pay, index) => {
          return (
            <div key={pay._id}>
              <div className="table_td  truncate">
                شماره سفارش:
                <span className="text-blue-500 mr-3">{pay.invoiceNumber}</span>
              </div>
              <div className="table_td truncate">
                توضیحات :
                <span className="text-blue-500 mr-3">{pay.description}</span>
              </div>
              <div className=" table_td flex ">
                کاربر:
                <div className="flex flex-col items-start mr-8">
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
              </div>
              <div className=" table_td flex">
                سفارشات:
                <div className="flex flex-col items-start mr-8">
                  {pay.cart.productDetail.map((product) => (
                    <span
                      className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate"
                      key={product._id}
                    >
                      {product.title}
                    </span>
                  ))}
                </div>
              </div>
              <div className="table_td">
                مبلغ کل:
                <span className="text-blue-500 mr-3">{pay.amount}</span>
              </div>
              <div className="table_td">
                تاریخ سفارش:
                <span className="text-blue-500 mr-3">{pay.createdAt}</span>
              </div>
              <div className="table_td flex">
                کد تخفیف:
                {pay.cart.coupon ? (
                  <span className="bg-green-400 rounded-xl mb-2 px-2 py-1 inline-block whitespace-nowrap mr-3">
                    {pay.cart.coupon}
                  </span>
                ) : (
                  <span className="bg-rose-400 rounded-xl mb-2 px-2 py-1 inline-block whitespace-nowrap mr-3">
                    بدون کوپن
                  </span>
                )}
              </div>
              <div className="table_td flex">
                وضعیت سفارش:
                <div>
                  {pay.status === "COMPLETED" ? (
                    <span className="bg-green-400 rounded-xl mb-2 px-2 py-1 mr-3">
                      موفق
                    </span>
                  ) : (
                    <span className="bg-rose-400 rounded-xl mb-2 px-2 py-1 mr-3">
                      نا موفق
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
