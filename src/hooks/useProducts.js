import {
  addProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: getProducts,
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useGetProductsById = (id) =>
  useQuery({
    queryKey: ["get-products"],
    queryFn: () => getProductsById(id),
    retry: false,
    refetchOnWindowFocus: true,
  });

export const useAddProducts = () =>
  useMutation({
    mutationFn: addProducts,
  });

export const useUpdateProducts = () =>
  useMutation({
    mutationFn: updateProducts,
  });
