import { getAllPayment, payment } from "@/services/paymentService";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () =>
  useMutation({
    mutationFn: payment,
  });

export const useGetAllPayment = () =>
  useMutation({
    mutationFn: getAllPayment,
  });
