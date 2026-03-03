const BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = async (endpoint, options = {}) => {

  try {

    const token = localStorage.getItem("accessToken");

    const response = await fetch(BASE_URL + endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      }
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || "Request failed");
    }

    return await response.json();

  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
};