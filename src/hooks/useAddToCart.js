import { addToCart, decrementFromCart } from "@/services/addToCartService";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () =>
  useMutation({
    mutationFn: addToCart,
  });

export const useDecrementFromCart = () =>
  useMutation({
    mutationFn: decrementFromCart,
  });
