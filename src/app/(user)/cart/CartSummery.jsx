import { usePayment } from "@/hooks/usePayment";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

function CartSummery({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: mutatePayment } = usePayment();

  const paymentHandler = async () => {
    try {
      const { message } = await mutatePayment();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(err?.response?.data?.message, {
        duration: 3000,
      });
    }
  };
  //   console.log(totalOffAmount);
  return (
    <div className=" flex-col border rounded-xl bg-stone-100 px-8 py-3 flex justify-between space-y-5 container lg:max-w-screen-lg">
      <p className="font-bold mb-6">CartSummery</p>
      <div>
        <div className="flex items-center justify-between mb-6">
          <p>total Price</p>
          <p>{totalGrossPrice}</p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <p>Off Price</p>
          <p className="text-red-500"> {totalOffAmount}</p>
        </div>
        <div className="flex items-center justify-between mb-6 font-bold">
          <p>Net Price</p>
          <p>{totalPrice}</p>
        </div>
        <button
          onClick={paymentHandler}
          className="bg-sky-400 text-white w-full hover:text-sky-600 hover:bg-sky-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
        >
          Payment
        </button>
      </div>
    </div>
  );
}

export default CartSummery;
