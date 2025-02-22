import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Button,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,
  CardActions,
  Chip,
  InputAdornment,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const categories = ["Điện tử", "Thời trang", "Gia dụng", "Sách", "Khác"];
const priceMarks = [
  { value: 100000, label: "100K" },
  { value: 200000, label: "200K" },
  { value: 500000, label: "500K" },
];

const SellProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 200000,
    category: "",
    image: null,
  });
  const [products, setProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (value) => {
    setProduct((prev) => ({ ...prev, price: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProduct((prev) => ({ ...prev, image: file }));
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name || !product.category) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const newProduct = {
      ...product,
      id: Date.now(),
      sold: false,
      imageUrl: imagePreview,
    };

    setProducts([newProduct, ...products]);
    alert("✅ Sản phẩm đã được đăng bán!");
    setProduct({
      name: "",
      description: "",
      price: 200000,
      category: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("❗Bạn có chắc muốn xóa sản phẩm này?")) {
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  const toggleSoldStatus = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, sold: !item.sold } : item
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4, fontFamily: "Times New Roman" }}>
      <Card sx={{ borderRadius: "16px", boxShadow: 3, mb: 4 }}>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
          >
            Đăng Bán Sản Phẩm
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Tên sản phẩm"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mô tả"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Phân loại</InputLabel>
                  <Select
                    name="category"
                    value={product.category}
                    label="Phân loại"
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Giá (VNĐ)"
                  name="price"
                  value={product.price}
                  onChange={handlePriceChange}
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Slider
                  value={product.price}
                  onChange={(_, value) => handlePriceChange(value)}
                  step={100000}
                  marks={priceMarks}
                  min={100000}
                  max={500000}
                  valueLabelDisplay="auto"
                />
              </Grid>
              <Grid item xs={12} sm={6} textAlign="center">
                <input
                  accept="image/*"
                  type="file"
                  id="upload-image"
                  hidden
                  onChange={handleImageUpload}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Tải ảnh
                  </Button>
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Xem trước"
                    style={{ marginTop: 10, maxWidth: "100%", borderRadius: 8 }}
                  />
                )}
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ px: 5, borderRadius: "12px" }}
                >
                  Đăng Bán
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {products.length > 0 && (
        <>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="bold"
            textAlign="center"
          >
            🛒 Danh Sách Sản Phẩm Đã Đăng
          </Typography>
          <Grid container spacing={4}>
            {products.map(
              ({ id, name, description, price, category, imageUrl, sold }) => (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card sx={{ borderRadius: "12px", boxShadow: 2 }}>
                    {imageUrl && (
                      <CardMedia
                        component="img"
                        height="180"
                        image={imageUrl}
                        alt={name}
                        sx={{ objectFit: "cover" }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {description || "Không có mô tả"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Phân loại: {category}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Giá: {price.toLocaleString("vi-VN")} VNĐ
                      </Typography>
                      <Chip
                        label={sold ? "Đã bán" : "Chưa bán"}
                        color={sold ? "error" : "success"}
                        icon={sold ? <CheckCircleIcon /> : <CancelIcon />}
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color={sold ? "secondary" : "success"}
                        onClick={() => toggleSoldStatus(id)}
                      >
                        {sold ? "Đánh dấu chưa bán" : "Đánh dấu đã bán"}
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default SellProductPage;
