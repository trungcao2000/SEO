import React, { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  Box,
} from "@mui/material";
import {
  CheckCircleOutline,
  HourglassEmpty,
  LocalShipping,
  Cancel,
} from "@mui/icons-material";

const initialOrders = [
  { id: "12345", status: "Chờ duyệt" },
  { id: "67890", status: "Đang giao hàng" },
  { id: "54321", status: "Đã giao hàng" },
  { id: "98765", status: "Đã hủy" },
];

const getStatusChip = (status) => {
  switch (status) {
    case "Chờ duyệt":
      return (
        <Chip icon={<HourglassEmpty />} label="Chờ duyệt" color="warning" />
      );
    case "Đang giao hàng":
      return (
        <Chip icon={<LocalShipping />} label="Đang giao hàng" color="primary" />
      );
    case "Đã giao hàng":
      return (
        <Chip
          icon={<CheckCircleOutline />}
          label="Đã giao hàng"
          color="success"
        />
      );
    case "Đã hủy":
      return <Chip icon={<Cancel />} label="Đã hủy" color="error" />;
    default:
      return <Chip label="Không xác định" />;
  }
};

const EmployeeOrderPage = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleApprove = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "Đang giao hàng" } : order
    );
    setOrders(updatedOrders);
  };

  const handleCancel = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: "Đã hủy" } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom align="center">
        Quản lý đơn hàng
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3, borderRadius: "12px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Mã đơn hàng</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Trạng thái</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Hành động</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell align="center">
                  {getStatusChip(order.status)}
                </TableCell>
                <TableCell align="center">
                  {order.status === "Chờ duyệt" && (
                    <Box display="flex" gap={1} justifyContent="center">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(order.id)}
                        sx={{ borderRadius: "8px" }}
                      >
                        Duyệt đơn
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancel(order.id)}
                        sx={{ borderRadius: "8px" }}
                      >
                        Hủy đơn
                      </Button>
                    </Box>
                  )}
                  {order.status !== "Chờ duyệt" && (
                    <Chip label="Đã xử lý" color="info" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeOrderPage;
