const BASE_URL = import.meta.env.VITE_API_URL;
export const loginUser = async (email, password) => {

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("accessToken", data.token);
  }

  return data;
};

export const registerUser = async (username, email, password) => {

  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  });

  return response.json();
};