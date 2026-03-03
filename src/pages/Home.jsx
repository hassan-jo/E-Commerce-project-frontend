import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { apiClient } from "../services/apiClient";
import { addToCart } from "../services/cartService";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ للتحكم في زر المنتج أثناء الإضافة
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ==============================
  // Fetch Products
  // ==============================

  const fetchProducts = async () => {

    const data = await apiClient("/products");

    if (data?.products) {
      setProducts(data.products);
    }

    setLoading(false);
  };

  // ==============================
  // Optimistic Add To Cart
  // ==============================

  const handleAddToCart = async (productId) => {

    if (addingProductId) return;

    setAddingProductId(productId);

    // ⭐ Optimistic feedback فوراً
    toast.success("Added to cart ✅");

    try {
      await addToCart(productId, 1);
    } catch {
      toast.error("Add to cart failed");

      // fallback sync
      fetchProducts();
    } finally {
      setAddingProductId(null);
    }
  };

  // ==============================

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ mt: 14 }}>
        <Grid container spacing={4}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item xs={12} md={3} key={i}>
              <Card sx={{ p: 2, width: "100%", maxWidth: "320px", margin: "auto" }}>
                <Skeleton variant="rectangular" height={200} />
                <Skeleton height={40} sx={{ mt: 2 }} />
                <Skeleton width="60%" />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Box>

      {/* HERO SECTION */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg,#0f172a 0%, #1e293b 50%, #2563eb 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="xl">
          <Box maxWidth="650px">
            <Typography variant="h2" fontWeight="900" mb={3}>
              Power Your Digital Business
            </Typography>

            <Typography variant="h6" sx={{ opacity: 0.85 }} mb={5}>
              Premium tech products built to scale your online business.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{
                borderRadius: "14px",
                px: 5,
                py: 1.5,
                fontWeight: "600",
                background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
              }}
            >
              Explore Products
            </Button>
          </Box>
        </Container>
      </Box>

      {/* PRODUCTS SECTION */}
      <Box py={12} sx={{ background: "#f1f5f9" }}>
        <Container maxWidth="xl">

          <Typography variant="h4" fontWeight="800" mb={8} textAlign="center">
            Our Products
          </Typography>

          <Grid container spacing={5} justifyContent="center">

            {products.map((product) => {

              const isAdding = addingProductId === product._id;

              return (
                <Grid item xs={12} sm={6} md={3} lg={3} key={product._id}>
                  <Card
                    sx={{
                      width: "100%",
                      maxWidth: "320px",
                      margin: "auto",
                      height: "100%",
                      borderRadius: "24px",
                      display: "flex",
                      flexDirection: "column",
                      background: "white",
                      transition: "all .4s ease",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 18px 50px rgba(0,0,0,0.15)",
                      },
                    }}
                  >

                    {/* IMAGE BOX */}
                    <Box
                      sx={{
                        height: 200,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f8fafc",
                        position: "relative"
                      }}
                    >
                      <img
                        src={product.images?.[0] || "https://picsum.photos/400"}
                        alt={product.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          e.target.src = "https://picsum.photos/400";
                        }}
                      />

                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          background: "#2563eb",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        ${product.price}
                      </Box>
                    </Box>

                    <CardContent sx={{ px: 3, py: 3, flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="700" mb={1} noWrap>
                        {product.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ minHeight: 60 }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>

                    <Box px={3} pb={3} sx={{ mt: "auto" }}>

                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          borderRadius: "14px",
                          py: 1.3,
                          fontWeight: "600",
                          background: "linear-gradient(90deg,#3b82f6,#06b6d4)",
                        }}
                        onClick={() => handleAddToCart(product._id)}
                        disabled={
                          isAdding ||
                          !product.stock ||
                          product.stock <= 0
                        }
                      >
                        {isAdding
                          ? "Adding..."
                          : (!product.stock || product.stock <= 0
                            ? "Out of Stock"
                            : "Add To Cart")}
                      </Button>

                    </Box>

                  </Card>
                </Grid>
              );
            })}

          </Grid>

        </Container>
      </Box>
    </Box>
  );
}

export default Home;