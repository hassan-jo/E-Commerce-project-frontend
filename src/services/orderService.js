import { apiClient } from "./apiClient";

// ✅ إنشاء أوردر (Checkout)
export const createOrder = () => {
  return apiClient("/orders/checkout", {
    method: "POST"
  });
};

// 👤 أوردرات المستخدم
export const getMyOrders = () => {
  return apiClient("/orders/my");
};

// ❌ إلغاء الطلب
export const cancelOrder = (id) => {
  return apiClient(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status: "cancelled" })
  });
};

// 👑 للأدمن (اختياري)
export const getAllOrders = () => {
  return apiClient("/orders");
};


// ✏ تحديث الحالة
export const updateOrderStatus = (id, status) => {
  return apiClient(`/orders/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status })
  });
};

// 🗑 حذف أوردر
export const deleteOrderById = (id) => {
  return apiClient(`/orders/${id}`, {
    method: "DELETE"
  });
};