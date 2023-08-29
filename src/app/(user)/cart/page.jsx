"use client";

import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { HashLoader } from "react-spinners";
import CartItem from "./CartItem";
import CartSummery from "./CartSummery";

function Cart() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};
  // console.log(data);

  if (isLoading)
    return (
      <div className=" flex  gap-y-10 items-center justify-center mt-24">
        <HashLoader
          color="rgb(56 189 248)"
          loading="true"
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  if (!data || !user)
    return (
      <div className=" flex flex-col gap-y-10 items-center justify-start mt-6">
        Cart page
        <div className="container lg:max-w-screen-lg">
          <p className="mb-4 font-bold">please login First</p>
          <Link href="/login" className="text-lg font-bold text-cyan-500">
            LOGIN
          </Link>
        </div>
      </div>
    );

  if (!user?.cart?.products || user?.cart?.products.length === 0)
    return (
      <div className=" flex flex-col gap-y-10 items-center justify-start mt-6">
        Cart page
        <div className="container lg:max-w-screen-lg">
          <p className="mb-4 font-bold">
            Cart is Empty. please Choose a product
          </p>
          <Link href="/products" className="text-lg font-bold text-cyan-500">
            Product Page
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      {/* <h1>Cart page</h1> */}
      <div className="grid md:grid-cols-4 gap-x-2 ">
        <div className="col-span-3 container lg:max-w-screen-lg gap-y-10 items-center justify-start mt-6">
          {user &&
            cart &&
            cart?.productDetail.map((item) => {
              return (
                <>
                  <CartItem item={item} key={item._id} />
                </>
              );
            })}
        </div>
        <div className="col-span-1 mt-6 gap-y-10 ">
          <CartSummery payDetail={cart.payDetail} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
