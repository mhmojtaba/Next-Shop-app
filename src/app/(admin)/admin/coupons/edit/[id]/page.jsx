"use client";
import TextField from "@/common/textField";
import { useGetOneCoupon, useUpdateCoupon } from "@/hooks/useCoupon";
import { useGetProducts } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Radio from "@/common/Radio";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import { HashLoader } from "react-spinners";
import CouponForm from "@/components/CouponForm";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading } = useGetOneCoupon(id);
  const { coupon } = data || {};
  const { data: productsData } = useGetProducts();
  const { products } = productsData || {};
  const { isLoading: isUpdating, mutateAsync } = useUpdateCoupon();
  //   console.log(coupon);
  const [formValue, setFormValue] = useState({});
  const [type, setType] = useState("");
  const [productId, setProductId] = useState([]);
  const [expireDate, setExpireDate] = useState(new Date());

  useEffect(() => {
    if (coupon) {
      setFormValue({
        code: coupon.code,
        amount: coupon.amount,
        usageLimit: coupon.usageLimit,
      });
      setType(coupon.type);
      setProductId(coupon.productIds);
      setExpireDate(new Date(coupon.expireDate));
    }
  }, [data]);

  const changeHandler = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const couponSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({
        id,
        value: {
          ...formValue,
          type,
          productIds: productId.map((p) => p._id),
          expireDate: new Date(expireDate).toISOString(),
        },
      });
      toast.success(message);
      router.push("/admin/coupons");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <HashLoader className="text-sky-400" />;
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">Editing coupons</h1>
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
        defaultValue={coupon.productIds}
      />
    </div>
  );
}

export default Page;
