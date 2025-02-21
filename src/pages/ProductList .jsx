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
} from "@mui/material";
import Qrcodeme from "../qrcode.png";
const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100000,
    image:
      "https://thuoclaodangtrung.com/images/f47783bae1f4847345a8f6be8bdd98df.png",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200000,
    image:
      "https://thuoclaodangtrung.com/images/f47783bae1f4847345a8f6be8bdd98df.png",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300000,
    image:
      "https://thuoclaodangtrung.com/images/f47783bae1f4847345a8f6be8bdd98df.png",
  },
];

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setPaymentMethod("");
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Danh Sách Sản Phẩm
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              className="rounded-2xl shadow-lg"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 200, // Chiều cao cố định cho đồng đều
                  objectFit: "contain", // Giữ độ nét và không bị zoom
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  backgroundColor: "#f5f5f5", // Nền xám nhẹ giúp ảnh nhỏ không bị lạc lõng
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                  {product.name}
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
        ))}
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
                label="Hình thức chuyển khoản online"
              />
            </RadioGroup>

            {paymentMethod === "bank" && (
              <Box className="mt-4 p-4 border rounded-xl bg-gray-100">
                <Typography variant="subtitle1">
                  Thông tin chuyển khoản
                </Typography>
                <Typography variant="body2">
                  Chủ tài khoản: Nguyen Van A
                </Typography>
                <Typography variant="body2">
                  Số điện thoại Momo: 123456789
                </Typography>
                <Typography variant="body2">Ngân Hàng: ABC Bank</Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap={2}
                  className="mt-4"
                >
                  <img src={Qrcodeme} alt="QR Code 1" width={200} />
                  <img src={Qrcodeme} alt="QR Code 2" width={200} />
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
              onClick={() => alert("Order placed!")}
            >
              Xác Nhận
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
