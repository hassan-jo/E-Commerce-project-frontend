import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

import {
  getAllOrders,
  updateOrderStatus,
  deleteOrderById
} from "../services/orderService";

const statusColors = {
  pending: "warning",
  shipped: "info",
  delivered: "success"
};

const flow = ["pending", "shipped", "delivered"];

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // ===============================
  // Fetch Orders
  // ===============================

  const fetchOrders = async () => {
    const data = await getAllOrders();

    console.log("Orders Items →", data?.[0]?.items);

    setOrders(data || []);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===============================
  // Format Items (Using quantity field)
  // ===============================

  const formatItems = (items = []) => {

    return items
      .map(item => {
        const name = item?.product?.name || "Unknown";
        const qty = item?.quantity || 1;

        return qty > 1 ? `${name} *${qty}` : name;
      })
      .join(", ");

  };

  // ===============================
  // Optimistic Status Change
  // ===============================

  const handleStatusChange = async (id, currentStatus) => {

    const currentIndex = flow.indexOf(currentStatus);
    const nextStatus = flow[(currentIndex + 1) % flow.length];

    setOrders(prev =>
      prev.map(order =>
        order._id === id
          ? { ...order, status: nextStatus }
          : order
      )
    );

    setActionLoadingId(id);

    try {
      await updateOrderStatus(id, nextStatus);
    } catch {
      fetchOrders();
    } finally {
      setActionLoadingId(null);
    }
  };

  // ===============================
  // Optimistic Delete Order
  // ===============================

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this order?"))
      return;

    setOrders(prev =>
      prev.filter(order => order._id !== id)
    );

    setActionLoadingId(id);

    try {
      await deleteOrderById(id);
    } catch {
      fetchOrders();
    } finally {
      setActionLoadingId(null);
    }
  };

  // ===============================

  return (
    <Container maxWidth="xl" sx={{ mt: 14, mb: 10 }}>

      <Box mb={8}>
        <Typography variant="h4" fontWeight="900">
          Orders Management
        </Typography>

        <Typography color="text.secondary">
          Track and manage customer orders.
        </Typography>
      </Box>

      <Card sx={{
        borderRadius: "24px",
        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        overflow: "hidden"
      }}>
        <Box sx={{ width: "100%", overflowX: "auto" }}>

          <Table sx={{ minWidth: 800 }}>

            <TableHead sx={{ background: "#f8fafc" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {orders.map(o => {

                const isLoading = actionLoadingId === o._id;

                return (
                  <TableRow key={o._id} hover>

                    <TableCell sx={{ fontWeight: "600" }}>
                      {o._id}
                    </TableCell>

                    <TableCell>
                      {o.user?.email || "Unknown"}
                    </TableCell>

                    <TableCell>
                      {formatItems(o.items)}
                    </TableCell>

                    <TableCell sx={{ fontWeight: "700" }}>
                      ${o.totalPrice}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={o.status}
                        color={statusColors[o.status] || "default"}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(o.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Box display="flex" gap={1} flexWrap="wrap">

                        <Button
                          size="small"
                          variant="outlined"
                          disabled={isLoading}
                          onClick={() =>
                            handleStatusChange(o._id, o.status)
                          }
                        >
                          {isLoading ? "Updating..." : "Change Status"}
                        </Button>

                        <Button
                          size="small"
                          color="error"
                          disabled={isLoading}
                          onClick={() => handleDelete(o._id)}
                        >
                          Delete
                        </Button>

                      </Box>
                    </TableCell>

                  </TableRow>
                );
              })}

            </TableBody>

          </Table>

        </Box>
      </Card>
    </Container>
  );
};

export default AdminOrders;