import {
  addProducts,
  getProducts,
  getProductsById,
  removeProducts,
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
    queryKey: ["get-products", id],
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

export const useRemoveProduct = () =>
  useMutation({
    mutationFn: removeProducts,
  });
