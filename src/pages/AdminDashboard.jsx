import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { getProducts } from "../services/productService";
import { getAllOrders } from "../services/orderService";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

      const productsData = await getProducts();
      const ordersData = await getAllOrders();

      if (productsData?.products)
        setProducts(productsData.products);

      if (ordersData)
        setOrders(ordersData);

    };

    fetchData();

  }, []);

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>

      <Box mb={8}>
        <Typography variant="h4" fontWeight="900" mb={1}>
          Admin Dashboard
        </Typography>

        <Typography color="text.secondary">
          Monitor your business performance in real time.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)"
          },
          gap: 4,
          mb: 8
        }}
      >

        <Card sx={{
          p: 5,
          borderRadius: "24px",
          background: "linear-gradient(135deg,#1e293b,#334155)",
          color: "white",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
        }}>
          <Typography variant="h3" fontWeight="800">
            {products.length}
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            Products
          </Typography>
        </Card>

        <Card sx={{
          p: 5,
          borderRadius: "24px",
          background: "linear-gradient(135deg,#0f766e,#0d9488)",
          color: "white",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
        }}>
          <Typography variant="h3" fontWeight="800">
            {orders.length}
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            Orders
          </Typography>
        </Card>

        <Card sx={{
          p: 5,
          borderRadius: "24px",
          background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
          color: "white",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)"
        }}>
          <Typography variant="h3" fontWeight="800">
            ${totalRevenue}
          </Typography>
          <Typography sx={{ opacity: 0.8 }}>
            Total Revenue
          </Typography>
        </Card>

      </Box>

      <Box display="flex" gap={4} flexWrap="wrap">

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/admin/products")}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: "14px",
            fontWeight: "700",
            background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
            "&:hover": {
              background: "linear-gradient(90deg,#2563eb,#0891b2)"
            }
          }}
        >
          Manage Products
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/admin/orders")}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: "14px",
            fontWeight: "700"
          }}
        >
          Manage Orders
        </Button>

      </Box>
    </Container>
  );
};

export default AdminDashboard;