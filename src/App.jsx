import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

/* Lazy Loading Pages */
const Home = React.lazy(() => import("./pages/Home"));
const Cart = React.lazy(() => import("./pages/Cart"));
const OrderFollowing = React.lazy(() => import("./pages/OrderFollowing"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const Login = React.lazy(() => import("./pages/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const AdminProducts = React.lazy(() => import("./pages/AdminProducts"));
const AdminOrders = React.lazy(() => import("./pages/AdminOrders"));

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Navbar />
      <Toolbar />

      <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/orderfollowing"
            element={
              <ProtectedRoute>
                <OrderFollowing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admindashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;