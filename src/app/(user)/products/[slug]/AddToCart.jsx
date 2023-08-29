"use client";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useGetUser } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";

function AddToCart({ product }) {
  //   console.log(product);
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useGetUser();
  const { user } = data || {};
  const { isLoading, mutateAsync: mutateAddToCart } = useAddToCart();

  const productInCart =
    user && user.cart?.products.some((item) => item.productId === product._id);
  // console.log(productInCart);

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("login first");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }
    try {
      const { message } = await mutateAddToCart(product._id);
      toast.success(message);
      //refresh UI
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        duration: 3000,
      });
    }
  };

  const checkoutHandler = async () => {
    toast.success("checkout");
  };

  return (
    <div className="mt-5">
      {productInCart ? (
        <Link href="/cart">
          <button
            onClick={checkoutHandler}
            className="bg-rose-400 text-white hover:text-rose-600 hover:bg-rose-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
          >
            ادامه سفارش
          </button>
        </Link>
      ) : isLoading ? (
        <CircleLoader
          color="rgb(56 189 248)"
          loading="true"
          size={18}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <button
          onClick={addToCartHandler}
          className="bg-sky-400 text-white hover:text-sky-600 hover:bg-sky-200 rounded-lg outline-none px-4 py-2 flex justify-center items-center"
        >
          اضافه به سبد خرید
        </button>
      )}
    </div>
  );
}

export default AddToCart;
