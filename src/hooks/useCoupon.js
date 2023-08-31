import {
  addCoupon,
  getCoupon,
  getOneCoupon,
  removeCoupon,
  updateCoupon,
} from "@/services/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupon = () =>
  useQuery({
    queryKey: ["get-coupon"],
    queryFn: getCoupon,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetOneCoupon = (id) =>
  useQuery({
    queryKey: ["get-coupon", id],
    queryFn: () => getOneCoupon(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddCoupon = () =>
  useMutation({
    mutationFn: addCoupon,
  });

export const useUpdateCoupon = () =>
  useMutation({
    mutationFn: updateCoupon,
  });

export const useRemoveCoupon = () =>
  useMutation({
    mutationFn: removeCoupon,
  });
