import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardMedia,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Slider,
  Paper,
} from "@mui/material";
import Qrcodeme from "../qrcode.png";

const categories = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Khác"];

const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Điện tử",
    price: 100000,
    image:
      "https://thuoclaodangtrung.com/images/f47783bae1f4847345a8f6be8bdd98df.png",
    isSold: false,
  },
  {
    id: 2,
    name: "Product 2",
    category: "Thời trang",
    price: 200000,
    image:
      "https://thuoclaodangtrung.com/images/f47783bae1f4847345a8f6be8bdd98df.png",
    isSold: true,
  },
  {
    id: 3,
    name: "Product 3",
    category: "Gia dụng",
    price: 300000,
    image:
      "https://thuoclaodangtrung.com/images/f47783bae1f4847345a8f6be8bdd98df.png",
    isSold: false,
  },
];

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setPaymentMethod("");
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = products.filter(
    (product) =>
      !product.isSold &&
      (!selectedCategory || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  return (
    <Box sx={{ p: 1 }}>
      {/* Thêm margin-top để tránh đè lên AppBar */}
      <Typography variant="h4" gutterBottom>
        Danh Sách Sản Phẩm Đăng Bán
      </Typography>
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 1100,
          p: 1.5, // Giảm padding
          mb: 2, // Giảm margin dưới
          borderRadius: "10px",
        }}
      >
        <Box display="flex" gap={1.5} flexWrap="wrap" alignItems="center">
          {/* Phân Loại */}
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Phân Loại</InputLabel>
            <Select
              value={selectedCategory}
              label="Phân Loại"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Tìm kiếm sản phẩm */}
          <TextField
            label="Tìm kiếm sản phẩm"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            size="small"
            sx={{ width: 200 }}
          />

          {/* Thanh trượt giá */}
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="body2" gutterBottom>
              Khoảng Giá: {priceRange[0].toLocaleString()} -{" "}
              {priceRange[1].toLocaleString()} VND
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              size="small"
              step={100000}
              marks={[
                { value: 0, label: "0" },
                { value: 100000, label: "100k" },
                { value: 200000, label: "200k" },
                { value: 500000, label: "500k" },
              ]}
              min={0}
              max={500000}
            />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {filteredProducts.length ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "16px",
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "contain",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <CardContent>
                  <Typography variant="h6" noWrap gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phân Loại: {product.category}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Giá: {product.price.toLocaleString()} VND
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleBuyClick(product)}
                    sx={{ borderRadius: "12px", textTransform: "none" }}
                  >
                    Mua
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ m: 2 }}>
            Không tìm thấy sản phẩm phù hợp.
          </Typography>
        )}
      </Grid>
      {selectedProduct && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Phương Thức Thanh Toán - {selectedProduct.name}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Lựa chọn phương thức thanh toán
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Thanh toán khi nhận hàng"
              />
              <FormControlLabel
                value="bank"
                control={<Radio />}
                label="Chuyển khoản online"
              />
            </RadioGroup>

            {paymentMethod === "bank" && (
              <Box sx={{ mt: 4, p: 3, borderRadius: 2, bgcolor: "#f0f0f0" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Thông tin chuyển khoản
                </Typography>
                <Typography variant="body2">
                  Chủ tài khoản: Nguyen Van A
                </Typography>
                <Typography variant="body2">
                  Số điện thoại Momo: 123456789
                </Typography>
                <Typography variant="body2">Ngân Hàng: ABC Bank</Typography>
                <Box display="flex" justifyContent="center" gap={2} mt={3}>
                  <img src={Qrcodeme} alt="QR Code 1" width={180} />
                  <img src={Qrcodeme} alt="QR Code 2" width={180} />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Hủy Bỏ
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("Đơn hàng đã được đặt!")}
            >
              Xác Nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
