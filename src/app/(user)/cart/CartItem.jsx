"use client";

import { useAddToCart, useDecrementFromCart } from "@/hooks/useAddToCart";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

function CartItem({ item }) {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync: mutateAddToCart } = useAddToCart();
  const { isLoading: isDecrementing, mutateAsync: mutateDecrementFromCart } =
    useDecrementFromCart();

  const incrementHandler = async () => {
    try {
      const { message } = await mutateAddToCart(item._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(err?.response?.data?.message, {
        duration: 3000,
      });
    }
  };

  const decrementHandler = async () => {
    try {
      const { message } = await mutateDecrementFromCart(item._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(err?.response?.data?.message, {
        duration: 3000,
      });
    }
  };
  //   console.log(item);
  return (
    <div className="border rounded-xl bg-stone-100 px-8 py-3 flex justify-between mb-4">
      <span className="flex-1 font-bold">{item.title}</span>
      <div className="flex items-center font-bold gap-x-8">
        <span>quantity : {item.quantity}</span>
        <div className="flex gap-x-2">
          <button
            className="text-white rounded p-1 bg-blue-500"
            onClick={incrementHandler}
          >
            <HiPlus className="w-4 h-4" />
          </button>

          <button onClick={decrementHandler} className=" rounded p-1  ">
            {item.quantity > 1 ? (
              <HiMinus className="w-5 h-5 text-white bg-red-400" />
            ) : (
              <HiOutlineTrash className="text-rose-500 w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
