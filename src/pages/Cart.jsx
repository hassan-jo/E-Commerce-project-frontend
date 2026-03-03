import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { getCart, removeFromCart, addToCart } from "../services/cartService";
import { createOrder } from "../services/orderService";

import toast from "react-hot-toast";

function Cart() {

const [cart, setCart] = useState([]);
const [deleteId, setDeleteId] = useState(null);

useEffect(() => {
fetchCart();
}, []);

// ===============================
// Fetch Cart
// ===============================

const fetchCart = async () => {
const data = await getCart();


if (data?.items) {
  setCart(data.items);
}


};

// ===============================
// Optimistic Quantity Update
// ===============================

const updateLocalCartQuantity = (productId, delta) => {

setCart(prev =>
  prev.map(item => {

    if (item.product._id !== productId)
      return item;

    const newQty = (item.quantity || 0) + delta;

    if (newQty < 1) return item;

    if (newQty > item.product.stock) return item;

    return {
      ...item,
      quantity: newQty
    };
  })
);


};

// ===============================
// Increase Quantity
// ===============================

const increaseQty = async (id) => {


const item = cart.find(i => i.product._id === id);

if (!item) return;

if (item.quantity >= item.product.stock) {
  alert("Cannot exceed available stock");
  return;
}

// ⭐ Optimistic UI update
updateLocalCartQuantity(id, 1);

try {
  await addToCart(id, 1);
} catch {
  fetchCart();
}


};

// ===============================
// Decrease Quantity
// ===============================

const decreaseQty = async (id) => {

const item = cart.find(i => i.product._id === id);
if (!item) return;

if (item.quantity <= 1) return;

// ⭐ Optimistic UI update
updateLocalCartQuantity(id, -1);

try {
  await addToCart(id, -1);
} catch {
  fetchCart();
}


};

// ===============================
// Delete Item
// ===============================

const confirmDelete = async () => {


const productId = deleteId;

setCart(prev =>
  prev.filter(item =>
    item.product._id !== productId
  )
);

setDeleteId(null);

try {
  await removeFromCart(productId);
} catch {
  fetchCart();
}


};

// ===============================
// Checkout
// ===============================

const handleCheckout = async () => {


try {
  await createOrder();

  toast.success("Checkout Success ✅");

  fetchCart();

} catch {
  toast.error("Checkout failed");
}


};

// ===============================

const totalPrice = cart.reduce(
(acc, item) =>
acc + item.product.price * (item.quantity || 1),
0
);

// ===============================

return (
<Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>


  <Typography variant="h4" fontWeight="800" mb={6}>
    Your Cart
  </Typography>

  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
      gap: 6
    }}
  >

    <Box display="grid" gap={4}>

      {cart.length === 0 && (
        <Box
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "20px",
            background: "#f8fafc"
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Your cart is empty.
          </Typography>
        </Box>
      )}

      {cart.map((item) => (
        <Card key={item.product._id} sx={{ p: 4, borderRadius: "20px" }}>

          <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={3}>

            <Box>
              <Typography variant="h6" fontWeight="700">
                {item.product.name}
              </Typography>

              <Typography color="primary" fontWeight="700">
                ${item.product.price}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={2}>

              <Button variant="outlined" onClick={() => decreaseQty(item.product._id)}>
                <RemoveIcon />
              </Button>

              <Typography fontWeight="600" minWidth={30} textAlign="center">
                {item.quantity}
              </Typography>

              <Button variant="outlined" onClick={() => increaseQty(item.product._id)}>
                <AddIcon />
              </Button>

              <Button
                color="error"
                sx={{ ml: 2 }}
                onClick={() => setDeleteId(item.product._id)}
              >
                <DeleteIcon />
              </Button>

            </Box>
          </Box>
        </Card>
      ))}

    </Box>

    {/* Summary */}
    <Box sx={{ position: { md: "sticky" }, top: 120 }}>

      <Card sx={{ p: 5, borderRadius: "24px" }}>

        <Typography variant="h6" fontWeight="700" mb={4}>
          Order Summary
        </Typography>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight="600">
            ${totalPrice.toFixed(2)}
          </Typography>
        </Box>

        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleCheckout}
          sx={{
            borderRadius: "14px",
            py: 1.5,
            fontWeight: "700",
            background: "linear-gradient(90deg,#3b82f6,#06b6d4)"
          }}
        >
          Proceed to Checkout
        </Button>

      </Card>
    </Box>

  </Box>

  <Dialog open={deleteId !== null}>
    <DialogTitle>Remove this item?</DialogTitle>

    <DialogActions>
      <Button onClick={() => setDeleteId(null)}>Cancel</Button>

      <Button color="error" variant="contained" onClick={confirmDelete}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>

</Container>


);
}

export default Cart;
