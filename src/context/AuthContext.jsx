import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const BASE_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    return token ? { token, role } : null;
  });

  const login = (token, role) => {

    localStorage.setItem("accessToken", token);
    localStorage.setItem("role", role);

    setUser({ token, role });
  };

  const logout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");

    setUser(null);

    window.location.href = "/";
  };

  const refreshAccessToken = async () => {

    try {

      const refreshToken = localStorage.getItem("refreshToken");

      const res = await fetch(BASE_URL + "/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
      });

      const data = await res.json();

if (data.accessToken) {
  localStorage.setItem("accessToken", data.accessToken);

  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  setUser({
    token: data.accessToken,
    role: data.role
  });
}

    } catch (error) {
      console.log("Refresh failed");
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      refreshAccessToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);