"use client";

import { useGetAllCoupon } from "@/hooks/useCoupon";
import CouponDataTable from "./CouponDataTable";
import Link from "next/link";
import { BsPlusCircleFill } from "react-icons/bs";

function Coupons() {
  const { data, isLoading } = useGetAllCoupon();
  const { coupons } = data || {};
  console.log(coupons);
  return (
    <div>
      <h1 className="mb-4">Coupon Page</h1>
      <Link
        href="/admin/coupons/add"
        className=" text-sky-400  hover:text-sky-600 flex items-center gap-x-2 py-2"
      >
        <BsPlusCircleFill />
        add a Coupon
      </Link>
      {coupons?.length ? (
        <CouponDataTable coupons={coupons} isLoading={isLoading} />
      ) : (
        <p>There is no Coupon</p>
      )}
    </div>
  );
}

export default Coupons;
