import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from "../services/productService";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: ""
  });

  const fetchProducts = async () => {
    const data = await getProducts();
    if (data?.products) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  /* ================= CREATE ================= */

  const handleCreate = async () => {
    try {

      if (!form.name || !form.price || !form.description || !form.category) {
        alert("Fill required fields");
        return;
      }

      const res = await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock || 0),
        images: form.image ? [form.image] : []
      });

      if (!res?.success && res?.error) {
        alert(res.error);
        return;
      }

      resetForm();
      fetchProducts();

    } catch {
      alert("Failed to add product");
    }
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (!editingId) return;

    try {

      const res = await updateProduct(editingId, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock || 0),
        images: form.image ? [form.image] : []
      });

      if (!res?.success && res?.error) {
        alert(res.error);
        return;
      }

      resetForm();
      setEditingId(null);
      fetchProducts();

    } catch {
      alert("Update failed");
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  /* ================= EDIT MODE ================= */

  const handleEdit = (product) => {
    setEditingId(product._id);

    setForm({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      stock: product.stock || "",
      image: product.images?.[0] || ""
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: ""
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>

      <Box mb={8}>
        <Typography variant="h4" fontWeight="900">
          Products Management
        </Typography>

        <Typography color="text.secondary">
          Create, update and delete store products.
        </Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          lg: "350px 1fr"
        }}
        gap={6}
      >

        {/* FORM */}
        <Card sx={{ p: 4, borderRadius: "24px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>

          <Typography variant="h6" fontWeight="700" mb={3}>
            {editingId ? "Update Product" : "Add New Product"}
          </Typography>

          <Box display="grid" gap={2}>

            <TextField
              name="name"
              label="Product Name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="description"
              label="Description"
              value={form.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />

            <TextField
              name="price"
              label="Price"
              value={form.price}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="stock"
              label="Stock"
              value={form.stock}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="category"
              label="Category"
              value={form.category}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              name="image"
              label="Image URL"
              value={form.image}
              onChange={handleChange}
              fullWidth
            />

            <Button
              variant="contained"
              size="large"
              onClick={editingId ? handleUpdate : handleCreate}
              sx={{
                mt: 2,
                borderRadius: "12px",
                fontWeight: "700",
                background: "linear-gradient(90deg,#3b82f6,#06b6d4)"
              }}
            >
              {editingId ? "Update Product" : "Add Product"}
            </Button>

          </Box>
        </Card>

        {/* TABLE */}

        <Card sx={{ borderRadius: "24px", overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>

          <Box p={4}>
            <Typography variant="h6" fontWeight="700">
              Products List
            </Typography>
          </Box>

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table sx={{ minWidth: 650 }}>

              <TableHead sx={{ background: "#f8fafc" }}>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {products.map(p => (
                  <TableRow key={p._id} hover>

                    <TableCell>
                      {p.images?.[0] && (
                        <img
                          src={p.images[0]}
                          alt=""
                          width={60}
                          height={60}
                          style={{
                            objectFit: "cover",
                            borderRadius: 12
                          }}
                        />
                      )}
                    </TableCell>

                    <TableCell sx={{ fontWeight: "600" }}>
                      {p.name}
                    </TableCell>

                    <TableCell sx={{ color: "primary.main", fontWeight: "600" }}>
                      ${p.price}
                    </TableCell>

                    <TableCell>
                      {p.stock}
                    </TableCell>

                    <TableCell>
                      {p.category}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="small"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </Button>

                      <Button
                        color="error"
                        size="small"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}

              </TableBody>

            </Table>
          </Box>

        </Card>

      </Box>
    </Container>
  );
}

export default AdminProducts;