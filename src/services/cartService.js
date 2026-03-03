import { apiClient } from "./apiClient";

export const getCart = () => {
  return apiClient("/cart");
};

export const addToCart = (productId, quantity = 1) => {
  return apiClient("/cart", {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity
    })
  });
};

export const removeFromCart = (productId) => {
  return apiClient(`/cart/${productId}`, {
    method: "DELETE"
  });
};