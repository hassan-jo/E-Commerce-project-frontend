import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Chip from "@mui/material/Chip";
import {
  getMyOrders,
  cancelOrder
} from "../services/orderService";

function OrderFollowing() {

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  const fetchOrders = async () => {
    const data = await getMyOrders();
    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmCancel = async () => {
    await cancelOrder(cancelId);
    setCancelId(null);
    fetchOrders();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "shipped":
        return "info";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 14, mb: 10 }}>

      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="800" mb={1}>
          Order Tracking
        </Typography>

        <Typography color="text.secondary">
          Monitor your order delivery status
        </Typography>
      </Box>

      {orders.length === 0 && (
        <Typography textAlign="center" color="text.secondary">
          No orders found
        </Typography>
      )}

      <Box display="grid" gap={4}>

        {orders.map(order => (
          <Card
            key={order._id}
            sx={{
              p: 4,
              borderRadius: "24px",
              boxShadow:
                "0 12px 40px rgba(0,0,0,0.06)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)"
              }
            }}
          >

            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
              mb={3}
            >

              <Box>
                <Typography fontWeight="700">
                  Order #{order._id}
                </Typography>

                <Typography color="text.secondary" fontSize={14}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
              />
            </Box>

            <Typography fontWeight="700" mb={2}>
              Total: ${order.totalPrice}
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">

              <Button
                variant="contained"
                onClick={() => setSelectedOrder(order)}
                sx={{
                  borderRadius: "12px",
                  fontWeight: "600"
                }}
              >
                View Details
              </Button>

              {order.status === "pending" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setCancelId(order._id)}
                  sx={{
                    borderRadius: "12px",
                    fontWeight: "600"
                  }}
                >
                  Cancel Order
                </Button>
              )}

            </Box>

          </Card>
        ))}
      </Box>

      {/* DETAILS DIALOG */}
      <Dialog
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        fullWidth
        maxWidth="sm"
      >

        <DialogTitle fontWeight="700">
          Order Details
        </DialogTitle>

        <DialogContent dividers>

          {selectedOrder?.items?.map(item => (
            <Box key={item._id} mb={3}>
              <Typography fontWeight="600">
                {item.product?.name}
              </Typography>

              <Typography color="text.secondary">
                Quantity: {item.quantity}
              </Typography>

              <Typography color="primary" fontWeight="600">
                Price: ${item.price}
              </Typography>
            </Box>
          ))}

        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSelectedOrder(null)}>
            Close
          </Button>
        </DialogActions>

      </Dialog>

      {/* CANCEL CONFIRM */}
      <Dialog open={cancelId !== null}>

        <DialogTitle fontWeight="700">
          Confirm Order Cancellation?
        </DialogTitle>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCancelId(null)}>
            No
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmCancel}
            sx={{ borderRadius: "10px" }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>

      </Dialog>

    </Container>
  );
}

export default OrderFollowing;