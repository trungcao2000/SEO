import React, { useContext, useState, useEffect } from "react";
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
  Chip,
  Button,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  CheckCircleOutline,
  Cancel,
  Replay,
  Search,
} from "@mui/icons-material";
import { updateItem } from "../api/firebaseService";
import { ProductContext } from "../context/ProductContext";

const statuses = [
  "Tất cả",
  "Chờ duyệt",
  "Đang giao hàng",
  "Đã giao hàng",
  "Đã hủy",
];

const EmployeeOrderPage = () => {
  const { products } = useContext(ProductContext);
  const [localProducts, setLocalProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");

  // Cập nhật state localProducts khi products từ context thay đổi
  useEffect(() => {
    setLocalProducts(
      Object.values(products || {}).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  }, [products]);

  // Cập nhật trạng thái đơn hàng mà không cần load lại trang
  const updateOrderStatus = async (product, newStatus, successMsg) => {
    try {
      await updateItem(
        product.id,
        { ...product, status: newStatus },
        "products"
      );
      setLocalProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, status: newStatus } : item
        )
      );
      alert(successMsg);
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  // Lọc đơn hàng theo tìm kiếm và trạng thái
  const filteredProducts = localProducts.filter((product) => {
    const matchesSearch = product.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Tất cả" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Quản lý đơn hàng
      </Typography>

      {/* 🔎 Tìm kiếm & lọc trạng thái */}
      <Box display="flex" justifyContent="center" gap={2} mb={3}>
        <TextField
          label="Tìm mã đơn hàng"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ endAdornment: <Search color="action" /> }}
          sx={{ width: "50%" }}
        />
        <FormControl size="small" sx={{ width: "30%" }}>
          <InputLabel>Trạng thái</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Trạng thái"
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ boxShadow: 4, borderRadius: "16px" }}
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
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Không tìm thấy đơn hàng.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={product.status}
                      color="primary"
                      sx={{ fontWeight: "bold", borderRadius: "16px" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {product.status === "Chờ duyệt" && (
                      <Box display="flex" gap={1} justifyContent="center">
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleOutline />}
                          onClick={() =>
                            updateOrderStatus(
                              product,
                              "Đang giao hàng",
                              `Đơn ${product.id} đã duyệt.`
                            )
                          }
                        >
                          Duyệt đơn
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() =>
                            updateOrderStatus(
                              product,
                              "Đã hủy",
                              `Đơn ${product.id} đã bị hủy.`
                            )
                          }
                        >
                          Hủy đơn
                        </Button>
                      </Box>
                    )}

                    {product.status === "Đang giao hàng" && (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleOutline />}
                        onClick={() =>
                          updateOrderStatus(
                            product,
                            "Đã giao hàng",
                            `Đơn ${product.id} giao thành công.`
                          )
                        }
                      >
                        Đã giao thành công
                      </Button>
                    )}

                    {product.status === "Đã hủy" && (
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<Replay />}
                        onClick={() =>
                          updateOrderStatus(
                            product,
                            "Chờ duyệt",
                            `Đơn ${product.id} đã khôi phục.`
                          )
                        }
                      >
                        Khôi phục
                      </Button>
                    )}

                    {product.status === "Đã giao hàng" && (
                      <Chip
                        label="Hoàn tất"
                        color="success"
                        sx={{ fontWeight: "bold", borderRadius: "16px" }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EmployeeOrderPage;
