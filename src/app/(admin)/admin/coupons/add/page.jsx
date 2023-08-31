"use client";

import CouponForm from "@/components/CouponForm";
import { useAddCoupon } from "@/hooks/useCoupon";
import { useGetProducts } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function AddCoupons() {
  const router = useRouter();
  const { isLoading, mutateAsync } = useAddCoupon();
  const { data } = useGetProducts();
  const { products } = data || {};
  //   console.log(products);
  const [formValue, setFormValue] = useState({
    code: "",
    amount: "",
    usageLimit: "",
  });

  const [type, setType] = useState("percent");
  const [productId, setProductId] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());

  const changeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const couponSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        ...formValue,
        type,
        productIds: productId.map((p) => p._id),
        expireDate: new Date(expireDate).toISOString(),
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full  mb-10 ">
      <h1 className="mb-4 text-xl font-bold">add product</h1>
      <CouponForm
        onSubmit={couponSubmitHandler}
        formValue={formValue}
        changeHandler={changeHandler}
        type={type}
        setType={setType}
        products={products}
        setProductId={setProductId}
        expireDate={expireDate}
        setExpireDate={setExpireDate}
        isLoading={isLoading}
      />
    </div>
  );
}

export default AddCoupons;
