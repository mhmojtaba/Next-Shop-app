import {
  getAllPayment,
  getOnePayment,
  payment,
} from "@/services/paymentService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const usePayment = () =>
  useMutation({
    mutationFn: payment,
  });

export const useGetAllPayment = () =>
  useQuery({
    queryKey: ["get-payments"],
    queryFn: getAllPayment,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetOnePayment = (id) =>
  useQuery({
    queryKey: ["get-payments", id],
    queryFn: () => getOnePayment(id),
    retry: false,
    refetchOnWindowFocus: true,
  });
