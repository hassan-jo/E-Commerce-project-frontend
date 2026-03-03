import { apiClient } from "./apiClient";

export const getProducts = () => {
  return apiClient("/products");
};

export const createProduct = (data) => {
  return apiClient("/products", {
    method: "POST",
    body: JSON.stringify(data)
  });
};

export const updateProduct = (id, data) => {
  return apiClient(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};

export const deleteProduct = (id) => {
  return apiClient(`/products/${id}`, {
    method: "DELETE"
  });
};